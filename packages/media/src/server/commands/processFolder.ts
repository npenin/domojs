import * as akala from '@akala/server';
import * as fs from 'fs';
import * as p from 'path';
import * as utils from 'util';

const debug = akala.log('domojs:media');

var folderMapping: { [key: string]: string } = {};

function translatePath(path: string): string
{
    if (path.startsWith('//') && process.platform != 'win32')
    {
        path = path.substring(2).replace(/\//g, p.sep);
        var indexOfSlash = path.indexOf(p.sep);
        path = path.substring(0, indexOfSlash) + ':' + path.substring(indexOfSlash);
        if (!folderMapping)
        {
            folderMapping = {};
            var fstab = fs.readFileSync('/etc/fstab', 'ascii');
            var declarations = fstab.split(/\n/g);
            akala.each(declarations, function (line)
            {
                var declaration = line.split(/[ \t]/g);
                if (typeof (line) != 'undefined' && declaration.length > 1)
                {
                    folderMapping[declaration[0]] = declaration[1]
                }
            });
            debug(folderMapping);
        }
        akala.each(folderMapping, function (remotePath, localPath)
        {
            if (path.startsWith(remotePath))
                path = path.replace(remotePath, localPath);
        });
    }
    return path;
}

export function processFolder(folder, extension, lastIndex)
{
    return new Promise(function (resolve, reject)
    {
        utils.promisify(fs.readdir)(translatePath(folder)).then(function (files)
        {
            var result = [];
            return akala.eachAsync(files, function (file, index, next)
            {
                if (file == '$RECYCLE.BIN' || file == '.recycle')
                    return next();
                file = folder + '/' + file;
                fs.stat(translatePath(file), function (err, stat)
                {
                    if (err)
                    {
                        debug(err);
                        next();
                    }
                    else if (stat.isDirectory())
                        processFolder(file, extension, lastIndex).then(function (results)
                        {
                            result = result.concat(results);
                            next();
                        });
                    else
                    {
                        if (extension.test(file) && stat.mtime > lastIndex)
                            result.push(file);
                        next();
                    }
                });
            }).then(() => { return result; });
        });
    })
}