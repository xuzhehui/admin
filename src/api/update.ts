import axios from '../axios/index'
import { LoginProps} from './api.type'
const updates = {
    //登录接口
    Login:async (params:LoginProps)=>await axios.post('/platform/platformaccount/platformLogin',params),
}

export default updates