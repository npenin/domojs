import { ProxyConfiguration } from "@akala/config";
import Configuration from "./configuration";

export interface LibraryState
{
    config: ProxyConfiguration<Configuration>
}