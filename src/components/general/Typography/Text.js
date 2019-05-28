import React from 'react'
import classNames from 'classnames'

import Base from './Base'

const Text = ({className, ...rest}) => {
  
  const classes = classNames('typography-span', className)
  return (
    <Base component={`span`} className={classes} {...rest} />
  )
}

export default Text