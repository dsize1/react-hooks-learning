import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Menu.module.css'

const Menu = (props) => {
  const {
    defaultOpenKeys,
    defaultSelectedKeys,

  } = props
}

Menu.defaultProps = {
  forceSubMenuRender: false,
  inlineIndent: 24,
  mode: 'vertical',
  multiple: false,
  selectable: true,
  subMenuCloseDelay: 0.1,
  subMenuOpenDelay: 0,
  theme: 'light',
}

Menu.propTypes = {
  defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
  defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
  forceSubMenuRender: PropTypes.bool,
  inlineCollapsed: PropTypes.bool,
  inlineIndent: PropTypes.number,
  mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
  multiple: PropTypes.bool,
  openKeys: PropTypes.arrayOf(PropTypes.string),
  selectable: PropTypes.bool,
  selectedKeys: PropTypes.arrayOf([PropTypes.string]),
  style: PropTypes.object,
  subMenuCloseDelay: PropTypes.number,
  subMenuOpenDelay: PropTypes.number,
  theme: PropTypes.arrayOf([PropTypes.string]),
  onClick: PropTypes.func,
  onDeselect: PropTypes.func,
  onOpenChange: PropTypes.func,
  onSelect: PropTypes.func,
  overflowedIndicator: PropTypes.element,
}

export default Menu