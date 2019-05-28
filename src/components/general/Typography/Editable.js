import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from '../Icon'

const Editable = forwardRef(({text, onChange, onKeyDown, className}, ref) => {
  const textareaRef = useRef()
  const classes = classNames('typography-editable', className)
  useImperativeHandle(ref, () => ({
    focus: () => {
      textareaRef.current.focus()
    }
  }))

  return (
    <div className={classes}>
      <textarea
        className={'editable-textarea'}
        ref={textareaRef}
        onKeyDown={onKeyDown} 
        onBlur={onChange} 
        defaultValue={text}/>
      <Icon className={'editable-icon'} 
        type={'GoKeyboard'}/>
    </div>
  )
})

Editable.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
}

export default Editable