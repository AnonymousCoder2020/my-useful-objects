import { ClassPropsPartial } from 'next-type-utility'
import NestIdObj from './NestIdObj'

type IdObj = LeafIdObj | NestIdObj

class LeafIdObj {
  constructor(init: ClassPropsPartial<LeafIdObj>) {
    Object.assign(this, init)
  }
  name?: string
  id?: number
  boss?: NestIdObj
  get d() {
    let boss = this.boss
    let d = 0
    while (boss) {
      d++
      boss = boss.boss
    }
    return d
  }
  get root() {
    let boss = this as LeafIdObj
    while (boss?.boss) boss = boss.boss
    return boss as IdObj
  }
  isSubOf(bossOrNot: NestIdObj) {
    let boss = this.boss
    while (boss) {
      if (boss == bossOrNot) return true
      boss = boss.boss
    }
    return false
  }
  del() {
    this.boss?.delSubs([this])
    return this
  }
}

export default LeafIdObj
