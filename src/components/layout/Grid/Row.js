import React, { useRef, createContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Grid.module.css'

import useElementSize from '../../../util/useElementSize'
import classOf from '../../../util/classOf'

const GutterContext = createContext(0)

const Row = (props) => {
  const {
    align,
    gutter,
    justify,
    type,
    children,
    className,
    style,
  } = props

  const getMatchMedia = (width) => {
    if (typeof width !== 'number') {
      return undefined
    }
    if (width >= 1600) {
      return 'xxl'
    } else if (width >= 1200) {
      return 'xl'
    } else if (width >= 992) {
      return 'lg'
    } else if (width >= 768) {
      return 'md'
    } else if (width >= 576) {
      return 'sm'
    } else if (width < 576) {
      return 'xs'
    }
  }

  let classes = ['ui-grid']
  classes && classes.push(className)
  if (type === 'flex') {
    classes.push(styles[`row-flex`])
    classes.push(styles[`align-${align}`])
    classes.push(styles[`justify-${justify}`])
  } else {
    classes.push(styles.row)
  }
  classes = classNames(classes)
  
  const window = useRef(document.body)
  const {width: windowWidth} = useElementSize(window)
  
  const _size = getMatchMedia(windowWidth)

  let childGutter = 0
  let rowStyle = {...style}
  if (typeof gutter === 'number' && gutter > 0) {
    childGutter = gutter
  } else if (typeof gutter === 'object' && classOf(gutter, _size) === 'number') {
    childGutter = gutter[_size]
  }
  childGutter = Number.prototype.toFixed.call(childGutter / 2, 2)
  childGutter = Number.parseFloat(childGutter)
  rowStyle.marginLeft = `-${childGutter}px`
  rowStyle.marginRight = `-${childGutter}px`

  React.Children.forEach(children, (child) => {
    if (child.type.name !== 'Col') {
      throw new TypeError('expected <Col/> as direct child node')
    }
  })
  return (
    <GutterContext.Provider value={childGutter}>
      <div className={classes} style={rowStyle}>
        { children }
      </div>
    </GutterContext.Provider>
  )
}

Row.defaultProps = {
  align: 'start',
  justify: 'start',
  gutter: 0,
  style: {}
}

Row.propTypes = {
  align: PropTypes.string,
  gutter: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  justify: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object
}

export { Row, GutterContext }