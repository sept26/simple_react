import React from 'react'
import API from '@/api/api'
import {is, fromJS} from 'immutable'
import './balance.less'
import Header from '@/components/header'
import TouchableOpacity from '@/components/touchableOpacity'
import Alert from '@/components/alert'
require("babel-polyfill")
class Balance extends React.Component {
  state = {
    applyNum: '',
    alertStatus: false,
    alertTip: '',
    balance: {
      balance: 0
    }
  }

  initData = async () => {
    try {
      let result = await API.getBalance()
      this.setState({balance: result})
    } catch(err) {
      console.log(err)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }

  componentWillMount() {
    this.initData()
  }

  // 关闭弹框
  closeAlert = () => {
    this.setState(() => {
      return {
        alertStatus: false,
        alertTip: ''
      }
    })
  }

  //
  handleInput = (e) => {
    const applyNum = e.target.value
    this.setState(() => {
      return {applyNum}
    })
  }


  // 提交申请
  submitForm = () => {
    let alertTip
    if (!this.state.applyNum) {
      alertTip = '请输入提现金额'
    } else if (parseFloat(this.state.applyNum) > this.state.balance.balance) {
      alertTip = '申请提现金额不能大于余额'
    } else {
      alertTip = '申请提现成功'
    }
    this.setState(() => {
      return {
        alertStatus: true,
        alertTip,
        applyNum: ''
      }
    })
  }

  render() {
    return (
      <main className="balance-container">
        <Header title="提现" record/>
        <section className="balance-body">
          <div>您的可提现金额为: ¥ {this.state.balance.balance}</div>
          <form>
            <p>请输入提现金额(元)</p>
            <div>
              ¥ <input type="text" value={this.state.applyNum} placeholder="0.00"  onChange={this.handleInput.bind(this)}/>
            </div>
          </form>
          <TouchableOpacity className="submit-btn" clickCallBack={this.submitForm} text="申请提现"/>
        </section>
        <Alert closeAlert={this.closeAlert} alertTip={this.state.alertTip} alertStatus={this.state.alertStatus}/>
      </main>
    )
  }
}

export default Balance