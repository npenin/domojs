import { Metadata } from '@akala/commands';
import CoreConfiguration from '@akala/config'

export default interface Configuration extends CoreConfiguration
{
    libraries: LibrariesConfiguration;
    scrappers: ScrappersConfiguration;
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