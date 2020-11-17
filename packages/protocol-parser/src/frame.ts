import { FrameDescription, frameTypeLength, write, ComplexFrameDescription, read, SubFrameDescription } from './index';


export class Frame<T> {
    constructor(private frame: FrameDescription<T>[], private prepare?: (message: T) => void)
    {
    }

    public write(message: T)
    {
        if (this.prepare)
            this.prepare(message);
        var buffers: Buffer[] = [];
        let offset = 0;
        let buffer: Buffer;
        this.frame.forEach((frame, frameIndex) =>
        {

            var type = frame.type;
            if (type instanceof Function)
                type = type(message);

            var length = frameTypeLength(type);
            if (frame.optional)
                return;
            if (length > -1)
            {
                if (offset > 0 || Math.ceil(length) != length + offset)
                {
                    if (offset == 0)
                        buffer = Buffer.alloc(Math.ceil(length));

                    else
                    {
                        let newBuffer = Buffer.alloc(Math.ceil(length + offset));
                        buffer.copy(newBuffer);
                        buffer = newBuffer;
                    }
                    write(buffer, message[frame.name], frame, this.frame, offset);
                    offset += length;
                }

                else
                {
                    buffer = Buffer.alloc(length);
                    write(buffer, message[frame.name], frame, this.frame, offset);
                    offset = 0;
                }
            }

            else
            {
                var l = (frame as ComplexFrameDescription<T>).length;
                if (typeof l == 'number')
                    if (l > 0)
                        buffer = write(null, message, frame, this.frame, offset, l);
                    else //if (0 - l < frameIndex)
                    {
                        console.log(this.frame[frameIndex + l].name);
                        buffer = write(null, message, frame, this.frame, offset, message[this.frame[frameIndex + l].name] as unknown as number);
                    }
                else
                    buffer = write(null, message, frame, this.frame, offset);
            }

            if (buffers[buffer.length - 1] !== buffer && offset == Math.ceil(offset))
                buffers.push(buffer);
        });
        if (offset != Math.ceil(offset))
            buffers.push(buffer);

        return Buffer.concat(buffers);
    }
    public read(buffer: Buffer, instance: T, offset = 0, subByteOffset = 0)
    {
        // console.log(this.frame);
        this.frame.forEach((frame, frameIndex) =>
        {
            var type = frame.type;
            if (type instanceof Function)
            {
                type = type(instance, buffer);
                frame = Object.assign({}, frame, { type });
            }

            var length = frameTypeLength(type);
            if (length > -1)
            {
                instance[frame.name] = <any>read(buffer, frame, offset, this.frame, subByteOffset);
                offset += length;
            }
            else if (frame.type == 'subFrame')
            {
                instance[frame.name] = <any>{};
                if (!frame.choose.subFrame[instance[frame.choose.discriminator] as unknown as number])
                    throw new Error('Unsupported type ' + instance[frame.choose.discriminator]);

                offset = (frame as SubFrameDescription<T, any>).choose.subFrame[instance[(frame as SubFrameDescription<T, any>).choose.discriminator] as any].read(buffer, <any>instance[frame.name], offset);
            }

            else
            {
                var l = (frame as ComplexFrameDescription<T>).length;

                if (typeof l == 'number')
                    if (l < 0)
                    {
                        if (0 - l > frameIndex)
                            throw new Error('Cannot read length after content');
                        length = instance[this.frame[frameIndex + l].name] as unknown as number;
                    }
                    else
                        length = l;

                instance[frame.name] = <any>read(buffer, frame, offset, this.frame, length);
                offset += length;
            }
        });
        return offset;
    }
}
