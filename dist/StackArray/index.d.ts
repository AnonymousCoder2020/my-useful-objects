export default class<T> {
    values: T[];
    unshift(...items: T[]): number;
    shift(): T | undefined;
}
