class NumberIdManager {
    constructor(currentId = 0, dumpedIds) {
        this.currentId = currentId;
        this.dumpedIds = dumpedIds;
    }
    use() {
        const { dumpedIds, currentId } = this;
        if (dumpedIds.length)
            return dumpedIds.shift();
        const returnId = currentId;
        this.currentId++;
        return returnId;
    }
    dump(id) {
        this.dumpedIds.push(id);
    }
}
export default NumberIdManager;
