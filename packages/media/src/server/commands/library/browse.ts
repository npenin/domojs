import { Container } from '@akala/commands';
import Configuration from '../../configuration';
import * as process from '../processFolder';


export default function (this: Configuration, container: Container<Configuration>, source: string, type: 'music' | 'video', name?: string, season?: number, episode?: number, album?: string, artist?: string)
{
    var libs = this.libraries;
    return process.processSource(libs[source].paths, container, type, null, name, season, episode, album, artist);
}