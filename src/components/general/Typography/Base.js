import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import selectStyles from '../../../util/selectStyles'
import classOf from '../../../util/classOf'
import useElementSize from '../../../util/useElementSize'

import Icon from '../Icon'
import Copyable from './Copyable'
import Editable from './Editable'

import styles from './Typography.module.css'

const Base = (props) => {
  const {
    mark,
    code,
    del,
    underline,
    strong,
    copyable,
    disabled,
    editable,
    ellipsis,
    onChange,
    type,
    component,
    children,
    className,
    style,
    ...rest
  } = props

  const Wrapper = component

  const childIsTextNode = React.Children.count(children) === 1 && typeof children === 'string'

  const collections = []
  if (type) { collections.push(type) }
  if (disabled) { collections.push('disabled') }
  const propsClass = selectStyles(styles, collections)
  const classes = classNames('ui-typography', className, propsClass, )

  const [textNode, setTextNode] = useState(children)

  const innerNode = ['mark', 'code', 'del', 'underline', 'strong'].reduceRight((dom, key) => {
    const El = key === 'underline' ? 'u' : key
    if (props[key]) {
      dom = (<El>{ dom }</El>)
    }
    return dom
  }, textNode)

  const getRowHeight = (style, tag) => {
    let fontSize = style.fontSize && Number.parseInt(style.fontSize.slice(0, -2))
    let lineHeight = style.lineHeight
    const defaultRowHeight = {
      h1: [38, 1.23],
      h2: [30, 1.35],
      h3: [24, 1.35],
      h4: [20, 1.4],
      p: [14, 1.5],
      span: [14, 1.5]
    }
    const defaultFontSize = defaultRowHeight[tag][0]
    const defaultLineHeight = defaultRowHeight[tag][1]
    if (fontSize || lineHeight) {
      if (!fontSize) {
        fontSize = defaultFontSize
      }
      if (!lineHeight) {
        lineHeight = defaultLineHeight
      }
      return Math.floor(fontSize * lineHeight)
    }
    return Math.floor(defaultFontSize * defaultLineHeight)
  }
  const rowHeight = getRowHeight(style, Wrapper)

  const rows = classOf(ellipsis, 'rows') === 'number' ? ellipsis.rows : 1

  const wrapperRef = useRef()

  const [expand, setExpand] = useState(!ellipsis)
  const [isEllipsis, setIsEllipsis] = useState(false)
  const handleExpand = () => {
    if (expand) {
      return 
    }
    setExpand(true)
    setIsEllipsis(false)
    if (classOf(ellipsis, 'onExpand') === 'function') {
      ellipsis.onExpand()
    }
  }

  let wrapperSize = useElementSize(wrapperRef)
  if (ellipsis && !expand) {
    if (!isEllipsis 
      && classOf(wrapperSize, 'height') === 'number' 
      && wrapperSize.height > rows * rowHeight) {
        setIsEllipsis(true)
    } else if (isEllipsis 
      && classOf(wrapperSize, 'height') === 'number'
      && wrapperSize.height < rows * rowHeight){
        setIsEllipsis(false)
    }
  }

  const [editing, setEditing] = useState(false)

  const editableRef = useRef()

  const handleSetEditing = () => {
    setEditing(true)
  }
  useEffect(() => {
    editing && editableRef.current && editableRef.current.focus()
  }, [editing])

  const handleTextNodeChange = (e) => {
    setTextNode(e.target.value)
    setEditing(false)
    if (classOf(editable, 'onChange') === 'function') {
      editable.onChange()
    }
  }
  const handleEditableKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTextNodeChange(e)
      e.target.blur()
    }
  }

  const copyText = classOf(copyable, 'text') === 'string' ? copyable.text : textNode
  const handleCopy = () => {
    if (classOf(copyable, 'onCopy') === 'function') {
      copyable.onCopy()
    }
  }

  const renderEllipsis = () => {
    const ellipsisStyle = {...style}
    ellipsisStyle.maxHeight = `${rows * rowHeight}px`
    const ellipsisClasses = classNames(classes, styles.ellipsis)
    return (
      <Wrapper
        ref={wrapperRef}
        className={ellipsisClasses}
        style={ellipsisStyle}
        {...rest}>
        { innerNode }
        <span className={styles.ellipsis__btn}>
          ...
          { classOf(ellipsis, 'expandable') === 'boolean'
            && ellipsis.expandable 
            && (
              <i onClick={handleExpand}>
                <Icon
                  type={'GoDiffAdded'}
                  className={'typography-icon'} />
              </i>)}
          { editable  
            && (
              <i onClick={handleSetEditing}>
                <Icon 
                  type={'GoPencil'}
                  className={'typography-icon'} />
              </i>)}
          { copyable 
            && (<Copyable 
              text={copyText} 
              onCopy={handleCopy} />) }
        </span>
      </Wrapper>
    )
  }

  const renderContent = () => {
    return (
      <Wrapper
        ref={wrapperRef}
        className={classes}
        style={style}
        {...rest}>
        { innerNode }
        { editable  
          && (
            <i onClick={handleSetEditing}>
              <Icon 
                type={'GoPencil'}
                className={'typography-icon'} />
            </i>)}
        { copyable 
          && (<Copyable 
            text={copyText} 
            onCopy={handleCopy} />) }
      </Wrapper>
    )
  }

  const renderEdit = () => {
    return (
      <Editable
        text={textNode}
        ref={editableRef}
        className={className}
        onChange={handleTextNodeChange}
        onKeyDown={handleEditableKeyDown} />
    )
  }

  const renderCommen = () => {
    return (
      <Wrapper
        ref={wrapperRef}
        className={className}
        style={style}
        {...rest}>
        { innerNode }
      </Wrapper>
    )
  }

  const switchRender = () => {
    if (!childIsTextNode) {
      return renderCommen()
    }
    if ((classOf(editable, 'editing') === 'boolean' && editable.editing) || editing) {
      if (classOf(editable, 'onStart') === 'function') {
        editable.onStart()
      }
      return renderEdit()
    }
    if (isEllipsis) {
      return renderEllipsis()
    }
    return renderContent()
  }

  return switchRender()
} 

Base.defaultProps = {
  copyable: false,
  del: false,
  disabled: false,
  editable: false,
  ellipsis: false,
  mark: false,
  underline: false,
  code: false,
  strong: false,
  style: {}
}

Base.propTypes = {
  style: PropTypes.object,
  component: PropTypes.string,
  copyable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  del: PropTypes.bool,
  disabled: PropTypes.bool,
  editable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  ellipsis: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  mark: PropTypes.bool,
  code: PropTypes.bool,
  strong: PropTypes.bool,
  underline: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['secondary', 'warning', 'danger'])
}

export default Base