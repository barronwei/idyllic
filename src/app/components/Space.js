import React from "react"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import { Menu } from "./panes/Menu"
import { Work } from "./panes/Work"

function Space() {
  return (
    <FlexGrid flexGridColumnCount={2}>
      <FlexGridItem flex={1}>
        <Menu />
      </FlexGridItem>
      <FlexGridItem flex={10}>
        <Work />
      </FlexGridItem>
    </FlexGrid>
  )
}

export { Space }
