import { ClassPropsPartial } from 'next-type-utility';
export default class Init {
    init(initProps: ClassPropsPartial<typeof this>): this;
}
