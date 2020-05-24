import * as jsonrpcws from '@akala/json-rpc-ws'
import * as server from '@akala/server'
import { Container, Triggers } from '@akala/commands'
import ws from 'ws'

export default function (router: server.HttpRouter, pm: Container<any>)
{
  var wsserver = new ws.Server({ noServer: true });
  wsserver.on('connection', (socket) =>
  {
    Triggers.jsonrpcws.register(pm, new jsonrpcws.ws.SocketAdapter(socket));
  });
  router.upgrade('/api/pm', 'websocket', (req, socket, head) =>
  {
    wsserver.handleUpgrade(req, socket, head, function (client)
    {
      wsserver.emit('connection', client, req);
    })
  })
}

exports.default.$inject = ['$router', 'pm'];