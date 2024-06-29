import { Container } from "@akala/commands";
import { ProxyConfiguration } from "@akala/config";
import { FsProvider, fsHandler } from '@domojs/media'
import State from "../state.js";
import { FileSystemEntry, WriteOptions } from "@domojs/media/src/server/commands/processFolder.js";
import { Writable, Readable } from "stream";

export default function (container: Container<State>, rootConfig: ProxyConfiguration<object>)
{

    if (!this)
    {
        let config: State = rootConfig.get('@akala/media-crunchyroll');
        if (!config)
        {
            rootConfig.set('@akala/media-crunchyroll', { locales: {} });
            config = rootConfig.get('@akala/media-crunchyroll');
        }
        container.state = config;
    }

    class CrunchyRollFsProvider implements FsProvider
    {
        readonly root: URL;
        constructor()
        {
            this.root = new URL('crunchyroll://');
        }
        readdir(url: string | URL): Promise<FileSystemEntry[]>
        {
            throw new Error("Method not implemented.");
        }
        readFile(url: string | URL): Promise<Buffer>;
        readFile(url: string | URL, encoding: BufferEncoding): Promise<string>;
        readFile(url: unknown, encoding?: unknown): Promise<string> | Promise<Buffer>
        {
            throw new Error("Method not implemented.");
        }
        writeFile(url: string | URL, content: string | Buffer, options: WriteOptions): Promise<void>
        {
            throw new Error("Method not implemented.");
        }
        deleteFile(url: string | URL): Promise<void>
        {
            throw new Error("Method not implemented.");
        }
        createWriteStream(url: string | URL, options: WriteOptions): Writable
        {
            throw new Error("Method not implemented.");
        }
        createReadStream(url: string | URL): Readable
        {
            throw new Error("Method not implemented.");
        }
        get writable(): boolean
        {
            throw new Error("Method not implemented.");
        }
        getEntry(url: string | URL): Promise<FileSystemEntry>
        {
            throw new Error("Method not implemented.");
        }
        resolve(path: string | URL): URL
        {
            throw new Error("Method not implemented.");
        }
        move(source: string | URL, target: string | URL): Promise<void>
        {
            throw new Error("Method not implemented.");
        }

    }

    fsHandler.useProtocol('crunchyroll', async (url, res) =>
    {
        return { ...res, provider: new CrunchyRollFsProvider() };
    })
}