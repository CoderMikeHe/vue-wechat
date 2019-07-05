export default (modules, handler) => {
  let result = {}
  modules.keys().forEach(fileName => {
    const oneModule = modules(fileName)
    const moduleName = fileName
    // 移除开始的 './'
      .replace(/^\.\//, '')
    // 移除文件扩展
      .replace(/\.\w+$/, '')
    let moduleValue
    if (typeof handler === 'function') {
      moduleValue = handler(oneModule.default)
    } else {
      moduleValue = oneModule.default
    }
    result[moduleName] = moduleValue
  })
  return result
}
