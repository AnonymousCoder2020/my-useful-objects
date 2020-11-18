import cleanIntId from '../lib/clean-int-id';
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
    removes(...ids) {
        this.values = this.values.filter(item => !ids.includes(item.id));
    }
    find(id) {
        return this.values.find(value => value.id === id);
    }
}
