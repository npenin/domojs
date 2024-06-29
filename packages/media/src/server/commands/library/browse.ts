import { Container } from '@akala/commands';
import Configuration from '../../configuration.js';
import { LibraryState } from '../../state.js';
import * as process from '../processFolder.js';


export default function (this: LibraryState, container: Container<Configuration>, source: string, type: 'music' | 'video', name?: string, season?: number, episode?: number, album?: string, artist?: string)
{
    var libs = this.libraries;
    return process.processSource(source, this, container, type, libs[source].scrappers, null, false, { name, season, episode, album, artist });
}