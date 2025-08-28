import { NextHubConfig } from '../models/NextHubConfig';

export const VtraheConfig: NextHubConfig = {
    enable: true,
    displayname: "Vtrahe",
    host: "https://vtrahehd.tv",
    charset: "windows-1251",
    menu: {
        route: {
            sort: "{host}/{sort}",
            cat: "{host}/{cat}/page/{page}/"
        },
        sort: {
            "Новинки": "",
            "Рейтинговое": "top/page/{page}/",
            "Популярнаe": "most-popular/page/{page}/"
        },
        categories: {
            "Full HD": "fullhd",
            "Азиатки": "aziatskoe-porno",
            "Анал": "analnoe-porno",
            "Большие сиськи": "bolshie-siski",
            "Большие члены": "bolshie-chleny",
            "Групповое": "gruppovoe-porno",
            "Домашнее": "domashnee-porno",
            "Зрелые": "zrelye-zhenshhiny",
            "Кастинг": "kastingi",
            "Кончающие": "konchayushhie",
            "Мастурбация": "drochka-i-masturbaciya",
            "Минет": "minet-i-oralnyj-seks",
            "Негры": "porno-s-negrami-i-mulatkami",
            "Вечеринки": "porno-vecherinki",
            "Звезды": "porno-zvyozdy",
            "До 35 лет": "porno-35",
            "Пародии": "porno-parodies",
            "Пьяные": "seks-po-pyani",
            "Русское": "russkoe-porno",
            "Секс на улице": "seks-na-ulice-i-nudisty",
            "Скрытая камера": "skrytaya-kamera",
            "Сперма": "sperma",
            "Толстые": "tolstushki",
            "Фетиш": "fetish-i-prochee",
            "Лучшее порно": "sorts",
            "3D": "3d-porno"
        }
    },
    list: { uri: "latest-updates/page/{page}/", firstpage: "" },
    search: { uri: "?do=search&subaction=search&search_start={page}&full_search=0&result_from=25&story={search}" },
    contentParse: {
        nodes: "//div[@class='innercont']",
        name: { node: ".//div[@class='preview_title']//a" },
        href: { node: ".//a", attribute: "href" },
        img: { node: ".//img", attribute: "src" },
        duration: { node: ".//div[@class='dlit']" }
    },
    view: {
        related: true,
        eval: `const match = html.match(/data-c="([^"]+)"/);
if (!match) return null;
const e = match[1].split(';');
const videoId = parseInt(e[4]) || 0;
const folder = 1000 * Math.floor(videoId / 1000);
const qualitySuffix = e[1] === "720p" ? "" : "_" + e[1];
return \`https://\${e[7]}.vstor.top/whlvid/\${e[5]}/\${e[6]}/\${folder}/\${videoId}/\${videoId}\${qualitySuffix}.mp4/\${videoId}\${qualitySuffix}.mp4\`;`
    }
}; 