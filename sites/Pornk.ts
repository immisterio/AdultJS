import { NextHubConfig } from '../models/NextHubConfig';

export const PornkConfig: NextHubConfig = {
    enable: true,
    displayname: "Pornk",
    host: "https://ps.pornk.top",
    menu: {
        route: {
            sort: "{host}/{sort}/week/{page}/",
            cat: "{host}/categories/{cat}/{page}/"
        },
        sort: {
            "Новинки": "",
            "Топ рейтинга": "top-rated",
            "Популярное": "most-popular"
        },
        categories: {
            "Красотки": "krasotki",
            "БДСМ": "bdsm",
            "Гангбанг": "gangbang",
            "Сквиртинг": "skvirting",
            "Нижнее белье": "nijnee-bele",
            "Куколд": "kukold",
            "Толстые": "tolstye",
            "Зрелые": "zrelye",
            "Ретро": "retro",
            "Групповуха": "gruppovuha",
            "Дрочка": "drochka",
            "Игрушки": "igrushki",
            "Выстрелы спермы": "vystrely-spermy",
            "На природе": "na-prirode",
            "Мастурбация": "masturbatsiya",
            "Двойное проникновение": "dvoiynoe-proniknovenie",
            "Лесби": "lesbi",
            "Любительское": "lyubitelskoe",
            "Блондинки": "blondinki"
        }
    },
    list: { uri: "latest-updates/{page}/" },
    search: { uri: "search/{search}/{page}/" },
    contentParse: {
        nodes: "//a[contains(@class, 'preview')]",
        name: { node: ".//span[@class='preview-title']" },
        href: { node: ".", attribute: "href" },
        img: { node: ".//img", attribute: "src" },
        duration: { node: ".//span[@class='preview-duration']" }
    },
    view: {
        related: true,
        regexMatch: {
            matches: ["1080p", "720p", "480p", "360p"],
            pattern: "/(get_file/[^', ]+_{value}.mp4)",
            format: "{host}/{value}"
        }
    }
}; 