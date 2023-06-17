import { ProxyConfiguration } from "@akala/config";
import Configuration, { ScrappersConfiguration } from './configuration.js';

export interface LibraryState
{
    config: ProxyConfiguration<Configuration>;
    scrappers: ScrappersConfiguration;
}