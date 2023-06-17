import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';

export default async function rmLibrary(this: LibraryState, name: string, path: string)
{
    this.config.libraries.set(name, null);
    this.config.commit();
}