import * as Production from './action-type'
// import API from '@/api/api'
import API from './../../api/api'
 // 初始化商品数据
 export const getProData = () => {
   return async dispatch => {
     try{
       let result = await API.getProduction()
       result.map(item => {
         item.selectStatus = true
         item.selectNum = 0
         return item
       })
       dispatch({
         type: Production.GETPRODUCTION,
         dataList: result
       })
     }catch(err) {
       console.log(err)
     }
   }
 }

 // 选择商品
 export const toSelectPro = (index) => {
   return {
     type: Production.TOGGLESELECT,
     index
   }
 }

 // 编辑商品
 export const editPro = (index, selectNum) => {
   return {
     type: Production.EDITPRODUCTION,
     index,
     selectNum
   }
 }

// 清空选择
export const clearSelect = () => {
  return {
    type: Production.CLEARSELECTED
  }
}
