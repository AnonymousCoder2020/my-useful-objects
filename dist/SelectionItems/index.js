import Init from '../Init';
export default class SelectionItems extends Init {
    constructor(items, getIdDef, option) {
        super();
        this.items = items;
        this.getIdDef = getIdDef;
        this.select = new Set();
        this.range = new Set();
        option && Object.assign(this, option);
        this.clean();
    }
    get totalSelect() {
        return [...this.select, ...this.range];
    }
    getId(idx) {
        var _a;
        const targetItem = this.items[idx];
        if ((_a = !targetItem) !== null && _a !== void 0 ? _a : false) {
            console.warn(`インデックス: ${idx} のアイテムは存在しません。\nアイテム: ${JSON.stringify(targetItem)}`);
            return;
        }
        return this.getIdDef(this.items[idx]);
    }
    getIdx(id) {
        return this.items.findIndex(item => this.getIdDef(item) === id);
    }
    toggle(idx) {
        const id = this.getId(idx);
        if (id === undefined)
            return;
        this.toggleId(id);
    }
    toggleId(id) {
        this.takeOverSelect();
        const { select } = this;
        if (!select.has(id)) {
            this.pinId = id;
            select.add(id);
        }
        else {
            if (this.pinId === id)
                this.pinId = undefined;
            select.delete(id);
        }
    }
    takeOverSelect() {
        const takedOver = this.totalSelect;
        this.range = new Set();
        this.select = new Set(takedOver);
    }
    cover(startIdx, endIdx) {
        if (endIdx < startIdx)
            [startIdx, endIdx] = [endIdx, startIdx];
        const rankIds = [...Array(endIdx - startIdx + 1).keys()].map(i => this.getId(i + startIdx)).filter((id) => Boolean(id));
        this.range = new Set(rankIds);
        this.select = new Set([...this.select].filter(id => !this.range.has(id)));
    }
    coverBy(endIdx) {
        const { pinId } = this;
        if (pinId === undefined) {
            this.toggle(endIdx);
            return;
        }
        this.cover(this.getIdx(pinId), endIdx);
    }
    isInclude(id) {
        return this.select.has(id) || this.range.has(id);
    }
    clean() {
        const allIds = this.items.map(item => this.getIdDef(item));
        this.select = new Set([...this.select].filter(id => allIds.includes(id)));
        this.range = new Set([...this.range].filter(id => allIds.includes(id)));
    }
}
