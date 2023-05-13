import * as jsonrpcws from '@akala/json-rpc-ws'
import * as server from '@akala/server'
import { Triggers } from '@akala/commands'
import ws from 'ws'
import { logger as LoggerBuilder, LogLevels } from '@akala/core'

const logger = LoggerBuilder('domojs:theme-default:pm', LogLevels.info)

export default function (this: server.State, router: server.HttpRouter)
{
    const wsserver = new ws.Server({ noServer: true });
    const pm = this.pm;

    wsserver.on('connection', (socket) =>
    {
        logger.info('attaching pm to socket');
        pm.attach(Triggers.jsonrpcws.name, new jsonrpcws.ws.SocketAdapter(socket));
    });

    wsserver.on('error', function (error)
    {
        logger.error(error);
    })

    router.upgrade('/api/pm', 'websocket', async function (req, ...rest: any[]) 
    {
        logger.verbose('received upgrade request');
        try
        {
            req.method = 'GET';
            wsserver.handleUpgrade(req, rest[0], rest[1], function (client)
            {
                logger.info('received connection')
                wsserver.emit('connection', client, req);
            });
        }
        catch (e)
        {
            logger.error(e);
        }
    })
}

exports.default.$inject = ['$router'];