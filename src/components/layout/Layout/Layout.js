import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Layout.module.css'

const Base = (props) => {
  const {
    type,
    typeClass,
    children,
    className,
    hasSider,
    ...rest
  } = props
  const Component = type
  let directionRow = hasSider && 'row'
  React.Children.forEach(children, (child) => {
    if (!directionRow
      && React.isValidElement(child)
      && child.type.name === 'Sider') {
      directionRow = 'row'
    }
  })
  const classes = classNames(className, styles[typeClass], directionRow && styles[directionRow])

  return (
    <Component 
      className={classes}
      {...rest} >
      { children }
    </Component>
  )
}

const Layout = (props) => {
  return <Base 
    type={'section'}
    typeClass={'section'}
    {...props} />
}

const Header = (props) => {
  return <Base 
    type={'header'}
    typeClass={'header'}
    {...props} />
}

const Footer = (props) => {
  return <Base 
    type={'footer'}
    typeClass={'footer'}
    {...props} />
}

const Content = (props) => {
  return <Base 
    type={'main'}
    typeClass={'content'}
    {...props} />
}

const propTypes = {
  className: PropTypes.string,
  hasSider: PropTypes.bool,
  style: PropTypes.object
}

Layout.propTypes = propTypes
Header.propTypes = propTypes
Footer.propTypes = propTypes
Content.propTypes = propTypes

export {Layout, Header, Footer, Content}