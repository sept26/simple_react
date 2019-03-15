import React from 'react'
import PropTypes from 'prop-types'
import Header from './../../components/header'
import { connect } from 'react-redux';
// import {getProData, toSelectPro, editPro} from '@/store/production/action'
import {getProData, toSelectPro, editPro} from './../../store/production/action'
import './production.less'

class Production extends React.Component {
  static propTypes = {
    proData: PropTypes.object.isRequired,
    getProData: PropTypes.func.isRequired,
    toSelectPro: PropTypes.func.isRequired,
    editPro: PropTypes.func.isRequired,
  }
  componentDidMount() {
    if(!this.props.proData.dataList.length){
      this.props.getProData();
    }
  }
  // 更改商品状态
  toSelect = index => {
    this.props.toSelectPro(index)
  }
  // 编辑商品,先计算完然后更换store中的数据
  handleEdit = (index, num) => {
    let currentNum = this.props.proData.dataList[index].selectNum + num
    if (currentNum < 0) {
      return
    }
    this.props.editPro(index, currentNum)
  }
  render(){
    return (
      <div className="production-container">
        <Header title="首页" confirm/>
        <ul className="pro-list">
          {
            this.props.proData.dataList.map((item,index) => {
              return (<li key={index}>
                <div className="product-left" onClick={this.toSelect.bind(this, index)}>
                  <span className={`icon-xuanze1 pro-select-status ${item.selectStatus? 'pro-selected': ''}`}></span>
                  <span className="pro-name">{item.product_name}</span>
                </div>
                <div className="product-right"> 
                  <span className={`icon-jian ${item.selectNum > 0? 'edit-active':''}`} onClick={this.handleEdit.bind(this, index, -1)}></span>
                  <span className="pro-num">{item.selectNum}</span>
                  <span className={`icon-jia`} onClick={this.handleEdit.bind(this, index, 1)}></span>
                </div>
              </li>)
            })
          }
        </ul>
        
      </div>
    )
  }
}

export default connect(state => ({
  proData: state.proData
}),{
  getProData,
  toSelectPro,
  editPro
})(Production)