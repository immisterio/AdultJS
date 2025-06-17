import { HttpClient } from '../engine/HttpClient';
import { Utils } from '../engine/Utils';
import { PlaylistItem } from '../models/PlaylistItem';
import { MenuItem } from '../models/MenuItem';
import { StreamLinksResult, StreamLinksUnified } from '../models/StreamLinksResult';

export class PornHub {
    public static host: string = 'https://rt.pornhub.com';

    async Invoke(reqUri: string) {
        let uri = new URL(reqUri.replace('pg=', 'page=').replace('c=&', '').replace('o=&', ''));
        let params = uri.searchParams;

        if (uri.href.indexOf('viewkey=') >= 0) {
            let html = await HttpClient.Get(uri.href.replace('&page=1', '').replace('&related', ''));
            return new StreamLinksUnified(this.StreamLinks(html), reqUri.includes('&related'));
        }
        else
        {
            let html = await HttpClient.Get(uri.href);

            return {
                menu: this.Menu(params),
                list: this.Playlist(html, false)
            };
        }
    }

    Playlist(html: string, related: boolean): PlaylistItem[] {
        let videoCategory: string | null = null;
        var playlists: PlaylistItem[] = [];

        if (related) {
            if (html.includes("id=\"relatedVideos\"")) {
                const ids = html.split("id=\"relatedVideos\"");
                if (ids.length > 1)
                    videoCategory = ids[1].split('</ul>')[0];
            } else {
                const ids = html.split("id=\"relatedVideosListing\"");
                if (ids.length > 1)
                    videoCategory = ids[1].split('</ul>')[0];
            }
        }
        else if (html.includes("id=\"videoCategory\""))
        {
            const ids = html.split("id=\"videoCategory\"");
            if (ids.length > 1)
                videoCategory = ids[1];
        }
        else if (html.includes("videoList clearfix browseVideo-tabSplit")) {
            const ids = html.split("videoList clearfix browseVideo-tabSplit");
            if (ids.length > 1)
                videoCategory = ids[1];
        }
        else
        {
            const videorows = html.split(/id="(mostRecentVideosSection|moreData|content-tv-container|lazyVids|videoSearchResult)"/);
            if (videorows.length > 2)
                videoCategory = videorows[2];
        }

        if (videoCategory == null)
            return playlists;

        const splitkey = videoCategory.includes("pcVideoListItem ") ? "pcVideoListItem " : videoCategory.includes("data-video-segment") ? "data-video-segment" : videoCategory.includes("<li data-id=") ? "<li data-id=" : "<li id=";
        const videoRows = videoCategory.split("<h2>Languages</h2>")[0].split("pageHeader")[0].split(splitkey);

        for (let i = 1; i < videoRows.length; i++) {
            const row = videoRows[i];

            const vkey = Utils.extract(row, "(-|_)vkey=\"([^\"]+)\"", 2) || Utils.extract(row, "viewkey=([^\"]+)\"");
            if (vkey == null)
                continue;

            const title = Utils.extract(row, "href=\"/[^\"]+\" title=\"([^\"]+)\"") || Utils.extract(row, "class=\"videoTitle\">([^<]+)<") || Utils.extract(row, "href=\"/view_[^\"]+\" onclick=[^>]+>([^<]+)<");
            if (title == null)
                continue;

            let img = Utils.extract(row, "data-mediumthumb=\"(https?://[^\"]+)\"") || Utils.extract(row, "data-path=\"(https?://[^\"]+)\"");
            if (img)
                img = img.replace("{index}", "3");
            else
                img = Utils.extract(row, "<img src=\"([^\"]+)\"");
            if (img == null)
                continue;

            const preview = Utils.extract(row, "data-mediabook=\"(https?://[^\"]+)\"") || Utils.extract(row, "data-webm=\"(https?://[^\"]+)\"");
            const time = Utils.extract(row, "<var class=\"duration\">([^<]+)</var>") || Utils.extract(row, "class=\"time\">([^<]+)<") || Utils.extract(row, "class=\"videoDuration floatLeft\">([^<]+)<") || Utils.extract(row, "time\">([^<]+)<");

            playlists.push(new PlaylistItem(
                title,
                PornHub.host + '/view_video.php?viewkey=' + vkey,
                img,
                preview,
                time,
                null,
                true,
                true
            ));
        }

        return playlists;
    }

    StreamLinks(html: string): StreamLinksResult {
        const directLink = this.getDirectLinks(html);
        return new StreamLinksResult(
            { auto: directLink.replace(/\\/g, "").replace("///", "//") },
            this.Playlist(html, true)
        );
    }

    getDirectLinks(pageCode: string): string {
        const vars: [string, string][] = [];

        let match = Utils.extract(pageCode, "\"hls\",\"videoUrl\":\"([^\"]+urlset\\\\/master\\.m3u[^\"]+)\"");
        let hls = match ? match : null;
        if (hls)
            return hls;

        for (const q of ["1080", "720", "480", "240"]) {
            const match = Utils.extract(pageCode, new RegExp(`"hls","videoUrl":"([^\"]+)","quality":"${q}"`));
            const video = match ? match : "";
            if (video)
                return video.replace(/\\/g, "").replace("///", "//");
        }

        let mainParamBody = pageCode.split('player_mp4_seek')[1].split('</script>')[0];
        mainParamBody = mainParamBody.replace(/\/\*[^/]+\*\//g, "");
        mainParamBody = mainParamBody.replace('" + "', '');

        let varRe = /var ([^=]+)=([^;]+);/g;
        let matchVar;
        while ((matchVar = varRe.exec(mainParamBody)) !== null) {
            vars.push([matchVar[1], matchVar[2].replace(/\"/g, "").replace(' + ', '')]);
        }

        let mediaRe = /var media_([0-9]+)=([^;]+);/g;
        let matchMedia;
        while ((matchMedia = mediaRe.exec(mainParamBody)) !== null) {
            let link = "";

            for (const curr of matchMedia[2].replace(/ /g, "").split('+')) {
                const param = vars.find(x => x[0] === curr)?.[1];
                if (param === undefined)
                    continue;

                link += param;
            }

            if (link.includes("urlset/master.m3u8"))
                return link;
        }

        return "";
    }

    Menu(params: URLSearchParams): MenuItem[] {
        var sort = params.get("o") || '';
        var c = params.get("c") || '';
        var host = PornHub.host + '/video';

        var sortmenu = [
            new MenuItem("Недавно в избранном", host + `?c=${c}`),
            new MenuItem("Новейшее", host + `?c=${c}&o=cm`),
            new MenuItem("Самые горячие", host + `?c=${c}&o=ht`),
            new MenuItem("Лучшие", host + `?c=${c}&o=tr`)
        ];

        var catmenu = [
            new MenuItem("Все", host + `?o=${sort}`),
            new MenuItem("Женский Выбор", host + `?c=73&o=${sort}`),
            new MenuItem("Русское", host + `?c=99&o=${sort}`),
            new MenuItem("Немецкое", host + `?c=95&o=${sort}`),
            new MenuItem("60FPS", host + `?c=105&o=${sort}`),
            new MenuItem("Азиатки", host + `?c=1&o=${sort}`),
            new MenuItem("Анальный секс", host + `?c=35&o=${sort}`),
            new MenuItem("Арабское", host + `?c=98&o=${sort}`),
            new MenuItem("БДСМ", host + `?c=10&o=${sort}`),
            new MenuItem("Безобидный контент", host + `?c=221&o=${sort}`),
            new MenuItem("Бисексуалы", host + `?c=76&o=${sort}`),
            new MenuItem("Блондинки", host + `?c=9&o=${sort}`),
            new MenuItem("Большая грудь", host + `?c=8&o=${sort}`),
            new MenuItem("Большие члены", host + `?c=7&o=${sort}`),
            new MenuItem("Бразильское", host + `?c=102&o=${sort}`),
            new MenuItem("Британское", host + `?c=96&o=${sort}`),
            new MenuItem("Брызги", host + `?c=69&o=${sort}`),
            new MenuItem("Брюнетки", host + `?c=11&o=${sort}`),
            new MenuItem("Буккаке", host + `?c=14&o=${sort}`),
            new MenuItem("В школе", host + `?c=88&o=${sort}`),
            new MenuItem("Веб-камера", host + `?c=61&o=${sort}`),
            new MenuItem("Вечеринки", host + `?c=53&o=${sort}`),
            new MenuItem("Гонзо", host + `?c=41&o=${sort}`),
            new MenuItem("Грубый секс", host + `?c=67&o=${sort}`),
            new MenuItem("Групповуха", host + `?c=80&o=${sort}`),
            new MenuItem("Двойное проникновение", host + `?c=72&o=${sort}`),
            new MenuItem("Девушки (соло)", host + `?c=492&o=${sort}`),
            new MenuItem("Дрочит", host + `?c=20&o=${sort}`),
            new MenuItem("Европейцы", host + `?c=55&o=${sort}`),
            new MenuItem("Женский оргазм", host + `?c=502&o=${sort}`),
            new MenuItem("Жесткий секс", host + `?c=21&o=${sort}`),
            new MenuItem("За кадром", host + `?c=141&o=${sort}`),
            new MenuItem("Звезды", host + `?c=12&o=${sort}`),
            new MenuItem("Золотой дождь", host + `?c=211&o=${sort}`),
            new MenuItem("Зрелые", host + `?c=28&o=${sort}`),
            new MenuItem("Игрушки", host + `?c=23&o=${sort}`),
            new MenuItem("Индийское", host + `?c=101&o=${sort}`),
            new MenuItem("Итальянское", host + `?c=97&o=${sort}`),
            new MenuItem("Кастинги", host + `?c=90&o=${sort}`),
            new MenuItem("Колледж", host + `?c=79&o=${sort}`),
            new MenuItem("Кончают", host + `?c=16&o=${sort}`),
            new MenuItem("Корейское", host + `?c=103&o=${sort}`),
            new MenuItem("Косплей", host + `?c=241&o=${sort}`),
            new MenuItem("Красотки", host + `?c=5&o=${sort}`),
            new MenuItem("Кремпай", host + `?c=15&o=${sort}`),
            new MenuItem("Кунилингус", host + `?c=131&o=${sort}`),
            new MenuItem("Курящие", host + `?c=91&o=${sort}`),
            new MenuItem("Латинки", host + `?c=26&o=${sort}`),
            new MenuItem("Любительское", host + `?c=3&o=${sort}`),
            new MenuItem("Маленькая грудь", host + `?c=59&o=${sort}`),
            new MenuItem("Мамочки", host + `?c=29&o=${sort}`),
            new MenuItem("Массаж", host + `?c=78&o=${sort}`),
            new MenuItem("Мастурбация", host + `?c=22&o=${sort}`),
            new MenuItem("Межрассовый Секс", host + `?c=25&o=${sort}`),
            new MenuItem("Минет", host + `?c=13&o=${sort}`),
            new MenuItem("Мулаты", host + `?c=17&o=${sort}`),
            new MenuItem("Мультики", host + `?c=86&o=${sort}`),
            new MenuItem("Мускулистые Мужчины", host + `?c=512&o=${sort}`),
            new MenuItem("На публике", host + `?c=24&o=${sort}`),
            new MenuItem("Ноги", host + `?c=93&o=${sort}`),
            new MenuItem("Няни", host + `?c=89&o=${sort}`),
            new MenuItem("Пародия", host + `?c=201&o=${sort}`),
            new MenuItem("Пенсионеры / подростки", host + `?c=181&o=${sort}`),
            new MenuItem("Подростки", host + `?c=37&o=${sort}`),
            new MenuItem("Попки", host + `?c=4&o=${sort}`),
            new MenuItem("Приколы", host + `?c=32&o=${sort}`),
            new MenuItem("Ретро", host + `?c=43&o=${sort}`),
            new MenuItem("Рогоносцы", host + `?c=242&o=${sort}`),
            new MenuItem("Ролевые Игры", host + `?c=81&o=${sort}`),
            new MenuItem("Романтическое", host + `?c=522&o=${sort}`),
            new MenuItem("Рыжие", host + `?c=42&o=${sort}`),
            new MenuItem("Секс втроем", host + `?c=65&o=${sort}`),
            new MenuItem("Секс-оргия", host + `?c=2&o=${sort}`),
            new MenuItem("Семейные фантазии", host + `?c=444&o=${sort}`),
            new MenuItem("Страпон", host + `?c=542&o=${sort}`),
            new MenuItem("Стриптиз", host + `?c=33&o=${sort}`),
            new MenuItem("Татуированные Женщины", host + `?c=562&o=${sort}`),
            new MenuItem("Толстушки", host + `?c=6&o=${sort}`),
            new MenuItem("Трансвеститы", host + `?c=83&o=${sort}`),
            new MenuItem("Удовлетворение пальцами", host + `?c=592&o=${sort}`),
            new MenuItem("Фетиш", host + `?c=18&o=${sort}`),
            new MenuItem("Фистинг", host + `?c=19&o=${sort}`),
            new MenuItem("Французское", host + `?c=94&o=${sort}`),
            new MenuItem("Хентай", host + `?c=36&o=${sort}`),
            new MenuItem("Чешское", host + `?c=100&o=${sort}`),
            new MenuItem("Японцы", host + `?c=111&o=${sort}`)
        ];

        var sortname = sortmenu.find(i => i.playlist_url.endsWith(`&o=${sort}`));
        var catname = catmenu.find(i => i.playlist_url.includes(`?c=${c}`));

        return [
            new MenuItem("Поиск", host + '/search', "search_on"),
            new MenuItem("Сортировка: " + (sortname ? sortname.title : 'Недавно в избранном'), "submenu", undefined, sortmenu),
            new MenuItem("Категория: " + (catname ? catname.title : 'Все'), "submenu", undefined, catmenu)
        ];
    }
}
