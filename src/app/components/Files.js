import React, { useCallback, useContext, useMemo, useState } from "react"
import { TreeView, toggleIsExpanded } from "baseui/tree-view"
import { Context } from "../reduction/Context"
import { transformFileList } from "../utils/transformFileList"

function Views({ tree }) {
  const { dispatch } = useContext(Context)
  const [data, setData] = useState(tree)
  const opener = useCallback(
    names => {
      dispatch({ type: "ADD_LOAD", payload: { names } })
    },
    [dispatch]
  )
  const handle = useCallback(
    n => {
      if (n.children) {
        setData(prev => toggleIsExpanded(prev, n))
      } else {
        opener(n.path)
      }
    },
    [opener]
  )
  return <TreeView data={data} indentGuides onToggle={handle} />
}

function Files({ data }) {
  return useMemo(() => {
    const none = [{ id: 1, label: "No Directory" }]
    if (data.length === 0) return <TreeView data={none} />
    const fileList = data.map(d => d.path ?? d.webkitRelativePath)
    const tree = transformFileList(fileList)
    return <Views key={data} tree={tree} />
  }, [data])
}

export { Files }
