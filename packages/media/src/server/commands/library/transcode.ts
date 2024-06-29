import { fsHandler } from '../processFolder.js'
import { basename, extname, join } from 'path'
import { LibraryState } from '../../state.js';
import { readFile, writeFile } from 'fs/promises'
import { Media } from '../../index.js';
import { eachAsync } from '@akala/core';
import cp from 'child_process'
import localFs from 'fs'

export default async function transcode(this: LibraryState, library: string, outFormat: string, inFormat?: string, type?: string): Promise<void>
{
    if (inFormat[0] !== '.')
        inFormat = '.' + inFormat;
    if (outFormat[0] !== '.')
        outFormat = '.' + outFormat;
    if (!type)
        return ['music', 'video'].reduce((previous, type) => previous.then(() => transcode.call(this, library, outFormat, inFormat, type)), Promise.resolve())
    else
    {
        try
        {
            const index = await readFile(join(this.indexFolder, `index-${library}-${type}.json`), 'utf-8').then(x => JSON.parse(x) as Media[]);
            await transcodeInternal(this, index, outFormat, inFormat, type);
            await writeFile(join(this.indexFolder, `index-${library}-${type}.json`), JSON.stringify(index));
        }
        catch (e)
        {
            if (e.code == 'ENOENT')
                return;
            throw e;
        }
    }
}

function transcodeInternal(config: LibraryState, index: Media[], outFormat: string, inFormat?: string, type?: string)
{
    return eachAsync(index, async (current) =>
    {
        if (type && current.type !== type)
            return;
        let currentInFormat = inFormat;
        if (!currentInFormat)
        {
            currentInFormat = extname(current.path as string);
            if (currentInFormat == outFormat)
                return;
        }
        else if (extname(current.path as string) !== currentInFormat || currentInFormat == outFormat)
            return;
        console.log(`transcoding ${current.path}`);
        const fileUrl = new URL(current.path);
        const { provider: fs } = await fsHandler.process(new URL(fileUrl.pathname.substring(0, fileUrl.pathname.indexOf('/', 1)), fileUrl), { config });

        try
        {
            const newFilePath = new URL(basename(current.path as string, currentInFormat) + outFormat, current.path);
            await new Promise<void>((resolve, reject) =>
            {
                const ffmpeg = cp.spawn('ffmpeg', ["-i", '-', 'out.mp4'], { stdio: 'pipe' });
                // ffmpeg.stdout.pipe(fs.createWriteStream(newFilePath).on('error', reject));
                ffmpeg.stderr.pipe(process.stderr);
                fs.createReadStream(fileUrl).on('error', reject).pipe(ffmpeg.stdin);
                ffmpeg.on('exit', (code) => code == 0 ? resolve() : reject())
            })
            await new Promise<void>((resolve, reject) =>
            {
                localFs.createReadStream('out.mp4').pipe(fs.createWriteStream(newFilePath, { overwrite: false })).on('finish', () =>
                {
                    localFs.rm('out.mp4', (err) => err ? reject(err) : resolve())
                });
            });
            console.log('deleting ' + fileUrl);
            await fs.deleteFile(fileUrl);

            console.log('done')
            current.path = newFilePath.href;

        }
        catch (e)
        {
            console.error(e);
        }
    }, true)

}