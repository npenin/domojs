import { Container } from "@akala/commands";
import Configuration, { ScrapperConfiguration } from "../../configuration";

export default async function registerScrapper(this: Configuration, container: Container<Configuration>, remote: Container<void>, type: string, scrapper: ScrapperConfiguration)
{
    this.scrappers[type].push(scrapper);
    container.register({ ...scrapper, processor: remote.processor });
}