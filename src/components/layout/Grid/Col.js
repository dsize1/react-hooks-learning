import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { GutterContext } from './Row'

const Col = (props) => {
  const {
    offset,
    order,
    pull,
    push,
    span,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    className,
    children,
    style,
    ...rest
  } = props

  const getClasses = ({type, span, pull, push, order, offset}) => {
    let result = []
    let prefix = `col-`
    if (typeof span === 'number') {
      result.push(`${prefix}${type ? type + '-' : ''}${span}`)
    }
    pull && result.push(`${prefix}pull-${pull}`)
    push && result.push(`${prefix}push-${push}`)
    order && result.push(`${prefix}order-${order}`)
    offset && result.push(`${prefix}offset-${offset}`)
    return result
  }
  const addClasses = (prop, propName) => {
    if (typeof prop === 'number') {
      return getClasses({type: propName, span: prop})
    } else if (typeof prop === 'object') {
      return getClasses({type: propName, ...prop})
    }
    return []
  }
  let classes = ['col-grid']
  classes.push(addClasses({span, pull, push, order, offset}))
  classes.push(addClasses(xs, 'xs'))
  classes.push(addClasses(sm, 'sm'))
  classes.push(addClasses(md, 'md'))
  classes.push(addClasses(lg, 'lg'))
  classes.push(addClasses(xl, 'xl'))
  classes.push(addClasses(xxl, 'xxl'))
  console.log(classes)
  classes = classNames(classes)
  
  const gutter = useContext(GutterContext)
  const colStyle = {...style} 
  if (gutter > 0) {
    colStyle.paddingLeft = `${gutter}px`
    colStyle.paddingRight = `${gutter}px`
  }

  return (
    <div 
      className={classes}
      style={colStyle} 
      {...rest}>
      { children }
    </div>
  )
}

Col.defaultProps = {
  style: {}
}

Col.propTypes = {
  offset: PropTypes.number,
  order: PropTypes.number,
  pull: PropTypes.number,
  push: PropTypes.number,
  span: PropTypes.number,
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  xl: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  xxl: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
}

export default Col