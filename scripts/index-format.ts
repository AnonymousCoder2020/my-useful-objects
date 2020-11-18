import conf from 'config'
import { promises as fs } from 'fs'
import grobby from 'globby'
;(async () => {
  const { module, index, format } = conf.get('index-format')
  const moduleNames: string[] = []
  ;(await grobby(module.includes, { ignore: module.excludes.concat([index]) })).forEach(file => {
    const moduleName = file.match(/([^\/]+?)\/index\.ts$/)?.[1] ?? file.match(/([^\/]+?).ts$/)?.[1]
    if (!moduleName || moduleName === 'index') return
    moduleNames.push(moduleName)
  })
  const indexValue = moduleNames.map(mn => format.replace(/\$\{moduleName\}/g, mn)).join('\n')
  try {
    await fs.writeFile(index, indexValue)
  } catch (err) {
    console.warn(err)
  }
})()
