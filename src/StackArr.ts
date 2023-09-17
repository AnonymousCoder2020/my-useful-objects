export default class<T> {
  v: T[] = []
  unshift(...items: T[]) {
    return this.v.unshift(...items)
  }
  shift() {
    return this.v.shift()
  }
}
