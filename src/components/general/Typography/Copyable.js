import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'

import Icon from '../Icon'


const Copyable = ({text, onCopy}) => {

  const [copying, setCopying] = useState(false)

  const copyListener = (e) => {
    e.clipboardData.setData('text/plain', text)
    setTimeout(() => setCopying(false), 2000)
    e.preventDefault()
  }
  
  const handleClick = throttle((e) => {
    if (copying) {
      return 
    }
    onCopy()
    document.execCommand('copy')
    setCopying(true)
    e.preventDefault()
  }, 2200)

  useEffect(() => {
    document.addEventListener('copy', copyListener)

    return () => {
      document.removeEventListener('copy', copyListener)
    }
  })

  return (
    <i onClick={handleClick}>
      <Icon    
        type={ copying ? 'GoCheck' : 'GoClippy' } 
        className={'typography-icon'}/>       
    </i>
  )
}

Copyable.propTypes = {
  text: PropTypes.string
}

export default Copyable