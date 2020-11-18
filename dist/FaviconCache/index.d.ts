interface FaviconList {
    [hostname: string]: string;
}
interface GetOpt {
    document?: Document;
}
declare class FaviconCache {
    list: FaviconList;
    constructor(list?: FaviconList);
    setList(list: FaviconList): void;
    get(url: string, maxSize: number, getOpt?: GetOpt): Promise<string>;
    setSync(url: string, faviconUrl: string): void;
}
export default FaviconCache;
