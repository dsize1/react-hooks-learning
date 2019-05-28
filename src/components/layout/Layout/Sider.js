import React, { useRef, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import useElementSize from '../../../util/useElementSize'

import Trigger from './Trigger'

import styles from './Layout.module.css'

const Sider = (props) => {
  const {
    breakpoint,
    className,
    collapsed,
    collapsedWidth,
    collapsible,
    defaultCollapsed,
    reverseArrow,
    style,
    theme,
    trigger,
    width,
    onCollapse,
    onBreakpoint,
    children,
    ...rest
  } = props

  const breakpoints = {
    'xxl': 1600,
    'xl': 1200,
    'lg': 992,
    'md': 768,
    'sm': 576,
    'xs': 0
  }

  const [broken, setBroken] = useState(false)
  const window = useRef(document.body)
  const { width: windowWidth } = useElementSize(window)
  useMemo(() => {
    let currentBroken = windowWidth < breakpoints[breakpoint]
    if (currentBroken !== broken) {
        setBroken(currentBroken)
        onCollapse(collapsed, 'breakpoint')
        onBreakpoint(currentBroken)
      }
    }, 
    [windowWidth]
  )

  let classes = classNames(className, styles['sider'])
  
  let siderStyle = {...style}
  if (collapsed) {
    siderStyle.width = collapsedWidth
  } else {
    siderStyle.width = width 
  }
  if (theme === 'light') {
    siderStyle.color = '#001529'
    siderStyle.backgroundColor = '#f0f2f5'
  }

  const handleTriggerClick = () => {
    onCollapse(collapsed, 'trigger')
  }

  return (
    <aside 
      className={classes}
      style={siderStyle}
      {...rest} >
      { children }
      { collapsible
        && trigger !== null 
        && <Trigger
          theme={theme}
          specialEffect={collapsedWidth === 0}
          trigger={trigger}
          direction={reverseArrow ? !collapsed : collapsed } 
          onClick={handleTriggerClick} /> }
    </aside>
  )
}

Sider.defaultProps = {
  collapsedWidth: 80,
  collapsible: false,
  defaultCollapsed: false,
  reverseArrow: false,
  theme: 'dark',
  width: 200
}

Sider.propTypes = {
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  collapsedWidth: PropTypes.number,
  collapsible: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  reverseArrow: PropTypes.bool,
  style: PropTypes.object,
  theme: PropTypes.oneOf(['light', 'dark']),
  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onCollapse: PropTypes.func,
  onBreakpoint: PropTypes.func
}

export default Sider