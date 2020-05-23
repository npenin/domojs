import * as akala from '@akala/core'
import * as server from '@akala/server'
import { Container } from '@akala/commands'

export default function (router: server.HttpRouter, pm: Container<void>)
{
  router.use('/api/pm', async function (req: server.Request, res: server.Response, next: akala.NextFunction)
  {
    res.json(await pm.dispatch('$metadata'));
  })
}

exports.default.$inject = ['$router', 'pm'];