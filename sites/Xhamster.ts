import { NextHubConfig } from '../models/NextHubConfig';

export const XhamsterConfig: NextHubConfig = {
    enable: true,
    displayname: 'Xhamster',
    host: 'https://ru.xhamster.com',
    menu: {
        route: {
            sort: '{host}/{sort}/{page}',
            cat: '{host}/categories/{cat}/{page}',
            catsort: '{host}/categories/{cat}/{sort}/{page}'
        },
        sort: {
            'В тренде': '',
            'Новейшее': 'newest',
            'Лучшие': 'best/weekly'
        },
        categories: {
            'Все': '',
            'Русское': 'russian',
            'Секс втроем': 'threesome',
            'Азиатское': 'asian',
            'Анал': 'anal',
            'Арабское': 'arab',
            'АСМР': 'asmr',
            'Бабки': 'granny',
            'БДСМ': 'bdsm',
            'Би': 'bisexual',
            'Большие жопы': 'big-ass',
            'Большие задницы': 'pawg',
            'Большие сиськи': 'big-tits',
            'Большой член': 'big-cock',
            'Британское': 'british',
            'В возрасте': 'mature',
            'Вебкамера': 'webcam',
            'Винтаж': 'vintage',
            'Волосатые': 'hairy',
            'Голые мужчины одетые женщины': 'cfnm',
            'Групповой секс': 'group-sex',
            'Гэнгбэнг': 'gangbang',
            'Дилдо': 'dildo',
            'Домашнее порно': 'homemade',
            'Дрочка ступнями': 'footjob',
            'Женское доминирование': 'femdom',
            'Жиробасина': 'ssbbw',
            'Жопа': 'ass',
            'Застряла': 'stuck',
            'Знаменитость': 'celebrity',
            'Игра': 'game',
            'История': 'story',
            'Кастинг': 'casting',
            'Комический': 'comic',
            'Кончина': 'cumshot',
            'Кремовый пирог': 'creampie',
            'Латина': 'latina',
            'Лесбиянка': 'lesbian',
            'Лизать киску': 'eating-pussy',
            'Любительское порно': 'amateur',
            'Массаж': 'massage',
            'Медсестра': 'nurse',
            'Межрасовый секс': 'interracial',
            'МИЛФ': 'milf',
            'Милые': 'cute',
            'Минет': 'blowjob',
            'Миниатюрная': 'petite',
            'Миссионерская поза': 'missionary',
            'Монахиня': 'nun',
            'Мультфильмы': 'cartoon',
            'Негритянки': 'black',
            'Немецкое': 'german',
            'Офис': 'office',
            'Первый раз': 'first-time',
            'Пляж': 'beach',
            'Порно для женщин': 'porn-for-women',
            'Реслинг': 'wrestling',
            'Рогоносцы': 'cuckold',
            'Романтический': 'romantic',
            'Свингеры': 'swingers',
            'Сквирт': 'squirting',
            'Старик': 'old-man',
            'Старые с молодыми': 'old-young',
            'Тинейджеры (18+)': 'teen',
            'Толстушки': 'bbw',
            'Тренажерный зал': 'gym',
            'Узкая киска': 'tight-pussy',
            'Французское': 'french',
            'Футанари': 'futanari',
            'Хардкор': 'hardcore',
            'Хенджоб': 'handjob',
            'Хентай': 'hentai',
            'Японское': 'japanese'
        }
    },
    list: {
        uri: '{host}/{page}',
        firstpage: '{host}'
    },
    search: {
        uri: 'search/{search}/{page}'
    },
    contentParse: {
        nodes: "//div[contains(@class,'thumb-list__item')] | //div[contains(@class,'thumb-list-mobile-item')]",
        name: {
            node: ".//a[contains(@class,'video-thumb-info__name')]"
        },
        href: {
            node: ".//a[contains(@class,'video-thumb-info__name')]",
            attribute: 'href'
        },
        img: {
            node: ".//img",
            attributes: ['srcset', 'src']
        },
        preview: {
            node: ".//a",
            attribute: 'data-previewvideo'
        },
        duration: {
            node: ".//div[@data-role='video-duration'] | .//time[contains(@class,'video-thumb__time')]"
        }
    },
    view: {
        related: true,
        nodeFile: {
            node: "//link[@rel='preload']",
            attribute: "href"
        }
    }
};