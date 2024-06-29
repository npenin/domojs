import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';

export default async function setIndexFolder(this: LibraryState, path: string)
{
    this.indexFolder = path;
    await this.commit();
}