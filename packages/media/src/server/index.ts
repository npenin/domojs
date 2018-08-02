import * as akala from '@akala/server';
import { EventEmitter } from 'events';
export { meta as scrapper } from './scrapper';
export { player } from '../client/playerApi'
export * from '../../metadata';
import * as levenshtein from 'levenshtein';
import { AssetRegistration } from '@akala-modules/core'

const confidenceLog = akala.log('domojs:media:confidence');

export function confidence(name: string, names: string[])
{
    var max = 0;
    name = name.toLowerCase().replace(/[^A-Z0-9 ]/gi, '');
    if (names)
    {
        confidenceLog(`${name} confidence in ${names}`);
        akala.each(names, function (n)
        {
            var tokens = n.replace(/ \([0-9]{4}\)$/, '').replace(/[^A-Z0-9 ]/gi, '').toLowerCase();
            var lev = new levenshtein(name, tokens).distance;
            var c = 1 - lev / tokens.length;
            if (lev < 3 && c >= max)
            {
                max = c;
            }
            var tokenArray = tokens.split(' ');
            var match = akala.grep(tokenArray, function (token: string)
            {
                var indexOfToken = name.indexOf(token);
                if (indexOfToken > 0)
                    indexOfToken--;
                var test = new RegExp('(?:^|\\W)' + akala.introspect.escapeRegExp(token) + '(?:$|\\W)');
                return token.length > 0 && indexOfToken > -1 && (indexOfToken + token.length == name.length - 1 || test.test(name.substr(indexOfToken, token.length + 1)));
            });
            c = c * match.length / name.split(' ').length * match.length / tokenArray.length;
            if (c >= max)
                max = c;
        });
    }
    return max;;
};

akala.injectWithName(['$isModule', '$master', '$worker'], function (isModule: akala.worker.IsModule, master: akala.worker.MasterRegistration, worker: EventEmitter)
{
    if (isModule('@domojs/media'))
    {
        worker.on('ready', function ()
        {
            require("./fileNameScrapper");
            require("./tokenizer");
        });
        master(__filename, './master');



        akala.injectWithName([AssetRegistration.name], function (virtualasset: PromiseLike<AssetRegistration>)
        {
            virtualasset.then((va) =>
            {
                va.register('/js/tiles.js', require.resolve('../tile'));
                va.register('/js/routes.js', require.resolve('../routes'));
            });
            // virtualasset.then((va) => va.register('/js/device.js', path.resolve(__dirname, './device.js')));
        })();

        require('./commands/library')
    }
})();