import fetchMock from 'fetch-mock'
import getDoc from '../src/lib/getDoc'

describe('get-document', () => {
  it('res.ok == falseならエラーが返ってくる', async () => {
    fetchMock.get('https://example.com/404', { status: 404, body: [] })
    await expect(getDoc('https://example.com/404')).rejects.toEqual(new Error("res.ok == false'"))
  })

  it('contentTypeがtext/html以外ならエラーが返ってくる', async () => {
    fetchMock.get('https://example.com/image', { status: 404, body: [], headers: { 'Content-Type': 'image/png' } })
    console.log(expect(await getDoc('https://example.com/image')).rejects)
  })
})
