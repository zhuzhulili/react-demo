import { RECEIVE_CATEGORYS,UPDATE_CATEGORY,ADD_CATEGORY } from "../action-types";
import {reqAddCategory,reqUpadaCategory,reqCategorys} from '../../api'

const receiveCategorys=(categorys)=>({type:RECEIVE_CATEGORYS,data:categorys})
const addCategory=(category)=>({type:ADD_CATEGORY,data:category})
const updateCategory=(category)=>({type:UPDATE_CATEGORY,data:category})

// 获取所有分类列表的异步action create

export const getCategorysAsync =()=>{
  return async dispath=>{
    const result = await reqCategorys()
    if(result.status===0){
      const categorys = result.data
      dispath(receiveCategorys(categorys))
    }
    return result.msg
  }
}

export const addCategorysAsync =(categoryName)=>{
  return async dispath=>{
    const result = await reqAddCategory(categoryName)
    if(result.status===0){
      const category = result.data
      dispath(addCategory(category))
    }
    return result.msg
  }
}

export const updateCategorysAsync =({categoryId,categoryName})=>{
  return async dispath=>{
    const result = await reqUpadaCategory({categoryId,categoryName})
    if(result.status===0){
      const category ={_id:categoryId,name:categoryName}
      dispath(updateCategory(category))
    }
    return result.msg
  }
}