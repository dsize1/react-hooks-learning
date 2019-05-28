import React from 'react'
import PropTypes from 'prop-types'
import * as go from 'react-icons/go'
import classNames from 'classnames'

import isHexColor from '../../../util/isHexColor'
import colorTransition from '../../../util/colorTransition'

import styles from './Icon.module.css'

const Icon = (props) => {
  const {
    type,
    style,
    theme,
    spin,
    rotate,
    twoToneColor,
    className,
    ...rest
  } = props

  let createIcon
  if (type) {
    createIcon = go[type]
  } else {
    return null
  }
  if (typeof createIcon !== 'function') {
    return null
  }

  let iconStyle = {...style}

  if (theme === 'filled') {
    iconStyle.color = '#fff'
    iconStyle.borderColor = '#333'
    iconStyle.backgroundColor = '#333'
  } else if (theme === 'twoTone' && isHexColor(twoToneColor)) {
    iconStyle.color = twoToneColor
    iconStyle.borderColor = twoToneColor
    iconStyle.backgroundColor = colorTransition(twoToneColor)
  }

  if (rotate) {
    if (iconStyle.hasOwnProperty('transform')) {
      iconStyle.transform += `rotate(${rotate}deg)`
    } else {
      iconStyle.transform = `rotate(${rotate}deg)`
    }
  }

  let iconProps = {style: iconStyle, className, ...rest}

  if (spin) {
    iconProps.className = classNames(iconProps.className, styles.spin)
  }

  return (
    <>
      { createIcon(iconProps) }
    </>
  )
}

Icon.defaultProps = {
  theme: 'outlined',
  spin: false,
  style: {},
}

Icon.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.string,
  spin: PropTypes.bool,
  rotate: PropTypes.number,
  twoToneColor: PropTypes.string
}

export default Icon 