import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


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
    message.error('请求出错: ' + error.message)
    return new Promise(()=>{})
  }
)
export default instance