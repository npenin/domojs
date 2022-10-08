import { LibraryConfiguration } from "../../configuration";
import { LibraryState } from "../../state";

export default async function addFolder(this: LibraryState, name: string, path: string)
{
    var config = this.config.libraries[name];
    if (!config)
    {
        this.config.libraries.set(name, { paths: [], scrappers: [] });
        config = this.config.libraries[name];
    }
    config.paths.push(path);
    await config.commit();
}