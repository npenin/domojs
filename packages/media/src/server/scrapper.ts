import * as akala from '@akala/server';
import { Media, MediaType } from '../../metadata';

export var scrapper = new akala.Api()
    .clientToServerOneWay<{ type: MediaType, priority: number }>()({ register: true })
    .serverToClient<Media, Media>()({ scrap: true })
    .clientToServer<Media, Media>()({ scrap: true })
    ;