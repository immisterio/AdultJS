import { PornHub } from './sites/PornHub';
import { BongaCams } from './sites/BongaCams';
import { Xhamster } from './sites/Xhamster';
import { Xvideos } from './sites/Xvideos';
import { Xnxx } from './sites/Xnxx';
import { Spankbang } from './sites/Spankbang';
import { Chaturbate } from './sites/Chaturbate';
import { Eporner } from './sites/Eporner';
import { NextHub } from './engine/NextHub';

// Import all NextHub configurations
import { LenkinoConfig } from './sites/Lenkino';
import { LenpornoConfig } from './sites/Lenporno';
import { Video24Config } from './sites/24video';
import { BigBossConfig } from './sites/BigBoss';
import { EbasosConfig } from './sites/Ebasos';
import { EbunConfig } from './sites/Ebun';
import { JopaOnlineConfig } from './sites/JopaOnline';
import { NoodleMagazineConfig } from './sites/NoodleMagazine';
import { PorndigConfig } from './sites/Porndig';
import { PornkConfig } from './sites/Pornk';
import { Porno365Config } from './sites/Porno365';
import { Porno666Config } from './sites/Porno666';
import { PornoBrizConfig } from './sites/PornoBriz';
import { SemBatsaConfig } from './sites/SemBatsa';
import { SosushkaConfig } from './sites/Sosushka';

// Combine all configurations
const CONFIGS = [
    LenkinoConfig,
    LenpornoConfig,
    Video24Config,
    BigBossConfig,
    EbasosConfig,
    EbunConfig,
    JopaOnlineConfig,
    NoodleMagazineConfig,
    PorndigConfig,
    PornkConfig,
    Porno365Config,
    Porno666Config,
    PornoBrizConfig,
    SemBatsaConfig,
    SosushkaConfig
];


var phub = new PornHub();
var bgs = new BongaCams();
var xmr = new Xhamster();
var xvd = new Xvideos();
var xnx = new Xnxx();
var sbg = new Spankbang();
var chu = new Chaturbate();
var epr = new Eporner();
var nex = new NextHub(CONFIGS);


//(async () => {
//    //var result = await phub.Invoke('https://rt.pornhub.com/video?page=2');
//    //var result = await phub.Invoke('https://rt.pornhub.com/view_video.php?viewkey=66c8bd7d9859f');
//
//    //var result = await bgs.Invoke('https://ukr.bongacams.com');
//
//    //    var result = await xmr.Invoke('https://ru.xhamster.com/2');
//    //var result = await xmr.Invoke('https://ru.xhamster.com/videos/sexcourt-a-case-of-tit-for-spat-natalia-starr-chantal-danielle-brazzers-xh3Bdi0');
//
//    //console.log(JSON.stringify(result, null, 2));
//    console.log(result);
//    process.stdin.resume();
//    process.stdin.on('data', () => process.exit(0));
//})();



//    
(function () {

    function menu() {
        const base = [
            {
                title: "pornhub.com",
                playlist_url: PornHub.host + '/video'
            },
            {
                title: "xvideos.com",
                playlist_url: Xvideos.host
            },
            {
                title: "xhamster.com",
                playlist_url: Xhamster.host
            },
            //{
            //    title: "ebalovo.porn",
            //    playlist_url: AppInit.Ebalovo.overridehost ?? "elo",
            //    enable: AppInit.Ebalovo.enable
            //},
            //{
            //    title: "hqporner.com",
            //    playlist_url: AppInit.HQporner.overridehost ?? "hqr",
            //    enable: AppInit.HQporner.enable
            //},
            {
                title: "spankbang.com",
                playlist_url: Spankbang.host
            },
            {
                title: "eporner.com",
                playlist_url: Eporner.host
            },
            //{
            //    title: "porntrex.com",
            //    playlist_url: AppInit.Porntrex.overridehost ?? "ptx",
            //    enable: AppInit.Porntrex.enable
            //},
            {
                title: "xnxx.com",
                playlist_url: Xnxx.host
            },
            {
                title: "bongacams.com",
                playlist_url: BongaCams.host
            },
            {
                title: "chaturbate.com",
                playlist_url: Chaturbate.host
            }
        ];

        // add NextHub-driven sites (from JSON/YAML-configs)
        CONFIGS.filter(c => c.enable).forEach(c => {
            base.push({
                title: c.displayname.toLowerCase(),
                playlist_url: `nexthub://${c.displayname}?mode=list`
            });
        });

        return base;
    }

    async function invk(url: string) {
        if (url.startsWith(BongaCams.host))
            return await bgs.Invoke(url);
        else if (url.startsWith(PornHub.host))
            return await phub.Invoke(url);
        else if (url.startsWith(Xhamster.host))
            return await xmr.Invoke(url);
        else if (url.startsWith(Xvideos.host))
            return await xvd.Invoke(url);
        else if (url.startsWith(Xnxx.host))
            return await xnx.Invoke(url);
        else if (url.startsWith(Spankbang.host))
            return await sbg.Invoke(url);
        else if (url.startsWith(Chaturbate.host))
            return await chu.Invoke(url);
        else if (url.startsWith(Eporner.host))
            return await epr.Invoke(url);
        else if (url.startsWith('nexthub://'))
            return await nex.Invoke(url);
        else {
            // Check if this is a NextHub site URL
            const urlObj = new URL(url);
            const nextHubSite = CONFIGS.find(c => c.enable && urlObj.hostname === new URL(c.host).hostname);
            if (nextHubSite) {
                // Convert to NextHub format
                const nextHubUrl = `nexthub://${nextHubSite.displayname}?mode=view&href=${encodeURIComponent(url)}`;
                return await nex.Invoke(nextHubUrl);
            }
        }

        return 'unknown site';
    }

    //  window  
    (window as any).AdultJS = {
        Menu: menu,
        Invoke: invk
    };
})();
