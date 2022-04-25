import * as akala from '@akala/core';
export * from '../../metadata';
import levenshtein from 'levenshtein';

const confidenceLog = akala.logger('domojs:media:confidence');

export function confidence(name: string, names: string[])
{
    var max = 0;
    name = name.toLowerCase().replace(/[^A-Z0-9 ]/gi, '');
    if (names)
    {
        confidenceLog.debug(`${name} confidence in ${names}`);
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
}