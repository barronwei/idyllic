import React from "react"
import Editor from "rich-markdown-editor"
import { decode } from "../../utils/encoding"

function Text({ data }) {
  return <Editor defaultValue={decode(data)} />
}

export { Text }
