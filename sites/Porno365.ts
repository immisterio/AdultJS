import { NextHubConfig } from '../models/NextHubConfig';

export const Porno365Config: NextHubConfig = {
    enable: true,
    displayname: "Porno365",
    host: "https://porno365x.me",
    menu: {
        route: {
            cat: "{host}/{cat}/{page}/",
            sort: "{host}/{sort}/{page}/",
            catsort: "{host}/{cat}/{sort}/{page}/"
        },
        sort: {
            "Новинки": "",
            "Топ рейтинга": "toprated",
            "Топ просмотров": "popular"
        },
        categories: {
            "Азиатки": "aziatki",
            "Анал": "anal",
            "БДСМ": "bdsm",
            "Блондинки": "blondinki",
            "Большие дойки": "bolshiye-doyki",
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
            "Жены": "zheny",
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
            "Негры": "negry",
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
            "Татуированные": "tatuirovannyy",
            "Толстушки": "tolstushki",
            "Фистинг": "fisting",
            "Худые": "khudyye",
            "Японки": "yaponki",
            "Full HD": "porno-hd"
        }
    },
    list: { uri: "{page}/" },
    search: { uri: "search/{search}/{page}/" },
    contentParse: {
        nodes: "//li[contains(@class, ' trailer')]",
        name: { node: ".//p" },
        href: { node: ".//a[@class='image']", attribute: "href" },
        img: { node: ".//img", attribute: "src" },
        duration: { node: ".//span[@class='duration']" }
    },
    view: {
        related: true,
        regexMatch: {
            pattern: "file:[\\t ]+\"([^\"]+)\""
        }
    }
}; 