export class Utils
{
    static extract(row: string, pattern: RegExp | string, index: number = 1): string | null {
        const res = row.match(pattern as RegExp)?.[index] || null;
        if (!res || res.trim() === "")
            return null;
        return res.trim();
    }
}
