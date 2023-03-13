import { LibraryState } from "../../state";

export default async function listFolders(this: LibraryState, name: string)
{
    return this.config.libraries[name].paths;
}