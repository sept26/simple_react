import * as home from './action-type'

// 保存保单数据
export const saveFormData = (value, datatype) => {
  return {
    type: home.SAVEFORMDATA,
    value,
    datatype,
  }
}

// 保存图片地址
export const saveImage = (path) => {
  return {
    type: home.SAVEIMAGE,
    path
  }
}

// 清空数据
export const clearData = () => {
  return {
    type: home.CLEARDATA
  }
}