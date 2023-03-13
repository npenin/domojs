import { Container } from '@akala/commands';
import Configuration from '../../configuration';
import { LibraryState } from '../../state';
import * as process from '../processFolder';


export default function (this: LibraryState, container: Container<Configuration>, source: string, type: 'music' | 'video', name?: string, season?: number, episode?: number, album?: string, artist?: string)
{
    var libs = this.config.libraries;
    return process.processSource(libs[source].paths, container, type, libs[source].scrappers, null, name, season, episode, album, artist);
}