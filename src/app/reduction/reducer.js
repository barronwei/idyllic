function reducer(state, action) {
  const { type, payload } = action
  let res = { ...state }
  switch (type) {
    case "ADD_FILE": {
      const { files } = payload
      res = { ...state, files }
      break
    }

    case "ADD_TEXT": {
      const { files, texts } = state
      const { names } = payload
      const lambda = ({ path }) => path === names
      const opened = texts.filter(lambda)
      const exists = files.filter(lambda)
      if (opened.length === 0 || !exists) break
      const trans = [...texts, ...exists]
      res = { ...state, texts: trans }
      break
    }

    case "REM_TEXT": {
      const { texts } = state
      const { names } = payload
      const lambda = ({ name }) => name !== names
      res = { ...state, texts: texts.filter(lambda) }
      break
    }
  }

  return res
}

export { reducer }
