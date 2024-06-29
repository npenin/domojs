import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';

export default async function rmCredentials(this: LibraryState, host: string)
{
    var config = this.vault;
    if (config)
    {
        if (config.has(host))
        {
            config.delete(host);
            await config.commit();
            return true;
        }
    }
    return false;
}