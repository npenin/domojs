import { ProxyConfiguration } from "@akala/config";
import Configuration, { ScrappersConfiguration } from "./configuration";

export interface LibraryState
{
    config: ProxyConfiguration<Configuration>;
    scrappers: ScrappersConfiguration;
}