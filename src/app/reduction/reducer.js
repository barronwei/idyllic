function reducer(state, action) {
  switch (action.type) {
    case "ADD_TEXT":
      const { name, text } = action.payload
      return { ...state, texts: state.texts.concat([{ name, text }]) }
    case "REM_TEXT":
      const { name: n } = action.payload
      return {
        ...state,
        texts: state.texts.filter(({ name }) => name !== n),
      }
    case "ADD_FILE":
      const { files } = action.payload
      return {
        ...state,
        files,
      }
    default:
      return state
  }
}

export { reducer }
