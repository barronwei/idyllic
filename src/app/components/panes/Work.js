import React, { useContext, useState } from "react"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import { Tabs, Tab, ORIENTATION } from "baseui/tabs-motion"
import { Button } from "baseui/button"
import { Text } from "./Text"
import { Code } from "./Code"
import { Context } from "../../reduction/Context"

function Work() {
  const {
    state: { loads },
    dispatch,
  } = useContext(Context)
  const [activeKey, setActiveKey] = useState("1")
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => {
        setActiveKey(activeKey)
      }}
      activateOnFocus
    >
      {loads.map((l, i) => {
        const { name, path } = l
        return (
          <Tab
            key={i}
            title={
              <>
                {name}
                <Button
                  onClick={() =>
                    dispatch({ type: "REM_LOAD", payload: { names: name } })
                  }
                >
                  X
                </Button>
              </>
            }
          >
            {path.slice(-3) === ".md" ? <Text {...l} /> : <Code {...l} />}
          </Tab>
        )
      })}
    </Tabs>
  )
}

export { Work }
