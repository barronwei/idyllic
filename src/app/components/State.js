import React from "react"
import { Space } from "./Space"
import { Context } from "../reduction/Context"
import { reducer } from "../reduction/reducer"
import { init } from "../reduction/outline"
import { useLocalReducer as useLocal } from "../utils/useLocal"

function State() {
  const [state, dispatch] = useLocal("reducer", init, reducer)
  return (
    <Context.Provider value={{ state, dispatch }}>
      <Space />
    </Context.Provider>
  )
}

export { State }
