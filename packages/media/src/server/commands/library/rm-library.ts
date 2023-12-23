import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';

export default async function rmLibrary(this: LibraryState, name: string, path: string)
{
    this.libraries.set(name, null);
    this.commit();
}