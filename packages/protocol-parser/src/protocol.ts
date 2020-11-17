import { Frame } from './frame';
import { SubFrameDescription, FrameDescription, log } from './index';


export class Protocol<T> {
    private subFrameRegistration: {
        [key in keyof T]: SubFrameDescription<T, any>;
    } = {} as any;
    private frame: Frame<T>;

    constructor(frames: FrameDescription<T>[], prepare?: (message: T) => void)
    {
        this.frame = new Frame<T>(frames, prepare);
        for (var frame of frames)
        {
            if (frame.type === 'subFrame')
                this.subFrameRegistration[(frame as SubFrameDescription<T, any>).choose.discriminator] = frame as SubFrameDescription<T, any>;
        }
    }

    public register<U = {}>(name: keyof T, value: number, description: FrameDescription<U>[], prepare?: (message: U) => void)
    {
        if (typeof (this.subFrameRegistration[name]) == 'undefined')
            throw new Error('No sub frame is registered for ' + name);

        if (typeof (this.subFrameRegistration[name].choose.subFrame[value]) != 'undefined')
            throw new Error(`A sub frame is already registered at ${name} for the value ${value}`);

        this.subFrameRegistration[name].choose.subFrame[value] = new Frame<U>(description, prepare);
    }

    public read(buffer: Buffer): T
    {
        var result: T = {} as any;
        log(`reading ${buffer.toJSON().data}`);
        this.frame.read(buffer, result, 0);
        log(`read ${JSON.stringify(result)}`);
        return result;
    }

    public write(instance: T): Buffer
    {
        log(`writing ${JSON.stringify(instance)}`);
        var buffer = this.frame.write(instance);
        log(`written ${buffer.toJSON().data}`);
        return buffer;
    }
}
