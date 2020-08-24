import React from "react"
import { BaseProvider, LightTheme, DarkTheme } from "baseui"
import { Provider } from "styletron-react"
import { Engine } from "./Engine"
import { State } from "../components/State"

function Rap() {
  return (
    <Provider value={Engine}>
      <BaseProvider theme={LightTheme}>
        <State />
      </BaseProvider>
    </Provider>
  )
}

export { Rap }
