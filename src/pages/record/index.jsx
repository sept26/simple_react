import React from 'react'
import {is, fromJS} from 'immutable'
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import Header from '@/components/header'
import RecordList from './components/recordList'
import './record.less'
class Record extends React.Component {
  state = {
    flagBarPos: '10%'
  }
  componentWillMount() {
    let type = this.props.location.pathname.split('/')[2]
    this.setFlagBarPos(type)
  }

  setFlagBarPos = type => {
    let flagBarPos;
    switch(type){
      case 'passed':
        flagBarPos = '10%';
      break;
      case 'audited':
        flagBarPos = '42%';
      break;
      case 'failed':
        flagBarPos = '73%';
      break;
      default: 
        flagBarPos = '10%';
    }
    this.setState({flagBarPos})
  }
  componentWillReceiveProps(nextProps) {
    let currentType = this.props.location.pathname.split('/')[2]
    let type = nextProps.location.pathname.split('/')[2]
    if(currentType !== type){
      this.setFlagBarPos(type);
    }
  }

  shouldComponentUpdata(nextProps, nextState) {
    return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }
  render() {
    return (
      <main>
        <Header title='记录' place />
        <section className="record-container">
          <nav className="record-nav">
            <NavLink to={`${this.props.match.path}/passed`} className="nav-link">已通过</NavLink>
            <NavLink to={`${this.props.match.path}/audited`} className="nav-link">待审核</NavLink>
            <NavLink to={`${this.props.match.path}/failed`} className="nav-link">未通过</NavLink>
          </nav>
          <i className="nav-flag-bar" style={{left: this.state.flagBarPos}}></i>
        </section>
        {
          // 子路由在父级配置
          <Switch>
            <Route path={`${this.props.match.path}/:type`} component={RecordList}></Route>
            <Redirect from={`${this.props.match.path}`} to={`${this.props.match.path}/passed`} exact component={RecordList}/>
          </Switch>
        }
      </main>
    )
  }
}
export default Record