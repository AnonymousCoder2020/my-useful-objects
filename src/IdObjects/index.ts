import { isInteger } from 'lodash-es'
import { PlainAnyObject } from 'my-useful-type'
import cleanIntId from '../lib/cleanIntId'

export type WithId<T extends PlainAnyObject> = T & { id: number }

export default class<I extends PlainAnyObject & { id?: number }> {
  constructor(initialValues?: I[]) {
    if (initialValues) this.mapIdForAdd(initialValues, mappedInitialValues => (this.values = mappedInitialValues))
  }
  values: WithId<I>[] = []
  cleanId() {
    return cleanIntId(this.values, {
      getter: item => item.id,
      setter: (item, newId) => (item.id = newId),
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
