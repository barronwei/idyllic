import { useEffect, useMemo, useReducer, useState } from "react"
import { encode, decode } from "../utils/encoding"

function useLocalReducer(id, init, reducer) {
  const temp = useMemo(() => decode(localStorage.getItem(id)), [id])
  const data = useMemo(() => temp ? JSON.parse(temp) : temp, [temp])
  const r = useReducer(reducer, data ?? init)
  const [[state, dispatch]] = [r]
  useEffect(() => {
    localStorage.setItem(id, encode(JSON.stringify(state)))
  }, [id, state])
  return [state, dispatch]
}

function useLocalStorage(id, init) {
  const temp = useMemo(() => decode(localStorage.getItem(id)), [id])
  const data = useMemo(() => (temp ? JSON.parse(temp) : temp), [temp])
  const s = useState(data ?? init)
  const [[state, setState]] = [s]
  useEffect(() => {
    localStorage.setItem(id, encode(JSON.stringify(state)))
  }, [id, state])
  return [state, setState]
}

export { useLocalReducer, useLocalStorage }
