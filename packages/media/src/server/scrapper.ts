import * as akala from '@akala/server';
import { Connection } from '@akala/json-rpc-ws'
import { Media, MediaType, Movie, TVShow, Music } from '../metadata';

export var meta = new akala.Metadata()
    .clientToServerOneWay<{ type: MediaType, priority: number }>()({ register: true })
    .serverToClient<Media, Media>()({ scrap: true })
    .clientToServer<Media, Media>()({ scrap: true })
    ;