import { between } from 'next-ts-utility';
import IntIdManager from '../IntIdManager';
export default (type, items, { get, set }) => {
    const usedIdSet = new Set();
    const invalidIdItems = [];
    items.forEach(item => {
        const id = get(item);
        if (typeof id !== 'number' || !Number.isInteger(id) || id < 0 || usedIdSet.has(id))
            invalidIdItems.push(item);
        else
            usedIdSet.add(id);
    });
    const usedIds = [...usedIdSet];
    const nextId = usedIds.length ? Math.max(...usedIds) + 1 : 0;
    const notUsedIds = [];
    usedIds.length &&
        [-1]
            .concat(usedIds)
            .sort((a, b) => a - b)
            .reduce((acc, cur) => {
            notUsedIds.push(...between(acc, cur));
            return cur;
        });
    const idManager = new IntIdManager(nextId, notUsedIds);
    invalidIdItems.forEach(invalidIdItem => set(invalidIdItem, type == 'reuse' ? idManager.reuse() : idManager.use()));
    return idManager;
};
