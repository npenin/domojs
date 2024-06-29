import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';
import scrap from './scrap.js';

export default async function addScrapper(this: LibraryState, name: string, organizer: string)
{
    var config = this.libraries[name];
    if (!config)
    {
        this.libraries.set(name, { paths: [], scrappers: [], organizers: [] });
        config = this.libraries[name];
    }
    if (!config.organizers)
        config.organizers = [];
    config.organizers.push(organizer);
    await config.commit();
}