import {useState, useLayoutEffect} from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import throttle from 'lodash.throttle'

function getSize (el) {
  if (!el) {
    return {}
  }
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

function useElementSize (ref) {

  const [size, setSize] = useState(getSize(ref.current))

  function handleResize () {
    if (ref && ref.current) {
      setSize(getSize(ref.current))
    }
  }

  useLayoutEffect(() => {
    let el = ref.current

    handleResize()
    let ro = new ResizeObserver(throttle(() => handleResize(el), 200))
    ro.observe(el)

    return () => {
      ro.disconnect(el)
      ro = null
    }
  }, [])

  return size
}

export default useElementSize