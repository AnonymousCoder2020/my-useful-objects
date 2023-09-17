import StackArray from './StackArr';
export declare namespace StackHistory {
    interface Item {
        label: string;
        args: any[];
    }
    namespace HistoryRule {
        type Generics = {};
        type Block = {
            name: string;
            fn: (...args: any[]) => any;
        };
        type Twin = [Block, Block];
    }
}
export default class extends StackArray<StackHistory.Item> {
    historyRules: StackHistory.HistoryRule.Twin[];
    constructor(rules: StackHistory.HistoryRule.Twin[]);
}
