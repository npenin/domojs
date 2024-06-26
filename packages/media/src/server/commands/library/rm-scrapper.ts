import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';
import scrap from './scrap.js';

export default async function addScrapper(this: LibraryState, name: string, scrapperType: string)
{
    var config = this.libraries[name];
    if (!config)
        return;

    const indexOfScrapper = config.scrappers.indexOf(scrapperType);
    if (!~indexOfScrapper)
        config.scrappers.splice(indexOfScrapper, 1);
    await config.commit();
}