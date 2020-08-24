import React, { useCallback, useContext, useMemo, useState } from "react"
import { TreeView, toggleIsExpanded } from "baseui/tree-view"
import transformFileList from "../utils/transformFileList"
import { Context } from "../reduction/Context"

function getFile(f, opener) {
  const r = new FileReader()
  r.onload = () => {
    opener(f.name, r.result)
  }
  r.readAsText(f)
}

function Views({ tree, dict }) {
  const { dispatch } = useContext(Context)
  const [data, setData] = useState(tree)
  const opener = useCallback(
    (name, text) => {
      dispatch({ type: "ADD_TEXT", payload: { name, text } })
    },
    [dispatch]
  )
  const handle = useCallback(
    n => {
      if (n.children) {
        setData(prev => toggleIsExpanded(prev, n))
      } else {
        getFile(dict[n.path], opener)
      }
    },
    [dict, opener]
  )
  return <TreeView data={data} indentGuides onToggle={handle} />
}

function Files({ data }) {
  return useMemo(() => {
    const none = [{ id: 1, label: "No Directory" }]
    if (data.length === 0) return <TreeView data={none} />
    const pair = data.map(d => [d.path ?? d.webkitRelativePath, d])
    const dict = Object.fromEntries(pair)
    const fileList = pair.map(([d, _]) => d)
    const tree = transformFileList(fileList)
    return <Views key={data} tree={tree} dict={dict} />
  }, [data])
}

export { Files }
