import * as Production from './action-type'
import Immutable from 'immutable'
require("babel-polyfill")
 // defaultState 是只读的
let defaultState = {
   /**
   * 商品数据 ==> 数据格式
   * @type {Array}
   * example: [{
   *    product_id: 1, 商品ID 
   *    product_name: "PaiBot（2G/32G)", 商品名称
   *    product_price: 2999, 商品价格
   *    commission: 200, 佣金
   *    selectStatus: false, 是否选择
   *    selectNum: 0, 选择数量
   * }]
   */
  dataList: []
}

export const proData = (state = defaultState, action) => {
  let imuDataList
  let imuItem
  switch(action.type) {
    // Immutable 对象 无深度遍历,只改变受影响的节点
    // 可以深度遍历返回新对象
    case Production.GETPRODUCTION:
      return {...state, ...action}
    case Production.TOGGLESELECT:
      imuDataList = Immutable.List(state.dataList)
      imuItem = Immutable.Map(state.dataList[action.index])
      imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'))
      imuDataList = imuDataList.set(action.index, imuItem)
      return {...state, ...{dataList:imuDataList.toJS()}}
    case Production.EDITPRODUCTION:
      imuDataList = Immutable.List(state.dataList)  
      imuItem = Immutable.Map(state.dataList[action.index])
      imuItem = imuItem.set('selectNum', action.selectNum)
      imuDataList = imuDataList.set(action.index, imuItem)
      return {...state, ...{dataList:imuDataList.toJS()}}
    // 清空数据,改变状态  
    case Production.CLEARSELECTED:
      imuDataList = Immutable.fromJS(state.dataList)
      for (let i=0; i< state.dataList.length; i++) {
        imuDataList = imuDataList.update(i, item => {
          item = item.set('selectStatus', false)
          item = item.set('selectNum', 0)
          return item
        })
      }
      return {...state, ...{dataList:imuDataList.toJS()}}
    default:
      return state  
  }
}