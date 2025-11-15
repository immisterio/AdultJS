import { NextHubConfig } from '../models/NextHubConfig';

export const PorntrexConfig: NextHubConfig = {
    enable: true,
    displayname: "Porntrex",
    host: "https://www.porntrex.com",
    menu: {
        route: {
            sort: "{host}/{sort}/{page}/",
            cat: "{host}/categories/{cat}/{page}/"
        },
        sort: {
            "Новинки": "",
            "Популярное": "most-popular",
            "Топ рейтинга": "top-rated",
            "Длинные": "longest"
        },
        categories: {
            "3D": "3d",
            "Аматорское": "amateur",
            "Анальное": "anal",
            "Азиатки": "asian",
            "BBW": "bbw",
            "Большие попы": "big-ass",
            "Большие члены": "big-dick",
            "Большие сиськи": "big-tits",
            "Блондинки": "blonde",
            "Минет": "blowjob",
            "Брюнетки": "brunette",
            "Кримпай": "creampie",
            "Сперма": "cumshot",
            "Эбони": "ebony",
            "Фетиш": "fetish",
            "Гангбанг": "gangbang",
            "Ручная работа": "handjob",
            "Хардкор": "hardcore",
            "Межрасовое": "interracial",
            "Латинки": "latina",
            "Лесби": "lesbian",
            "МИЛФ": "milf",
            "Оргия": "orgy",
            "POV": "pov",
            "Публичное": "public",
            "Рыжие": "redhead",
            "Транс": "shemale",
            "Тин": "teen",
            "Трое": "threesome",
            "Винтаж": "vintage"
        }
    },
    list: { uri: "latest-updates/{page}/" },
    search: { uri: "search/{search}/latest-updates/{page}/" },
    contentParse: {
        nodes: "//div[contains(@class,'video-preview-screen')]",
        name: {
            node: ".//p[@class='inf']//a"
        },
        href: {
            node: ".//a",
            attribute: "href"
        },
        img: {
            node: ".//img",
            attributes: ["data-src", "src"]
        },
        duration: {
            node: ".//div[@class='durations']"
        }
    },
    view: {
        related: true,
        regexMatch: {
            matches: ["2160p", "1440p", "1080p", "720p", "480p", "360p"],
            pattern: "'(https?://[^/]+/get_file/[^']+_{value}.mp4/)'"
        }
    }
};
