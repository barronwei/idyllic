import React from "react"
import Editor from "rich-markdown-editor"
import { BaseProvider, LightTheme, DarkTheme } from "baseui"

function Text() {
  return <Editor defaultValue="Hello world!" placeholder="Hello" />
}

export default Text
