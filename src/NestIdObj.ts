import { eachRecur } from 'next-ts-utility'
import { Init, IntIdManager } from '.'
import cleanIntId, { CleanMode } from './lib/cleanIntId'

type OpeSonsCallback = (children: NestIdObj[], idManager: IntIdManager) => NestIdObj[]

type AddSonsCallback = (subs: NestIdObj[], addSubs: NestIdObj[]) => NestIdObj[]

class NestIdObj extends Init<NestIdObj> {
  name?: string
  id?: number
  open?: boolean = true
  boss?: NestIdObj
  subs?: NestIdObj[]
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
    return eachRecur(this as NestIdObj, node => node.subs)
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
  isSubOf(bossOrNot: NestIdObj) {
    let boss = this.boss
    while (boss) {
      if (boss == bossOrNot) return true
      boss = boss.boss
    }
    return false
  }
  private opeSubs(callback: OpeSonsCallback) {
    const { subs, root } = this
    if (!root.idManager) root.cleanIdOnTop()
    const createCopy = () => subs?.slice() ?? []
    const newSubs = callback(createCopy(), root.idManager as IntIdManager) ?? createCopy()
    newSubs.forEach(child => (child.boss = this))
    this.subs = newSubs
    return this
  }
  addSubs(addSubs: NestIdObj[], callback: AddSonsCallback) {
    this.opeSubs((subs, idManager) => {
      for (const addSub of addSubs) {
        addSub.id = idManager.use()
        addSub.boss = this
      }
      return callback(subs, addSubs)
    })
    return this
  }
  delSubs(delSubs: NestIdObj[]) {
    this.opeSubs((subs, idManager) => {
      for (const delSub of delSubs) {
        if (IntIdManager.isValidId(delSub.id)) idManager.dump(delSub.id)
        delSub.boss = undefined
      }
      return subs.filter(son => !delSubs.includes(son))
    })
    return this
  }
  insertSubs(idx: number, ...insertSubs: NestIdObj[]) {
    this.addSubs(insertSubs, (subs, addSubs) => subs.toSpliced(idx, 0, ...addSubs))
    return this
  }
  pushSubs(...pushSubs: NestIdObj[]) {
    this.addSubs(pushSubs, (subs, addSubs) => subs.toSpliced(subs.length, 0, ...addSubs))
    return this
  }
  del() {
    this.boss?.delSubs([this])
    return this
  }
}

export default NestIdObj
