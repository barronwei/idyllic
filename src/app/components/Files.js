import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react"

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

function Files({ data }) {
  return useMemo(() => {
    if (data.length === 0) return <div>No Directory</div>

    const pair = data.map(d => [d.path ?? d.webkitRelativePath, d])
    const dict = Object.fromEntries(pair)
    const fileList = pair.map(([d, _]) => d)
    const tree = Object.values(transformFileList(fileList))[0]
    return (
      <FilesContext.Provider
        value={{
          dict,
        }}
      >
        <Composite tree={tree} />
      </FilesContext.Provider>
    )
  }, [data])
}

export default Files
