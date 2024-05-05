import { pushDefArr } from 'next-ts-utility'
import { NestIdObj } from './'

describe('index', () => {
  const r = new NestIdObj('reuse').init({ name: 'A' })
  const b = new NestIdObj('reuse').init({ name: 'B' })
  const c = new NestIdObj('reuse').init({ name: 'C' })
  const d = new NestIdObj('reuse').init({ name: 'D' })
  c.subs = pushDefArr(c.subs, d)
  r.subs = pushDefArr(r.subs, b, c)
  r.teachBoss()
  r.cleanId()
  test('isValidId', () => expect(r.isValidId()).toBeTruthy())
})
