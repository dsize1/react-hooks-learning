import {useState, useEffect} from 'react'
import throttle from 'lodash.throttle'

const getPosition = function (el) {
  if (!el) {
    return {}
  }
  const { bottom, height, left, right, top, width } = el.getBoundingClientRect()
  return { bottom, height, left, right, top, width }
}

const useElementPosition = (ref) => {

  const [position, setPosition] = useState(getPosition(ref.current))

  function handleScroll (e, ref) {
    if (ref && ref.current) {
      setPosition(getPosition(ref.current))
    }
  }

  useEffect(() => {
    let handler = throttle((e) => handleScroll(e, ref), 200)

    handleScroll(null, ref)

    document.body.addEventListener('scroll', handler)

    return () => {
      document.body.removeEventListener('scroll', handler)
      handler = null
    }
  }, [])

  return position
}

export default useElementPosition