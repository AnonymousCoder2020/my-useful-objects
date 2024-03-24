import { ClassPropsPartial } from 'next-type-utility'

export default class Init<T extends Init<any>> {
  init(initProps: ClassPropsPartial<T>) {
    initProps && Object.assign(this, initProps)
    return this
  }
}
