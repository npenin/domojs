import { LibraryState } from '../../state.js';

export default async function listLibraries(this: LibraryState)
{
    return Object.keys(this.libraries.extract())
}