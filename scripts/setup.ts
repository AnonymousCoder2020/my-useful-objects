import { exec } from 'child_process'
import { promises as fs } from 'fs'
;(async () => {
  const [, , repositoryName] = process.argv
  if (!repositoryName) return
  const packageJSON = JSON.parse(await fs.readFile('./package.json', 'utf-8'))
  const repositoryPath = `https://github.com/AnonymousCoder2020/${repositoryName}`
  packageJSON.name = repositoryName
  packageJSON.repository = `git+${repositoryPath}.git`
  packageJSON.bugs = `${repositoryPath}/issues`
  packageJSON.homepage = `${repositoryPath}#readme`
  await fs.writeFile('./package.json', JSON.stringify(packageJSON, null, '  '))
  exec(
    `npm i && git remote set-url origin https://github.com/AnonymousCoder2020/${repositoryName} && git merge origin master --allow-unrelated-histories`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(`(setup.ts error): ${stderr}`)
        return
      }
      console.log(`(setup.ts message): ${stdout}`)
    }
  )
})()
