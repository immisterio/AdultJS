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
        nodeFile?: {
            node: string;
            attribute: string;
        };
    };
} 