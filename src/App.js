import React, { useState } from 'react';

import Typography from './components/general/Typography'
import Button from './components/general/Button'
import Icon from './components/general/Icon'
import {Row, Col} from './components/layout/Grid'
import { 
  Layout, 
  Header, 
  Sider, 
  Content,
  Footer
} from './components/layout/Layout'
import Dropdown from './components/Navigation/Dropdown'

import './App.css';

const overlayEl = (props) => {
  return <div  {...props}>
    <ul>
      <li>foo</li>
      <li>bar</li>
      <li>baz</li>
    </ul>
  </div>
}

function App() {
  return (
    <Dropdown
      onVisibleChange={(...args)=>console.log(...args)}
      style={{display: 'flex', width: 'fit-content'}}
      placement={'bottomRight'}
      overlayStyle={{border: '1px solid'}} 
      overlay={overlayEl}>
      <a style={{border: '1px solid'}} href='#'>
        Hover me <Icon type={'GoChevronDown'}/>
      </a>
    </Dropdown>
  );
}

export default App;
