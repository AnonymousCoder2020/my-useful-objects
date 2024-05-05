import Init from './Init'
import IntIdManager from './IntIdManager'
import type NestIdObj from './NestIdObj'

type IdObj = LeafIdObj | NestIdObj

class LeafIdObj extends Init {
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
  isValidId(): this is this & { id: number } {
    return IntIdManager.isValidId(this.id)
  }
}

export default LeafIdObj
