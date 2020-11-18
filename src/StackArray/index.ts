export default class<T> {
  values: T[] = []
  unshift(...items: T[]) {
    return this.values.unshift(...items)
  }
  shift() {
    return this.values.shift()
  }
}
