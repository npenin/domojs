import * as akala from '@akala/core'
import * as db from '@akala/storage'
import * as devices from '../devices';
import { PersistenceEngine, ModelDefinition, Types, Generator } from '@akala/storage';

export interface Store
{
    DevicesInit: db.DbSet<{ name: string, body: string, type: string }>;
    // Devices: db.DbSet<devices.IDevice>;
}

export interface LiveStore
{
    Devices: db.DbSet<devices.IDevice>;
}

akala.module('@domojs/devices').activate(['$config.@domojs/devices.storage'], async function (storage)
{
    var devicesInit = new ModelDefinition<{ name: String, body: string }>('DevicesInit', 'devices', 'devices');
    devicesInit.defineMember('name', true, Types.string(50), Generator.business);
    devicesInit.defineMember('body', false, Types.string());

    var devices = new ModelDefinition<devices.IDevice>('Devices', 'devices', 'devices');
    devices.defineMember('name', true, Types.string(50), Generator.business);
    devices.defineMember('category', false, Types.string(50));
    devices.defineMember('type', false, Types.string(50));
    var engines: { [key: string]: PersistenceEngine<any> } = {};
    this.waitUntil(db.providers.injectWithName([storage?.provider || 'file', 'vanilla'], async function (persistent: PersistenceEngine<any>, volatile: PersistenceEngine<any>)
    {
        await volatile.init(null);
        engines.volatile = volatile;

        await persistent.init(storage?.init);
        engines.persistent = persistent;

    })());
    akala.module('@domojs/devices').registerFactory('db', () =>
    {
        return db.Store.create<Store>(engines.persistent, 'DevicesInit');
    });
    akala.module('@domojs/devices').registerFactory('livedb', () =>
    {
        return db.Store.create<LiveStore>(engines.volatile, 'Devices');
    });
})