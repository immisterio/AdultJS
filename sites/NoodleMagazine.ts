import { NextHubConfig } from '../models/NextHubConfig';

export const NoodleMagazineConfig: NextHubConfig = {
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
}; 