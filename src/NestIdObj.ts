import { eachRecur } from 'next-ts-utility'
import { ClassPropsPartial } from 'next-type-utility'
import { IntIdManager } from '.'
import LeafIdObj from './LeafIdObj'
import cleanIntId, { CleanMode } from './lib/cleanIntId'

type OpeSonsCallback = (subs: IdObj[], idManager: IntIdManager) => IdObj[]

type AddSonsCallback = (subs: IdObj[], addSubs: IdObj[]) => IdObj[]

type IdObj = LeafIdObj | NestIdObj

class NestIdObj extends LeafIdObj {
  open?: boolean = true
  subs?: (NestIdObj | LeafIdObj)[]
  idManager?: IntIdManager
  constructor(public cleanMode: CleanMode, init: ClassPropsPartial<NestIdObj>) {
    super(init)
    Object.assign(this, init)
  }
  get followers() {
    return eachRecur(this as NestIdObj | LeafIdObj, node => (node instanceof NestIdObj ? node.subs : []))
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
  cleanId() {
    return this.root.cleanIdOnTop()
  }
  private cleanIdOnTop() {
    this.idManager = cleanIntId(this.cleanMode, this.followers, {
      get: node => node.id,
      set: (node, id) => (node.id = id)
    })
    return this.idManager
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
  addSubs(addSubs: IdObj[], callback: AddSonsCallback) {
    this.opeSubs((subs, idManager) => {
      for (const addSub of addSubs) {
        // 親が自分の子になることを防ぐ
        if (addSub instanceof NestIdObj && this.isSubOf(addSub)) continue
        addSub.id = idManager.use()
        addSub.boss = this
      }
      return callback(subs, addSubs)
    })
    return this
  }
  delSubs(delSubs: IdObj[]) {
    this.opeSubs((subs, idManager) => {
      for (const delSub of delSubs) {
        // 自分の子以外を削除してしまうのを防ぐ
        if (!subs.includes(delSub)) continue
        if (IntIdManager.isValidId(delSub.id)) idManager.dump(delSub.id)
        delSub.boss = undefined
      }
      return subs.filter(son => !delSubs.includes(son))
    })
    return this
  }
  insertSubs(idx: number, ...insertSubs: IdObj[]) {
    this.addSubs(insertSubs, (subs, addSubs) => subs.toSpliced(idx, 0, ...addSubs))
    return this
  }
  pushSubs(...pushSubs: IdObj[]) {
    this.addSubs(pushSubs, (subs, addSubs) => subs.toSpliced(subs.length, 0, ...addSubs))
    return this
  }
}

export default NestIdObj
