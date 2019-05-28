import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon'

const Loading = ({loading}) => {
  if (!loading) {
    return null
  }
  return (
    <Icon 
      type={'GoSync'}
      spin={true}/>
  )
}

Loading.propTypes = {
  loading: PropTypes.bool
}

export default Loading
