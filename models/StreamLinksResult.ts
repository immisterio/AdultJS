export class StreamLinksUnified {
    total_pages?: number;
    list?: any[];
    qualitys?: { [key: string]: string };
    recomends?: any[];

    constructor(streamLinks: StreamLinksResult, related: boolean) {
        if (related) {
            this.total_pages = 1;
            this.list = streamLinks.recomends;
        } else {
            this.qualitys = streamLinks.qualitys;
            this.recomends = streamLinks.recomends;
        }
    }
}

export class StreamLinksResult {
    qualitys: { [key: string]: string };
    recomends: any[];
    constructor(qualitys: { [key: string]: string }, recomends: any[]) {
        this.qualitys = qualitys;
        this.recomends = recomends;
    }
}
