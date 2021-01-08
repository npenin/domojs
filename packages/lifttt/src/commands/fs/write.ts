import * as fs from 'fs/promises';

export default async function write(file: string, data: string)
{
    return fs.writeFile(file, data);
}