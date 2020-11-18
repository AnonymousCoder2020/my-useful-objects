import GetOnlineFavicon from '../lib/get-online-favicon';
class FaviconCache {
    constructor(list = {}) {
        this.list = list;
    }
    setList(list) {
        this.list = list;
    }
    async get(url, maxSize, getOpt = {}) {
        const { list } = this;
        const urlRes = new URL(url);
        const { origin } = urlRes;
        if (list.hasOwnProperty(origin))
            return list[origin];
        const faviconUrl = (await GetOnlineFavicon(urlRes, maxSize, getOpt));
        this.list[origin] = faviconUrl;
        return faviconUrl;
    }
    setSync(url, faviconUrl) {
        const { origin } = new URL(url);
        this.list[origin] = faviconUrl;
    }
}
export default FaviconCache;
