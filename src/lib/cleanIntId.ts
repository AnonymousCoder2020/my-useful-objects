import { between } from 'next-ts-utility'
import IdManager from '../IdManager'

interface ProcessOption<T extends unknown> {
  getter: (item: T) => unknown
  setter: (item: T, id: number) => unknown
}

export default <T extends unknown>(items: T[], { getter, setter }: ProcessOption<T>) => {
  const usedIdSet = new Set<number>()
  const vaildIdItemIdxes: number[] = []
  items.forEach((item, i) => {
    const id = getter(item)
    if (typeof id !== 'number' || !Number.isInteger(id) || id < 0 || usedIdSet.has(id)) {
      vaildIdItemIdxes.push(i)
      return
    }
    usedIdSet.add(id)
  })
  const usedIds = [...usedIdSet]
  const nextId = usedIds.length ? Math.max(...usedIds) + 1 : 0
  const vaildIdItems = items.filter((_, i) => vaildIdItemIdxes.includes(i))
  const notUsedIds: number[] = []
  usedIds.length &&
    usedIds
      .sort((a, b) => a - b)
      .reduce((acc, cur) => {
        notUsedIds.splice(notUsedIds.length, 0, ...between(acc, cur))
        return cur
      })
  const idManager = new IdManager(nextId, notUsedIds)
  vaildIdItems.forEach(vaildIdItem => setter(vaildIdItem, idManager.use()))
  return idManager
}
