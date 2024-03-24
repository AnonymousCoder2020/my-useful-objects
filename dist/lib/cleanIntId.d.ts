import IntIdManager from '../IntIdManager';
interface ProcessOption<T extends unknown> {
    get: (item: T) => unknown;
    set: (item: T, id: number) => unknown;
}
export type CleanMode = 'reuse' | 'skip';
declare const _default: <T extends unknown>(type: CleanMode, items: T[], { get, set }: ProcessOption<T>) => IntIdManager;
export default _default;
