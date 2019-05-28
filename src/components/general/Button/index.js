import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Loading from './Loading'

import selectStyles from '../../../util/selectStyles'

import styles from './Button.module.css'

const Button = (props) => {
  const {
    disabled,
    href,
    icon,
    loading,
    shape,
    size,
    target,
    type, 
    onClick,
    block,
    children,
    className,
    ...rest
  } = props

  const collections = []
  collections.push(type, shape, size)
  if (disabled) { collections.push('disabled') }
  if (block) { collections.push('block') }
  const propsClass = selectStyles(styles, collections)
  const classes = classNames('ui-btn', className, propsClass)

  return (
    <button
      className={ classes }
      onClick={ onClick }
      {...rest}>
      <Loading loading={loading}/>
      { React.Children.map(children, (child) => {
        if (typeof child === 'string') {
          return (<span>{ child }</span>)
        }
        return child
      }) }
    </button>
  )
} 

Button.defaultProps = {
  disabled: false,
  loading: false,
  type: 'default',
  block: false
}

Button.propTypes = {
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string,
  loading: PropTypes.bool,
  shape: PropTypes.string,
  size: PropTypes.string,
  target: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  block: PropTypes.bool,
  className: PropTypes.string
}

export default Button