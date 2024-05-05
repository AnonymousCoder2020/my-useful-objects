class IntIdManager {
    nextId;
    dumps;
    static isValidId(id) {
        return typeof id == 'number' && Number.isInteger(id) && 0 <= id;
    }
    constructor(nextId = 0, dumps = []) {
        this.nextId = nextId;
        this.dumps = dumps;
    }
    use() {
        let useId = this.nextId;
        while (this.dumps.includes(useId))
            useId++;
        this.nextId = useId + 1;
        return useId;
    }
    reuse() {
        const { dumps } = this;
        if (dumps.length)
            return dumps.shift();
        return this.use();
    }
    dump(id) {
        if (!IntIdManager.isValidId(id))
            return this;
        this.dumps.push(id);
        return this;
    }
}
export default IntIdManager;
