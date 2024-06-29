import { LibraryState } from '../../state.js';

export default async function (this: LibraryState, host?: string)
{
    if (host)
        return this.vault[host];
    return this.vault;
}