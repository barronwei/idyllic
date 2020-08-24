import { useEffect, useMemo, useReducer, useState } from "react"

function useLocalReducer(id, init, reducer) {
  const data = useMemo(() => JSON.parse(localStorage.getItem(id)), [id])
  const r = useReducer(reducer, data ?? init)
  const [[state, dispatch]] = [r]
  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(state))
  }, [id, state])
  return [state, dispatch]
}

function useLocalStorage(id, init) {
  const data = useMemo(() => JSON.parse(localStorage.getItem(id)), [id])
  const s = useState(data ?? init)
  const [[state, setState]] = [s]
  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(state))
  }, [id, state])
  return [state, setState]
}

export { useLocalReducer, useLocalStorage }
