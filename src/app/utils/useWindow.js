import { useEffect, useState } from "react"

function getWindow() {
  const { innerWidth: w, innerHeight: h } = window
  return {
    w,
    h,
  }
}

function useWindow() {
  const [dimensions, setDimensions] = useState(getWindow())

  useEffect(() => {
    function resize() {
      setDimensions(getWindow())
    }

    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return dimensions
}

export { useWindow }
