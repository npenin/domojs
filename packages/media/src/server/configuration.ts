import { Metadata } from '@akala/commands';
import CoreConfiguration from '@akala/config'

export default class Configuration extends CoreConfiguration
{
    get libraries(): LibrariesConfiguration { return this.get<LibrariesConfiguration>('libraries'); }
    set libraries(value: LibrariesConfiguration) { this.set('libraries', value); }
    get scrappers(): ScrappersConfiguration { return this.get<ScrappersConfiguration>('scrappers'); }
    set scrappers(value: ScrappersConfiguration) { this.set('scrappers', value); }
}

export interface LibrariesConfiguration
{
    [key: string]: LibraryConfiguration
}

export interface LibraryConfiguration
{
    paths: string[];
    scappers: string[];
}

export interface ScrappersConfiguration
{
    music: ScrapperConfiguration[];
    video: ScrapperConfiguration[];
}
export interface ScrapperConfiguration extends Metadata.Command
{
    priority: number;
}