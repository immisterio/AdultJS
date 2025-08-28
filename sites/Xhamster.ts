import { HttpClient } from '../engine/HttpClient';
import { PlaylistItem } from '../models/PlaylistItem';
import { MenuItem } from '../models/MenuItem';
import { StreamLinksResult, StreamLinksUnified } from '../models/StreamLinksResult';

export class Xhamster {

    public static host: string = 'https://ru.xhamster.com';

    async Invoke(reqUri: string)
    {
        if (reqUri.indexOf('/videos/') >= 0)
        {
            let html = await HttpClient.Get(reqUri.replace('&related', '').replace('?pg=1', '').replace('&pg=1', ''));
            return new StreamLinksUnified(this.StreamLinks(html), reqUri.includes('&related'));
        }
        else
        {
            let uri = "";

            if (reqUri.includes("search="))
                uri = reqUri.replace('?search=', '/').replace('&search=', '/').replace('&pg=', '?page=');
            else
                uri = reqUri.replace('?pg=', '/').replace('&pg=', '/');

            let html = await HttpClient.Get(uri);

            return {
                menu: reqUri.includes("search=") ? [] : this.Menu(reqUri),
                list: this.Playlist(html)
            };
        }
    }

    Playlist(html: string): PlaylistItem[] {
        if (!html) return [];

        const section = html.includes("mixed-section") ? html.split("mixed-section")[1] : html;
        const rows = section.split(/(<div class="thumb-list__item video-thumb|thumb-list-mobile-item)/);
        const playlists: PlaylistItem[] = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row || !row.trim() || row.includes("badge_premium")) continue;

            const g = /__nam[^\"]+\" href=\"(https?:\/\/[^\/]+\/[^\"]+)\"([^>]+)?>(<!--[^-]+-->)?([^<]*)/.exec(row);
            const title = g && g[4] ? g[4] : "";
            const href = g && g[1] ? g[1] : "";

            if (href && title && title.trim()) {
                let duration = "";
                let m = /data-role="video-duration"><[^>]+>([^<]+)/.exec(row);
                if (m && m[1]) duration = m[1];
                if (!duration) {
                    m = /datetime="([^\"]+)"/.exec(row);
                    if (m && m[1]) duration = m[1];
                }

                let img = "";
                m = /srcset="([^\"]+)"/.exec(row);
                if (m && m[1]) img = m[1];
                if (!img.startsWith("http")) {
                    m = /thumb-image-container__image" src="([^\"]+)"/.exec(row);
                    if (m && m[1]) img = m[1].trim();
                }
                if (!img.startsWith("http")) continue;

                const quality = row.includes("-uhd") ? "4K" : row.includes("-hd") ? "HD" : null;
                m = /data-previewvideo="([^\"]+)"/.exec(row);
                const preview = m && m[1] ? m[1] : "";

                playlists.push(new PlaylistItem(
                    title,
                    href,
                    img,
                    preview,
                    duration ? duration.trim() : "",
                    quality,
                    true,
                    true
                ));
            }
        }

        return playlists;
    }

    StreamLinks(html: string): StreamLinksResult {
        let match = /rel="preload" href="([^\"]+)"/.exec(html);
        let stream_link = match && match[1] ? match[1].replace(/\\/g, "") : "";

        if (!stream_link.includes(".m3u"))
            new StreamLinksResult({}, []);

        if (stream_link.startsWith("/")) 
            stream_link = Xhamster.host + stream_link;

        return new StreamLinksResult(
            { auto: stream_link },
            this.Playlist(html)
        );
    }

    Menu(uri: string): MenuItem[] {
        var host = Xhamster.host;

        var sortmenu = [
            new MenuItem("Новейшее", host + `/newest`),
            new MenuItem("Лучшие", host + `/best/weekly`),
            new MenuItem("В тренде", host)
        ];

        var catmenu = [
            new MenuItem("Русское", host + "/categories/russian"),
            new MenuItem("Секс втроем", host + "/categories/threesome"),
            new MenuItem("Азиатское", host + "/categories/asian"),
            new MenuItem("Анал", host + "/categories/anal"),
            new MenuItem("Арабское", host + "/categories/arab"),
            new MenuItem("АСМР", host + "/categories/asmr"),
            new MenuItem("Бабки", host + "/categories/granny"),
            new MenuItem("БДСМ", host + "/categories/bdsm"),
            new MenuItem("Би", host + "/categories/bisexual"),
            new MenuItem("Большие жопы", host + "/categories/big-ass"),
            new MenuItem("Большие задницы", host + "/categories/pawg"),
            new MenuItem("Большие сиськи", host + "/categories/big-tits"),
            new MenuItem("Большой член", host + "/categories/big-cock"),
            new MenuItem("Британское", host + "/categories/british"),
            new MenuItem("В возрасте", host + "/categories/mature"),
            new MenuItem("Вебкамера", host + "/categories/webcam"),
            new MenuItem("Винтаж", host + "/categories/vintage"),
            new MenuItem("Волосатые", host + "/categories/hairy"),
            new MenuItem("Голые мужчины одетые женщины", host + "/categories/cfnm"),
            new MenuItem("Групповой секс", host + "/categories/group-sex"),
            new MenuItem("Гэнгбэнг", host + "/categories/gangbang"),
            new MenuItem("Дилдо", host + "/categories/dildo"),
            new MenuItem("Домашнее порно", host + "/categories/homemade"),
            new MenuItem("Дрочка ступнями", host + "/categories/footjob"),
            new MenuItem("Женское доминирование", host + "/categories/femdom"),
            new MenuItem("Жиробасина", host + "/categories/ssbbw"),
            new MenuItem("Жопа", host + "/categories/ass"),
            new MenuItem("Застряла", host + "/categories/stuck"),
            new MenuItem("Знаменитость", host + "/categories/celebrity"),
            new MenuItem("Игра", host + "/categories/game"),
            new MenuItem("История", host + "/categories/story"),
            new MenuItem("Кастинг", host + "/categories/casting"),
            new MenuItem("Комический", host + "/categories/comic"),
            new MenuItem("Кончина", host + "/categories/cumshot"),
            new MenuItem("Кремовый пирог", host + "/categories/creampie"),
            new MenuItem("Латина", host + "/categories/latina"),
            new MenuItem("Лесбиянка", host + "/categories/lesbian"),
            new MenuItem("Лизать киску", host + "/categories/eating-pussy"),
            new MenuItem("Любительское порно", host + "/categories/amateur"),
            new MenuItem("Массаж", host + "/categories/massage"),
            new MenuItem("Медсестра", host + "/categories/nurse"),
            new MenuItem("Межрасовый секс", host + "/categories/interracial"),
            new MenuItem("МИЛФ", host + "/categories/milf"),
            new MenuItem("Милые", host + "/categories/cute"),
            new MenuItem("Минет", host + "/categories/blowjob"),
            new MenuItem("Миниатюрная", host + "/categories/petite"),
            new MenuItem("Миссионерская поза", host + "/categories/missionary"),
            new MenuItem("Монахиня", host + "/categories/nun"),
            new MenuItem("Мультфильмы", host + "/categories/cartoon"),
            new MenuItem("Негритянки", host + "/categories/black"),
            new MenuItem("Немецкое", host + "/categories/german"),
            new MenuItem("Офис", host + "/categories/office"),
            new MenuItem("Первый раз", host + "/categories/first-time"),
            new MenuItem("Пляж", host + "/categories/beach"),
            new MenuItem("Порно для женщин", host + "/categories/porn-for-women"),
            new MenuItem("Реслинг", host + "/categories/wrestling"),
            new MenuItem("Рогоносцы", host + "/categories/cuckold"),
            new MenuItem("Романтический", host + "/categories/romantic"),
            new MenuItem("Свингеры", host + "/categories/swingers"),
            new MenuItem("Сквирт", host + "/categories/squirting"),
            new MenuItem("Старик", host + "/categories/old-man"),
            new MenuItem("Старые с молодыми", host + "/categories/old-young"),
            new MenuItem("Тинейджеры (18+)", host + "/categories/teen"),
            new MenuItem("Толстушки", host + "/categories/bbw"),
            new MenuItem("Тренажерный зал", host + "/categories/gym"),
            new MenuItem("Узкая киска", host + "/categories/tight-pussy"),
            new MenuItem("Французское", host + "/categories/french"),
            new MenuItem("Футанари", host + "/categories/futanari"),
            new MenuItem("Хардкор", host + "/categories/hardcore"),
            new MenuItem("Хенджоб", host + "/categories/handjob"),
            new MenuItem("Хентай", host + "/categories/hentai"),
            new MenuItem("Японское", host + "/categories/japanese")
        ];

        var sortname = sortmenu.find(i => uri.includes(i.playlist_url));
        var catname = catmenu.find(i => uri.includes(i.playlist_url));

        const menu: MenuItem[] = [
            new MenuItem("Поиск", host + '/search', "search_on")
        ];

        if (!uri.includes('/categories/'))
            menu.push(new MenuItem("Сортировка: " + (sortname ? sortname.title : 'В тренде'), "submenu", undefined, sortmenu));

        menu.push(new MenuItem("Категория: " + (catname ? catname.title : 'Все'), "submenu", undefined, catmenu));

        return menu;
    }
}
