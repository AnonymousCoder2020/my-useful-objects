import objError from './objErr'

export default async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('res.ok == false')
  const contentType = res.headers.get('content-type')
  if (!contentType) throw new Error('content-type is not found.')
  if (!~contentType.indexOf('text/html')) objError('content-type is not text/html', { contentType, check: ~contentType.indexOf('text/html') })
  const htmlText = await res.text()
  return new DOMParser().parseFromString(htmlText, 'text/html')
}
