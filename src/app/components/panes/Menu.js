import React, { useCallback, useRef, useState } from "react"
import { Button } from "baseui/button"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import Files from "../Files"

function Menu() {
  const inputRef = useRef(null)
  const [data, setData] = useState([])
  const handleUpload = useCallback(e => {
    setData(Array.from(e.target.files))
  }, [])
  const [work, setWork] = useState(false)
  return (
    <FlexGrid flexGridColumnCount={1}>
      <input
        ref={inputRef}
        type="file"
        name="files[]"
        id="files"
        multiple
        directory=""
        webkitdirectory=""
        mozdirectory=""
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <FlexGridItem>
        <Button
          style={{ width: "100%" }}
          onClick={() => inputRef.current.click()}
        >
          Open Files
        </Button>
      </FlexGridItem>
      <FlexGridItem>
        <Files data={data} />
      </FlexGridItem>
    </FlexGrid>
  )
}

export default Menu
