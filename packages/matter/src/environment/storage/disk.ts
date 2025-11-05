/**
 * @license
 * Copyright 2022-2025 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileSystemProvider, OpenFlags } from "@akala/fs";
import
{
    Bytes,
    createPromise,
    fromJson,
    Logger,
    MatterAggregateError,
    Storage,
    StorageError,
    SupportedStorageTypes,
    toJson,
} from "@matter/general";

const logger = new Logger("StorageBackendDisk");

export class StorageBackendDisk extends Storage
{
    readonly fs: FileSystemProvider;
    readonly #clear: boolean;
    protected isInitialized = false;
    #writeFileBlocker = new Map<URL, Promise<void>>();

    constructor(fs: FileSystemProvider, clear = false)
    {
        super();
        this.fs = fs;
        this.#clear = clear;
    }

    filePath(filename: string): URL
    {
        return new URL(filename, this.fs.root);
    }

    get initialized()
    {
        return this.isInitialized;
    }

    async initialize()
    {
        if (this.#clear)
        {
            await this.clear();
        }
        await this.fs.mkdir('.', { recursive: true });
        this.isInitialized = true;
    }

    async #finishAllWrites(filename?: URL | string)
    {
        const targetFilename = filename !== undefined ? (typeof filename === 'string' ? new URL(filename, this.fs.root) : filename) : undefined;
        // Let's try max up to 10 times to finish all writes out there, otherwise something is strange
        if (
            (targetFilename !== undefined && this.#writeFileBlocker.has(targetFilename)) ||
            (targetFilename === undefined && this.#writeFileBlocker.size > 0)
        )
        {
            for (let i = 0; i < 10; i++)
            {
                await MatterAggregateError.allSettled(
                    targetFilename !== undefined ? [this.#writeFileBlocker.get(targetFilename)] : this.#writeFileBlocker.values(),
                    "Error on finishing all file system writes to storage",
                );
                if (!this.#writeFileBlocker.size)
                {
                    return;
                }
            }
            await this.#fsyncStorageDir();
        }
    }

    async close()
    {
        this.isInitialized = false;
        await this.#finishAllWrites();
    }

    async clear()
    {
        await this.#finishAllWrites();
        await this.fs.rm('.', { recursive: true, force: true });
        await this.fs.mkdir('.', { recursive: true });
    }

    getContextBaseKey(contexts: string[], allowEmptyContext = false)
    {
        const contextKey = contexts.join(".");
        if (
            (!contextKey.length && !allowEmptyContext) ||
            contextKey.includes("..") ||
            contextKey.startsWith(".") ||
            contextKey.endsWith(".")
        )
            throw new StorageError("Context must not be an empty and not contain dots.");
        return contextKey;
    }

    buildStorageKey(contexts: string[], key: string)
    {
        if (!key.length)
        {
            throw new StorageError("Key must not be an empty string.");
        }
        const contextKey = this.getContextBaseKey(contexts);
        const rawName = `${contextKey}.${key}`;
        return encodeURIComponent(rawName)
            .replace(/[!'()]/g, escape)
            .replace(/\*/g, "%2A");
    }

    async has(contexts: string[], key: string): Promise<boolean>
    {
        const fileName = new URL(this.buildStorageKey(contexts, key), this.fs.root);
        if (this.#writeFileBlocker.has(fileName))
        {
            // We are writing that key right now, so yes it exists
            return true;
        }
        try
        {
            const stats = await this.fs.stat(fileName);
            return stats.isFile;
        } catch (error: any)
        {
            if (error.code === "ENOENT") return false;
            throw error;
        }
    }

    async get<T extends SupportedStorageTypes>(contexts: string[], key: string): Promise<T | undefined>
    {
        const fileName = new URL(this.buildStorageKey(contexts, key), this.fs.root);
        await this.#finishAllWrites(fileName);

        let value: string;
        try
        {
            value = await this.fs.readFile(fileName, "utf8");
        } catch (error: any)
        {
            if (error.code === "ENOENT") return undefined;
            throw error;
        }
        try
        {
            return fromJson(value) as T;
        } catch (error)
        {
            logger.error(`Failed to parse storage value for key ${key} in context ${contexts.join(".")}`);
        }
    }

    async openBlob(contexts: string[], key: string): Promise<Blob>
    {
        const fileName = this.filePath(this.buildStorageKey(contexts, key));
        await this.#finishAllWrites(fileName);
        if (await this.has(contexts, key))
        {
            return new Blob([(await this.fs.readFile(fileName, { encoding: 'binary' })).toArray()])
        }
        else
        {
            return new Blob();
        }
    }

    writeBlobFromStream(contexts: string[], key: string, stream: ReadableStream)
    {
        return this.#writeFile(this.buildStorageKey(contexts, key), stream);
    }

    set(contexts: string[], key: string, value: SupportedStorageTypes): Promise<void>;
    set(contexts: string[], values: Record<string, SupportedStorageTypes>): Promise<void>;
    async set(
        contexts: string[],
        keyOrValues: string | Record<string, SupportedStorageTypes>,
        value?: SupportedStorageTypes,
    )
    {
        if (typeof keyOrValues === "string")
        {
            return this.#writeFile(this.buildStorageKey(contexts, keyOrValues), toJson(value));
        }

        const promises = new Array<Promise<void>>();
        for (const [key, value] of Object.entries(keyOrValues))
        {
            promises.push(this.#writeFile(this.buildStorageKey(contexts, key), toJson(value)));
        }
        await MatterAggregateError.allSettled(promises, "Error when writing values into filesystem storage");
    }

    /** According to Node.js documentation, writeFile is not atomic. This method ensures atomicity. */
    async #writeFile(fileName: string, valueOrStream: string | ReadableStream): Promise<void>
    {
        const blocker = this.#writeFileBlocker.get(new URL(fileName, this.fs.root));
        if (blocker !== undefined)
        {
            await blocker;
            return this.#writeFile(fileName, valueOrStream);
        }

        const promise = this.#writeAndMoveFile(this.filePath(fileName), valueOrStream).finally(() =>
        {
            this.#writeFileBlocker.delete(new URL(fileName, this.fs.root));
        });
        this.#writeFileBlocker.set(new URL(fileName, this.fs.root), promise);

        return promise;
    }

    async #writeAndMoveFile(filepath: string | URL, valueOrStream: string | ReadableStream): Promise<void>
    {
        const filePathStr = typeof filepath === 'string' ? filepath : filepath.pathname;
        const tmpName = `${filePathStr}.tmp`;
        const handle = await this.fs.open(tmpName, OpenFlags.Write);
        const isStream = valueOrStream instanceof ReadableStream;
        const stream = handle.openWriteStream({ encoding: isStream ? null : "utf8" });
        const writer = stream.getWriter();

        const { resolver, rejecter, promise: writePromise } = createPromise<void>();
        // stream.on("finish", resolver);
        // stream.on("error", rejecter);

        let reader: ReadableStreamDefaultReader | undefined;
        try
        {
            if (isStream)
            {
                reader = valueOrStream.getReader();
                while (true)
                {
                    const { value: chunk, done } = await reader.read();
                    if (chunk)
                    {
                        if (!writer.write(chunk))
                        {
                            // Backpressure: wait for the buffer to drain.
                            // await new Promise<void>(resolve => writer.once("drain", resolve));
                        }
                    }
                    if (done)
                    {
                        break;
                    }
                }
            } else
            {
                writer.write(valueOrStream);
            }
            await writer.ready;
            writer.close();
            await writePromise;
        } finally
        {
            if (isStream && reader)
            {
                if (valueOrStream.locked)
                {
                    reader.releaseLock(); // release the reader lock
                }
                await valueOrStream.cancel();
            }
            await handle.close();
        }

        await this.fs.rename(tmpName, filePathStr);
    }

    /**
     * fsync on a directory ensures there are no rename operations etc. which haven't been persisted to disk.
     * We do this as best effort to ensure that all writes are persisted to disk.
     */
    async #fsyncStorageDir()
    {
        if (process.platform === "win32")
        {
            // Windows will cause `EPERM: operation not permitted, fsync`
            // for directories, so lets catch this generically
            return;
        }
        try
        {
            const fd = await this.fs.open(".", OpenFlags.Read);
            // await fd.fsync();
            await fd.close();
        } catch (error)
        {
            logger.warn(`Failed to fsync storage directory ${this.fs}`, error);
        }
    }

    async delete(contexts: string[], key: string)
    {
        const filename = this.buildStorageKey(contexts, key);
        await this.#finishAllWrites(filename);
        return this.fs.rm(this.filePath(filename), { force: true });
    }

    /** Returns all keys of a storage context without keys of sub-contexts */
    async keys(contexts: string[])
    {
        const contextKey = this.getContextBaseKey(contexts);
        const keys = [];
        const contextKeyStart = `${contextKey}.`;
        const len = contextKeyStart.length;

        const files = await this.fs.readdir('.');

        for (const key of files)
        {
            const decodedKey = decodeURIComponent(key);
            if (decodedKey.startsWith(contextKeyStart) && !decodedKey.includes(".", len))
            {
                keys.push(decodedKey.substring(len));
            }
        }
        return keys;
    }

    async values(contexts: string[])
    {
        // Initialize and context checks are done by keys method
        const values = {} as Record<string, SupportedStorageTypes>;

        const promises = new Array<Promise<void>>();
        for (const key of await this.keys(contexts))
        {
            promises.push(
                (async () =>
                {
                    const value = await this.get(contexts, key);
                    if (value !== undefined)
                    {
                        values[key] = value;
                    }
                })(),
            );
        }
        await MatterAggregateError.allSettled(promises, "Error when reading values from filesystem storage");
        return values;
    }

    async contexts(contexts: string[])
    {
        const contextKey = this.getContextBaseKey(contexts, true);
        const startContextKey = contextKey.length ? `${contextKey}.` : "";
        const len = startContextKey.length;
        const foundContexts = new Array<string>();

        const files = await this.fs.readdir('.');

        for (const key of files)
        {
            const decodedKey = decodeURIComponent(key);
            if (decodedKey.startsWith(startContextKey))
            {
                const subKeys = decodedKey.substring(len).split(".");
                if (subKeys.length === 1) continue; // found leaf key
                const context = subKeys[0];
                if (!foundContexts.includes(context))
                {
                    foundContexts.push(context);
                }
            }
        }
        return foundContexts;
    }

    async clearAll(contexts: string[])
    {
        await this.#finishAllWrites();
        const contextKey = this.getContextBaseKey(contexts, true);
        const startContextKey = contextKey.length ? `${contextKey}.` : "";

        const files = await this.fs.readdir('.');

        const promises = new Array<Promise<void>>();
        for (const key of files)
        {
            const decodedKey = decodeURIComponent(key);
            if (decodedKey.startsWith(startContextKey))
            {
                promises.push(this.fs.rm(this.filePath(key), { force: true }));
            }
        }
        await MatterAggregateError.allSettled(promises, "Error when clearing all values from filesystem storage");
    }
}
