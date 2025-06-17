export class HttpClient
{
    public static ensureUserAgent(headers?: { [key: string]: string }): { [key: string]: string } {
        return headers ? { ...headers } : {};
    }

    public static async Get(url: string, headers?: { [key: string]: string }): Promise<string> {
        const finalHeaders = HttpClient.ensureUserAgent(headers);
        const options: any = { method: 'GET', headers: finalHeaders };
        const response = await fetch(url, options);
        return await response.text();
    }
}