import { PornHub } from './sites/PornHub';
import { BongaCams } from './sites/BongaCams';
import { Xhamster } from './sites/Xhamster';
import { Xvideos } from './sites/Xvideos';
import { Xnxx } from './sites/Xnxx';
import { Spankbang } from './sites/Spankbang';

var phub = new PornHub();
var bgs = new BongaCams();
var xmr = new Xhamster();
var xvd = new Xvideos();
var xnx = new Xnxx();
var sbg = new Spankbang();


//(async () => {
//    //var result = await phub.Invoke('https://rt.pornhub.com/video?page=2');
//    //var result = await phub.Invoke('https://rt.pornhub.com/view_video.php?viewkey=66c8bd7d9859f');

//    //var result = await bgs.Invoke('https://ukr.bongacams.com');

//    var result = await xmr.Invoke('https://ru.xhamster.com/2');
//    //var result = await xmr.Invoke('https://ru.xhamster.com/videos/sexcourt-a-case-of-tit-for-spat-natalia-starr-chantal-danielle-brazzers-xh3Bdi0');

//    //console.log(JSON.stringify(result, null, 2));
//    console.log(result);
//    process.stdin.resume();
//    process.stdin.on('data', () => process.exit(0));
//})();



// Глобальный объект для браузера
(function() {

    function menu() {
        return [
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
            //{
            //    title: "eporner.com",
            //    playlist_url: AppInit.Eporner.overridehost ?? "epr",
            //    enable: AppInit.Eporner.enable
            //},
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
            //{
            //    title: "chaturbate.com",
            //    playlist_url: AppInit.Chaturbate.overridehost ?? "chu",
            //    enable: AppInit.Chaturbate.enable
            //}
        ];
    }

    function invk(url: string) {
        if (url.startsWith(BongaCams.host))
            return bgs.Invoke(url);
        else if (url.startsWith(PornHub.host))
            return phub.Invoke(url);
        else if (url.startsWith(Xhamster.host))
            return xmr.Invoke(url);
        else if (url.startsWith(Xvideos.host))
            return xvd.Invoke(url);
        else if (url.startsWith(Xnxx.host))
            return xnx.Invoke(url);
        else if (url.startsWith(Spankbang.host))
            return sbg.Invoke(url);

        return 'unknown site';
    }

    // Добавляем в window глобальный объект
    (window as any).AdultJS = {
        Menu: menu,
        Invoke: invk
    };
})();
