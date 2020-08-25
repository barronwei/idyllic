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

  let id = 1
  const final = [{ id, label: rootDir, children: [] }]

  array.forEach(path => {
    const abs = path.replace(topPath + "/", "").split("/")
    let dir = final[0].children
    for (const [i, file] of abs.entries()) {
      id++
      const el = { id, label: file }

      if (i === abs.length - 1) {
        dir.push({ ...el, path })
        break
      }

      let exists = 0

      for (let [j, { label }] of dir.entries()) {
        if (file === label) {
          dir = dir[j].children
          exists = 1
        }
      }

      if (exists) {
        continue
      }

      dir.push({ ...el, children: [] })
      const { children: c } = dir[dir.length - 1]
      dir = c
    }
  })

  return final
}

export { transformFileList }
