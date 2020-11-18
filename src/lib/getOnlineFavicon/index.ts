import getDocument from '../getDocument'

interface Opt {
  // 指定されたドキュメントオブジェクトのheadタグ内からfaviconURLを探す
  document?: Document
}

interface FaviconItemNullable {
  href: string | null
  size: number | null
  exists: boolean | null
}

export interface FaviconItem {
  href: string
  size: number | null
  exists: boolean | null
}

// URLがRootのファビコンを示しているか
const isRootFaviconUrl = (url: URL) => url.pathname === '/favicon.ico'

// レスポンスのMIMETypeが画像またはアイコンか
const isIcon = (res: Response) => {
  const contentType = res.headers.get('content-type')
  if (!contentType) return false
  return /^image\/(png|jpg|jpeg|x-icon|webp|gif|vnd\.microsoft\.icon)/.test(contentType)
}
// URL先にファビコンが存在するか
const existsFavicon = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('res.ok == false')
  if (!isIcon(res)) throw new Error('content-type is not icon or image')
  return url
}

// 画像URLから幅、高さを取得
const getImageDimensions = (src: string) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img
      resolve({ width: naturalWidth, height: naturalHeight })
    }
    img.onerror = reject
    img.src = src
  })
}

// 画像URLオブジェクトから Google favicon API でファビコンURLを取得
const getFaviconFromGoogleAPI = (url: URL) => 'https://www.google.com/s2/favicons?domain=' + url.origin

// URLからルートにあるファビコン https://example.com/favicon.ico を取得
const getFaviconFromRoot = async (url: URL, maxSize: number = Infinity) => {
  const resUrl = await existsFavicon(url.origin + '/favicon.ico')
  const size = (await getImageDimensions(resUrl)).width
  if (maxSize < size) throw new Error('最大許容サイズを満たしませんでした。画像: ' + size + 'px, 指定された最大許容サイズ: ' + maxSize + 'px')
  return resUrl
}

// head要素内から複数のファビコンを取得（画像のサイズが大きい順にソート）
const getFaviconsFromHead = async (url: URL, d: Document) => {
  return (
    await Promise.all(
      [...d.head.querySelectorAll('link[rel*=icon]')].map(async link => {
        const sizesValue = link.getAttribute('sizes')
        const hrefValue = link.getAttribute('href')
        let href,
          size = sizesValue ? parseFloat(sizesValue) : null,
          exists = null
        try {
          href = hrefValue ? new URL(hrefValue, url.origin).toString() : null
        } catch (err) {
          console.warn(err)
          return null
        }
        // link要素から画像のサイズ情報が得られなかった場合、リクエストを飛ばして直接確認
        // 画像が存在するかどうかも確認する
        try {
          if (!size && href) {
            size = (await getImageDimensions(href)).width
            exists = true
          }
        } catch {
          exists = false
        }
        return { size, href, exists }
      })
    )
  )
    .filter(
      <T extends FaviconItemNullable | null>(
        icon: T
      ): icon is T extends null ? never : T extends { href: infer U } ? (U extends string ? T : never) : never =>
        Boolean(icon) && typeof icon?.href == 'string'
    )
    .sort((a, b) => (b.size || 0) - (a.size || 0))
}

// URL先にあるHTMLページのhead要素からファビコンURLを抽出し、maxSize(上限サイズ)を満たすものを取得
const getFaviconFromPage = async (url: URL, maxSize: number = Infinity, opt: Opt) => {
  let d = opt.document ? opt.document : await getDocument(url.origin)
  // head要素内から得られたファビコン情報
  let iconDatas = await getFaviconsFromHead(url, d)
  console.log(iconDatas)
  // 画像の上限サイズを満たす最大サイズのファビコン画像URLを取得
  // 同時に、https://example.com/favicon.ico のファビコンの存在の有無を existsRootFavicon として返す
  let resultUrl, existsRootFavicon
  for (const { exists, href, size } of iconDatas) {
    const isRootFavicon = isRootFaviconUrl(new URL(href))
    if (isRootFavicon) existsRootFavicon = exists
    if (exists === false || (typeof size == 'number' && maxSize < size)) continue
    if (!exists) {
      const existsResult = await existsFavicon(href).catch(err => {
        console.warn(err)
        return false
      })
      if (isRootFavicon) existsRootFavicon = existsResult
      if (!existsResult) continue
    }
    resultUrl = href
    break
  }
  if (!resultUrl) return { type: 'error', existsRootFavicon }
  return { type: 'success', faviconURL: resultUrl }
}
// ページのhead要素内を探し、なければルートのファビコンを探し、それでもなければGoogle Favicon API に頼る
export default async (url: URL, maxSize: number = Infinity, opt: Opt = {}) => {
  // URLプロトコルは https: または http: 以外は認めない
  const { protocol } = url
  if (protocol != 'https:' && protocol != 'http:')
    throw new Error('URLは https:// または http:// から始める必要があります。入力されたprotocol: ' + protocol)
  try {
    const res = await getFaviconFromPage(url, maxSize, opt)
    if (res.type == 'success') return res.faviconURL
    if (res.type == 'error') {
      if (res.existsRootFavicon !== false) {
        return getFaviconFromRoot(url, maxSize).catch(err => {
          console.warn(err)
          return getFaviconFromGoogleAPI(url)
        })
      } else {
        return getFaviconFromGoogleAPI(url)
      }
    }
  } catch (err_1) {
    console.warn(err_1)
    try {
      return getFaviconFromRoot(url, maxSize)
    } catch (err_2) {
      console.warn(err_2)
      return getFaviconFromGoogleAPI(url)
    }
  }
}

// ファビコンURLをリスト形式でかき集める
export const getAll = async (url: URL, opt: Opt = {}) => {
  // headから
  let favList: FaviconItem[] = [],
    existsRootFav: boolean = false
  try {
    const d = opt.document ? opt.document : await getDocument(url.origin)
    favList = favList.concat(await getFaviconsFromHead(url, d))
    existsRootFav = favList.some(fav => isRootFaviconUrl(new URL(fav.href)))
  } catch (err_0) {
    console.warn(err_0)
  }
  if (!existsRootFav) {
    try {
      const rootFavUrl = await getFaviconFromRoot(url)
      const rootFavSize = (await getImageDimensions(rootFavUrl)).width
      favList.push({
        href: rootFavUrl,
        size: rootFavSize,
        exists: true,
      })
    } catch (err_1) {
      console.warn(err_1)
    }
  }
  favList.push({
    href: getFaviconFromGoogleAPI(url),
    size: 16,
    exists: true,
  })
  return favList
}
