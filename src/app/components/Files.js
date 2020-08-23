import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react"

import { TreeView, toggleIsExpanded } from "baseui/tree-view"
import transformFileList from "../utils/transformFileList"

// TODO: move to utils
function getFile(f, setData, setLoad) {
  const r = new FileReader()
  r.onload = () => {
    setData(r.result)
    setLoad(false)
  }
  r.onloadstart = () => {
    setLoad(true)
  }
  r.readAsText(f)
}

const FilesContext = createContext()

function Primitive({ unit }) {
  const { dict } = useContext(FilesContext)
  const { file, path } = unit
  const [data, setData] = useState("")
  const [load, setLoad] = useState(false)
  const handleFile = useCallback(() => getFile(dict[path], setData, setLoad), [
    dict,
    path,
  ])
  return (
    <div
      border="none"
      width="100%"
      leftIcon={"at-sign"}
      onClick={handleFile}
      justifyContent="left"
    >
      {file}
    </div>
  )
}

function Composite({ tree }) {
  const [show, setShow] = useState(false)
  const { dirs: x, ents: y, name } = tree

  const dirs = useMemo(() => {
    return Object.values(x).map((dir, i) => <Composite key={i} tree={dir} />)
  }, [x])

  const ents = useMemo(() => {
    return Object.values(y).map((ent, i) => <Primitive key={i} unit={ent} />)
  }, [y])

  return (
    <>
      <button
        border="none"
        width="100%"
        leftIcon={show ? "chevron-down" : "chevron-right"}
        onClick={() => setShow(show => !show)}
        variantColor="teal"
        variant="outline"
        justifyContent="left"
      >
        {name}
      </button>
      {dirs}
      {ents}
    </>
  )
}

function Views({ tree }) {
  const [data, setData] = useState(tree)
  return (
    <TreeView
      data={data}
      indentGuides
      onToggle={node => {
        setData(prev => toggleIsExpanded(prev, node))
      }}
    />
  )
}

function Files({ data }) {
  return useMemo(() => {
    const none = [{ id: 1, label: "No Directory" }]
    if (data.length === 0) return <TreeView data={none} />
    const pair = data.map(d => [d.path ?? d.webkitRelativePath, d])
    const dict = Object.fromEntries(pair)
    const fileList = pair.map(([d, _]) => d)
    const tree = transformFileList(fileList.reverse())
    return <Views key={data} dict={dict} tree={tree} />
  }, [data])
}

export default Files
