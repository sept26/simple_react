import React, {Component} from 'react'
import { HashRouter, Switch, Route} from 'react-router-dom'
import Home from './../pages/home'
import Production from '@/pages/production'
import Record from '@/pages/Record'
import Balance from '@/pages/balance'
import Help from '@/pages/help'

export default class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/production" component={Production} />
          <Route path="/record" component={Record} />
          <Route path="/balance" component={Balance} />
          <Route path="/helpcenter" component={Help} />
        </Switch>
      </HashRouter>
    )
  }
}
