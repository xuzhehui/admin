import axios from '../axios/index'
import {UserListProps,DynastyProps} from './api.type'
const list = {
    //用户管理-用户列表
    userMannageList:async (params:UserListProps)=>await axios('/dq_admin/user/getUserList',{params}),
    //获取朝代列表
    getDynasty:async (params:DynastyProps)=>await axios('/dq_admin/dynasty/list',{params}),
    //皇帝列表
    getEmperor:async (params:any)=>await axios('/dq_admin/ruler/list',{params}),
    //大币种列表
    getBigcurrency:async(params:any)=>await axios('/dq_admin/kind/list',{params}),
    //小币种列表
    getSmallcurrency:async(params:any)=>await axios('/dq_admin/kinditem/list',{params}),
    //版别别表
    getBottles:async(params:any)=>await axios('/dq_admin/kinditemversion/list',{params}),
    //协议列表<文本模板>
    getagreementTemplate:async(params:any)=>await axios('/dq_admin/textTemplate/list',{params})
}

export default list