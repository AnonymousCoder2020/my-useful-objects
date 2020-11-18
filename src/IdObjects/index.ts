import cleanIntId from '../lib/cleanIntId'

interface IdObject {
  id: number
  [key: string]: any
}

export default class<I extends IdObject> {
  constructor(initialValues?: I[]) {
    if (initialValues) this.values = initialValues
  }
  values: I[] = []
  cleanId() {
    cleanIntId(this.values, {
      getter: item => item.id,
      setter: (item, newId) => (item.id = newId),
    })
  }
  adds(...items: I[]) {
    this.values.push(...items)
    this.cleanId()
  }
  unshift(...items: I[]) {
    this.values.unshift(...items)
    this.cleanId()
  }
  removes(...ids: number[]) {
    this.values = this.values.filter(item => !ids.includes(item.id))
  }
  find(id: number) {
    return this.values.find(value => value.id === id)
  }
}
