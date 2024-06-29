import { LibraryState } from "../../state.js";
import { fsHandler } from "../processFolder.js";
import { pathToFileURL } from 'url'

export default async function addFolder(this: LibraryState, name: string, path: string) {
    var config = this.libraries[name];
    if (!config) {
        this.libraries.set(name, { paths: [], scrappers: [] });
        config = this.libraries[name];
    }
    const r = { provider: null, config: this };
    if (URL.canParse(path)) {
        const url = new URL(path);
        if (url.protocol.length == 2)
            path = pathToFileURL(path).toString();
        else {
            await fsHandler.process(url, r);
            if (!r.provider)
                throw new Error('No file system provider was found to add this folder.');
        }
    }
    else
        path = pathToFileURL(path).toString();
    config.paths.push(path);
    await config.commit();
}