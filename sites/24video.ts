import { NextHubConfig } from '../models/NextHubConfig';

export const Video24Config: NextHubConfig = {
    enable: true,
    displayname: "24video",
    host: "https://vk.24videos.cc",
    menu: {
        route: {
            cat: "{host}/{cat}/page-{page}/",
            sort: "{host}/{sort}/page-{page}/"
        },
        sort: {
            "Новинки": "",
            "Рейтинговое": "top-rated-porn",
            "Популярнаe": "most-popular-porn"
        },
        categories: {
            "Азиатское": "porno-aziatskoye",
            "Анальное": "porno-analnoye",
            "БДСМ": "porno-bdsm",
            "Блондинки": "porno-blondinki",
            "Большие дойки": "porno-bolshiye-dojki",
            "Большие попки": "porno-bolshiye-popki",
            "Большие члены": "porno-bolshiye-chleny",
            "Брюнетки": "porno-bryunetki",
            "В ванной": "porno-v-vannoy",
            "В латексе": "porno-v-latekse",
            "В лосинах": "porno-v-losinakh",
            "В машине": "porno-v-mashine",
            "В офисе": "porno-v-ofise",
            "В чулках": "porno-v-chulkakh",
            "Волосатые": "porno-volosatyye",
            "Групповое": "porno-gruppovoye",
            "Двойное проникнове": "porno-dvoynoye-proniknoveniye",
            "Домашнее": "porno-domashneye",
            "Доминирование": "porno-dominirovaniye",
            "Дрочка": "porno-drochka",
            "Жены": "porno-gheny",
            "Жесткое": "porno-zhestkoye",
            "Зрелые": "porno-zrelyye",
            "Измена": "porno-izmena",
            "Кастинг": "porno-kasting",
            "Красотки": "porno-krasotki",
            "Крупным планом": "porno-krupnym-planom",
            "Лесбиянки": "porno-lesbiyanki",
            "Мамки": "porno-mamki",
            "Массаж": "porno-massazh",
            "Мастурбация": "porno-masturbatsiya",
            "МЖМ": "porno-mzhm",
            "Минет": "porno-minet",
            "Молодые": "porno-molodyye",
            "Мулатки": "porno-mulatki",
            "На природе": "porno-na-prirode",
            "На публике": "porno-na-publike",
            "Негры": "porno-blacked",
            "Нежное": "porno-nezhnoye",
            "Оргазмы": "porno-orgazmy",
            "Оргии": "porno-orgii",
            "От первого лица": "porno-ot-pervogo-litsa",
            "Пародии": "porno-parodii",
            "Пикап": "porno-pikap",
            "Премиум": "porno-premium",
            "Пьяные": "porno-pyanyye",
            "Раком": "porno-rakom",
            "Русское": "porno-russkoye",
            "Рыжие": "porno-ryzhiye",
            "Свингеры": "porno-svingery",
            "Секретарши": "porno-sekretarshi",
            "Секс игрушки": "porno-seks-igrushki",
            "Сперма": "porno-sperma",
            "Спящие": "porno-spyashchiye",
            "Страпон": "porno-strapon",
            "Студенты": "porno-studenty",
            "Татуированные": "porno-tatuirovannyye",
            "Толстушки": "porno-tolstushki",
            "Фистинг": "porno-fisting",
            "Худые": "porno-khudyye"
        }
    },
    list: { uri: "page-{page}/" },
    search: { uri: "search/{search}/page-{page}/" },
    contentParse: {
        nodes: "//div[@class='item video-block']",
        name: { node: ".//div[@class='title']" },
        href: { node: ".//a", attribute: "href" },
        img: { node: ".//img", attribute: "data-original" },
        duration: { node: ".//span[@class='duration']" }
    },
    view: {
        related: true,
        regexMatch: {
            matches: ["1080p", "720p", "480p", "360p"],
            pattern: "(https://[^\",\\n\\r\\t ]+/JOPORN_NET_[0-9]+_{value}.mp4)"
        }
    }
}; 