export interface NextHubConfig {
    enable: boolean;
    displayname: string;
    host: string;
    menu?: {
        route?: { [key: string]: string } | any;
        sort?: { [title: string]: string };
        categories?: { [title: string]: string };
    };
    list?: { uri: string };
    search?: { uri: string };
    contentParse: {
        nodes: string;
        name?: { node: string };
        href: { node: string; attribute?: string };
        img?: { node: string; attribute?: string; attributes?: string[] };
        duration?: { node: string };
        preview?: { node: string; attribute?: string };
        model?: {
            name?: { node: string };
            href?: { node: string; attribute?: string };
        }
    };
    view: {
        related?: boolean;
        regexMatch?: {
            matches?: string[];
            pattern: string;
            format?: string;
        };
    };
}

// Lenkino JSON converted from sites/lenkino.yaml (essential fields)
export const CONFIGS: NextHubConfig[] = [
    {
        enable: true,
        displayname: "Lenkino",
        host: "https://wes.lenkino.adult",
        menu: {
            route: {
                // we will use first route string if provided
                cat: "{host}/{cat}/page/{page}",
                sort: "{host}/{sort}/page/{page}",
                catsort: "{host}/{cat}-top/page/{page}",
                model: "{model}/page/{page}"
            },
            sort: {
                "Новые": "",
                "Лучшие": "top-porno",
                "Горячие": "hot-porno"
            },
            categories: {
                "Русское порно": "a1-russian",
                "Порно зрелых": "milf-porn",
                "Красивый секс": "beautiful",
                "Мачеха": "stepmom",
                "Анал": "anal-porno",
                "Большие сиськи": "big-tits",
                "Эротика": "erotic",
                "Лесби": "lesbi-porno",
                "Групповуха": "group-videos",
                "POV": "pov",
                "БДСМ": "bdsm",
                "Вебкамера": "webcam",
                "Ганг банг": "gangbang",
                "Домашнее порно": "amateur",
                "ЖМЖ": "threesome-ffm",
                "Кастинг": "casting",
                "Куни": "cunnilingus",
                "Массаж": "massage",
                "Мастурбация": "masturbation",
                "Минет": "blowjob",
                "Соло": "solo",
                "Хардкор": "hardcore"
            }
        },
        list: { uri: "page/{page}" },
        search: { uri: "search/{search}/page/{page}" },
        contentParse: {
            nodes: "//div[@class='item']",
            name: { node: ".//div[@class='itm-tit']" },
            href: { node: ".//a", attribute: "href" },
            img: { node: ".//img[@class='lzy']", attribute: "data-srcset" },
            duration: { node: ".//div[@class='itm-dur fnt-cs']" },
            preview: { node: ".//img[@class='lzy']", attribute: "data-preview" }
        },
        view: {
            related: true,
            regexMatch: {
                matches: ["video_alt_url", "video_url"],
                pattern: "{value}:[\t ]*'([^']+)'"
            }
        }
    },
    {
        enable: true,
        displayname: "Lenporno",
        host: "https://xxx.lenporno.xyz",
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
    }
]; 