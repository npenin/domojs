import fsHandler, { FileHandle, FileSystemProvider, MakeDirectoryOptions, OpenFlags, OpenStreamOptions, PathLike, RmDirOptions, RmOptions, Stats, FileEntry, StatOptions, VirtualFileHandle } from '@akala/fs';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { base64, ErrorWithStatus, HttpStatusCode, IsomorphicBuffer } from '@akala/core';

type FSPathLike = PathLike<VirtualFileHandle<FS>>

class FS implements FileSystemProvider<VirtualFileHandle<FS>>
{
    constructor(public root: URL, public readonly: boolean)
    {

    }

    private resolvePath(path: FSPathLike): string
    {
        if (this.isFileHandle(path))
            return path.path.pathname;

        if (typeof path === 'string')
            return new URL(path, this.root).pathname;
        else
            return path.pathname;
    }

    private getDirectoryFromPath(path: FSPathLike): Directory
    {
        if (typeof path == 'string')
            path = new URL(path, this.root);
        if (this.isFileHandle(path))
            return this.getDirectoryFromPath(path.path);
        return path.hostname as Directory;
    }
    toImportPath(path: PathLike<never>, options?: { withSideEffects?: boolean; }): string
    {
        // For Capacitor, we can just return the path as-is for import purposes
        if (typeof path === 'string')
        {
            return path;
        } else
        {
            return path.pathname;
        }
    }
    openReadStream(path: PathLike<VirtualFileHandle<FS>>, options?: OpenStreamOptions | OpenStreamOptions['encoding']): ReadableStream
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        return new ReadableStream({
            start: async (controller) =>
            {
                try
                {
                    let chunkSize = 1024 * 1024; // Default 1MB chunks
                    if (options && typeof options === 'object' && 'highWaterMark' in options)
                    {
                        chunkSize = options.highWaterMark || chunkSize;
                    }

                    await Filesystem.readFileInChunks({
                        path: pathStr,
                        directory: directory,
                        chunkSize: chunkSize
                    }, (chunkRead, error) =>
                    {
                        if (error)
                        {
                            controller.error(new Error(`Failed to read chunk: ${error}`));
                            return;
                        }

                        if (chunkRead === null)
                        {
                            // End of file
                            controller.close();
                            return;
                        }

                        // Convert chunk data to Uint8Array
                        let uint8Array: Uint8Array;
                        if (chunkRead.data instanceof Blob)
                        {
                            // Handle Blob data (web)
                            const arrayBuffer = chunkRead.data.arrayBuffer();
                            arrayBuffer.then(buffer =>
                            {
                                uint8Array = new Uint8Array(buffer);
                                controller.enqueue(uint8Array);
                            }).catch(err =>
                            {
                                controller.error(new Error(`Failed to convert blob to array buffer: ${err}`));
                            });
                        } else
                        {
                            // Handle string data (native platforms return base64)
                            try
                            {
                                const base64Data = chunkRead.data.includes(',') ?
                                    chunkRead.data.split(',')[1] : chunkRead.data;
                                uint8Array = base64.base64DecToArr(base64Data);
                                controller.enqueue(uint8Array);
                            } catch (err)
                            {
                                controller.error(new Error(`Failed to decode base64 chunk: ${err}`));
                            }
                        }
                    });
                } catch (error)
                {
                    controller.error(new Error(`Failed to start reading file ${pathStr}: ${error}`));
                }
            },

            cancel: async () =>
            {
                // Cleanup if needed
                console.log(`Reading cancelled for ${pathStr}`);
            }
        });
    }
    openWriteStream(path: PathLike<FileHandle>, options?: OpenStreamOptions | OpenStreamOptions['encoding']): WritableStream
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    async access(path: FSPathLike, mode?: OpenFlags): Promise<void>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            // Try to stat the file to check if it exists and is accessible
            await Filesystem.stat({
                path: pathStr,
                directory: directory
            });
        } catch (error)
        {
            throw new Error(`Access denied for path ${pathStr}: ${error}`);
        }
    }
    copyFile(src: FSPathLike, dest: string | URL, mode?: number): Promise<void>
    {
        return this.copyFileImpl(src, dest, mode);
    }

    private async copyFileImpl(src: FSPathLike, dest: string | URL, mode?: number): Promise<void>
    {
        const srcPath = this.resolvePath(src);
        const srcDirectory = this.getDirectoryFromPath(srcPath);

        const destPath = typeof dest === 'string' ? dest : dest.pathname;
        const destDirectory = this.getDirectoryFromPath(destPath);

        try
        {
            await Filesystem.copy({
                from: srcPath,
                to: destPath,
                directory: srcDirectory,
                toDirectory: destDirectory
            });
        } catch (error)
        {
            throw new Error(`Failed to copy ${srcPath} to ${destPath}: ${error}`);
        }
    }

    cp(src: FSPathLike, dest: string | URL, options?: { force?: boolean; recursive?: boolean; }): Promise<void>
    {
        return this.copyFileImpl(src, dest);
    }

    async mkdir(path: FSPathLike, options?: MakeDirectoryOptions): Promise<void>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            await Filesystem.mkdir({
                path: pathStr,
                directory: directory,
                recursive: options?.recursive || false
            });
        } catch (error)
        {
            throw new ErrorWithStatus(HttpStatusCode.InternalServerError, `Failed to create directory ${pathStr}: ${error}`);
        }
    }
    symlink(source: PathLike<FileHandle>, target: PathLike, type?: 'dir' | 'file' | 'junction'): Promise<void>
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    open(path: FSPathLike, flags: OpenFlags): Promise<VirtualFileHandle<FS>>
    {
        const resolvedPath = typeof path === 'string' ? path : path instanceof URL ? path : path.path;
        return Promise.resolve(new VirtualFileHandle(this, new URL(resolvedPath, this.root)));
    }

    async opendir(path: FSPathLike, options?: { bufferSize?: number; encoding?: string; }): Promise<any>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            const result = await Filesystem.readdir({
                path: pathStr,
                directory: directory
            });

            return result.files;
        } catch (error)
        {
            throw new Error(`Failed to open directory ${pathStr}: ${error}`);
        }
    }
    readdir(path: FSPathLike, options?: { encoding?: BufferEncoding | null; withFileTypes?: false }): Promise<string[]>;
    readdir(path: FSPathLike, options: { encoding: 'binary'; withFileTypes?: false }): Promise<IsomorphicBuffer[]>;
    readdir(path: FSPathLike, options: { withFileTypes: true }): Promise<FileEntry[]>;
    readdir(path: FSPathLike, options?: { encoding?: BufferEncoding | null; withFileTypes?: boolean }): Promise<string[] | IsomorphicBuffer[] | FileEntry[]>;
    async readdir(path: FSPathLike, options?: { encoding?: BufferEncoding | null; withFileTypes?: boolean }): Promise<string[] | IsomorphicBuffer[] | FileEntry[]>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            const result = await Filesystem.readdir({
                path: pathStr,
                directory: directory
            });

            if (options?.withFileTypes)
            {
                return result.files.map(file => ({
                    name: file.name,
                    parentPath: new URL(pathStr, this.root),
                    get isFile() { return file.type === 'file'; },
                    get isDirectory() { return file.type === 'directory'; },
                    get isBlockDevice() { return false; },
                    get isCharacterDevice() { return false; },
                    get isSymbolicLink() { return false; },
                    get isFIFO() { return false; },
                    get isSocket() { return false; },
                    size: file.size,
                    atimeMs: 0,
                    mtimeMs: file.mtime,
                    ctimeMs: 0,
                    birthtimeMs: file.ctime || 0,
                    atime: new Date(0),
                    mtime: new Date(file.mtime),
                    ctime: new Date(0),
                    birthtime: new Date(file.ctime || 0),
                })) as FileEntry[];
            }

            return result.files.map(file => file.name);
        } catch (error)
        {
            throw new Error(`Failed to read directory ${pathStr}: ${error}`);
        }
    }


    // Order matters for json parsing
    readFile(path: FSPathLike, options: { encoding: BufferEncoding, flag?: OpenFlags } | BufferEncoding): Promise<string>;
    readFile(path: FSPathLike, options?: { encoding?: null | 'binary', flag?: OpenFlags } | 'binary'): Promise<IsomorphicBuffer>;
    readFile<T>(path: FSPathLike, options: { encoding: 'json', flag?: OpenFlags } | 'json'): Promise<T>;
    async readFile<T = unknown>(path: FSPathLike, options?: any): Promise<string | IsomorphicBuffer | T>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            const result = await Filesystem.readFile({
                path: pathStr,
                directory: directory,
                encoding: options === 'binary' || (typeof options === 'object' && options?.encoding === 'binary') ? undefined : Encoding.UTF8
            });

            const encoding = typeof options === 'object' ? options?.encoding : options;

            if (encoding === 'binary' || encoding === null)
            {
                // For binary data, we need to convert the base64 string to a buffer
                // Since Capacitor returns base64 for binary data when no encoding is specified
                if (typeof result.data == 'string')
                    if (result.data.indexOf(',') > -1)
                        return new IsomorphicBuffer(base64.base64UrlDecToArr(result.data));
                    else
                        return new IsomorphicBuffer(base64.base64DecToArr(result.data));
                return IsomorphicBuffer.fromArrayBuffer(await result.data.arrayBuffer());
            }

            if (encoding === 'json')
            {
                if (typeof result.data !== 'string')
                    throw new ErrorWithStatus(HttpStatusCode.NotAcceptable, 'Expected a string, but got ' + typeof result.data);
                return JSON.parse(result.data);
            }

            if (typeof result.data !== 'string')
                throw new ErrorWithStatus(HttpStatusCode.NotAcceptable, 'Expected a string, but got ' + typeof result.data);
            return result.data;
        } catch (error)
        {
            throw new Error(`Failed to read file ${pathStr}: ${error}`);
        }
    }
    rename(oldPath: FSPathLike, newPath: string | URL): Promise<void>
    {
        return this.renameImpl(oldPath, newPath);
    }

    private async renameImpl(oldPath: FSPathLike, newPath: string | URL): Promise<void>
    {
        const oldPathStr = this.resolvePath(oldPath);
        const oldDirectory = this.getDirectoryFromPath(oldPathStr);

        const newPathStr = typeof newPath === 'string' ? newPath : newPath.pathname;
        const newDirectory = this.getDirectoryFromPath(newPathStr);

        try
        {
            await Filesystem.rename({
                from: oldPathStr,
                to: newPathStr,
                directory: oldDirectory,
                toDirectory: newDirectory
            });
        } catch (error)
        {
            throw new Error(`Failed to rename ${oldPathStr} to ${newPathStr}: ${error}`);
        }
    }

    rmdir(path: FSPathLike, options?: RmDirOptions): Promise<void>
    {
        return this.rmdirImpl(path, options);
    }

    private async rmdirImpl(path: FSPathLike, options?: RmDirOptions): Promise<void>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            await Filesystem.rmdir({
                path: pathStr,
                directory: directory,
                recursive: options?.recursive || false
            });
        } catch (error)
        {
            throw new Error(`Failed to remove directory ${pathStr}: ${error}`);
        }
    }
    rm(path: FSPathLike, options?: RmOptions): Promise<void>
    {
        return this.rmImpl(path, options);
    }

    private async rmImpl(path: FSPathLike, options?: RmOptions): Promise<void>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            // Check if it's a file or directory
            const stat = await Filesystem.stat({
                path: pathStr,
                directory: directory
            });

            if (stat.type === 'file')
            {
                await Filesystem.deleteFile({
                    path: pathStr,
                    directory: directory
                });
            } else if (stat.type === 'directory')
            {
                await Filesystem.rmdir({
                    path: pathStr,
                    directory: directory,
                    recursive: options?.recursive || false
                });
            }
        } catch (error)
        {
            if (options?.force)
            {
                // Ignore errors if force is true
                return;
            }
            throw new Error(`Failed to remove ${pathStr}: ${error}`);
        }
    }
    stat(path: FSPathLike, opts?: StatOptions & { bigint?: false }): Promise<Stats>;
    stat(path: FSPathLike, opts: StatOptions & { bigint: true }): Promise<Stats<bigint>>;
    stat(path: FSPathLike, opts?: StatOptions): Promise<Stats | Stats<bigint>>;
    stat(path: FSPathLike, opts?: StatOptions): Promise<Stats | Stats<bigint>>
    {
        return this.statImpl(path, opts);
    }

    private async statImpl(path: FSPathLike, opts?: StatOptions): Promise<Stats | Stats<bigint>>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            const result = await Filesystem.stat({
                path: pathStr,
                directory: directory
            });

            const statResult = {
                name: result.name || pathStr.split('/').pop() || '',
                parentPath: new URL(pathStr, this.root),
                get isFile() { return result.type === 'file'; },
                get isDirectory() { return result.type === 'directory'; },
                get isBlockDevice() { return false; },
                get isCharacterDevice() { return false; },
                get isSymbolicLink() { return false; },
                get isFIFO() { return false; },
                get isSocket() { return false; },
                size: opts?.bigint ? BigInt(result.size) : result.size,
                atimeMs: opts?.bigint ? BigInt(0) : 0,
                mtimeMs: opts?.bigint ? BigInt(result.mtime) : result.mtime,
                ctimeMs: opts?.bigint ? BigInt(0) : 0,
                birthtimeMs: opts?.bigint ? BigInt(result.ctime || 0) : (result.ctime || 0),
                atime: new Date(0),
                mtime: new Date(result.mtime),
                ctime: new Date(0),
                birthtime: new Date(result.ctime || 0),
            };

            return statResult as Stats | Stats<bigint>;
        } catch (error)
        {
            throw new Error(`Failed to stat ${pathStr}: ${error}`);
        }
    }
    truncate(path: FSPathLike, len?: number): Promise<void>
    {
        return this.truncateImpl(path, len);
    }

    private async truncateImpl(path: FSPathLike, len?: number): Promise<void>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            // Read the current file content
            const currentContent = await Filesystem.readFile({
                path: pathStr,
                directory: directory,
                encoding: Encoding.UTF8
            });

            // Truncate the content
            let truncatedData: string;
            if (typeof currentContent.data === 'string')
            {
                truncatedData = len !== undefined ? currentContent.data.substring(0, len) : '';
            } else
            {
                // For binary data, we can't easily truncate, so this is a limitation
                throw new Error('Truncation of binary files is not supported');
            }

            // Write back the truncated content
            await Filesystem.writeFile({
                path: pathStr,
                data: truncatedData,
                directory: directory,
                encoding: Encoding.UTF8
            });
        } catch (error)
        {
            throw new Error(`Failed to truncate ${pathStr}: ${error}`);
        }
    }
    unlink(path: FSPathLike): Promise<void>
    {
        return this.unlinkImpl(path);
    }

    private async unlinkImpl(path: FSPathLike): Promise<void>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            await Filesystem.deleteFile({
                path: pathStr,
                directory: directory
            });
        } catch (error)
        {
            throw new Error(`Failed to delete file ${pathStr}: ${error}`);
        }
    }
    utimes(path: FSPathLike, atime: string | number | Date, mtime: string | number | Date): Promise<void>
    {
        return this.utimesImpl(path, atime, mtime);
    }

    private async utimesImpl(path: FSPathLike, atime: string | number | Date, mtime: string | number | Date): Promise<void>
    {
        // Capacitor doesn't support updating file times directly
        // This is a no-op for now
        // In a real implementation, you might need to use native code or accept this limitation
        console.warn('utimes is not supported by Capacitor Filesystem API');
    }

    watch(filename: FSPathLike, options?: { encoding?: BufferEncoding; recursive?: boolean; }): Promise<any>
    {
        return this.watchImpl(filename, options);
    }

    private async watchImpl(filename: FSPathLike, options?: { encoding?: BufferEncoding; recursive?: boolean; }): Promise<any>
    {
        // Capacitor doesn't support file watching
        // Return a no-op watcher
        return {
            close: () => Promise.resolve(),
            on: () => { },
            off: () => { }
        };
    }
    writeFile(path: FSPathLike, data: unknown, options?: { mode?: number; encoding?: BufferEncoding | 'json'; }): Promise<void>
    {
        return this.writeFileImpl(path, data, options);
    }

    private async writeFileImpl(path: FSPathLike, data: unknown, options?: { mode?: number; encoding?: BufferEncoding | 'json'; }): Promise<void>
    {
        const pathStr = this.resolvePath(path);
        const directory = this.getDirectoryFromPath(pathStr);

        try
        {
            let dataStr: string;
            if (options?.encoding === 'json')
            {
                dataStr = JSON.stringify(data);
            } else if (typeof data === 'string')
            {
                dataStr = data;
            } else
            {
                dataStr = data as string;
            }

            await Filesystem.writeFile({
                path: pathStr,
                data: dataStr,
                directory: directory,
                encoding: options?.encoding === 'json' ? Encoding.UTF8 : Encoding.UTF8,
                recursive: true
            });
        } catch (error)
        {
            throw new Error(`Failed to write file ${pathStr}: ${error}`);
        }
    }
    chroot(root: FSPathLike): void
    {
        const rootPath = typeof root === 'string' ? root : root instanceof URL ? root.pathname : root.path.pathname;
        this.root = new URL(rootPath, this.root);
    }

    newChroot(root: FSPathLike): FileSystemProvider<VirtualFileHandle<FS>>
    {
        const rootPath = typeof root === 'string' ? root : root instanceof URL ? root.pathname : root.path.pathname;
        const newRoot = new URL(rootPath, this.root);
        return new FS(newRoot, this.readonly);
    }
    isFileHandle(x: any): x is VirtualFileHandle<FS>
    {
        return x instanceof VirtualFileHandle;
    }

    glob(pattern: string | string[], options?: { withFileTypes?: false }): AsyncIterable<URL>;
    glob(pattern: string | string[], options: { withFileTypes: true }): AsyncIterable<FileEntry<string>>;
    glob(pattern: string | string[], options?: { withFileTypes?: boolean }): AsyncIterable<URL> | AsyncIterable<FileEntry<string>>;
    glob(pattern: string | string[], options?: { withFileTypes?: boolean }): AsyncIterable<URL> | AsyncIterable<FileEntry<string>>
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }

}

fsHandler.useProtocol('capacitor', (url) =>
{
    return Promise.resolve(new FS(url, false));
})
