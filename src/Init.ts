import { ClassPropsPartial } from 'next-type-utility'

export default class Init {
  init(initProps: ClassPropsPartial<typeof this>) {
    initProps && Object.assign(this, initProps)
    return this
  }
}
