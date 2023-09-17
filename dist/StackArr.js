export default class {
    constructor() {
        this.v = [];
    }
    unshift(...items) {
        return this.v.unshift(...items);
    }
    shift() {
        return this.v.shift();
    }
}
