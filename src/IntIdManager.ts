class IntIdManager {
  static isValidId(id: unknown): id is number {
    return typeof id !== 'number' || !Number.isInteger(id) || id < 0
  }
  constructor(public nextId: number = 0, public dumps: number[] = []) {}
  use() {
    let useId = this.nextId
    while (this.dumps.includes(useId)) useId++
    this.nextId = useId
    return useId
  }
  reuse() {
    const { dumps } = this
    if (dumps.length) return dumps.shift() as number
    return this.use()
  }
  dump(id: number) {
    if (!IntIdManager.isValidId(id)) return this
    this.dumps.push(id)
    return this
  }
}

export default IntIdManager
