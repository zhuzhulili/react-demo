import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '../redux/store'
import {removeUserToken} from '../redux/action-creators/user'
import history from '../history'
const instance = axios.create({
  timeout:10000
})

instance.interceptors.request.use(config=>{
  NProgress.start()
  console.log('request interceptor onResolved()')
// 1). 将post/put请求的data对象数据转换为urlencode格式的字符串数据
  const {data} = config
  if (data instanceof Object) { // 只要data是对象就转换
    config.data=qs.stringify(data)
  }
  const token = store.getState().user.token
  if(token){
    config.headers['Authorization']= 'atguigu_' + token
  }
  return config
})

instance.interceptors.response.use(
  response=>{
    console.log('response interceptor onResolved()')

  NProgress.done()

  const result = response.data
   return result
  
  },
  error=>{
    console.log('response interceptor onRejected()')
    NProgress.done()
    const {status,data:{msg}={}} = error.response
    if(status===401){
      if(history.location.pathname!=='/login'){
        message.error(msg)
        store.dispatch(removeUserToken())
      }
    }else if(status===404){
      message.error('请求资源不存在')
    }else{
      message.error('请求出错: ' + error.message)
    }
    
    return new Promise(()=>{})
  }
)
export default instance