import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';
import scrap from './scrap.js';

export default async function addScrapper(this: LibraryState, name: string, scrapperType: string)
{
    var config = this.config.libraries[name];
    if (!config)
    {
        this.config.libraries.set(name, { paths: [], scrappers: [] });
        config = this.config.libraries[name];
    }
    config.scrappers.push(scrapperType);
    await config.commit();
}