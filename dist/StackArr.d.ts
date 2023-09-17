export default class<T> {
    v: T[];
    unshift(...items: T[]): number;
    shift(): T | undefined;
}
