import { LibraryState } from "../../state.js";

export default async function addFolder(this: LibraryState, name: string, path: string)
{
    var config = this.libraries[name];
    if (!config)
    {
        this.libraries.set(name, { paths: [], scrappers: [] });
        config = this.libraries[name];
    }
    config.paths.push(path);
    await config.commit();
}