import React, {Component} from 'react'
import { HashRouter, Switch, Route} from 'react-router-dom'
import Home from './../pages/home'
import Production from '@/pages/production'
import Record from '@/pages/Record'

export default class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/production" component={Production} />
          <Route path="/record" component={Record} />
        </Switch>
      </HashRouter>
    )
  }
}
