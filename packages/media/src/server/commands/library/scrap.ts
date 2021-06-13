import { Container } from "@akala/commands";
import { eachAsync } from "@akala/core";
import { Media } from "../../../../metadata";
import Configuration from "../../configuration";

export default async function scrap(container: Container<Configuration>, media: Media)
{
    container.state.scrappers[media.type].sort((a, b) => a.priority - b.priority);
    return eachAsync(container.state.scrappers[media.type], async (scrapper) => media = await container.dispatch(scrapper, media));
}