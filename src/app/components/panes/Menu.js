import React, { useCallback, useRef, useState } from "react"
import { Button } from "baseui/button"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import { FileUploader } from "baseui/file-uploader"
import { Files } from "../Files"
import { useLocalStorage as useLocal } from "../../utils/useLocal"

function Menu() {
  const inputRef = useRef(null)
  const [data, setData] = useLocal("files", [])
  const handleUpload = useCallback(e => {
    setData(Array.from(e))
  }, [])
  return (
    <FlexGrid flexGridColumnCount={1}>
      <FlexGridItem>
        <FileUploader
          onDrop={(acceptedFiles, rejectedFiles) => {
            // handle file upload...
            handleUpload(acceptedFiles)
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
        <Files data={data} />
      </FlexGridItem>
    </FlexGrid>
  )
}

export { Menu }
