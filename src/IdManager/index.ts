class NumberIdManager {
  constructor(public currentId: number = 0, public dumpedIds: number[]) {}
  use() {
    const { dumpedIds, currentId } = this
    if (dumpedIds.length) return dumpedIds.shift() as number
    const returnId = currentId
    this.currentId++
    return returnId
  }
  dump(id: number) {
    this.dumpedIds.push(id)
  }
}

export default NumberIdManager
