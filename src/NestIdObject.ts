import { eachRecur } from 'next-ts-utility'
import { IdManager, Init } from './'
import cleanIntId from './lib/cleanIntId'

type SetChildrenCallback = (children: NestIdObject[], idManager: IdManager) => NestIdObject[]

class NestIdObject extends Init<NestIdObject> {
  name?: string
  id?: number
  open?: boolean = true
  parent?: NestIdObject
  children?: NestIdObject[]
  idManager?: IdManager
  constructor() {
    super()
  }
  toggleOpen() {
    this.open = !this.open
  }
  get followers() {
    return eachRecur(this as NestIdObject, node => node.children)
  }
  private cleanIdOnTop() {
    const nodes = this.followers
    this.idManager = cleanIntId(nodes, {
      getter: node => node.id,
      setter: (node, id) => (node.id = id),
    })
  }
  clearId() {
    const { root } = this
    ;(root ?? this).cleanIdOnTop()
  }
  get root() {
    let parent = this.parent
    let prev: NestIdObject = this
    while (parent) {
      prev = parent //前の内容を保存
      parent = parent.parent
    }
    return prev
  }
  setChildren(callback?: SetChildrenCallback) {
    const { children, root } = this
    if (!root.idManager) root.cleanIdOnTop()
    const createCopy = () => children?.slice() ?? []
    const newChildren = callback?.(createCopy(), root.idManager as IdManager) ?? createCopy()
    newChildren.forEach(child => (child.parent = this))
    this.children = newChildren
  }
}

export default NestIdObject
