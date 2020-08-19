import React from "react"
import { BaseProvider, LightTheme, DarkTheme } from "baseui"
import { Provider } from "styletron-react"
import { Engine } from "./Engine"
import Space from "../components/Space"

function Rap() {
  return (
    <Provider value={Engine}>
      <BaseProvider theme={LightTheme}>
        <Space />
      </BaseProvider>
    </Provider>
  )
}

export default Rap
