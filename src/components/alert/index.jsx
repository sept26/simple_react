import React from 'react'
import {is, fromJS} from 'immutable'
import PropTypes from 'prop-types'
import TouchableOpacity from '@/components/touchableOpacity'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './alert.less'
class Alert extends React.Component {
  static propTypes = {
    closeAlert: PropTypes.func.isRequired,
    alertTip: PropTypes.string.isRequired,
    alertStatus: PropTypes.bool.isRequired,
  }
  
  // css动画组件设置为目标组件
  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children)
    return childrenArray[0] || null
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || is(fromJS(this.state),fromJS(this.nextState))
  }

  // 关闭弹框
  confirm = () => {
    this.props.closeAlert()
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        component={this.FirstChild}
        transitionName="alert"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
      {
        this.props.alertStatus && <div className="alert-con">
          <div className="alert-context"> 
            <div className="alert-context-detail">
              {this.props.alertTip}
            </div>
            <TouchableOpacity className="confirm-btn" clickCallBack={this.confirm} />
          </div>
        </div>
      }
      </ReactCSSTransitionGroup>
    )
  }
}

export default Alert