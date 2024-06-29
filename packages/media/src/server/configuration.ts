import { Metadata } from '@akala/commands';
import CoreConfiguration from '@akala/config'

export default interface Configuration extends CoreConfiguration
{
    libraries: LibrariesConfiguration;
    scrappers: ScrappersConfiguration;
    organizers: ScrappersConfiguration;
    vault: Record<string, { username: string, password: string }>;
    indexFolder: string;
}

export type Vault = Record<string, { username: string, password: string }>;

export interface LibrariesConfiguration
{
    [key: string]: LibraryConfiguration
}

export interface LibraryConfiguration
{
    paths: string[];
    scrappers: string[];
    organizers: string[];
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