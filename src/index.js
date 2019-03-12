import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router'
import FastClick from 'fastclick'
import {Provider} from 'react-redux';
import store from '@/store/store';
import './assets/iconfonts/iconfont.css'
import './style/index.less'
import './utils/rem'

FastClick.attach(document.body)

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component/>
    </Provider>,
    document.getElementById('root')
  )
}
render(Route)
