function transformFileList(list) {
  const array = Array.from(list)
  const regex = new RegExp("/([^/]+)/?$")
  const firstEl = array[0]
  let topPath = firstEl.replace(regex, "")
  array.forEach(path => {
    while (!path.includes(topPath)) {
      topPath = topPath.replace(regex, "")
    }
  })
  const roots = topPath.match(regex, "")
  const rootDir = roots ? roots[0].slice(1) : topPath
  const df = name => {
    return { name, dirs: {}, ents: {} }
  }
  const dir = { [rootDir]: df(rootDir) }

  array.forEach(path => {
    const abs = path.replace(topPath + "/", "").split("/")
    let currentDir = dir[rootDir]
    for (const [i, file] of abs.entries()) {
      if (i === abs.length - 1) {
        currentDir.ents[file] = { file, path }
        break
      }

      currentDir = currentDir.dirs[file] = currentDir.dirs[file] ?? df(file)
    }
  })

  return dir
}

module.exports = transformFileList
