import * as home from './action-type'

let defaultState = {
  orderSum: '', // 金额
  name: '', // 姓名
  phoneNo: '', // 手机号
  imgPath: '' // 图片地址
}

// 首页表单数据
export const formData = (state = defaultState,  action = {}) => {
  switch(action.type) {
    case home.SAVEFORMDATA:
      return {...state, ...{[action.datatype]:action.value}}
    case home.SAVEIMAGE:
      return {...state, ...{imgPath: action.path}}
    case home.CLEARDATA:
      return {...state, ... defaultState}
    default:
    return state
  }
}