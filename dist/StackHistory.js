import StackArray from './StackArr';
// TODO 開発途中
export default class extends StackArray {
    historyRules = [];
    constructor(rules) {
        super();
        this.historyRules = rules;
    }
}
