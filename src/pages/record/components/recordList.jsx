import React from 'react'
import {is, fromJS} from 'immutable'
import API from '@/api/api'
import './recordList.less'
require("babel-polyfill")

class RecordList extends React.Component{
  state = {
    recordData: []
  }

  componentWillMount() {
    let type = this.props.location.pathname.split('/')[2]
    this.getRecord(type)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  componentWillReceiveProps(nextProps) {
    let currentType = this.props.location.pathname.split('/')[2]
    let type = nextProps.location.pathname.split('/')[2]
    if(currentType !== type) {
      this.getRecord(type)
    }
  }

  getRecord = async (type) => {
    try{
      let result = await API.getRecord({type})
      this.setState({recordData: result.data || []})
    }catch(err){
      console.log(err)
    }
  }

  render() {
    return(
      <section className="record-list">
        <ul>
          {
            this.state.recordData.map((item,index) => {
              return (
                <li key={index}>
                  <div className="record-header">
                    <span>创建时间:{item.created_at}</span>
                    <span>{item.type_name}</span>
                  </div>
                  <div className="record-main">
                    <ul>
                      <li>
                        <span>用户名:</span>{item.customers_name} &nbsp; {item.customers_phone}
                      </li>
                      <li>
                        <span>商&nbsp;品:</span>{item.product[0].product_name}
                      </li>
                      <li>
                        <span>金&nbsp;额:</span>{item.sales_money}
                        <span>佣金:</span>{item.commission}
                      </li>
                    </ul>
                  </div>
                  <div className="record-footer">
                    等待管理员审核，审核通过后，佣金将结算至账户
                  </div>
                </li>
              )
            })
          }
        </ul>
      </section>
    )
  }
}

export default RecordList