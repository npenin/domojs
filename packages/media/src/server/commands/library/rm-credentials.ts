import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';

export default async function rmCredentials(this: LibraryState, url: string)
{
    var config = this.vault;
    if (config)
    {
        if (config.has(url))
        {
            config.delete(url);
            await config.commit();
            return true;
        }
    }
    return false;
}