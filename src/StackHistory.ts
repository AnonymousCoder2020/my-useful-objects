import StackArray from './StackArr'

export namespace StackHistory {
  export interface Item {
    label: string
    args: any[]
  }
  export namespace HistoryRule {
    export type Generics = {}
    export type Block = {
      name: string
      fn: (...args: any[]) => any
    }
    export type Twin = [Block, Block]
  }
}
// TODO 開発途中
export default class extends StackArray<StackHistory.Item> {
  historyRules: StackHistory.HistoryRule.Twin[] = []
  constructor(rules: StackHistory.HistoryRule.Twin[]) {
    super()
    this.historyRules = rules
  }
}
