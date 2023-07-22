const result = [{
    path:"/cms/basicdata/dynasty",
    name:"Dynasty",
    component: async() => await require('@/views/BasicData/dynasty.vue')
}, {
    path: "/cms/basicdata/emperor",
    name: "EMPEROR",
    component: async() => await require("@/views/BasicData/emperor.vue")
}, {
    path: "/cms/dqplatform/usermannage",
    name: "USERMANNAGE",
    component: async() => await require("@/views/DQPlatform/userMannage.vue")
}, {
    path: "/cms/dqplatform/goodsmannage",
    name: "GOODSMANNAGE",
    component: async() => await require("@/views/DQPlatform/goodsMannage.vue")
}, {
    path: "/cms/basicdata/bigcurrency",
    name: "BIGCURRENCY",
    component: async() => await require("@/views/BasicData/Bigcurrency.vue")
}, {
    path: "/cms/basicdata/smallcurrency",
    name: "SMALLCURRENCY",
    component: async() => await require("@/views/BasicData/Smallcurrency.vue")
}, {
    path: "/cms/basicdata/bottle",
    name: "BOTTLE",
    component: async () => await require("@/views/BasicData/bottle.vue")
}, {
    path: "/cms/dqplatform/texttemplate",
    name: "TEXTTEMPLATE",
    component: async () => await require("@/views/DQPlatform/textTemplate.vue")
},]
export default result
