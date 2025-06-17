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

    public static ensureHeaders(headers?: { [key: string]: string }): { [key: string]: string } {
        const defaultUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
        let result = headers ? { ...headers } : {};
        if (!result['user-agent'] && !result['User-Agent']) {
            result['User-Agent'] = defaultUserAgent;
        }
        return result;
    }

    public static async Get(url: string, headers?: { [key: string]: string }): Promise<string> {
        if (HttpClient.isAndroid) 
            return HttpClient.Native(url);

        const finalHeaders = HttpClient.ensureHeaders(headers);
        const options: any = { method: 'GET', headers: finalHeaders };
        const response = await fetch(url, options);
        return await response.text();
    }

    public static Native(url: string, post?: boolean, headers?: { [key: string]: string }): Promise<string> {
        return new Promise(function (resolve, reject) {
            var net = new (window as any).Lampa.Reguest();
            net["native"](
                url,
                function (result: any) {
                    if (typeof result === 'object') resolve(JSON.stringify(result));
                    else resolve(result);
                    net.clear();
                },
                reject,
                post,
                {
                    dataType: "text",
                    timeout: 8 * 1000,
                    headers: HttpClient.ensureHeaders(headers)
                }
            );
        });
    }
}