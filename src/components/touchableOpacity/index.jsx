import React from 'react'
import {is, fromJS} from 'immutable'
import PropTypes from 'prop-types'
class TouchableOpacity extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    clickCallback: PropTypes.func
  }
  handleTouchStart = () => {
    this.refs.btn.style.opacity = '.3'
  }

  handleTouchEnd = () => {
    this.refs.btn.style.opacity = '1'
    this.props.clickCallBack()
  }
  // 是否更新组件
  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  render() {
    return (
      <div className={`btn-con ${this.props.className}`} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd} ref='btn'>
        {this.props.text || '确认'}
      </div>
    )
  }
}
export default TouchableOpacity