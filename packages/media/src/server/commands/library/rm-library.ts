import { LibraryConfiguration } from "../../configuration";
import { LibraryState } from "../../state";

export default async function rmLibrary(this: LibraryState, name: string, path: string)
{
    this.config.libraries.set(name, null);
    this.config.commit();
}