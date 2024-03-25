import { eachRecur } from 'next-ts-utility'
import { Init, IntIdManager } from '.'
import cleanIntId, { CleanMode } from './lib/cleanIntId'

type OpeSonsCallback = (children: NestIdObj[], idManager: IntIdManager) => NestIdObj[]

type AddSonsCallback = (sons: NestIdObj[], addSons: NestIdObj[]) => NestIdObj[]

class NestIdObj extends Init<NestIdObj> {
  name?: string
  id?: number
  open?: boolean = true
  boss?: NestIdObj
  sons?: NestIdObj[]
  idManager?: IntIdManager
  constructor(public cleanMode: CleanMode) {
    super()
  }
  get d() {
    let boss = this.boss
    let d = 0
    while (boss) {
      d++
      boss = boss.boss
    }
    return d
  }
  get followers() {
    return eachRecur(this as NestIdObj, node => node.sons)
  }
  get root() {
    let boss = this as NestIdObj
    while (boss?.boss) boss = boss.boss
    return boss
  }
  toggleOpen() {
    this.open = !this.open
    return this
  }
  private cleanIdOnTop() {
    this.idManager = cleanIntId(this.cleanMode, this.followers, {
      get: node => node.id,
      set: (node, id) => (node.id = id)
    })
    return this
  }
  cleanId() {
    ;(this.root ?? this).cleanIdOnTop()
    return this
  }
  isSonOf(bossOrNot: NestIdObj) {
    let boss = this.boss
    while (boss) {
      if (boss == bossOrNot) return true
      boss = boss.boss
    }
    return false
  }
  private opeSons(callback: OpeSonsCallback) {
    const { sons, root } = this
    if (!root.idManager) root.cleanIdOnTop()
    const createCopy = () => sons?.slice() ?? []
    const newSons = callback(createCopy(), root.idManager as IntIdManager) ?? createCopy()
    newSons.forEach(child => (child.boss = this))
    this.sons = newSons
    return this
  }
  addSons(addSons: NestIdObj[], callback: AddSonsCallback) {
    this.opeSons((sons, idManager) => {
      for (const addSon of addSons) {
        addSon.id = idManager.use()
        addSon.boss = this
      }
      return callback(sons, addSons)
    })
    return this
  }
  delSons(delSons: NestIdObj[]) {
    this.opeSons((sons, idManager) => {
      for (const delSon of delSons) {
        if (IntIdManager.isValidId(delSon.id)) idManager.dump(delSon.id)
        delSon.boss = undefined
      }
      return sons.filter(son => !delSons.includes(son))
    })
    return this
  }
}

export default NestIdObj
