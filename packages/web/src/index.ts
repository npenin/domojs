/// <reference types="vite/client" />
import { bootstrap } from '@akala/web-ui'
import { bootstrapModule, DataContext, HotKeyTrigger, outletDefinition, OutletService, Scope, serviceModule } from '@akala/client'
import '@akala/core';
import './index.css';
import Home from './pages/home/home.js';
import { configure, connect, Container } from '@akala/commands/browser';
import './components/ibm-icon/ibm-icon.js'
import './components/device-selector/device-button-selector.js'
import './components/room-card/room-card.js'
import './swipe-down.js'

import searchIcon from '@carbon/icons/es/search/24.js'
import bellIcon from '@carbon/icons/es/notification/24.js'
import userIcon from '@carbon/icons/es/user/24.js'
import lightOnIcon from '@carbon/icons/es/light--filled/24.js'
import lightOffIcon from '@carbon/icons/es/light/24.js'
import temperatureIcon from '@carbon/icons/es/temperature/24.js'
import thisSideUpIcon from '@carbon/icons/es/this-side-up/24.js'
import deskAdjustableIcon from '@carbon/icons/es/desk--adjustable/24.js'
import Device from './pages/device/device.js';
import fsHandler, { FileHandle, FileSystemProvider, MakeDirectoryOptions, OpenFlags, OpenStreamOptions, PathLike, RmDirOptions, RmOptions, Stats, FileEntry, VirtualFileHandle, GlobOptions, GlobOptionsWithFileTypes, GlobOptionsWithoutFileTypes } from '@akala/fs';
import { allProperties, AsyncEventBus, asyncEventBuses, base64, ErrorWithStatus, Formatter, formatters, HttpStatusCode, IsomorphicBuffer, ObservableObject, watcher, WatcherFormatter } from '@akala/core';
import { MqttEvents } from '@domojs/mqtt';
import Configuration from '@akala/config';
import { BridgeConfiguration, ClusterDefinition, ClusterIds, EndpointProxy, MatterClusterIds, NonWatchableRemoteClusterInstance, registerNode, RemoteClusterInstance } from '@domojs/devices';
// import { dirname } from 'path';
import type { SidecarConfiguration } from '@akala/sidecar';
import type { Container as pmContainer } from '@akala/pm'

formatters.register('log', class implements Formatter<unknown>
{
    format(value: unknown)
    {
        console.log(value);
        return value;
    }

})

formatters.register('clusterIds', class implements Formatter<ClusterIds[]>
{
    format(value: EndpointProxy)
    {
        return Object.values(value?.clusters || {}).map(c => c.target.id);
    }
})
formatters.register('entries', class extends WatcherFormatter implements Formatter<unknown[]>
{
    format(value: object)
    {
        if (ObservableObject.isWatched(value))
            (value[watcher] as ObservableObject<any>).on(allProperties, () => this.watcher?.emit('change', value))
        return Object.entries(value || {});
    }
})
formatters.register('values', class implements Formatter<unknown[]>
{
    format(value: object)
    {
        return Object.values(value || {});
    }
})

formatters.register('clusterName', class implements Formatter<string>
{
    format(value: NonWatchableRemoteClusterInstance<any>)
    {
        return ClusterIds[value.id] || MatterClusterIds[value.id];
    }
})

formatters.register('clusters', class implements Formatter<RemoteClusterInstance<any>[]>
{
    format(value: EndpointProxy)
    {
        return Object.values(value?.clusters || []) as any;
    }
})
formatters.register('clusterDefs', class implements Formatter<ClusterDefinition<any>[]>
{
    format(value: EndpointProxy)
    {
        return Object.values(value?.clusters || []).map(c => c.target['definition']);
    }
})
formatters.register('clusterDef', class implements Formatter<ClusterDefinition<any>>
{
    format(value: any)
    {
        const def = value?.definition as ClusterDefinition<any>;
        if (ObservableObject.isWatched(def.attributes))
        {
            def.attributes[watcher].maxListeners = Number.POSITIVE_INFINITY;
        }
        return def;
    }
})

bootstrapModule.activate([[serviceModule, OutletService.InjectionToken]], (outlet: OutletService) =>
{
    const abort = new AbortController();

    const container = new Container('hotkeys', undefined);
    container.register(configure({
        keyboard: {
            shortcuts: [
                'Numpad0',
                'Digit0',
            ]
        }
    })(() =>
    {
        location.reload();
    }, 'reload'));

    container.register(configure({
        keyboard: {
            shortcuts: [
                'Numpad1',
                'Digit1',
            ]
        }
    })(() =>
    {
        document.body.classList.toggle('dark');
    }, 'dark'));

    container.attach(HotKeyTrigger, { element: document.body });
    bootstrapModule.register('container', container);


    outlet.use('/', 'main', Home[outletDefinition]);
    outlet.use('/device/{fabric}/{endpointId}', 'main', Device[outletDefinition]);
})

fsHandler.useProtocol('localstorage', async url => new (class implements FileSystemProvider
{
    readonly: boolean = false;
    root: URL = new URL('localstorage:/');

    private normalizePath(path: PathLike<FileHandle>, unsafe?: boolean): Promise<string>
    {
        if (this.isFileHandle(path))
            return this.normalizePath(path.path);
        const url = new URL(path, this.root);
        if (!unsafe && !url.toString().startsWith(this.root.toString()))
            return Promise.reject(new ErrorWithStatus(HttpStatusCode.Forbidden, `The path ${path} is not in scope of ${this.root}`));

        return Promise.resolve(url.pathname);
    }

    toImportPath(path: PathLike<never>, options?: { withSideEffects?: boolean; }): string
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    openReadStream(path: PathLike<FileHandle>, options?: OpenStreamOptions | OpenStreamOptions['encoding']): ReadableStream
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    openWriteStream(path: PathLike<FileHandle>, options?: OpenStreamOptions | OpenStreamOptions['encoding']): WritableStream
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    async access(path: PathLike<FileHandle>, mode?: OpenFlags): Promise<void>
    {
        const normalizedPath = await this.normalizePath(path);
        if (localStorage.getItem(normalizedPath) === null)
            throw new ErrorWithStatus(404, `no such file or directory, access '${path}'`);
    }
    async copyFile(src: PathLike<FileHandle>, dest: string | URL, mode?: number): Promise<void>
    {
        await this.writeFile(dest, await this.readFile(src));
    }
    async cp(src: PathLike<FileHandle>, dest: string | URL, options?: { force?: boolean; recursive?: boolean; }): Promise<void>
    {
        await this.writeFile(dest, await this.readFile(src));
    }
    mkdir(path: PathLike, options?: MakeDirectoryOptions): Promise<void>
    {
        return Promise.resolve();
    }
    symlink(source: PathLike<FileHandle>, target: PathLike, type?: 'dir' | 'file' | 'junction'): Promise<void>
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    async open(path: PathLike, flags: OpenFlags): Promise<FileHandle>
    {
        return new VirtualFileHandle(this, new URL(await this.normalizePath(path), this.root));
    }
    opendir(path: PathLike, options?: { bufferSize?: number; encoding?: string; }): Promise<any>
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    readdir(path: PathLike, options?: { encoding?: Exclude<BufferEncoding, 'binary'> | null; withFileTypes?: false; }): Promise<string[]>;
    readdir(path: PathLike, options: { encoding: 'binary'; withFileTypes?: false; }): Promise<IsomorphicBuffer[]>;
    readdir(path: PathLike, options: { withFileTypes: true; }): Promise<FileEntry[]>;
    async readdir(path: PathLike, options?: { encoding?: BufferEncoding | null; withFileTypes?: boolean; }): Promise<string[] | IsomorphicBuffer[] | FileEntry[]>
    {
        const normalizedPath = await this.normalizePath(path);
        const prefix = normalizedPath ? normalizedPath + '/' : '';
        const children = new Set<string>();
        for (let i = 0; i < localStorage.length; i++)
        {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix))
            {
                const remaining = key.slice(prefix.length);
                const nextSlash = remaining.indexOf('/');
                const child = nextSlash === -1 ? remaining : remaining.slice(0, nextSlash);
                if (child)
                    children.add(child);
            }
        }
        const result = Array.from(children);
        if (options?.encoding === 'binary')
        {
            return result.map(name =>
            {
                const bytes = new Uint8Array(name.length);
                for (let i = 0; i < name.length; i++)
                    bytes[i] = name.charCodeAt(i);
                return new IsomorphicBuffer(bytes);
            });
        }
        else if (options && options.withFileTypes)
        {
            return result.map(name => ({
                name,
                parentPath: new URL(normalizedPath),
                isFile: !this.isDirectory(prefix + name),
                isDirectory: this.isDirectory(prefix + name),
                isBlockDevice: false,
                isCharacterDevice: false,
                isSymbolicLink: false,
                isFIFO: false,
                isSocket: false
            } as FileEntry<string>));
        }
        else
        {
            return result;
        }
    }
    readFile(path: PathLike<FileHandle>, options?: "binary" | { encoding?: "binary"; flag?: OpenFlags; }): Promise<IsomorphicBuffer>;
    readFile(path: PathLike<FileHandle>, options: BufferEncoding | { encoding: BufferEncoding; flag?: OpenFlags; }): Promise<string>;
    readFile<T>(path: PathLike<FileHandle>, options: { encoding: "json"; flag?: OpenFlags; } | "json"): Promise<T>;
    async readFile(path: PathLike<FileHandle>, options?: any): Promise<IsomorphicBuffer | string | any>
    {
        const normalizedPath = await this.normalizePath(path);
        const stored = localStorage.getItem(normalizedPath);
        if (stored === null)
            throw new ErrorWithStatus(404, `ENOENT: no such file or directory, open '${path}'`);

        if (options === 'binary' || (options && options.encoding === 'binary'))
        {
            return Promise.resolve(new IsomorphicBuffer(base64.base64DecToArr(stored)));
        }
        else if (options === 'json' || (options && options.encoding === 'json'))
        {
            return Promise.resolve(JSON.parse(stored));
        }
        // Default to string
        return Promise.resolve(stored);
    }
    async rename(oldPath: PathLike<FileHandle>, newPath: string | URL): Promise<void>
    {
        await this.copyFile(oldPath, newPath);
        await this.unlink(oldPath);
    }
    rmdir(path: PathLike, options?: RmDirOptions): Promise<void>
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    rm(path: PathLike, options?: RmOptions): Promise<void>
    {
        return this.unlink(path);
    }
    stat(path: PathLike<FileHandle>, opts?: { bigint?: false; }): Promise<Stats<number>>;
    stat(path: PathLike<FileHandle>, opts: { bigint: true; }): Promise<Stats<bigint>>;
    async stat(path: PathLike<FileHandle>, opts?: any): Promise<Stats<number> | Stats<bigint>>
    {
        const normalizedPath = await this.normalizePath(path);
        const stored = localStorage.getItem(normalizedPath);
        if (stored === null)
            throw new ErrorWithStatus(404, `no such file or directory, stat '${path}'`);

        const isDirectory = this.isDirectory(normalizedPath);
        const size = stored.length;
        const mtime = new Date();
        const atime = new Date();

        if (opts && opts.bigint)
        {
            return {
                size: BigInt(size),
                name: normalizedPath.substring(normalizedPath.lastIndexOf('/') + 1),
                parentPath: new URL('./', normalizedPath),
                mtime,
                mtimeMs: BigInt(mtime.getTime()),
                atime,
                atimeMs: BigInt(atime.getTime()),
                ctime: mtime,
                ctimeMs: BigInt(mtime.getTime()),
                birthtime: mtime,
                birthtimeMs: BigInt(mtime.getTime()),
                isDirectory,
                isFile: !isDirectory,
                isBlockDevice: false,
                isCharacterDevice: false,
                isSymbolicLink: false,
                isFIFO: false,
                isSocket: false,
                dev: 0n,
                ino: 0n,
                mode: 0o644,
                nlink: 1n,
                uid: 0n,
                gid: 0n,
                rdev: 0n,
                blksize: 4096n,
                blocks: 1n
            } as Stats<bigint>;
        }
        else
        {
            return {
                size,
                mtime,
                mtimeMs: mtime.getTime(),
                atime,
                atimeMs: atime.getTime(),
                name: normalizedPath.substring(normalizedPath.lastIndexOf('/') + 1),
                parentPath: new URL('./', normalizedPath),
                ctime: mtime,
                ctimeMs: mtime.getTime(),
                birthtime: mtime,
                birthtimeMs: mtime.getTime(),
                isDirectory,
                isFile: !isDirectory,
                isBlockDevice: false,
                isCharacterDevice: false,
                isSymbolicLink: false,
                isFIFO: false,
                isSocket: false,
                dev: 0,
                ino: 0,
                mode: 0o644,
                nlink: 1,
                uid: 0,
                gid: 0,
                rdev: 0,
                blksize: 4096,
                blocks: 1
            } as Stats<number>;
        }
    }

    private isDirectory(path: string): boolean
    {
        // Check if there are keys that start with path + '/'
        for (let i = 0; i < localStorage.length; i++)
        {
            const key = localStorage.key(i);
            if (key && key.startsWith(path + '/'))
                return true;
        }
        return false;
    }
    truncate(path: PathLike<FileHandle>, len?: number): Promise<void>
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    async unlink(path: PathLike<FileHandle>): Promise<void>
    {
        const normalizedPath = await this.normalizePath(path);
        if (localStorage.getItem(normalizedPath) === null)
            throw new ErrorWithStatus(404, `no such file or directory, unlink '${path}'`);
        localStorage.removeItem(normalizedPath);
    }
    utimes(path: PathLike<FileHandle>, atime: string | number | Date, mtime: string | number | Date): Promise<void>
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    watch(filename: PathLike<FileHandle>, options?: { encoding?: BufferEncoding; recursive?: boolean; }): Promise<any>
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    async writeFile(path: PathLike<FileHandle>, data: IsomorphicBuffer | string | ArrayBuffer | SharedArrayBuffer, options?: {
        mode?: number;
    }): Promise<void>
    {
        const normalizedPath = await this.normalizePath(path);
        let toStore: string;
        if (typeof data === 'string')
        {
            toStore = data;
        }
        else if (data instanceof ArrayBuffer || data instanceof SharedArrayBuffer)
        {
            // Convert to base64
            const bytes = new Uint8Array(data);
            let binary = '';
            for (let i = 0; i < bytes.byteLength; i++)
                binary += String.fromCharCode(bytes[i]);
            toStore = btoa(binary);
        }
        else if (data instanceof Uint8Array || (data as any).buffer)
        {
            // Assume IsomorphicBuffer or similar
            let binary = '';
            for (let i = 0; i < data.length; i++)
                binary += String.fromCharCode(data[i]);
            toStore = btoa(binary);
        }
        else
        {
            throw new Error('Unsupported data type');
        }
        localStorage.setItem(normalizedPath, toStore);
    }
    chroot(root: PathLike): void
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    newChroot(root: PathLike): FileSystemProvider<FileHandle>
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }
    isFileHandle(x: any): x is FileHandle
    {
        return x instanceof VirtualFileHandle;
    }
    glob(pattern: string | string[], options: GlobOptionsWithFileTypes): AsyncIterable<FileEntry>
    glob(pattern: string | string[], options?: GlobOptionsWithoutFileTypes): AsyncIterable<URL>
    glob(pattern: string | string[], options?: GlobOptions): AsyncIterable<URL> | AsyncIterable<FileEntry>
    {
        throw new ErrorWithStatus(HttpStatusCode.NotImplemented);
    }

})());

let mqtt: Promise<AsyncEventBus<MqttEvents>>;
bootstrapModule.activateAsync([], async () =>
{
    mqtt = asyncEventBuses.process<MqttEvents>(new URL(`mqtt+wss://${location.host}/mqtt`), { username: 'domojs-guest', password: 'domojs' }).then(mqtt => serviceModule.register('mqtt', mqtt));
    const config = await Configuration.load<SidecarConfiguration & BridgeConfiguration>('localstorage:///sidecar', true);

    const abortController = new AbortController();
    const pm = connect(new URL(`/pm`, window.location.href).href.replace(/^http/, 'ws'), abortController.signal) as Promise<Container<void> & pmContainer>;
    if (!config.pubsub?.transport)
    {
        if (!config.pubsub)
            config.set('pubsub', {});
        config.pubsub.transport = `mqtt+wss://${location.host}/mqtt`;

        pm.then(pm => registerNode(`browser/${crypto.randomUUID()}`, {
            config,
            abort: abortController.signal,
            pm: pm,
            sidecars: {
            } as any
        }, config, abortController.signal, true));

    }
});

bootstrapModule.readyAsync([], async () =>
{
    await mqtt;
})

DataContext.propagateProperties.push('icons');

await bootstrap(document.body, {
    icons: {
        search: searchIcon,
        bell: bellIcon,
        user: userIcon,
        lightOn: lightOnIcon,
        lightOff: lightOffIcon,
        temperature: temperatureIcon,
        shutterUp: thisSideUpIcon,
        shutterDown: { ...thisSideUpIcon, attrs: { ...thisSideUpIcon.attrs, transform: 'rotate(180)', } },
        windowCoveringLift: deskAdjustableIcon,
    },
} as any);
