import * as os from 'os';
import * as akala from '@akala/core';

function requireIfExists(id: string)
{
    try
    {
        return require(id);
    }
    catch (e)
    {
        if (e.code == 'MODULE_NOT_FOUND')
            return null;
        throw e;
    }
};

akala.injectWithNameAsync(['$agent.api/@domojs/chat'], (client) =>
{
    var chat = requireIfExists('chat');
    if (chat)
        chat.meta.createServerProxy(client).register({ name: 'rfx', path: require.resolve('./interpreter') })
});
