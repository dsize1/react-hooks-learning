import React from 'react'
import classNames from 'classnames'

import Base from './Base'

const Paragraph = ({className, ...rest}) => {
  const classes = classNames('typography-p', className)
  return (
    <Base component={`p`} className={classes} {...rest} />
  )
}

export default Paragraph