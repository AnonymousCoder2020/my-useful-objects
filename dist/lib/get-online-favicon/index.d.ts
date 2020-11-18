interface Opt {
    document?: Document;
}
export interface FaviconItem {
    href: string;
    size: number | null;
    exists: boolean | null;
}
declare const _default: (url: URL, maxSize?: number, opt?: Opt) => Promise<string | undefined>;
export default _default;
export declare const getAll: (url: URL, opt?: Opt) => Promise<FaviconItem[]>;
