import { between } from 'next-ts-utility';
import IdManager from '../IdManager';
export default (items, { getter, setter }) => {
    const usedIdSet = new Set();
    const vaildIdItemIdxes = [];
    items.forEach((item, i) => {
        const id = getter(item);
        if (typeof id !== 'number' || !Number.isInteger(id) || id < 0 || usedIdSet.has(id)) {
            vaildIdItemIdxes.push(i);
            return;
        }
        usedIdSet.add(id);
    });
    const usedIds = [...usedIdSet];
    const nextId = usedIds.length ? Math.max(...usedIds) + 1 : 0;
    const vaildIdItems = items.filter((_, i) => vaildIdItemIdxes.includes(i));
    const notUsedIds = [];
    usedIds.length &&
        usedIds
            .sort((a, b) => a - b)
            .reduce((acc, cur) => {
            notUsedIds.splice(notUsedIds.length, 0, ...between(acc, cur));
            return cur;
        });
    const idManager = new IdManager(nextId, notUsedIds);
    vaildIdItems.forEach(vaildIdItem => setter(vaildIdItem, idManager.use()));
    return idManager;
};
