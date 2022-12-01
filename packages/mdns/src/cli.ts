#!/usr/bin/env node
import * as path from 'path'
import { Cli } from '@akala/commands';
import { buildCliContext } from '@akala/cli'
import { logger } from '@akala/core';

(async function ()
{
    const cli = await Cli.fromFileSystem(path.resolve(__dirname, '../commands.json'), path.join(__dirname, '../'));
    cli.program.useError(async (e, c) =>
    {
        if (c.options.verbose)
            console.error(e);
        else
            console.error(e['message'] || e);
    });
    cli.program.format((r =>
    {
        console.log(r);
    }));
    cli.cliContainer.state = {} as unknown as void;
    await cli.cliContainer.dispatch('$init', buildCliContext(logger('')));

    await cli.start();

    await cli.cliContainer.dispatch('$stop');

})();