import { IntIdManager } from './'

describe('index', () => {
  const intIdManager = new IntIdManager()
  console.log(intIdManager.use(), intIdManager.nextId)
})
