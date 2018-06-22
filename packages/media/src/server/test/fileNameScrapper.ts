import * as akala from '@akala/server';

akala.register('$agent', akala.chain(function (key: string)
{
    return new Promise(akala.noop);
}, function (keys, key)
    {
        keys.push(key);
        return keys;
    }), true);

import { scrapTVShowInfo as scrapper } from '../fileNameScrapper';
import { fileNameCleaner as scrapper2 } from '../fileNameScrapper';

for (var file of [
    // 'Arrow.S06E23.FiNAL.FRENCH.WEBRip.x264-AMB3R', 
    // '[TaHiSe]_Real_Drive_07_[24ACD7CB]', 
    // '[Shining Prism] 3D Kanojo Real Girl - 11', 
    // 'Tomb.Raider.2018.MULTi.1080p.WEB.H264-SiGeRiS',
    // '[Tanoshimu_Fansub]_Astarotte_no_Omocha!_06_720p',
    // '[TanoshimuFansub]AstarottenoOmocha!05vostfrHD',
    // '[Natsumi no Sekai] Beatless - 02 VOSTFR (1920x1080 8bit AAC) [FCB5A656]',
    // 'KEV & GAD - Tout est possible 1080 HDTV du 24 novembre 2016',
    // 'Jason Bourne 2016 MULTi VFF AC3-DTS 1080p HDLight x264.GHT',
    // '[QS]_Isekai_no_Seikishi_Monogatari_OAV_07[720p_Bluray_x264]_[ecf66cb2]',
    // '[Kibo]_DRAGONAUT_-_THE_RESONANCE_16_[FB010173]_Pleurs',
    // 'Sense8.S02E01.FRENCH.720p.NF.WEBRip.DD5.1.x264-FRATERNiTY',
    // 'Sarai-ya.Goyou.E01.VOSTFR.DVDRiP.x264-FUJiSAN',
    // 'Owarimonogatari.S02E01.VOSTFR.1080p.WEB-DL.AAC.x264-WKN',
    // '[NKF]_Bakemonogatari_01_[1280x720_x264_AAC]',
    // '10.Cloverfield.Lane.2016.MULTi.BRRip.x264-GTM',
    'Kiss_x_Sis_01_[H-R]_HD_1280x720_[0014C58B]',
])
    console.log(scrapper({ name: scrapper2(file), type: 'video', id: '', path: '' }).displayName)
