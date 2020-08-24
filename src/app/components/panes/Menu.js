import React, {
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react"
import { Button } from "baseui/button"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import { FileUploader } from "baseui/file-uploader"
import { Files } from "../Files"
import { Context } from "../../reduction/Context"

function getFiles(fs, setLoad, setDirs) {
  setLoad(load => !load)
  const arr = Array.from(fs)
  let counter = arr.length
  arr.forEach(f => {
    const r = new FileReader()
    r.onload = () => {
      counter -= 1
      const { name, path, webkitRelativePath } = f
      setDirs(x => [...x, { name, path, webkitRelativePath, data: r.result }])
      if (!counter) setLoad(load => !load)
    }
    r.readAsText(f)
  })
}

function Menu() {
  const {
    state: { files },
    dispatch,
  } = useContext(Context)
  const [load, setLoad] = useState(false)
  const [dirs, setDirs] = useState([])

  const inputRef = useRef(null)
  const handleUpload = useCallback(
    e => {
      getFiles(e, setLoad, setDirs)
    },
    [setLoad, setDirs]
  )

  useEffect(() => {
    if (!load) dispatch({ type: "ADD_FILE", payload: { files: dirs } })
    if (!load) console.log(dirs)
  }, [dispatch, load, dirs])

  return (
    <FlexGrid flexGridColumnCount={1}>
      <FlexGridItem>
        <FileUploader
          onDrop={(f, _) => {
            handleUpload(f)
          }}
          multiple
          overrides={{
            Root: { style: { display: "none" } },
            HiddenInput: {
              props: {
                ref: inputRef,
                directory: "",
                webkitdirectory: "",
                mozdirectory: "",
              },
            },
          }}
        />
      </FlexGridItem>
      <FlexGridItem>
        <Button
          style={{ width: "100%" }}
          onClick={() => inputRef.current.click()}
        >
          Open Files
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <Files data={files} />
      </FlexGridItem>
    </FlexGrid>
  )
}

export { Menu }
