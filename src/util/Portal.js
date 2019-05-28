import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import classOf from './classOf'

const Portal = ({overlay, container}) => {
  return createPortal(
    overlay,
    container
  )
}

Portal.propTypes = {
  overlay: PropTypes.element.isRequired,
  container: function (props, propName, componentName) {
    if (React.isValidElement(props[propName])
      || classOf(props[propName]).slice(-7) === 'element') {
        return
    }
    return new Error (`Failed prop type : Invalid prop '${propName}' supplied to ${componentName}, expectd a ReactNode or htmlbodyelement`)
  }
}

export default Portal