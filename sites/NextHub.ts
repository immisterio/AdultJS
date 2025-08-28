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
    },
    {
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
    }
]; 