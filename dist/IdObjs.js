import { isInteger } from 'lodash-es';
import cleanIntId from './lib/cleanIntId';
export default class {
    constructor(initialValues) {
        this.values = [];
        if (initialValues)
            this.mapIdForAdd(initialValues, mappedInitialValues => (this.values = mappedInitialValues));
    }
    cleanId() {
        return cleanIntId(this.values, {
            getter: item => item.id,
            setter: (item, newId) => (item.id = newId),
        });
    }
    mapIdForAdd(items, callback) {
        callback(items.map(item => {
            const { id } = item;
            item.id = isInteger(id) ? id : NaN;
            return item;
        }));
        this.cleanId();
    }
    adds(...items) {
        this.mapIdForAdd(items, mappedItems => this.values.push(...mappedItems));
    }
    unshift(...items) {
        this.mapIdForAdd(items, mappedItems => this.values.unshift(...mappedItems));
    }
    removes(...ids) {
        this.values = this.values.filter(item => !ids.includes(item.id));
    }
    find(id) {
        return this.values.find(value => value.id === id);
    }
}
