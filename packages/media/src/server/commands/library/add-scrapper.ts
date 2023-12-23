import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';
import scrap from './scrap.js';

export default async function addScrapper(this: LibraryState, name: string, scrapperType: string)
{
    var config = this.libraries[name];
    if (!config)
    {
        this.libraries.set(name, { paths: [], scrappers: [] });
        config = this.libraries[name];
    }
    config.scrappers.push(scrapperType);
    await config.commit();
}