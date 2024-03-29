// 非推奨
import { isInteger } from 'lodash-es';
import cleanIntId from './lib/cleanIntId';
export default class {
    cleanMode;
    constructor(cleanMode, initialValues) {
        this.cleanMode = cleanMode;
        if (initialValues)
            this.mapIdForAdd(initialValues, mappedInitialValues => (this.values = mappedInitialValues));
    }
    values = [];
    cleanId() {
        return cleanIntId(this.cleanMode, this.values, {
            get: item => item.id,
            set: (item, newId) => (item.id = newId)
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
