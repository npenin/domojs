import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';
import scrap from './scrap.js';

export default async function listScrapper(this: LibraryState, type?: string)
{
    if (type)
        return this.scrappers[type];
    return this.scrappers;
}