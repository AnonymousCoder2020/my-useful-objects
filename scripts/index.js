import { exec } from 'child_process'
;(async () => {
  const [, , scriptName, ...args] = process.argv
  exec(`node --loader ts-node/esm.mjs scripts/${scriptName}.ts${args.length ? ' ' + args.join(' ') : ''}`, (err, stdout, stderr) => {
    if (err) {
      console.log(`(script_err ${scriptName}) ${stderr}`)
      return
    }
    console.log(`(script_log ${scriptName}) ${stdout}`)
  })
})()
