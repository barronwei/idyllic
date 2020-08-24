import React from "react"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import { Menu } from "./panes/Menu"
import { Work } from "./panes/Work"

function Space() {
  return (
    <FlexGrid>
      <FlexGridItem>
        <Menu />
      </FlexGridItem>
      <FlexGridItem>
        <Work />
      </FlexGridItem>
    </FlexGrid>
  )
}

export { Space }
