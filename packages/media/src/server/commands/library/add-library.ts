import { LibraryState } from "../../state.js";

export default async function addLibrary(this: LibraryState, name: string)
{
    var config = this.libraries[name];
    if (!config)
    {
        this.libraries.set(name, { paths: [], scrappers: [] });
        config = this.libraries[name];
    }
    await config.commit();
}