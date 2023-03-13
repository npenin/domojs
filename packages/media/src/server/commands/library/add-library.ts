import { LibraryConfiguration } from "../../configuration";
import { LibraryState } from "../../state";

export default async function addLibrary(this: LibraryState, name: string)
{
    var config = this.config.libraries[name];
    if (!config)
    {
        this.config.libraries.set(name, { paths: [], scrappers: [] });
        config = this.config.libraries[name];
    }
    await config.commit();
}