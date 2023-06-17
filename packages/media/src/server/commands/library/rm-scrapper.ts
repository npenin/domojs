import { LibraryConfiguration } from '../../configuration.js';
import { LibraryState } from '../../state.js';

export default async function rmFolder(this: LibraryState, name: string, path: string)
{
    var config = this.config.libraries[name];
    if (config)
    {
        const indexOfPath = config.paths.indexOf(path);
        if (indexOfPath > -1)
        {
            config.paths.splice(indexOfPath, 1);
            await config.commit();
            return true;
        }
    }
    return false;
}