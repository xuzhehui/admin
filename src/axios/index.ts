/*
 * @Author: xu.zhehui 
 * @Date: 2021-05-13 18:39:14 
 * @Last Modified by: xu.zhehui
 * @Last Modified time: 2021-06-18 13:37:42
 */
import axios,{AxiosRequestConfig,Method} from 'axios'
import { message } from 'ant-design-vue';
const config:AxiosRequestConfig = {
    baseURL:process.env.VUE_APP_BASE_URL,
    withCredentials:true,
    timeout:10000,
}
const request = axios.create(config)
request.interceptors.request.use(config=>{
    config.headers['dqAdmin-token'] = localStorage.getItem('token')||''
    return config
})
request.interceptors.response.use((response)=>{
    let {status,data} = response
    if(status == 200){
        if(data.code == 401){//token失效重新登录
            localStorage.removeItem('token')
            return setTimeout(()=>location.reload(),500)
        }
        if(data.status == '200'||data.status == 'SUCCESS'){//正常接收
            return data
        }else{
            return message.error(data.message||'未知错误')
        }
    }else{
        return message.error('服务异常')
    }
},(err)=>message.error('服务异常'))
export default request