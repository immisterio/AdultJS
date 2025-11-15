import { HttpClient } from '../engine/HttpClient';
import { Utils } from '../engine/Utils';
import { PlaylistItem } from '../models/PlaylistItem';
import { MenuItem } from '../models/MenuItem';

export class BongaCams {

    public static host: string = 'https://ukr.bongacams.com';

    async Invoke(reqUri: string) {
        let html = await HttpClient.Get(reqUri.replace('?pg=1', '').replace('pg=', 'page='));

        return {
            menu: this.Menu(reqUri),
            list: this.Playlist(html)
        };
    }


    Playlist(html: string): PlaylistItem[] {
        var playlists: PlaylistItem[] = [];

        if (!html || html.length === 0) {
            return playlists;
        }

        var rows = html.split(/class="(ls_thumb js-ls_thumb|mls_item mls_so_)/);

        rows.forEach(function (row) {
            var baba = Utils.extract(row, /data-chathost="([^"]+)"/);
            if (!baba) {
                return;
            }

            var esid = Utils.extract(row, /data-esid="([^"]+)"/);
            if (!esid) {
                return;
            }

            var img = Utils.extract(row, /this.src='\/\/([^']+\.(jpg))'/);
            if (!img) {
                img = Utils.extract(row, /src="\/\/([^"]+)"/);
            }

            if (!img) {
                return;
            }

            var title = Utils.extract(row, /lst_topic lst_data">(.*?)</);
            if (!title) {
                title = baba;
            }

            var quality = null;
            if (row.includes("__hd_plus __rt")) {
                quality = "HD+";
            } else if (row.includes("__hd __rtl")) {
                quality = "HD";
            }

            playlists.push(new PlaylistItem(
                title,
                "https://" + esid + ".bcvcdn.com/hls/stream_" + baba + "/public-aac/stream_" + baba + "/chunks.m3u8",
                "https://" + img,
                null, // preview
                null, // time
                quality,
                false,
                false,
                null
            ));
        });

        return playlists;
    }


    Menu(url: string): MenuItem[] {
        var host = BongaCams.host + '/';

        var sortmenu = [
            new MenuItem('Новые', host + 'new-models'),
            new MenuItem('Пары', host + 'couples'),
            new MenuItem('Девушки', host + 'female'),
            new MenuItem('Русские модели', host + 'female/tags/russian'),
            new MenuItem('Парни', host + 'male'),
            new MenuItem('Транссексуалы', host + 'trans')
        ]

        var sortname = sortmenu.find(i => url.includes(i.playlist_url.replace(host, '')));

        return [
            new MenuItem("Сортировка: " + (sortname ? sortname.title : 'Новые'), "submenu", undefined, sortmenu)
        ];
    }
}
