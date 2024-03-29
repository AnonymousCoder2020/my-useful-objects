//const util = require('util')
import { random, times } from 'lodash-es'
import cleanIntId from '../src/lib/cleanIntId'

describe('lib.cleanIntId', () => {
  const randomIds = [Infinity, -Infinity, NaN, null, undefined, '', 6.43, 1, 2, 3, 4, 5, 6, /regepx/]
  const objs = times(random(2, 5), i => ({ name: i.toString(), id: randomIds[random(0, randomIds.length - 1)] }))
  console.log(objs)
  cleanIntId('reuse', objs, {
    get: obj => obj.id,
    set: (obj, id) => (obj.id = id)
  })
  console.log(objs)
  //console.log(util.inspect(objs, { showHidden: false, depth: null }))
  it('idに被りがない', () => {
    expect([...new Set(objs.map(item => item.id))]).toHaveLength(objs.length)
  })
  it('idが全て自然数', () => {
    expect(objs.every(item => Number.isInteger(item.id))).toBe(true)
  })
})
