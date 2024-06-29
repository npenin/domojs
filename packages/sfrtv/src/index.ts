import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true, });
const page = await browser.newPage();
await page.goto('https://tv.sfr.fr');
await page.setRequestInterception(true);
page.on('request', interceptedRequest =>
{
    if (interceptedRequest.isInterceptResolutionHandled())
        return;
    if (interceptedRequest.url().endsWith('.png') ||
        interceptedRequest.url().endsWith('.jpg'))
        interceptedRequest.abort();
    else
        interceptedRequest.continue();
});
const profile = await page.waitForSelector('gen8-profile');
if (await profile!.evaluate(el => el.getAttribute('pn')) == "Se connecter")
    await profile!.click();

await page.waitForNavigation();

await (await page.waitForSelector('#username'))!.type('n.penin@sfr.fr')
await (await page.waitForSelector('#password'))!.type('md1RHx8MQ5un')
await (await page.waitForSelector('#identifier'))!.click()

await page.waitForNavigation();


await page.evaluate(async () =>
{
    let recorder: MediaRecorder;
    var chunks = [];
    var fileName: string | undefined = 'x.webm';
    var blobUrl;

    // function saveBlob(blob)
    // {
    //     chunks.push(blob);
    //     if (fileName === null)
    //     {
    //         return;
    //     }
    //     blob = new Blob(chunks);

    //     var a = document.createElement("a"),
    //         url = URL.createObjectURL(blob);
    //     a.href = url;
    //     a.download = fileName;
    //     document.body.appendChild(a);
    //     a.click();

    //     chunks = []
    //     setTimeout(function ()
    //     {
    //         document.body.removeChild(a);
    //         window.URL.revokeObjectURL(url);
    //     }, 0);
    // }

    /*
    navigator.webkitPersistentStorage.requestQuota(500 * 1024 * 1024, function (grantedBytes) {
        window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, function (fs) {
            recorder.ondataavailable = function (e) {
               fs.root.getFile(fileName || 'x.webm', { create: true }, function (file) {
                    file.createWriter(function (writer) {
                        writer.write(e.data);
                    }, function (err) {
                        console.error(err);
                        saveBlob(e.data);
                    });
                }, function (err) {
                    console.error(err);
                    saveBlob(e.data);
                });
            };
        });
    }, function (e) {
        console.log('Error', e);
    });
    */

    var oldCreate = document.createElement;
    document.createElement = function (tag, options?)
    {
        var result = oldCreate.call(this, tag, options);
        if (tag == 'video' || tag == 'audio')
        {
            createMediaContext(result as HTMLVideoElement);
        }
        return result;
    };

    new RTCPeerConnection()

    function createMediaContext(result: HTMLVideoElement)
    {
        result.addEventListener('loadedmetadata', () =>
        {
            recorder = new MediaRecorder(result['captureStream']())
            recorder.ondataavailable = function (e)
            {

            }
        })
        result.addEventListener('loadstart', function ()
        {
            recorder.start(1000);
            blobUrl = result.src;
            console.log(result.src);
        })
        result.addEventListener('pause', function ()
        {
            recorder.pause();
        });
        result.addEventListener('playing', function ()
        {
            if (recorder.state == 'inactive')
                recorder.start();
            else
                recorder.resume();
        });

        result.addEventListener('ended', function ()
        {
            //     console.log(result.src);
            //     switch (location.hostname)
            //     {
            //         case "open.spotify.com":
            //             if (document.querySelector('.track-info__artists').innerText != '' &&
            //                 document.querySelector('.track-info__artists').innerText != 'Spotify'
            //             )
            //                 fileName = document.querySelector('.track-info__artists').innerText + ' - ' + document.querySelector('.track-info__name').innerText + '.webm';
            //             break;
            //         case "www.youtube.com":
            //             fileName = document.querySelector('h1.title').innerText + '.webm';
            //             break;
            //         case "music.youtube.com":
            //             fileName = document.querySelector('span.subtitle.ytmusic-player-bar .byline').innerText + ' - ' +
            //                 document.querySelector('yt-formatted-string.title.ytmusic-player-bar').innerText + '.webm'
            //             break;
            //         default:
            //             fileName = 'audio1.webm';
            //     }
            //     recorder.stop();
        });
        result.addEventListener('emptied', function ()
        {
            // fileName = undefined;
            if (recorder.state != 'inactive')
                recorder.stop();
            setTimeout(function ()
            {
                fileName = 'x.webm';
            }, 0);
        });
        // src.connect(dest);
        // src.connect(originalDest);
    }

    var videos = document.getElementsByTagName('video');
    for (var i = 0; i < videos.length; i++)
        createMediaContext(videos[i]);
})
await page.goto('/channel')

await browser.close();
// defaultInjector.injectWithName(['$http'], async (http: Http) =>
// {
//     const config = await http.getJSON('https://tv.sfr.fr/configs/config.json') as any;
//     const jar = new CookieJar();
//     let auth = await http.get(`${config.auth.OIDC_URL}/oidc/authorize?response_type=${config.auth.OIDC_RESPONSE_TYPE}&client_id=${config.auth.OIDC_CLIENT_ID}&redirect_uri=https%3A%2F%2Fwww.sfr.fr%2F&scope=${config.auth.OIDC_SCOPE}&gateway=true&token=true&state=hfNePL4xY8UkefBbwhdsS1D3NWXTHSUtqEwHDJci`);
//     jar.setCookie(auth.headers.get('Set-Cookie'));
//     // console.log(auth);
//     while (auth.status == 302)
//     {
//         console.log(auth.url);
//         console.log(auth.headers.get('Location'));
//         const url = new URL(auth.headers.get('Location'), auth.url);
//         auth = await http.call({ url, headers: { Cookie: jar.getCookies({ domain: url.host, path: url.pathname, secure: url.protocol.endsWith('s:'), script: true }).toValueString() } })
//     }
//     // console.log(auth.url);
//     console.log(auth);
//     console.log(await auth.text());
//     fetch("https://www.sfr.fr/cas/login?domain=mire-sfr&service=https%3A%2F%2Fwww.sfr.fr%2Fcas%2Foidc%2FcallbackAuthorize", {
//         "headers": {
//           "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//           "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
//           "cache-control": "max-age=0",
//           "content-type": "application/x-www-form-urlencoded",
//           "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "\"Linux\"",
//           "sec-fetch-dest": "document",
//           "sec-fetch-mode": "navigate",
//           "sec-fetch-site": "same-origin",
//           "sec-fetch-user": "?1",
//           "upgrade-insecure-requests": "1",
//           "cookie": "TS0150a8a5=0157f6485542637cbd61ca25fcc0af79b0edbd3565f374f47940d00b2b05b3b21f1fd983866e64e03570271b0b983c21f46e003425a473543668ddad2cb5e33194a4ecfeaac8538cd6503ef0fc51e5d24019075887; TS01e4daa0=0157f64855420162720eb6ead4338bc5d06ef3e54ff374f47940d00b2b05b3b21f1fd983863e59ff22473750807f059a252319de16a66d7d15c50d7368f1b679fd8a7e707c; JSESSIONID=hr~1a8ac258eb84b5cf~39D0A4667A0971DA7D2DF06AC2CE52BB.authentification-7b66cbdc4d-4f69p!hr; eTpcI=0:91589/; X-Mapping-oejdnnie=0B790B59C4DCF70A7ACFB94E0999915A; etuix=KwsarME1GqUfuL8KbcVXxfMiTwCGAurAoUZY2sKS0eDpaFqZ9IevPQ--; s_fid=7EACCDF6FFB07607-3F3585997FE8B68C; eTgdpr=0; eTiab2=CPtTO8APtTO8ABPACAFRDICgAAAAAAAAAAqIAAAAAAAA; JSESSIDETP=D9DCBFC8E5CCE87143614CDEFDC461B2.etagproxy15; CL3=true; CFPC=OfLWegtnWNiJFXqGJXEXGrRXmHqDqr; eTagAB=19; eTe4=34qddYp3OBQe1Xin; eTempr=1; eTcnD=1689841681327; eTab808=2; eTab749=2; eTab787=2; eTab757=2; eTab774=2; eTab686=1; eTab389=3; eTeCli=2119802865; eTagUI=>Infos Loisirs:TV Et Club Video>#; eTpT=0; s_cmCT=19559:Tape/Marque; TS01aa9b1d=0157f648558ea8f7a7548a9e79d61205b94b0e1c2eed630719da2edcfb316a8b0ba58b113a0949d054de21b84d31a5bf0bd768f56a; CFP=gFINwEzHxErzqMSUBMFe; TS01ee8241=0157f6485593de21161edfc4adf3459657f0b9297af374f47940d00b2b05b3b21f1fd98386a67d0fe9c6c9f54fcbc8d39eccb9dd959278937e3cc54129bdaa98c996b74114786598b1c363423ff3e25f666b7018e607f6627e98398777fca7ba99ddf407b074ccace609b1800b3a6ac2e7bad39916a56c72e73cf16581f7bce142045d4723cc59f649f03087fd7832f503524112adbf046e4daa4154c611cbb7529b6331ee780d372bfc89d6910174ad6ff0105fb2; TS01aa9b1d030=01bb057c1392918fe7db9ab116c7ec52a0345da13d1cf03cb4170009ddb633a8805517d89fb586d7f0a5add31e5ff4e0bde274f1ba; authent=1_undefined; JSESSIDRTM=trp~d4de39ef57280958~B52BAB2E9C52ACA6FCA2C07A4A471706.runtime-sfrfr-7b8dcd6b74-lxtwh; TS42abe983027=08fc598963ab2000e27ac01ca7cca68a60186d2cd5b9e24a9866d1cc8f5ede81e06834f522789f6908e48e892b113000efbfd5e0a4d205e6afd819ed6812e91111943286199a88f4976ae85c4c0a2a160a8b940a5adc53cb7ee660a16835d688; s_depth=18; gpv_p41=Web%2FTransverse%2FAuthentification%2FMireB; eTagLV=28165245",
//           "Referer": "https://www.sfr.fr/cas/login?service=https%3A%2F%2Fwww.sfr.fr%2Fcas%2Foidc%2FcallbackAuthorize&oidcsqs=eyJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2ODk5MTQ2NjUsImp0aSI6ImIxNjJjNzUxLWY5MDMtNGE0Yy1iYjQzLWU3NmQ0MjZlY2MyNyIsInBtIjp7ImNsaWVudF9pZCI6WyJ0YUxPemxpVXV3THVycE9HSkJ4enpWdXZ6ZGVBUkoiXSwic2NvcGUiOlsib3BlbmlkIl0sInJlc3BvbnNlX3R5cGUiOlsidG9rZW4iXSwicmVkaXJlY3RfdXJpIjpbImh0dHBzOi8vdHYuc2ZyLmZyLyJdLCJzdGF0ZSI6WyJDSWFIb3h4WVNIcHB2bEMzb1JYdjRLUmJJaHpVWXVwaU92VW9DYWdKIl19fQ.Q6AXb3u5USmNso8Jdy--TiaSrxOhLio1EDfltUKSHMTr4XNnXzd9FV3IfCbVK2nmpG1Mv_K9q7d_aw6DPOBQ0oOchLB2FrdgEyXSOPawfg5tNI46aaxWnjI0uvYvAETI9FoSoXiXuiiUjAWS4aj7SZjQumu7Y6y1WSd2p2wEk56bnCV1PoOPtYh8tbHtZwsv2-AW1ASUmU1OtlG30fY5BBxlrixK_lODcagifY1t284hjdYXnpiAn66TL1rPTCQi3MUlKNHjhK8RHGWM2BLQ0NqmIXhW5Q5qbXfIbbh0NP8fKPb6xJ-JHcUnU94P_jSpE9hOV-oWEsA8Et9jIFrV3Q",
//           "Referrer-Policy": "strict-origin-when-cross-origin"
//         },
//         "body": "lt=LT-1409426-vXaIGOiPbo5V2YwZC0gmYHdQbHPlvk-authentification-7b66cbdc4d-4f69p%21hr&execution=e2s1&lrt=LRT-XQsRhUOOWKzXTEF&_eventId=submit&username=n.penin%40sfr.fr&password=md1RHx8MQ5un&remember-me=on&identifier=",
//         "method": "POST"
//       });
//       auth=await http.get(`${config.auth.OIDC_URL}/login?domain=mire-sfr&&service=https%3A%2F%2Fwww.sfr.fr%2Fcas%2Foidc%2FcallbackAuthorize`);
//     auth = await http.call({url:`${config.auth.OIDC_URL}/login?domain=mire-sfr&&service=https%3A%2F%2Fwww.sfr.fr%2Fcas%2Foidc%2FcallbackAuthorize`, contentType:'json' });
//     jar.setCookie(auth.headers.get('Set-Cookie'));
//     // console.log(auth);
//     while (auth.status == 302)
//     {
//         console.log(auth.url);
//         console.log(auth.headers.get('Location'));
//         const url = new URL(auth.headers.get('Location'), auth.url);
//         auth = await http.call({ url, headers: { Cookie: jar.getCookies({ domain: url.host, path: url.pathname, secure: url.protocol.endsWith('s:'), script: true }).toValueString() } })
//     }
//     // console.log(auth.url);
//     console.log(auth);
//     console.log(await auth.text());
//     // http.getJSON('https://ws-backendtv.sfr.fr/sekai-service-plan/public/v2/service-list?app=gen8&device=browser&token=')
// })()
//# sourceMappingURL=index.js.map