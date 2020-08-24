function reducer(state, action) {
  switch (action.type) {
    case "ADD_TEXT":
      const { name, text } = action.payload
      console.log({ name, text })
      return { ...state, texts: state.texts.concat([{ name, text }]) }
    case "REM_TEXT":
      const { name: n } = action.payload
      return {
        ...state,
        texts: state.texts.filter(({ name }) => name !== n),
      }
    default:
      return state
  }
}

export { reducer }
