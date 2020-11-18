import conf from 'config'
import { promises as fs } from 'fs'
import grobby from 'globby'

interface Option {
  index: string
  module: {
    includes: string[]
    excludes?: string[]
  }
  format?: string
}

;(async () => {
  const indexFormats: Option[] = conf.get('index-format')
  for (let { module, index, format } of indexFormats) {
    format = format ?? "export { default as ${moduleName} } from './${moduleName}'"
    const moduleNames: string[] = []
    ;(await grobby(module.includes, { ignore: (module.excludes ?? []).concat([index]) })).forEach(file => {
      const moduleName = file.match(/([^\/]+?)\/index\.ts$/)?.[1] ?? file.match(/([^\/]+?).ts$/)?.[1]
      if (!moduleName || moduleName === 'index') return
      moduleNames.push(moduleName)
    })
    const indexValue = moduleNames.map(mn => (format as string).replace(/\$\{moduleName\}/g, mn)).join('\n')
    try {
      await fs.writeFile(index, indexValue)
    } catch (err) {
      console.warn(err)
    }
  }
})()
