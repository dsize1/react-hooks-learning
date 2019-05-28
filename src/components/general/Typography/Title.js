import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Base from './Base'

const Title = ({level, className, ...rest}) => {
  const classes = classNames(`typography-title`, `typography-h${level}`, className)
  return (
    <Base component={`h${level}`} className={classes} {...rest} />
  )
} 

Title.defaultProps = {
  level: 1,
}

Title.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4]),
}

export default Title