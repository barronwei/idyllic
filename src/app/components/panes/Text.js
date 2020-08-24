import React, { useContext } from "react"
import Editor from "rich-markdown-editor"
import { Context } from "../../reduction/Context"

function Text({ name, text }) {
  const { dispatch } = useContext(Context)
  return (
    <Editor
      defaultValue={text}
      onChange={c => dispatch({ type: "change", payload: c() })}
    />
  )
}

export { Text }
