import { EventEmitter, Queue, logger, IsomorphicBuffer } from '@akala/core';
import { Socket } from 'net';
import { Duplex } from 'stream';

export const log = logger('domojs:devices');

export abstract class Gateway<T extends object> extends EventEmitter<T>
{
    private static readonly emptyBuffer = new IsomorphicBuffer(0);

    private chunk: IsomorphicBuffer;
    private _isOpen = false;
    public get isOpen() { return this._isOpen; };
    protected readonly sendQueue: Queue<{ buffer: IsomorphicBuffer; callback: (err) => void; }> = new Queue((message, next) =>
    {
        if (this._isOpen)
        {
            if ('drain' in this.wire)
            {
                this.wire.write(message.buffer.toArray());
                this.wire.drain(message.callback);
            }

            else
                this.wire.write(message.buffer.toArray(), message.callback);
        }
        next(this._isOpen);
    });

    public stop()
    {
        this._isOpen = false;
        return new Promise<void>((resolve) => { this.wire.end(resolve); });
    }

    protected abstract splitBuffer(buffer: IsomorphicBuffer): IsomorphicBuffer[];
    protected abstract isCompleteFrame(buffer: IsomorphicBuffer): boolean;
    protected abstract processFrame(buffer: IsomorphicBuffer): void | Promise<void>;

    private readonly queue: Queue<IsomorphicBuffer> = new Queue((buffer, next) =>
    {
        log.debug('processing queue');
        if (buffer == Gateway.emptyBuffer)
        {
            buffer = this.chunk;
            this.chunk = undefined;

            log.debug('splitting buffer', buffer);

            const buffers = this.splitBuffer(buffer);
            if (buffers.length > 1)
            {
                for (let i = 0; i < buffers.length; i++)
                    this.queue.enqueue(buffers[i]);
                next(true);
                return;
            }

            if (!this.isCompleteFrame(buffer))
            {
                this.chunk = buffer;
                next(true);
                return;
            }
        }

        log.debug(buffer);
        (async () =>
        {
            try
            {
                if (buffer.length >= 0)
                    await this.processFrame(buffer);
                next(true);
            }
            catch (e)
            {
                log.error(e);
                next(true);
            }
        })();
    });

    public constructor(private wire: Socket | Duplex & { close(cb: (err?: any) => void); drain?(cb: (err?: any) => void); flush?(cb: (err?: any) => void); }, isSocketAlreadyOpen?: boolean)
    {
        super();

        this.replaceClosedSocket(wire, isSocketAlreadyOpen);
    }

    public replaceClosedSocket(wire: Socket | Duplex & { close(cb: (err?: any) => void); drain?(cb: (err?: any) => void); flush?(cb: (err?: any) => void); }, isSocketAlreadyOpen?: boolean)
    {
        if (this.wire?.writable && this.wire != wire)
            throw new Error('The existing wire is still online');

        this.wire = wire;
        this.wire.on('error', function (err)
        {
            log.error(err);
        });
        this.wire.on('open', () =>
        {
            this._isOpen = true;
            this.sendQueue.process();
        });
        this.wire.on('connect', () =>
        {
            this._isOpen = true;
            this.sendQueue.process();
        });
        this.wire.on('data', (buffer: Buffer) =>
        {
            if (typeof (this.chunk) != 'undefined')
                this.chunk = IsomorphicBuffer.concat([this.chunk, IsomorphicBuffer.fromBuffer(buffer)]);

            else
                this.chunk = IsomorphicBuffer.fromBuffer(buffer);

            this.queue.enqueue(Gateway.emptyBuffer);
        });
        if (isSocketAlreadyOpen)
            this._isOpen = true;
    }

    public get started() { return this._started; }

    async start()
    {
        this._started = true;
    }

    private _started = false;

    protected sqnce: number = 0;

    public close(): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            if ('close' in this.wire)
                this.wire.close(function (err)
                {
                    this._isOpen = false;
                    if (err)
                        reject(err);

                    else
                        resolve();
                });

            else
                this.wire.end(() =>
                {
                    this._isOpen = false;
                    resolve();
                });
        });
    }

    protected flush()
    {
        return new Promise<void>((resolve, reject) =>
        {
            if ('flush' in this.wire)
                this.wire.flush(function (err)
                {
                    if (err)
                        reject(err);

                    else
                        resolve();
                });

            else
                resolve();
        });
    }
}
