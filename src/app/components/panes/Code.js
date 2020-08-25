import React from "react"
import AceEditor from "react-ace"
import { decode } from "../../utils/encoding"

function Code({ name, data }) {
  return (
    <AceEditor
      mode="java"
      name={name}
      defaultValue={decode(data)}
      editorProps={{ $blockScrolling: true }}
      width={"1000px"}
      height={"500px"}
    />
  )
}

export { Code }
