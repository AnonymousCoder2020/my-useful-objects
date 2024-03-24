import { ClassPropsPartial } from 'next-type-utility'
import Init from './Init'

export type Id = string | number

type GetIdDef<T, I extends Id> = (item: T) => I

export default class SelectionItems<T, I extends Id> extends Init<SelectionItems<T, I>> {
  select: Set<I> = new Set()
  range: Set<I> = new Set()
  pinId?: I
  constructor(public items: T[], public getIdDef: GetIdDef<T, I>, option?: ClassPropsPartial<SelectionItems<T, I>>) {
    super()
    option && Object.assign(this, option)
    this.clean()
  }
  get totalSelect() {
    return [...this.select, ...this.range]
  }
  getId(idx: number) {
    const targetItem = this.items[idx]
    if (!targetItem ?? false) {
      console.warn(`インデックス: ${idx} のアイテムは存在しません。\nアイテム: ${JSON.stringify(targetItem)}`)
      return
    }
    return this.getIdDef(this.items[idx])
  }
  getIdx(id: I) {
    return this.items.findIndex(item => this.getIdDef(item) === id)
  }
  toggle(idx: number) {
    const id = this.getId(idx)
    if (id === undefined) return
    this.toggleId(id)
  }
  toggleId(id: I) {
    this.takeOverSelect()
    const { select } = this
    if (!select.has(id)) {
      this.pinId = id
      select.add(id)
    } else {
      if (this.pinId === id) this.pinId = undefined
      select.delete(id)
    }
  }
  takeOverSelect() {
    const takedOver = this.totalSelect
    this.range = new Set()
    this.select = new Set(takedOver)
  }
  cover(startIdx: number, endIdx: number) {
    if (endIdx < startIdx) [startIdx, endIdx] = [endIdx, startIdx]
    const rankIds = [...Array(endIdx - startIdx + 1).keys()].map(i => this.getId(i + startIdx)).filter((id): id is I => Boolean(id))
    this.range = new Set(rankIds)
    this.select = new Set([...this.select].filter(id => !this.range.has(id)))
  }
  coverBy(endIdx: number) {
    const { pinId } = this
    if (pinId === undefined) {
      this.toggle(endIdx)
      return
    }
    this.cover(this.getIdx(pinId), endIdx)
  }
  isInclude(id: I) {
    return this.select.has(id) || this.range.has(id)
  }
  clean() {
    const allIds = this.items.map(item => this.getIdDef(item))
    this.select = new Set([...this.select].filter(id => allIds.includes(id)))
    this.range = new Set([...this.range].filter(id => allIds.includes(id)))
  }
}
