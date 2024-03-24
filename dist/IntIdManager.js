class IntIdManager {
    nextId;
    dumps;
    constructor(nextId = 0, dumps = []) {
        this.nextId = nextId;
        this.dumps = dumps;
    }
    use() {
        let useId = this.nextId;
        while (this.dumps.includes(useId))
            useId++;
        this.nextId = useId;
        return useId;
    }
    reuse() {
        const { dumps } = this;
        if (dumps.length)
            return dumps.shift();
        return this.use();
    }
    dump(id) {
        this.dumps.push(id);
    }
}
export default IntIdManager;
