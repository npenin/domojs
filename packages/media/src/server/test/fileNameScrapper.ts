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
    { original: 'Arrow.S06E23.FiNAL.FRENCH.WEBRip.x264-AMB3R', expected: 'Arrow - S6 - E23' },
    { original: '[TaHiSe]_Real_Drive_07_[24ACD7CB]', expected: 'Real Drive - E7' },
    { original: '[Shining Prism] 3D Kanojo Real Girl - 11', expected: '3D Kanojo Real Girl - E11' },
    { original: 'Tomb.Raider.2018.MULTi.1080p.WEB.H264-SiGeRiS', expected: 'Tomb Raider' },
    { original: '[Tanoshimu_Fansub]_Astarotte_no_Omocha!_06_720p', expected: 'Astarotte no Omocha! - E6' },
    { original: '[TanoshimuFansub]AstarottenoOmocha!05vostfrHD', expected: 'AstarottenoOmocha - E5' },
    { original: '[Natsumi no Sekai] Beatless - 02 VOSTFR (1920x1080 8bit AAC) [FCB5A656]', expected: 'Beatless - E2' },
    { original: 'KEV & GAD - Tout est possible 1080 HDTV du 24 novembre 2016', expected: 'KEV & GAD Tout est possible - E24' },
    { original: 'Jason Bourne 2016 MULTi VFF AC3-DTS 1080p HDLight x264.GHT', expected: 'Jason Bourne' },
    { original: '[QS]_Isekai_no_Seikishi_Monogatari_OAV_07[720p_Bluray_x264]_[ecf66cb2]', expected: 'Isekai no Seikishi Monogatari - E7' },
    { original: '[Kibo]_DRAGONAUT_-_THE_RESONANCE_16_[FB010173]_Pleurs', expected: 'DRAGONAUT THE RESONANCE - E16' },
    { original: 'Sense8.S02E01.FRENCH.720p.NF.WEBRip.DD5.1.x264-FRATERNiTY', expected: 'Sense8 - S2 - E1' },
    { original: 'Sarai-ya.Goyou.E01.VOSTFR.DVDRiP.x264-FUJiSAN', expected: 'Sarai ya Goyou - E1' },
    { original: 'Owarimonogatari.S02E01.VOSTFR.1080p.WEB-DL.AAC.x264-WKN', expected: 'Owarimonogatari - S2 - E1' },
    { original: '[NKF]_Bakemonogatari_01_[1280x720_x264_AAC]', expected: 'Bakemonogatari - E1' },
    { original: '10.Cloverfield.Lane.2016.MULTi.BRRip.x264-GTM', expected: 'Cloverfield Lane - E10' },
    { original: 'Kiss_x_Sis_01_[H-R]_HD_1280x720_[0014C58B]', expected: 'Kiss x Sis - E1' },
    { original: 'Suicide Squad (2016) Extended MULTi VF [1080p] BluRay x264-PopHD', expected: 'Suicide Squad' },
    { original: '[AnoS]_Otome_wa_Boku_ni_Koishiteru_-_Episode_01_[384BD001].avi', expected: 'Otome wa Boku ni Koishiteru Episode - E1' },
    { original: '[Nemesis]_Maria_sama_ga_miteru_Saison_1_03v2_[FF9FC7F0].mkv', expected: 'Maria sama ga miteru - S1 - E3' },
    { original: '[Nemesis]_Psycho-Pass_01v2_[C65C5CC8].mkv', expected: 'Psycho Pass - E1' },
])
{
    var actual = scrapper({ name: scrapper2(file.original), type: 'video', id: '', path: '' }).displayName;
    // console.log(actual);
    console.assert(actual == file.expected, JSON.stringify({ original: file.original, expected: file.expected, actual: actual }, null, 4));
}