// 非推奨
import { isInteger } from 'lodash-es'
import { PlainAnyObj } from 'next-type-utility'
import cleanIntId, { CleanMode } from './lib/cleanIntId'

export type WithId<T extends PlainAnyObj> = T & { id: number }

export default class<I extends PlainAnyObj & { id?: number }> {
  constructor(public cleanMode: CleanMode, initialValues?: I[]) {
    if (initialValues) this.mapIdForAdd(initialValues, mappedInitialValues => (this.values = mappedInitialValues))
  }
  values: WithId<I>[] = []
  cleanId() {
    return cleanIntId(this.cleanMode, this.values, {
      get: item => item.id,
      set: (item, newId) => (item.id = newId)
    })
  }
  private mapIdForAdd(items: I[], callback: (mapedItems: WithId<I>[]) => unknown) {
    callback(
      items.map(item => {
        const { id } = item
        item.id = isInteger(id) ? id : NaN
        return item
      }) as WithId<I>[]
    )
    this.cleanId()
  }
  adds(...items: I[]) {
    this.mapIdForAdd(items, mappedItems => this.values.push(...mappedItems))
  }
  unshift(...items: I[]) {
    this.mapIdForAdd(items, mappedItems => this.values.unshift(...mappedItems))
  }
  removes(...ids: number[]) {
    this.values = this.values.filter(item => !ids.includes(item.id))
  }
  find(id: number) {
    return this.values.find(value => value.id === id)
  }
}
