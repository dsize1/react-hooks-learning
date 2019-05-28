import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from '../../general/Icon'

import styles from './Layout.module.css'

const Trigger = (props) => {
  const {
    direction,
    onClick,
    specialEffect,
    theme,
    trigger
  } = props

  let style={}
  if (theme === 'light') {
    style.color = '#001529'
    style.backgroundColor = '#f0f2f5'
  }
  const classes = classNames(styles['trigger'], specialEffect && styles['special'])
  const iconType = specialEffect ? 'GoListUnordered' : direction ? 'GoChevronLeft' : 'GoChevronRight'

  return (
    <div
      style={style}
      className={classes}
      onClick={onClick}>
      { trigger 
        || (<Icon type={iconType}/>) }
    </div>
  )
}

Trigger.propTypes = {
  direction: PropTypes.bool,
  onClick: PropTypes.func,
  specialEffect: PropTypes.bool,
  theme: PropTypes.string,
  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
}

export default Trigger