import * as http from 'https'
import * as uri from 'url'

export default function ()
{
    return new Promise<string>((resolve, reject) =>
    {
        var req = http.request(Object.assign({ method: 'POST', headers: { 'content-type': 'application/json' } }, uri.parse('https://fr-icookin.group-taurus.com/login/')));
        req.write(JSON.stringify({
            "login": "anne.lallouet@gmail.com",
            "password": "moncel72",
            "region": "FR-ICOOKIN",
            "isMachine": false,
        }));
        req.on('response', function (res)
        {
            if (res.statusCode == 200)
            {
                var data = '';
                res.on('data', function (chunk)
                {
                    data += chunk;
                });
                res.on('end', function ()
                {
                    var parsedData = JSON.parse(data);
                    try
                    {
                        console.log(parsedData);
                        resolve(parsedData.token);
                    }
                    catch (e)
                    {
                        reject(e);
                    }
                });
                res.on('error', function (err)
                {
                    reject(err);
                })
            }
            else
                reject(res);
        });
        req.end();
    });
}

if (require.main == module)
{
    exports.default();
}