import { HttpClient } from '../engine/HttpClient';
import { Utils } from '../engine/Utils';
import { PlaylistItem } from '../models/PlaylistItem';
import { MenuItem } from '../models/MenuItem';
import { StreamLinksResult, StreamLinksUnified } from '../models/StreamLinksResult';

export class Xvideos {
    public static host: string = 'https://www.xv-ru.com';

    async Invoke(reqUri: string) {
        if (reqUri.includes('/video')) {
            const html = await HttpClient.Get(reqUri);
            return new StreamLinksUnified(this.StreamLinks(html), reqUri.includes('&related'));
        }
        else
        {
            const urlObj = new URL(reqUri, Xvideos.host);
            const search = urlObj.searchParams.get('search') || '';
            const sort = urlObj.searchParams.get('sort') || '';
            const c = urlObj.searchParams.get('c') || '';
            const pg = parseInt(urlObj.searchParams.get('pg') || '1', 10);

            const url = this.buildUrl(Xvideos.host, search, sort, c, pg);
            const html = await HttpClient.Get(url);

            return {
                menu: this.Menu(sort, c),
                list: this.Playlist(html)
            };
        }
    }

    buildUrl(host: string, search: string, sort: string, c: string, pg: number): string {
        if (search) {
            return `${host}/?k=${encodeURIComponent(search)}&p=${pg}`;
        } else if (c) {
            return `${host}/c/s:${sort === 'top' ? 'rating' : 'uploaddate'}/${c}/${pg}`;
        } else {
            if (sort === 'top') {
                return `${host}/best/${this.getLastMonth()}/${pg}`;
            } else {
                return `${host}/new/${pg}`;
            }
        }
    }

    getLastMonth(): string {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        return d.toISOString().slice(0, 7);
    }

    Playlist(html: string): PlaylistItem[] {
        if (!html) return [];
        const rows = html.split('<div id="video');
        const playlists: PlaylistItem[] = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            var g = /<a href="\/(video[^"]+|search-video\/[^"]+)" title="([^"]+)"/.exec(row);
            if (!g || !g[1] || !g[2]) {
                // <a href="/video.ohpbioo5118/_." target="_blank">Я думал, что не переживу его наказания.</a>
                g = /<a href="\/(video[^"]+)"[^>]+>([^<]+)/.exec(row);
                if (!g || !g[1] || !g[2])
                    continue;
            }
            const qmark = Utils.extract(row, /<span class="video-hd-mark">([^<]+)<\/span>/);
            const duration = Utils.extract(row, /<span class="duration">([^<]+)<\/span>/);
            let img = Utils.extract(row, /data-src="([^"]+)"/);
            if (img) {
                img = img.replace(/\/videos\/thumbs([0-9]+)\//, '/videos/thumbs$1lll/');
                img = img.replace(/\.THUMBNUM\.(jpg|png)$/i, '.1.$1');
                img = img.replace('thumbs169l/', 'thumbs169lll/').replace('thumbs169ll/', 'thumbs169lll/');
            } else {
                img = '';
            }
            let preview = img.replace(/\/thumbs[^/]+\//, '/videopreview/');
            preview = preview.replace(/\/[^/]+$/, '');
            preview = preview.replace(/-[0-9]+$/, '');

            playlists.push(new PlaylistItem(
                g[2],
                `${Xvideos.host}/${g[1]}`,
                img,
                preview + '_169.mp4',
                duration || null,
                qmark || null,
                true,
                true
            ));
        }
        return playlists;
    }

    Menu(sort: string, c: string): MenuItem[] {
        const url = Xvideos.host ;
        const menu: MenuItem[] = [
            new MenuItem('Поиск', url, 'search_on')
        ];
        const menusort = new MenuItem(
            `Сортировка: ${sort === 'like' ? 'Понравившиеся' : sort === 'top' ? 'Лучшие' : 'Новое'}`,
            'submenu',
            undefined,
            [
                new MenuItem('Новое', url + `?c=${c}`),
                new MenuItem('Лучшие', url + `?sort=top&c=${c}`)
            ]
        );
        menu.push(menusort);

        const catmenu = [
            new MenuItem("Все", url + `?sort=${sort}`),
            new MenuItem("Азиат", url + `?sort=${sort}&c=Asian_Woman-32`),
            new MenuItem("Анал", url + `?sort=${sort}&c=Anal-12`),
            new MenuItem("Арабки", url + `?sort=${sort}&c=Arab-159`),
            new MenuItem("Бисексуалы", url + `?sort=${sort}&c=Bi_Sexual-62`),
            new MenuItem("Блондинки", url + `?sort=${sort}&c=Blonde-20`),
            new MenuItem("Большие Попы", url + `?sort=${sort}&c=Big_Ass-24`),
            new MenuItem("Большие Сиськи", url + `?sort=${sort}&c=Big_Tits-23`),
            new MenuItem("Большие яйца", url + `?sort=${sort}&c=Big_Cock-34`),
            new MenuItem("Брюнетки", url + `?sort=${sort}&c=Brunette-25`),
            new MenuItem("В масле", url + `?sort=${sort}&c=Oiled-22`),
            new MenuItem("Веб камеры", url + `?sort=${sort}&c=Cam_Porn-58`),
            new MenuItem("Гэнгбэнг", url + `?sort=${sort}&c=Gangbang-69`),
            new MenuItem("Зияющие отверстия", url + `?sort=${sort}&c=Gapes-167`),
            new MenuItem("Зрелые", url + `?sort=${sort}&c=Mature-38`),
            new MenuItem("Индийский", url + `?sort=${sort}&c=Indian-89`),
            new MenuItem("Испорченная семья", url + `?sort=${sort}&c=Fucked_Up_Family-81`),
            new MenuItem("Кончает внутрь", url + `?sort=${sort}&c=Creampie-40`),
            new MenuItem("Куколд / Горячая Жена", url + `?sort=${sort}&c=Cuckold-237`),
            new MenuItem("Латинки", url + `?sort=${sort}&c=Latina-16`),
            new MenuItem("Лесбиянки", url + `?sort=${sort}&c=Lesbian-26`),
            new MenuItem("Любительское порно", url + `?sort=${sort}&c=Amateur-65`),
            new MenuItem("Мамочки. МИЛФ", url + `?sort=${sort}&c=Milf-19`),
            new MenuItem("Межрассовые", url + `?sort=${sort}&c=Interracial-27`),
            new MenuItem("Минет", url + `?sort=${sort}&c=Blowjob-15`),
            new MenuItem("Нижнее бельё", url + `?sort=${sort}&c=Lingerie-83`),
            new MenuItem("Попки", url + `?sort=${sort}&c=Ass-14`),
            new MenuItem("Рыжие", url + `?sort=${sort}&c=Redhead-31`),
            new MenuItem("Сквиртинг", url + `?sort=${sort}&c=Squirting-56`),
            new MenuItem("Соло", url + `?sort=${sort}&c=Solo_and_Masturbation-33`),
            new MenuItem("Сперма", url + `?sort=${sort}&c=Cumshot-18`),
            new MenuItem("Тинейджеры", url + `?sort=${sort}&c=Teen-13`),
            new MenuItem("Фемдом", url + `?sort=${sort}&c=Femdom-235`),
            new MenuItem("Фистинг", url + `?sort=${sort}&c=Fisting-165`),
            new MenuItem("Черные Женщины", url + `?sort=${sort}&c=bbw-51`),
            new MenuItem("Черный", url + `?sort=${sort}&c=Black_Woman-30`),
            new MenuItem("Чулки,колготки", url + `?sort=${sort}&c=Stockings-28`),
            new MenuItem("ASMR", url + `?sort=${sort}&c=ASMR-229`)
        ];
        menu.push(new MenuItem(
            `Категория: ${catmenu.find(i => i.playlist_url.endsWith(`c=${c}`))?.title || 'все'}`,
            'submenu',
            undefined,
            catmenu
        ));
        return menu;
    }

    StreamLinks(html: string): StreamLinksResult {
        const stream_link = Utils.extract(html, /html5player\.setVideoHLS\('([^']+)'\);/);
        if (!stream_link)
            return new StreamLinksResult({}, []);
        const related: PlaylistItem[] = [];
        const json = Utils.extract(html, /video_related=([^\n\r]+);window/);
        if (json && json.startsWith('[') && json.endsWith(']')) {
            try {
                const arr = JSON.parse(json);
                for (const r of arr) {
                    if (!r.tf || !r.u || !r.if) continue;
                    let preview = r.if.replace(/\/thumbs[^/]+\//, '/videopreview/');
                    preview = preview.replace(/\/[^/]+$/, '');
                    preview = preview.replace(/-[0-9]+$/, '');
                    related.push(new PlaylistItem(
                        r.tf,
                        `${Xvideos.host}${r.u}`,
                        r.if,
                        preview + '_169.mp4',
                        r.d || '',
                        null,
                        true,
                        true
                    ));
                }
            } catch { }
        }
        return new StreamLinksResult({ auto: stream_link }, related);
    }
} 