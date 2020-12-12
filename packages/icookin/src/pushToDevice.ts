import ws from 'ws'
import { EventEmitter } from 'events';
import gettoken from './gettoken'

var client = new ws('wss://fr-icookin.group-taurus.com:9998');
var event = new EventEmitter();
client.on('message', function (data: string)
{
    console.log(data);
    if (data && JSON.parse(data).ready)
        event.emit('ready');
});

client.on('error', function (err)
{
    console.error(err);
})
client.on('open', async function ()
{
    try
    {
        console.log('socket opened');
        event.once('ready', function ()
        {
            console.log('logged in');

            client.send(JSON.stringify({
                "user": 'annelallouetgmailcom',
                "region": 'FR-ICOOKIN',
                "moveToRecipe": {
                    niceName: 'manalas-12509',
                    title: "Manalas"
                },
                "onlyMachines": true
            }), function (err)
            {
                if (err)
                    throw err;

                console.log('recipe sent');

            });
        });
        client.send(JSON.stringify({
            tokenLogin: {
                mycooktoken: await gettoken(),
                region: 'FR-ICOOKIN'
            }
        }), function (err)
        {
            if (err)
                throw err;
        });
    }
    catch (e)
    {
        console.log(e);
    }
})