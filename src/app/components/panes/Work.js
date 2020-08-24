import React, { useContext } from "react"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import { Text } from "./Text"
import { Code } from "./Code"
import { Context } from "../../reduction/Context"

function Work() {
  const {
    state: { texts },
  } = useContext(Context)
  return (
    <FlexGrid flexGridColumnCount={2}>
      {texts.map((t, i) => {
        return (
          <FlexGridItem key={i}>
            <Text {...t} />
          </FlexGridItem>
        )
      })}
      <FlexGridItem>
        <Code />
      </FlexGridItem>
    </FlexGrid>
  )
}

export { Work }
