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
        iframe?: {
            pattern: string;
        };
        regexMatch?: {
            matches?: string[];
            pattern: string;
            format?: string;
        };
    };
}


export const CONFIGS: NextHubConfig[] = [
    {
        enable: true,
        displayname: "Lenkino",
        host: "https://wes.lenkino.adult",
        menu: {
            route: {
                cat: "{host}/{cat}/page/{page}",
                sort: "{host}/{sort}/page/{page}",
                catsort: "{host}/{cat}-top/page/{page}"
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
                "Хардкор": "hardcore",
                "МЖМ": "threesome-mmf",
                "Чешское порно": "czech",
                "Русское домашнее": "russian-amateur",
                "Молодые": "teen",
                "Старые с молодыми": "old-young",
                "Студенты": "student",
                "Азиатки": "asian",
                "Латинки": "latina",
                "Медсестра": "nurse",
                "Секретарша": "secretary",
                "Няня": "babysitter",
                "Черлидерша": "cheerleader",
                "Студентка": "schoolgirl",
                "Горничная": "maid",
                "Учительница": "teacher",
                "Блондинки": "blonde",
                "Брюнетки": "brunette",
                "Рыжие": "redhead",
                "Короткие волосы": "short-hair",
                "Длинные волосы": "long-hair",
                "Косички": "pigtails",
                "В ванной": "bathroom",
                "В машине": "car",
                "В офисе": "office",
                "В спальне": "bedroom",
                "В спортзале": "gym",
                "На кухне": "kitchen",
                "На пляже": "beach",
                "На природе": "outdoor",
                "На диване": "sofa",
                "На столе": "table",
                "Двойное проникновение": "double-penetration",
                "Крупным планом": "close-up",
                "Лижет попу": "rimjob",
                "Между сисек": "titjob",
                "Наездница": "cowgirl",
                "Оргазмы": "orgasm",
                "Поза 69": "69",
                "Раком": "doggy-style",
                "Сквирт": "squirt",
                "Стриптиз": "striptease",
                "Большие жопы": "big-ass",
                "Большой чёрный член": "bbc",
                "Большие члены": "big-cock",
                "Гибкие": "flexible",
                "Красивая грудь": "nice-tits",
                "Маленькие сиськи": "small-tits",
                "Натуральные сиськи": "natural-tits",
                "Красивые попки": "nice-ass",
                "Красивые": "beautiful",
                "Бритые письки": "shaved",
                "Волосатая пизда": "hairy",
                "Толстые": "bbw",
                "Худые": "skinny",
                "Силиконовые сиськи": "fake-tits",
                "Интимные стрижки": "trimmed",
                "Загорелые": "tanned",
                "Босс": "boss",
                "Доктор": "doctor",
                "Тренер": "trainer",
                "В красивом белье": "lingerie",
                "В чулках": "stockings",
                "На каблуках": "heels",
                "В гольфах": "socks",
                "Латекс": "latex",
                "С вибратором": "vibrator",
                "Дилдо": "dildo",
                "Евро": "european",
                "Йога": "yoga",
                "Куколд": "cuckold",
                "Межрассовое": "interracial",
                "На публике": "public",
                "Пикап": "pickup",
                "Свингеры": "swingers",
                "Секс-игрушки": "sex-toys",
                "Страпон": "strapon",
                "Анальная пробка": "buttplug",
                "Бондаж": "bondage",
                "Женское доминирование": "femdom",
                "Подчинение": "submissive",
                "Фистинг": "fisting",
                "Футфетиш": "footjob",
                "Негры": "black",
                "Негритянки": "ebony",
                "Негры с блондинками": "black-blonde",
                "Буккаке": "bukkake",
                "Сперма": "cumshot",
                "Сперма вытекает": "creampie",
                "Сперма на груди": "cum-on-tits",
                "Сперма на лице": "facial",
                "Глотает сперму": "cum-swallow",
                "Сперма на попе": "cum-on-ass",
                "Сперма на пизде": "cum-on-pussy"
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
            preview: { node: ".//img[@class='lzy']", attribute: "data-preview" },
            model: {
                name: { node: ".//a[@class='itm-opt-mdl len_pucl']" },
                href: { node: ".//a[@class='itm-opt-mdl len_pucl']", attribute: "href" }
            }
        },
        view: {
            related: true,
            regexMatch: {
                matches: ["alt_url", "url"],
                pattern: "video_{value}:[\\t ]+'([^']+)'"
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
    },
    {
        enable: true,
        displayname: "BigBoss",
        host: "https://bigboss.video",
        menu: {
            route: {
                cat: "{host}/category/{cat}_page-{page}.html",
                sort: "{host}/videos/{sort}_page-{page}.htm"
            },
            sort: {
                "Новинки": "",
                "Популярное": "popular"
            },
            categories: {
                "Азиатки": "aziatki",
                "Анальный секс": "anal",
                "Анилингус": "anilingys",
                "Аниме и Хентай": "hentai",
                "БДСМ": "bd-sm",
                "Беременные": "beremennie",
                "Бисексуалы": "bisexual",
                "Большие жопы": "big-butt",
                "Большие сиськи": "boooobs",
                "Большие члены": "big-penis",
                "Брат и сестра": "brat-i-sestra",
                "Вирт.Реальность (VR)": "vrporn",
                "Волосатая пизда": "hairy",
                "Всяко-разное": "other",
                "Гей порно": "hotgays",
                "Групповуха": "orgia",
                "Для женщин": "nice-sex",
                "Домашнее (любительское)": "domashka",
                "Дрочка девушкам": "drochka-telkam",
                "Дрочка парням": "drochka",
                "Жесткое (хардкор)": "hard-sex",
                "Записи приватов (Вебкам)": "webcam",
                "Знаменитости": "stars",
                "Зрелые": "zrelue",
                "Измены (муж куколд)": "cucold",
                "Инцест": "hot-incest",
                "Кастинг": "kasting",
                "Куннилингус": "kunilingus",
                "Лесбиянки": "lesbiyanka",
                "Мамки (МИЛФ)": "milf",
                "Межрасовый секс": "blackman",
                "Минет": "minet-video",
                "Молодые": "molodue",
                "Мультики": "sex-mult",
                "На лицо (камшоты)": "kamshotu",
                "От первого лица": "pov-sex",
                "Пародии и косплей": "parodii-i-kosplei",
                "Приколы (смешное)": "humor",
                "Ретро, старое": "retro-video",
                "Русское порно": "rus",
                "С неграми": "bbc",
                "Свингеры": "svingeru",
                "Секретарши": "sekretarshi",
                "Секс Вайф": "seks-vaif",
                "Скрытая камера": "spygazm",
                "Служанки, горничные": "slyzhanki",
                "Соло девушек": "solo-telki",
                "Соло парней": "solomen",
                "Студенты": "stydenti",
                "Толстые (толстушки)": "bbw",
                "Трансвеститы (трансы)": "lady-boy",
                "Фетиш": "fetish",
                "Фистинг": "fisting",
                "Эротика": "classic-sex"
            }
        },
        list: { uri: "latest/{page}/" },
        search: { uri: "search/{search}/page/{page}/" },
        contentParse: {
            nodes: "//div[contains(@class,'main__ct-items')]//div[contains(@class,'main__ct-item')]",
            name: { node: ".//div[contains(@class,'video-unit__caption')]" },
            href: { node: ".//a[contains(@class,'video-unit')]", attribute: "href" },
            img: { node: ".//img", attributes: ["data-src", "src"] }
        },
        view: {
            related: true,
            regexMatch: {
                matches: ["1080", "720", "480", "360"],
                pattern: "/(common/getvideo/video.mp4\\?q={value}&[^\", ]+)",
                format: "{host}/{value}"
            }
        }
    },
    {
        enable: true,
        displayname: "Ebasos",
        host: "https://wej.ebasos.club",
        menu: {
            route: {
                sort: "{host}/{sort}/{page}/",
                cat: "{host}/categories/{cat}/{page}/",
                catsort: "{host}/categories/{cat}/top/{page}/"
            },
            sort: {
                "Новое": "",
                "Лучшее": "top-rated"
            },
            categories: {
                "HD": "hd",
                "Азиатки": "aziatki",
                "Анал": "anal",
                "Блондинки": "blondinki",
                "Большие сиськи": "bolshie-siski",
                "Большие члены": "chleny-bolshie",
                "Волосатые": "volosatye",
                "Глубокая глотка": "glubokaya-glotka",
                "Групповое": "gruppovoe",
                "Девушка с девушкой": "lesbos",
                "Зрелые": "zrelye",
                "Инцест порно": "incest-porno",
                "Кастинг": "kasting",
                "Кремпай": "krempay",
                "Любительское": "lyubitelskoe",
                "Межрасовое": "mejrasovoe",
                "Минет": "minet",
                "Молодые": "molodenkie",
                "Ретро порно": "istoricheskoe",
                "Русское порно": "ruporno",
                "Толстые": "tolstye"
            }
        },
        list: { uri: "latest-updates/{page}/" },
        search: { uri: "search/{search}/{page}/" },
        contentParse: {
            nodes: "//div[@id='list_videos_common_videos_list_items']//div[contains(@class, 'item')]",
            name: { node: ".//span[contains(@class, 'title')]" },
            href: { node: ".//a", attribute: "href" },
            img: { node: ".//img[contains(@class,'thumb')]", attribute: "data-original" },
            duration: { node: ".//div[contains(@class, 'duration')]" }
        },
        view: {
            iframe: {
                pattern: "<iframe[^>]+ src=\"([^\"]+)\""
            },
            regexMatch: {
                matches: ["video_alt_url", "video_url"],
                pattern: "{value}:[\\t ]+'([^']+)'"
            }
        }
    },
    {
        enable: true,
        displayname: "Ebun",
        host: "https://www1.ebun.tv",
        menu: {
            route: {
                sort: "{host}/{sort}/{page}/",
                cat: "{host}/categories/{cat}/{page}/",
                catsort: "{host}/categories/{cat}/{sort}/{page}/"
            },
            sort: {
                "Новинки": "",
                "Топ рейтинга": "top-rated",
                "Популярнаe": "most-popular"
            },
            categories: {
                "Азиатки": "aziatki",
                "Американское": "amerikanskoe",
                "Анал": "anal",
                "Анилингус": "anilingus",
                "Арабское порно": "arabskoe-porno",
                "БДСМ": "bdsm",
                "Блондинки": "blondinki",
                "Большие сиськи": "bolshie-siski",
                "Большие члены": "bolshie-chleny",
                "Бондаж": "bondaj",
                "Брюнетки": "bryunetki",
                "В ванной": "v-vannoy",
                "В машине": "v-mashine",
                "Веб камера": "veb-kamera",
                "Вечеринки и вписки": "vecherinki-i-vpiski",
                "Волосатые": "volosatye",
                "Врачи и медсестры": "vrachi-i-medsestry",
                "Ганг банг": "gang-bang",
                "Гетры": "getry",
                "Глубокая глотка": "glubokaya-glotka",
                "Групповое": "gruppovoe",
                "Двойное проникновение": "dvoynoe-proniknovenie",
                "Дедушки": "dedushki",
                "Дилдо": "dildo",
                "Для женщин": "dlya-jenshchin",
                "Домашнее": "domashnee",
                "Дрочка": "drochka",
                "Ебля": "eblya",
                "Женское доминирование": "jenskoe-dominirovanie",
                "Жены": "jeny",
                "Жесткое": "jestkoe",
                "ЖМЖ": "jmj",
                "Жопы": "jopy",
                "За деньги": "za-dengi",
                "Зрелые": "zrelye",
                "Зрелые с молодыми": "zrelye-s-molodymi",
                "Игрушки": "igrushki",
                "Измена": "izmena",
                "Кастинг": "kasting",
                "Кастинг Вудмана": "kasting-vudmana",
                "Кончил в рот": "konchil-v-rot",
                "Красивые девушки": "krasivye-devushki",
                "Красивые сиськи": "krasivye-siski",
                "Кремпай": "krempay",
                "Крупным планом": "krupnym-planom",
                "Кунилингус": "kunilingus",
                "Латинки": "latinki",
                "Маленькие сиськи": "malenkie-siski",
                "Мамки": "mamki",
                "Массаж": "massaj",
                "Мастурбация": "masturbaciya",
                "Межрассовое": "mejrassovoe",
                "МЖМ": "mjm",
                "Минет": "minet",
                "Молодые": "molodye",
                "Мулатки": "mulatki",
                "На кухне": "na-kuhne",
                "На природе": "na-prirode",
                "На телефон": "na-telefon",
                "Негритянки": "negrityanki",
                "Негры": "negry",
                "Нежное": "nejnoe",
                "Немецкое": "nemeckoe",
                "Оргазмы": "orgazmy",
                "Оргия": "orgiya",
                "От первого лица": "ot-pervogo-lica",
                "Офис": "ofis",
                "Пизда крупно": "pizda-krupno",
                "Пикап": "pikap",
                "Подчинение": "podchinenie",
                "Порно ВК": "porno-vk",
                "Порно подборка": "porno-podborka",
                "Порно с разговорами": "porno-s-razgovorami",
                "Презерватив": "prezervativ",
                "Пьяные": "pyanye",
                "Раком": "rakom",
                "Русское": "russkoe",
                "Рыжие": "ryjie",
                "Свингеры": "svingery",
                "Секретарши": "sekretarshi",
                "Секс втроем": "seks-vtroem",
                "Сексвайф и куколд": "seksvayf-i-kukold",
                "Сквиртинг": "skvirting",
                "Скрытая камера": "skrytaya-kamera",
                "Сперма": "sperma",
                "Спящие": "spyashchie",
                "Страпон": "strapon",
                "Студенты": "studenty",
                "Татуировки": "tatuirovki",
                "Толстые": "tolstye",
                "Тренер": "trener",
                "Учитель": "uchitel",
                "Фетиш": "fetish",
                "Фильмы": "porno-filmy",
                "Фитоняшки": "fitonyashki",
                "Фут-фетиш": "fut-fetish",
                "Худые": "hudye",
                "Чешское": "cheshskoe",
                "Чулки и колготки": "chulki-i-kolgotki",
                "Эротика": "erotika",
                "Японское": "yaponskoe"
            }
        },
        list: { uri: "latest-updates/{page}/" },
        search: { uri: "search/{search}/{page}/" },
        contentParse: {
            nodes: "//div[contains(@class, 'item th-item item_new')]",
            name: { node: ".//div[@class='item-title']" },
            href: { node: ".//a", attribute: "href" },
            img: { node: ".//img", attribute: "data-src" },
            duration: { node: ".//div[@class='meta-time']" }
        },
        view: {
            iframe: {
                pattern: "<iframe[^>]+ src=\"([^\"]+)\""
            },
            regexMatch: {
                matches: ["video_alt_url", "video_url"],
                pattern: "{value}:[\\t ]+'([^']+)'"
            }
        }
    },
    {
        enable: true,
        displayname: "JopaOnline",
        host: "https://jopaonline.mobi",
        menu: {
            route: {
                sort: "{host}/{sort}/{page}",
                cat: "{host}/categories/{cat}/{page}",
                catsort: "{host}/categories/{cat}/{sort}/{page}"
            },
            sort: {
                "Новинки": "",
                "Топ рейтинга": "toprated",
                "Популярнаe": "popular"
            },
            categories: {
                "Мамки": "mamki",
                "Русское": "russkoe",
                "Жесткое": "zhestkoe",
                "Зрелые": "zrelye",
                "Измена": "izmena",
                "Красотки": "krasotki",
                "Домашнее": "domashnee",
                "Большие члены": "big-cock",
                "Групповое": "gruppovoe",
                "Анал": "anal",
                "Студенты": "studenty",
                "Азиатки": "asian",
                "Красивый секс": "krasiviy-seks",
                "Большие сиськи": "bolshie-siski",
                "Лесбиянки": "lesbiyanki",
                "Жопы": "zhopy",
                "Двойное проникновение": "dvoynoe-proniknovenie",
                "Молодые": "molodye",
                "Пикап": "pickap",
                "Мастурбация": "masturbation",
                "В ванной": "v-vannoi",
                "Негры": "s-negrami",
                "Мулатки": "mulatki",
                "Худые": "hudenkie",
                "Чулки": "stockings",
                "Раком": "rakom",
                "Минет": "minet",
                "Рыжие": "redhead",
                "Блондинки": "blonde",
                "Брюнетки": "bryunetki",
                "Межрасовое": "mejrassovyy"
            }
        },
        list: { uri: "{page}" },
        search: { uri: "search/{search}/{page}" },
        contentParse: {
            nodes: "//div[@class='th']",
            name: { node: ".//p" },
            href: { node: ".//a", attribute: "href" },
            img: { node: ".//img", attribute: "src" },
            duration: { node: ".//div[@class='th-duration']" },
            preview: { node: ".//img", attribute: "data-preview" }
        },
        view: {
            related: true,
            regexMatch: {
                matches: ["url3", "url2", "url"],
                pattern: "video_alt_{value}:[\\t ]+'([^']+)'"
            }
        }
    },
    {
        enable: true,
        displayname: "NoodleMagazine",
        host: "https://adult.noodlemagazine.com",
        menu: {
            route: {
                sort: "{host}/{sort}/week?p={page}"
            },
            sort: {
                "Новинки": "",
                "Популярное": "popular"
            }
        },
        list: { uri: "now?p={page}" },
        search: { uri: "video/{search}?p={page}" },
        contentParse: {
            nodes: "//div[contains(@class, 'item')]",
            name: { node: ".//div[@class='title']" },
            href: { node: ".//a", attribute: "href" },
            img: { node: ".//img", attribute: "data-src" },
            duration: { node: ".//div[@class='m_time']" },
            preview: { node: ".//div", attribute: "data-trailer_url" }
        },
        view: {
            related: true,
            regexMatch: {
                pattern: "\"file\":\"([^\"]+)\""
            }
        }
    }
]; 