import { NextHubConfig } from '../models/NextHubConfig';

export const VtraheTVConfig: NextHubConfig = {
    enable: true,
    displayname: "VtraheTV",
    host: "https://my.vtrahe.work",
    menu: {
        route: {
            sort: "{host}/{sort}/page/{page}/",
            cat: "{host}/{cat}/page/{page}/"
        },
        sort: {
            "Новинки": "",
            "Рейтинговое": "top",
            "Популярнаe": "most-popular"
        },
        categories: {
            "Азиатки": "aziatki",
            "Анал": "anal",
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
            "Brazzers": "brazzers",
            "Full HD": "porno-hd",
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
            "Японки": "yaponki"
        }
    },
    list: {
        uri: "page/{page}/"
    },
    search: {
        uri: "search/{search}/page/{page}/"
    },
    contentParse: {
        nodes: "//div[@class='innercont']",
        name: {
            node: ".//div[@class='preview_title']//a"
        },
        href: {
            node: ".//a",
            attribute: "href"
        },
        img: {
            node: ".//img",
            attribute: "src"
        },
        duration: {
            node: ".//div[@class='dlit']"
        }
    },
    view: {
        related: true,
        eval: `const match = html.match(/data-c="([^"]+)"/);
if (!match) return null;
const e = match[1].split(';');
return \`https://v\${e[7]}.cdnde.com/x\${e[7]}/upload_\${e[0].replace(/^_/, '')}/\${e[4]}/JOPORN_NET_\${e[4]}_\${e[1]}.mp4?time=\${e[5]}\`;`
    }
}; 