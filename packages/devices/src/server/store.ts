import * as akala from '@akala/core'
import * as db from '@akala/storage'
import * as devices from '../devices.js';
import { PersistenceEngine, ModelDefinition, Types, Generator, MultiStore } from '@akala/storage';

export interface Store
{
    DevicesInit: db.DbSet<{ name: string, body: string, type: string, room: string }>;
    // Devices: db.DbSet<devices.IDevice>;
}

export interface LiveStore
{
    Devices: db.DbSet<devices.IDevice>;
}

akala.module('@domojs/devices').activate(['$config.@domojs/devices.storage'], async function (storage?: { provider?: string, init: any })
{
    var devicesInit = new ModelDefinition<{ name: String, body: string }>('DevicesInit', 'devices', 'devices');
    devicesInit.defineMember('name', true, Types.string(50), Generator.business);
    devicesInit.defineMember('body', false, Types.string());

    var devices = new ModelDefinition<devices.IDevice>('Devices', 'devices', 'devices');
    devices.defineMember('name', true, Types.string(50), Generator.business);
    devices.defineMember('category', false, Types.string(50));
    devices.defineMember('type', false, Types.string(50));
    devices.defineMember('room', false, Types.string(50));
    var engines: { [key: string]: PersistenceEngine<any> } = {
        volatile: await db.providers.process(new URL('memory://')),
        persistent: await db.providers.process(new URL('file+json://./')),
    };

    MultiStore.create({ 'DevicesInit': engines.persistent, 'Devices': engines.volatile });
    akala.module('@domojs/devices').registerFactory('db', () =>
    {
        return db.Store.create<Store>(engines.persistent, 'DevicesInit');
    });
    akala.module('@domojs/devices').registerFactory('livedb', () =>
    {
        return db.Store.create<LiveStore>(engines.volatile, 'Devices');
    });
})