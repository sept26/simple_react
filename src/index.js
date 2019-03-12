import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router'
import FastClick from 'fastclick'
import './assets/iconfonts/iconfont.css'
import './style/index.less'
import './utils/rem'

FastClick.attach(document.body)

const render = Component => {
  ReactDOM.render(
    <Component/>,
    document.getElementById('root')
  )
}
render(Route)
