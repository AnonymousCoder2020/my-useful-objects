import StackArray from './StackArr';
// TODO 開発途中
export default class extends StackArray {
    constructor(rules) {
        super();
        this.historyRules = [];
        this.historyRules = rules;
    }
}
