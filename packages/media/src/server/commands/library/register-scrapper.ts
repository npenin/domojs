import { Container } from "@akala/commands";
import Configuration, { ScrapperConfiguration } from "../../configuration";

export default async function registerScrapper(container: Container<Configuration>, remote: Container<void>, type: string, scrapper: ScrapperConfiguration)
{
    container.state.scrappers[type].push(scrapper);
    container.register({ ...scrapper, processor: remote.processor });
}