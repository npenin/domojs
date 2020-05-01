import * as akala from '@akala/core'
import * as db from '@akala/storage'
import * as devices from '../devices';
import { PersistenceEngine, ModelDefinition, Types, Generator } from '@akala/storage';

export interface Store extends db.StoreDefinition
{
    Devices: db.DbSet<devices.IDevice>;
    Types: db.DbSet<devices.DeviceType>;
}

akala.module('@domojs/devices').activate(['$config.@domojs/devices.storage'], function (storage)
{
    akala.module('@domojs/devices').registerFactory('db', db.providers.injectWithName([storage?.provider || 'file'], async function (engine: PersistenceEngine<any>)
    {
        var devices = new ModelDefinition('Devices', 'devices', 'devices');
        devices.defineMember('name', true, Types.string(50), Generator.business);
        devices.defineMember('body', false, Types.string());

        await engine.init(storage?.init);
        return db.Store.create<Store>(engine, 'Devices');
    }));
})