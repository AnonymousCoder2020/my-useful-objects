import GetOnlineFavicon from '../lib/getOnlineFavicon'

interface FaviconList {
  [hostname: string]: string
}

interface GetOpt {
  document?: Document
}

class FaviconCache {
  constructor(public list: FaviconList = {}) {}
  setList(list: FaviconList) {
    this.list = list
  }
  async get(url: string, maxSize: number, getOpt: GetOpt = {}) {
    const { list } = this
    const urlRes = new URL(url)
    const { origin } = urlRes
    if (list.hasOwnProperty(origin)) return list[origin]
    const faviconUrl = (await GetOnlineFavicon(urlRes, maxSize, getOpt)) as string
    this.list[origin] = faviconUrl
    return faviconUrl
  }
  setSync(url: string, faviconUrl: string) {
    const { origin } = new URL(url)
    this.list[origin] = faviconUrl
  }
}

export default FaviconCache
