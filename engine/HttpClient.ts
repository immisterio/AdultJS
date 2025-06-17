export class HttpClient
{
    private static isAndroid: boolean = (() => {
        if (typeof window !== 'undefined' &&
            typeof (window as any).Lampa !== 'undefined' &&
            typeof (window as any).Lampa.Platform !== 'undefined' &&
            typeof (window as any).Lampa.Platform.is === 'function') {
            return (window as any).Lampa.Platform.is('android');
        }
        return false;
    })();

    public static ensureUserAgent(headers?: { [key: string]: string }): { [key: string]: string } {
        return headers ? { ...headers } : {};
    }

    public static async Get(url: string, headers?: { [key: string]: string }): Promise<string> {
        if (HttpClient.isAndroid) 
            return HttpClient.Native(url);

        const finalHeaders = HttpClient.ensureUserAgent(headers);
        const options: any = { method: 'GET', headers: finalHeaders };
        const response = await fetch(url, options);
        return await response.text();
    }

    public static Native(url: string, post?: boolean, params?: any): Promise<string> {
        return new Promise(function (resolve, reject) {
            var net = new (window as any).Lampa.Reguest();
            net["native"](url, function (result: any) {
                if (typeof result === 'object') resolve(JSON.stringify(result));
                else resolve(result);
                net.clear();
            }, reject, post, params);
        });
    }
}