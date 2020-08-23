import React from "react"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import Menu from "./panes/Menu"
import Code from "./panes/Code"
import Text from "./panes/Text"
import useWindow from "../utils/useWindow"

function Space() {
  return (
    <FlexGrid
      flexGridColumnCount={3}
      gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))"
    >
      <FlexGridItem>
        <Menu />
      </FlexGridItem>
      <FlexGridItem>
        <Text />
      </FlexGridItem>
      <FlexGridItem>
        <Code />
      </FlexGridItem>
    </FlexGrid>
  )
}

export default Space