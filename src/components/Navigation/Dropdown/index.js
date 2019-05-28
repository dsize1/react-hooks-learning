import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Portal from '../../../util/Portal'
import useElementPosition from '../../../util/useElementPosition'

import styles from './Dropdown.module.css'

const Dropdown = (props) => {
  const {
    disabled,
    getPopupContainer,
    overlay,
    overlayClassName,
    overlayStyle,
    placement,
    trigger,
    visible,
    onVisibleChange,
    children,
    className,
    ...rest
  } = props

  const getOverlayPos = (dropdownPos, placement) => {
    if (Object.keys(dropdownPos).length === 0) {
      return {}
    }
    const top = `${dropdownPos['bottom'] + 5}px`
    const bottom = `${dropdownPos['top'] - 5}px`
    const left = `${dropdownPos['left']}px`
    const right = `${dropdownPos['right']}px`
    const center = `${dropdownPos['left'] + dropdownPos['width'] / 2}px`
    const offsetXHelf = `translateX(-50%)`
    const offsetX = `translateX(-100%)`
    const offsetY = `translateY(-100%)`
    switch (placement) {
      case 'bottomLeft': 
        return { top, left }
      case 'bottomCenter':
        return { top, left: center, transform: offsetXHelf }
      case 'bottomRight':
        return { top, left: right, transform: offsetX }
      case 'topLeft':
        return { top: bottom, left, transform: offsetY }
      case 'topCenter':
        return { top: bottom, left: center, transform: `${offsetXHelf} ${offsetY}` }
      case 'topRight':
        return { top: bottom, left: right, transform: `${offsetX} ${offsetY}` }
      default: 
        return {}
    }
  }

  const classes = classNames(className, disabled && styles.disabled)

  const [collapsed, setCollapsed] = useState(!visible)
  const handleVisibleChange = () => {
    if (typeof onVisibleChange === 'function') onVisibleChange(!collapsed)
    setCollapsed(!collapsed)  
  }
  const handleVisible = (e) => {
    if (!collapsed) return 
    e.target.focus()
    handleVisibleChange()
    e.preventDefault()
  }
  const handleHidden = (e) => {
    if (collapsed) return 
    handleVisibleChange()
    e.preventDefault()
  }
  const triggerHandlers = !visible && trigger.reduce((handlers, it) => {
    if (it === 'hover') {
      handlers.onMouseEnter = handleVisible
      handlers.onMouseLeave = handleHidden
    } else if (it === 'click') {
      handlers.onClick = handleVisible
    } else if (it === 'contextMenu') {
      handlers.onContextMenu = handleVisible
    }
    return handlers
  }, {
    onBlur: handleHidden
  })

  const dropdownEl = useRef(null)
  const dropPos = useElementPosition(dropdownEl)
  const overlayPos = getOverlayPos(dropPos, placement)
  const hidden = visible ? false : collapsed ? styles['hidden'] : false
  const overlayClasses = classNames(overlayClassName, styles['menu'], hidden)

  let overlayEl
  if (typeof overlay === 'function') {
    overlayEl = overlay()
  } else {
    overlayEl = overlay
  }
  const menu = React.cloneElement(overlayEl, {
    className: overlayClasses,
    style: {...overlayStyle, ...overlayPos}
  })
  const containerEl = getPopupContainer()

  return (
    <div
      onMouseEnter={triggerHandlers.onMouseEnter}
      onMouseLeave={triggerHandlers.onMouseLeave}
      onClick={triggerHandlers.onClick}
      onContextMenu={triggerHandlers.onContextMenu}
      onBlur={triggerHandlers.onBlur}
      ref={dropdownEl}
      className={classes}
      {...rest} >
      <Portal overlay={menu} container={containerEl} />
      { children }
    </div>
  )
}

Dropdown.defaultProps = {
  getPopupContainer: () => document.body,
  placement: 'bottomLeft',
  trigger: ['hover'],
  overlayStyle: {}
}

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  getPopupContainer: PropTypes.func,
  overlay: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  overlayClassName: PropTypes.string,
  overlayStyle: PropTypes.object,
  placement: PropTypes.oneOf([
    'bottomLeft',
    'bottomCenter',
    'bottomRight',
    'topLeft',
    'topCenter',
    'topRight'
  ]),
  trigger: PropTypes.array,
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
}

export default Dropdown