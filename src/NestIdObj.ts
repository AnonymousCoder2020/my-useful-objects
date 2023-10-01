import { max } from 'lodash-es'
import { eachRecur } from 'next-ts-utility'
import { IdManager, Init } from '.'
import cleanIntId from './lib/cleanIntId'

type SetSonsCallback = (children: NestIdObj[], idManager: IdManager) => NestIdObj[]

class NestIdObj extends Init<NestIdObj> {
  name?: string
  id?: number
  open?: boolean = true
  boss?: NestIdObj
  sons?: NestIdObj[]
  idManager?: IdManager
  constructor() {
    super()
  }
  toggleOpen() {
    this.open = !this.open
  }
  get followers() {
    return eachRecur(this as NestIdObj, node => node.sons)
  }
  private cleanIdOnTop() {
    const nodes = this.followers
    this.idManager = cleanIntId(nodes, {
      getter: node => node.id,
      setter: (node, id) => (node.id = id),
    })
  }
  clearId() {
    const { root } = this
    ;(root ?? this).cleanIdOnTop()
  }
  get root() {
    let parent = this.boss
    let prev: NestIdObj = this
    while (parent) {
      prev = parent //前の内容を保存
      parent = parent.boss
    }
    return prev
  }
  setSons(callback?: SetSonsCallback) {
    const { sons, root } = this
    if (!root.idManager) root.cleanIdOnTop()
    const createCopy = () => sons?.slice() ?? []
    const newSons = callback?.(createCopy(), root.idManager as IdManager) ?? createCopy()
    newSons.forEach(child => (child.boss = this))
    this.sons = newSons
  }
  get lastId() {
    const treeIds = this.root.followers.map(obj => obj.id).filter(id => typeof id == 'number')
    return max(treeIds)
  }
  addSons(...sons: NestIdObj[]) {
    const lastId = this.lastId
    if (!lastId) return
    sons.map((son, i) => (son.id = lastId + i))
    this.sons = (this.sons ?? []).concat(sons)
  }
  d() {
    let boss = this.boss
    let d = 0
    while (boss) {
      d++
      boss = boss.boss
    }
    return d
  }
}

export default NestIdObj
