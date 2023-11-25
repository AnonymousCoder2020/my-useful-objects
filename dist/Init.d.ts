import { ClassPropsPartial } from 'my-useful-type';
export default class Init<T extends Init<any>> {
    init(initProps?: ClassPropsPartial<T>): this;
}
