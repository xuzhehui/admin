
export interface StateStoreProps{
    userInfo:any;
    count:number;
    NavigationsData:MenuStoroProps[]
    breadList:[]
}  

export interface MenuStoroProps{
    title:string;
    children?:MenuStoroProps[];
    path?:string
}

const States:StateStoreProps = {
    userInfo:{},
    count:1,
    breadList:[],
    NavigationsData:[
        {title:'斗泉平台',children:[
            {title:'用户管理',path:'/cms/dqplatform/usermannage'},
            {title:'商品管理',path:'/cms/dqplatform/goodsmannage'},
            {title:'订单管理'},
            {title:'内容管理'},
            {title:'工时统计',path:'/cms/dqplatform/workinghourse'},
            {title:'文本模板',path:'/cms/dqplatform/texttemplate'}
        ]},
        {title:'古泉行情',children:[
            {title:'数据管理',path:'/cms/currencymannage/dqmannage/datamannage'},
            {title:'订阅推送',path:'/cms/dqmannage/takepush'},
            {title:'行情数据',path:'/cms/dqmannage/coingoods'},
            {title:'热搜词',path:'/cms/dqmannage/hotword'},
        ]},
        {title:'基础数据',children:[
            {title:'大币种管理',path:'/cms/basicdata/bigcurrency'},
            {title:'小币种管理',path:'/cms/basicdata/smallcurrency'},
            {title:'朝代管理',path:'/cms/basicdata/dynasty'},
            {title:'皇帝管理',path:'/cms/basicdata/emperor'},
            {title:'版别管理',path:'/cms/basicdata/bottle'},
        ]},
    ]
}

export default States