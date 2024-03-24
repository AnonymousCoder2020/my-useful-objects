class IntIdManager {
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
    this.dumps.push(id)
  }
}

export default IntIdManager
