import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';

export default async function (this: LibraryState, type?: string)
{
    if (type)
        return this.organizers[type];
    return this.organizers;
}