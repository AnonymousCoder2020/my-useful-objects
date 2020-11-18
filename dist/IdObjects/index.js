import cleanIntId from '../lib/cleanIntId';
export default class {
    constructor(initialValues) {
        this.values = [];
        if (initialValues)
            this.values = initialValues;
    }
    cleanId() {
        cleanIntId(this.values, {
            getter: item => item.id,
            setter: (item, newId) => (item.id = newId),
        });
    }
    adds(...items) {
        this.values.push(...items);
        this.cleanId();
    }
    unshift(...items) {
        this.values.unshift(...items);
        this.cleanId();
    }
    removes(...ids) {
        this.values = this.values.filter(item => !ids.includes(item.id));
    }
    find(id) {
        return this.values.find(value => value.id === id);
    }
}
