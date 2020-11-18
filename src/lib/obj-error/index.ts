export default <T extends object>(msg: string, obj?: T) => {
  let log: string[] = []
  if (obj) log = Object.entries(obj).map(([key, val]) => `${key} = ${val}`)
  log.unshift(msg)
  throw new Error(log.join('\n'))
}
