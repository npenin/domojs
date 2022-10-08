import { LibraryState } from "../../state";

export default async function listLibraries(this: LibraryState)
{
    return Object.keys(this.config.libraries.extract())
}