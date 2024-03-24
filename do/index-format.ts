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
  const idxFormats: Option[] = conf.get('index-format')
  for (let { module, index, format } of idxFormats) {
    format = format ?? "export { default as ${moduleNm} } from './${moduleNm}'"
    const moduleNms: string[] = []
    ;(await grobby(module.includes, { ignore: (module.excludes ?? []).concat([index]) })).forEach(f => {
      const moduleNm = f.match(/([^\/]+?)\/index\.ts$/)?.[1] ?? f.match(/([^\/]+?).ts$/)?.[1]
      if (!moduleNm || moduleNm === 'index') return
      moduleNms.push(moduleNm)
    })
    const idxVal = moduleNms.map(mn => (format as string).replace(/\$\{moduleNm\}/g, mn)).join('\n')
    try {
      await fs.writeFile(index, idxVal)
    } catch (err) {
      console.warn(err)
    }
  }
})()
