export default class {
    constructor() {
        this.values = [];
    }
    unshift(...items) {
        return this.values.unshift(...items);
    }
    shift() {
        return this.values.shift();
    }
}
