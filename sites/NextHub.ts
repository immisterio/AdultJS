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
    },
    {
        enable: true,
        displayname: "Porndig",
        host: "https://www.porndig.com",
        menu: {
            route: {
                cat: "{host}/channels/{cat}/page/{page}"
            },
            categories: {
                "4K": "1172/uhd-4k",
                "Анал": "33/anal",
                "Анал Вирджины": "89/anal-virgins",
                "Арабки": "91/arab",
                "Азиатки": "38/asian",
                "BBW": "46/bbw",
                "БДСМ": "55/bondage-bdsm",
                "Пляжное порно": "1240/beach-porn",
                "Большие попы": "1198/big-ass",
                "Большие сиськи": "43/big-boobs",
                "Большие члены": "802/big-dick",
                "Черные": "45/black",
                "Черные попы": "878/black-booty",
                "Блондинки": "36/blonde",
                "Минет": "52/blowjob",
                "Бокеп": "1241/bokep",
                "Брюнетки": "63/brunette",
                "Буккаке": "59/bukkake",
                "CFNM": "1226/cfnm",
                "Кастинг": "87/casting-porno",
                "Компиляция": "1127/compilation",
                "Косплей": "1233/cosplay",
                "Кримпай": "47/creampie",
                "Куколд": "1236/cuckold",
                "Глотание спермы": "35/cum-swallowing",
                "Сперма": "799/cumshot",
                "Кунилингус": "1173/cunnilingus",
                "Глубокий минет": "80/deep-throat",
                "Доминирование": "73/domination",
                "Двойное проникновение": "64/double-penetration",
                "Эмо Готика": "83/emo-gothic",
                "Европейское": "1117/european",
                "Бывшая девушка": "820/ex-girlfriend",
                "Эксгибиционизм": "803/exhibitionist",
                "Экстрим": "807/extreme",
                "Факал": "50/facial-ejaculation",
                "Женское": "65/female-friendly",
                "Фемдом": "1225/femdom",
                "Фетиш": "57/fetish",
                "Фистинг": "66/fist-fucking",
                "Фут фетиш": "875/foot-fetish",
                "Full HD": "882/full-hd",
                "Гангбанг": "82/gangbang",
                "Глорихол": "1199/gloryhole",
                "Золотой дождь": "85/golden-shower",
                "Бабушки": "814/grandma",
                "Волосатая пизда": "855/hairy-pussy",
                "Хардкор": "1235/hardcore",
                "Хентай": "51/hentai",
                "Хентай 3D": "1230/hentai-3d",
                "Хентай без цензуры": "1231/hentai-uncensored",
                "Межрасовое": "53/interracial",
                "Латинки": "54/latina",
                "Лесби": "40/lesbian",
                "МИЛФ": "39/milf",
                "Массаж": "74/massage",
                "Мастурбация": "48/masturbation",
                "Зрелые": "41/mature",
                "Зрелые и молодые": "77/mature-and-young-guy",
                "Карлики": "87/midgets",
                "Натуральные большие сиськи": "93/natural-big-tits",
                "Медсестра": "1234/nurse",
                "Масло": "1175/oil",
                "Старик и подростки": "76/old-man-young-girl",
                "Оргия": "42/orgy",
                "На природе": "884/outdoor",
                "POV": "58/pov",
                "Порнозвезды": "879/pornstar",
                "Беременные": "860/pregnant",
                "Рыжие": "60/redhead",
                "Римминг": "1125/rimming",
                "Секретарша": "115/secretary",
                "Секс игрушки": "856/sextoys",
                "Сексуальное белье": "75/sexy-lingerie",
                "Маленькие сиськи": "67/small-tits",
                "Курение": "822/smoking",
                "Мягкое": "805/soft",
                "Соло": "178/solo",
                "Подглядывание": "810/spying",
                "Сквирт": "68/squirters",
                "Сводная семья": "1197/step-family",
                "Чулки": "816/stockings",
                "Страпон": "819/strapon",
                "Студентки": "79/student",
                "Трое": "1043/threesome",
                "Титфак": "86/tit-wank",
                "Униформа": "84/uniforms",
                "Апскирт": "1227/upskirt",
                "Винтаж": "850/vintage",
                "Жесткий секс": "1042/violent-sex",
                "Девственницы": "88/virgin",
                "Вебкамера": "70/webcam",
                "XXX Сценарии": "90/xxx-scenario",
                "Молодые": "34/young",
                "Молодые черные": "812/young-black"
            }
        },
        list: { uri: "video/page/{page}" },
        search: { uri: "channels/33/{search}/page/{page}" },
        contentParse: {
            nodes: "//section[contains(@class, 'video_item_wrapper even_item video_item_medium')]",
            name: { node: ".//a" },
            href: { node: ".//a", attribute: "href" },
            img: { node: ".//img[@class='thumb_preview hidden']", attribute: "data-src" },
            duration: { node: ".//div[@class='bubble bubble_duration']//span" },
            preview: { node: ".//img[contains(@class, 'js_video_preview')]", attribute: "data-vid" }
        },
        view: {
            related: true,
            iframe: {
                pattern: "<link rel=\"prefetch\" as=\"document\" href=\"([^\"]+)\""
            },
            regexMatch: {
                matches: ["/master.mpd", "_2160.mp4", "_1080.mp4", "_720.mp4", "_540.mp4", "_468.mp4", "_360.mp4"],
                pattern: "\"src\":\"([^\"]+{value})\""
            }
        }
    },
    {
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
    },
    {
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
    },
    {
        enable: true,
        displayname: "Porno666",
        host: "https://wwwp.porno666.news",
        menu: {
            route: {
                cat: "{host}/categories/{cat}/{page}/",
                sort: "{host}/{sort}"
            },
            sort: {
                "Новинки": "",
                "Лучшее": "top-rated/{page}/",
                "Популярнаe": "most-popular/{page}/"
            },
            categories: {
                "Азиатки": "aziatki",
                "Анал": "analnyy-seks",
                "БДСМ": "bdsm",
                "Блондинки": "blondinki",
                "Большие сиськи": "bolshie-siski",
                "Большие члены": "bolshie-chleny",
                "Брюнетки": "bryunetki",
                "Волосатые": "volosatye",
                "Групповое": "gruppovoe",
                "Домашнее порно": "domashnee-i-chastnoe",
                "Жены": "jeny",
                "Жесткое": "jestkoe",
                "Жопы": "jopy",
                "Зрелые": "zrelye",
                "Игрушки": "igrushki",
                "Измена": "izmena",
                "Кастинг": "kasting",
                "Мамки": "mamki",
                "Массаж": "massaj",
                "Мастурбация": "masturbaciya",
                "Минет": "minet",
                "Молодые": "molodye",
                "Не постановочное": "ne-postanovochnoe",
                "Негры": "negry",
                "Оргазмы": "orgazmy",
                "Пикап": "pikap",
                "Порно ВК": "porno-vk",
                "Порно фильмы": "porno-film",
                "Пьяные": "pyanye",
                "Раком": "rakom",
                "Русское порно": "russkoe",
                "Рыжие": "ryjie",
                "Свингеры": "svingery",
                "Секс втроем": "seks-vtroem",
                "Сперма": "sperma",
                "Спящие": "spyashchie",
                "Страпон": "strapon",
                "Студенты": "studenty",
                "Толстые": "tolstye",
                "Худые": "hudye",
                "Чулки и колготки": "chulki-i-kolgotki",
                "Японское": "yaponskoe"
            }
        },
        list: { uri: "latest-updates/{page}/" },
        search: { uri: "search/{search}/{page}/" },
        contentParse: {
            nodes: "//div[@class='item trailer']",
            name: { node: ".//strong" },
            href: { node: ".//a", attribute: "href" },
            img: { node: ".//img", attribute: "data-original" },
            duration: { node: ".//div[@class='duration']" },
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
        displayname: "PornoBriz",
        host: "https://pornobriz.com",
        menu: {
            route: {
                cat: "{host}/{cat}/page{page}/",
                sort: "{host}/{sort}/page{page}/"
            },
            categories: {
                "Азиатки": "asian",
                "Анальный секс": "anal",
                "БДСМ": "bdsm",
                "Блондинки": "blonde",
                "Большая жопа": "big_ass",
                "Большие сиськи": "big_tits",
                "Большой член": "big_dick",
                "Бритая киска": "shaved",
                "Брюнетки": "brunette",
                "В одежде": "clothes",
                "Волосатые киски": "hairy",
                "Глотают сперму": "swallow",
                "Глубокая глотка": "deepthroat",
                "Групповой секс": "group",
                "Двойное проникновение": "double_penetration",
                "Длинноволосые девушки": "long_hair",
                "Дрочат": "wanking",
                "Жесткий секс": "hardcore",
                "ЖМЖ порно": "ffm",
                "Игрушки": "toys",
                "Казашки": "kazakh",
                "Камшот": "cumshot",
                "Кончают в рот": "cum_in_mouth",
                "Красивая задница": "perfect_ass",
                "Красивое белье": "lingerine",
                "Красивые девушки": "beautiful",
                "Красивые сиськи": "beautiful_tits",
                "Крупным планом": "close_up",
                "Кунилингус": "pussy_licking",
                "Лесбиянки": "lesbian",
                "Любительское порно": "amateur",
                "Маленькие девушки": "petite",
                "Маленькие сиськи": "small_tits",
                "Мамочки": "milf",
                "Мастурбация": "masturbation",
                "Межрасовое": "interracial",
                "МЖМ порно": "mfm",
                "Милашки": "cute",
                "Минет": "blowjob",
                "Молодые": "seks-molodye",
                "На природе": "outdoor",
                "На публике": "public",
                "Наездницы": "riding",
                "Негритянки": "ebony",
                "Оргазм": "orgasm",
                "От первого лица": "pov",
                "Писают": "peeing",
                "Поцелуи": "kissing",
                "Рвотные позывы": "gagging",
                "Реальный секс": "reality",
                "Римминг": "rimming",
                "Романтическое": "romantic",
                "Русское порно": "russian",
                "Рыжие": "redhead",
                "С японками": "japanese",
                "Секс втроем": "threesome",
                "Секс раком": "doggystyle",
                "Симпатичные": "babe",
                "Сквиртинг": "squirting",
                "Соло девушек": "solo_girl",
                "Сперма в жопе": "creampie",
                "Сперма на груди": "cum_on_tits",
                "Сперма на лице": "facial",
                "Страпон": "strap-on",
                "Стриптиз": "striptease",
                "Темноволосые": "black-haired",
                "Фетиш": "fetish",
                "Фингеринг": "fingering",
                "Фистинг": "fisting",
                "Худые девушки": "skinny",
                "Чулки": "stockings",
                "Эротика": "erotika"
            }
        },
        list: { uri: "new/page{page}/" },
        search: { uri: "search/{search}/page{page}/" },
        contentParse: {
            nodes: "//div[contains(@class, 'thumb_main')]",
            name: { node: ".//div[@class='th-title']" },
            href: { node: ".//a", attribute: "href" },
            img: { node: ".//img", attribute: "data-original" },
            duration: { node: ".//div[@class='duration']" },
            preview: { node: ".//video", attribute: "data-preview" }
        },
        view: {
            iframe: {
                pattern: "<iframe[^>]+ src=\"([^\"]+)\""
            },
            regexMatch: {
                matches: ["720", "480", "240"],
                pattern: "src=\"([^\"]+)\" type=\"video/mp4\" size=\"{value}\""
            }
        }
    },
    {
        enable: true,
        displayname: "SemBatsa",
        host: "https://sem.batsa.pro",
        menu: {
            route: {
                sort: "{host}/{sort}/monthly?page={page}",
                cat: "{host}/{cat}?page={page}"
            },
            sort: {
                "Новое": "",
                "Топ рейтинга": "top-rated",
                "Топ просмотров": "most-popular"
            },
            categories: {
                "Разговоры на русском": "razgovory-na-russkom",
                "Порно молодых": "porno-molodyih",
                "Русское порно": "russkoe-porno",
                "Порно мамки": "porno-mamki",
                "Анальное порно": "analnoe-porno",
                "Измены": "izmenyi",
                "Эротика": "erotic",
                "Украинское порно": "ukrainskoe-porno",
                "Групповуха": "gruppovuha",
                "Большие сиськи": "bolshie-siski",
                "Семейное": "semeynoe",
                "Жесткое порно": "jestkoe-porno",
                "Учителя": "uchitelya",
                "Массаж": "massaj",
                "Большие члены": "bolshie-chleny",
                "Бабули и дедули": "babuli-i-deduli",
                "Азиатки": "aziatki",
                "Зрелые дамы": "zrelyie-damy",
                "Домашнее порно": "domashnee-porno",
                "Сперма на лицо": "sperma-na-litso",
                "Секс по принуждению": "seks-po-prinujdeniyu",
                "Лишение невинности": "lishenie-nevinnosti",
                "В публичных местах": "v-publichnyih-mestah",
                "Трах в два члена": "trah-v-dva-chlena",
                "Порно от первого лица": "porno-ot-pervogo-litsa",
                "Сквирт": "skvirt",
                "Арабское порно": "arabskoe-porno",
                "Негры": "negryi",
                "Волосатые киски": "volosaty-kiski",
                "Глубокий минет": "glubokiy-minet",
                "Нежное порно": "nejnoe-porno",
                "Пьяные": "pyany",
                "Толстухи": "tolstuhi",
                "Мастурбация": "masturbatsiya",
                "БДСМ порно": "bdsm-porno",
                "Короткие видео": "korotkie-video",
                "Порно фильмы": "porno-filmy",
                "Порнозвезды": "pornozvedyi",
                "Секс игрушки": "seks-igrushki",
                "Трах на работе": "trah-na-rabote",
                "Порно вечеринки": "porno-vecherinki",
                "Порно кастинги": "porno-kastingi",
                "Свингеры": "svingery",
                "Фистинг": "fisting",
                "Женское доминирование": "jenskoe-dominirovanie",
                "Латиночки": "latinochki",
                "Рыжие малышки": "ryijie-malyishki",
                "Маленькие сиськи": "malenkie-siski",
                "Брюнетки": "bryunetki",
                "Секс на улице": "seks-na-ulitse",
                "Татуировки": "tatuirovki",
                "Блондинки": "blondinki",
                "Студенты": "studenty",
                "Фетиш секс": "fetish-seks",
                "Межрассовое порно": "mejrassovoe-porno",
                "Лесбухи": "lesbuhi",
                "Секс втроем": "seks-vtroem",
                "Вылизывание писек": "vyilizyivanie-pisek",
                "Крупным планом": "krupnyim-planom",
                "Дрочка": "drochka"
            }
        },
        list: { uri: "?page={page}" },
        search: { uri: "search?q={search}" },
        contentParse: {
            nodes: "//div[@class='grid-item aspect-ratio-16x9']",
            name: { node: ".//div[@class='grid-item-description']//a" },
            href: { node: ".//a[1]", attribute: "href" },
            img: { node: ".//img", attribute: "src" },
            duration: { node: ".//span[contains(@class,'grid-item-dur')]" },
            preview: { node: ".//video//source", attribute: "src" }
        },
        view: {
            related: true,
            regexMatch: {
                matches: ["1080", "720", "480", "400", "360"],
                pattern: "src=\"([^\"]+)\" type=\"video/mp4\" label=\"{value}\""
            }
        }
    },
    {
        enable: true,
        displayname: "Sosushka",
        host: "https://gi.sosushka.vip",
        menu: {
            route: {
                sort: "{host}/{sort}/all/month/page{page}/",
                cat: "{host}/{cat}/page{page}/"
            },
            sort: {
                "Новинки": "",
                "Популярное": "top",
                "Лучшие": "bests"
            },
            categories: {
                "Азиатки": "asian",
                "Анальный секс": "anal",
                "БДСМ": "bdsm",
                "Блондинки": "blonde",
                "Большие жопы": "big_ass",
                "Большие сиськи": "big_tits",
                "Большие члены": "big_dick",
                "Бритые письки": "shaved",
                "Брюнетки": "brunette",
                "Волосатые письки": "hairy",
                "Групповуха": "group",
                "Домашнее порно": "amateur",
                "Жесткий секс": "hardcore",
                "Игрушки": "toys",
                "Камшот": "cumshot",
                "Красивые девушки": "beautiful",
                "Куннилингус": "pussy_licking",
                "Лесбиянки": "lesbiyki",
                "Маленькие девушки": "petite",
                "Маленькие сиськи": "small_tits",
                "Мамочки": "milf",
                "Мастурбация": "masturbation",
                "Межрасовое": "interracial",
                "Минет": "blowjob",
                "Молодые": "teen",
                "Наездницы": "riding",
                "Натуральные сиськи": "natural_tits",
                "Раком": "doggystyle",
                "Русское порно": "russian",
                "Рыжие": "redhead",
                "Секс втроем": "threesome",
                "Соло девушек": "solo_girl",
                "Сперма на лице": "facial",
                "Фистинг": "fisting",
                "Худые девушки": "skinny",
                "Черноволосые": "black-haired"
            }
        },
        list: { uri: "new/page{page}/" },
        search: { uri: "search/{search}/" },
        contentParse: {
            nodes: "//div[@class='thumb']",
            name: { node: ".//p" },
            href: { node: ".//a", attribute: "href" },
            img: { node: ".//img", attribute: "data-src" },
            duration: { node: ".//span[@class='right']" },
            preview: { node: ".//div", attribute: "data-preview-src" }
        },
        view: {
            iframe: {
                pattern: "property=\"ya:ovs:embed_url\" content=\"([^\"]+)\""
            },
            regexMatch: {
                matches: ["720", "480", "240"],
                pattern: "<source src=\"([^\"]+)\" type=\"video/mp4\" size=\"{value}\""
            }
        }
    }
]; 