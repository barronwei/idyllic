function reducer(state, action) {
  const { type, payload } = action
  let res = { ...state }
  switch (type) {
    case "ADD_FILE": {
      const { files } = payload
      res = { ...state, files }
      break
    }

    case "ADD_LOAD": {
      const { files, loads } = state
      const { names } = payload
      const lambda = ({ path }) => path === names
      const opened = loads.filter(lambda)
      const exists = files.filter(lambda)
      if (opened.length !== 0 || !exists) break
      const trans = [...loads, ...exists]
      res = { ...state, loads: trans }
      break
    }

    case "REM_LOAD": {
      const { loads } = state
      const { names } = payload
      const lambda = ({ name }) => name !== names
      res = { ...state, loads: loads.filter(lambda) }
      break
    }

    default: {
      throw Error("Invalid Dispatch!")
    }
  }

  return res
}

export { reducer }
