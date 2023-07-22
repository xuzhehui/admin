<template>
    <div class="navigation-content">
         <a-menu
            style="width:100%"
            v-model:selectedKeys="current"
            v-model:openKeys="openKeys"
            mode="inline"
            @click="handleClick"
            >
            <a-sub-menu @titleClick="titleClick" v-for="item in NavigationsData" :key='item.key'>
                <template #title>
                    <span>
                        <!-- <a-icon type="mail" /> -->
                        <span>{{item.title}}</span>
                    </span>
                </template>
                
                <a-menu-item v-for='children in item.children' :key="children.key">{{children.title}}</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            current: ['0'],
            openKeys: ['0'],
        }
    },
    computed:{
        ...mapState(['NavigationsData'])
    },
    methods: {
        handleClick(e) {
            const {keyPath} = e
            this.$emit('update',keyPath)
        },
        titleClick(e) {//展开当前集合时
        },
     },
}

// import { defineComponent,computed,toRefs, reactive} from 'vue'
// import {useStore} from 'vuex'
// export default defineComponent({
//     setup(props,context) {
//         const store = useStore()
//         const NavigationsData = computed(()=>{
//            return store.state.NavigationsData
//         })
//         console.log(NavigationsData)
//         let current = reactive(['1']),openKeys = reactive(['0']);
//         const handleClick = (e:any)=>{
//             const {keyPath} = e
//             context.emit('update',keyPath)
//         }
//         const titleClick = (e:any)=>1
//         return {
//             ...toRefs({NavigationsData,current,openKeys,handleClick,titleClick})
//         }
//     },
// })
</script>

<style lang='scss' >
.navation-content{width:100%;height:auto;}
::v-deep.ant-menu-submenu-selected{color:rgb(171,58,59)}
::v-deep.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{background: rgba(171,58,59,.3);}
::v-deep.ant-menu-inline .ant-menu-item::after{border-right:3px solid rgb(171,58,59)}
::v-deep.ant-menu-item-selected{color:rgb(171,58,59)}
::v-deep.ant-menu-item:hover{color:rgb(171,58,59)}
::v-deep.ant-menu-submenu-title:hover{color:rgb(171,58,59)}
</style>