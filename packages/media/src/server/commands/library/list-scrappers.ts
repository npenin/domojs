import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';
import scrap from './scrap.js';

export default async function listScrapper(this: LibraryState, key?: string, global?: boolean)
{
    if (!global)
        return this.libraries[key].scrappers
    if (key)
        return this.scrappers[key];
    return this.scrappers;
}