import { NextHubConfig } from '../models/NextHubConfig';

export const LenpornoConfig: NextHubConfig = {
    enable: true,
    displayname: "Lenporno",
    host: "https://pepa.lenporno.xyz",
    menu: {
        route: {
            cat: "{host}/{cat}/{page}/",
            sort: "{host}/{sort}/{page}/"
        },
        sort: {
            "Новинки": "",
            "Лучшее": "the-best",
            "Популярнаe": "most-popular"
        },
        categories: {
            "Азиатское": "aziatskoye",
            "Анальное": "analnoye",
            "БДСМ": "bdsm",
            "Блондинки": "blondinki",
            "Большие дойки": "bolshiye-dojki",
            "Большие попки": "bolshiye-popki",
            "Большие члены": "bolshiye-chleny",
            "Брюнетки": "bryunetki",
            "В ванной": "v-vannoy",
            "В латексе": "v-latekse",
            "В лосинах": "v-losinakh",
            "В машине": "v-mashine",
            "В офисе": "v-ofise",
            "В чулках": "v-chulkakh",
            "Волосатые": "volosatyye",
            "Групповое": "gruppovoye",
            "Двойное проникновение": "dvoynoye-proniknoveniye",
            "Домашнее": "domashneye",
            "Доминирование": "dominirovaniye",
            "Дрочка": "drochka",
            "Жены": "gheny",
            "Жесткое": "zhestkoye",
            "Зрелые": "zrelyye",
            "Измена": "izmena",
            "Кастинг": "kasting",
            "Красотки": "krasotki",
            "Крупным планом": "krupnym-planom",
            "Лесбиянки": "lesbiyanki",
            "Мамки": "mamki",
            "Массаж": "massazh",
            "Мастурбация": "masturbatsiya",
            "МЖМ": "mzhm",
            "Минет": "minet",
            "Молодые": "molodyye",
            "Мулатки": "mulatki",
            "На природе": "na-prirode",
            "На публике": "na-publike",
            "Негры": "blacked",
            "Нежное": "nezhnoye",
            "Оргазмы": "orgazmy",
            "Оргии": "orgii",
            "От первого лица": "ot-pervogo-litsa",
            "Пародии": "parodii",
            "Пикап": "pikap",
            "Премиум": "premium",
            "Пьяные": "pyanyye",
            "Раком": "rakom",
            "Русское": "russkoye",
            "Рыжие": "ryzhiye",
            "Свингеры": "svingery",
            "Секретарши": "sekretarshi",
            "Секс игрушки": "seks-igrushki",
            "Сперма": "sperma",
            "Спящие": "spyashchiye",
            "Страпон": "strapon",
            "Студенты": "studenty",
            "Татуированные": "tatuirovannyye",
            "Толстушки": "tolstushki",
            "Фистинг": "fisting",
            "Худые": "khudyye",
            "Японское": "yaponskoye",
            "Brazzers": "brazzers",
            "Full HD": "full-hd"
        }
    },
    list: { uri: "new-update/{page}/" },
    search: { uri: "search/{search}/{page}/" },
    contentParse: {
        nodes: "//div[@class='innercont']",
        name: { node: ".//a[@class='preview_link']" },
        href: { node: ".//a[@class='preview_link']", attribute: "href" },
        img: { node: ".//img", attribute: "src" },
        duration: { node: ".//div[@class='duration']" }
    },
    view: {
        related: true,
        regexMatch: {
            matches: ["1080p", "720p", "480p", "360p"],
            pattern: "(https?://[^\\t\" ]+_{value}.mp4)"
        }
    }
}; 