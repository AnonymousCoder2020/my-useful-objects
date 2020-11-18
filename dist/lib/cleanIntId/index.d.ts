import IdManager from '../../IdManager';
interface ProcessOption<T extends unknown> {
    getter: (item: T) => unknown;
    setter: (item: T, id: number) => unknown;
}
declare const _default: <T extends unknown>(items: T[], { getter, setter }: ProcessOption<T>) => IdManager;
export default _default;
