export default class {
    v = [];
    unshift(...items) {
        return this.v.unshift(...items);
    }
    shift() {
        return this.v.shift();
    }
}
