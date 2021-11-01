<template>
    <div class="content">
        <PageTemplate :loading='loading' @init='init' @changePage='changePage' :list="list" @search='search' :columns='columns' :dataSource='dataSource' :pagination='pageParams'>
            
        </PageTemplate>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,h,toRefs,getCurrentInstance,ref} from 'vue'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
import {listProps} from '@/components/PageTemplate/index.vue'
import {PageProps} from '@/globleInterface/index'
import apis from '@/api/index'
export default defineComponent({
    setup(){
        const {userMannageList} = apis
        const internalInstance = getCurrentInstance()
        const loading = ref<boolean>(false)
        const pageParams:PageProps = reactive({
            current:1,
            total:100,
            showTotal:(total:number)=>`共${total}条`,
            pageSize:10,
        })
        let params = reactive({
            pageSize:10,
            pageNum:1,
        })
        const list:Array<listProps> = reactive([
            {title:'昵称',value:'',placeholder:'昵称',name:'a-input',serve:'userName'},
            {title:'手机号',value:null,placeholder:'手机号',name:'a-input',serve:'userPhone',}
        ])
        const columns:ColumnProps[] = reactive([
            {title:'昵称',dataIndex:'userName'},
            {title:'手机号',dataIndex:'userPhone'},
            {title:'在架商品数',
                customRender:(row)=>{
                    const {text} = row
                    const {releaseProductNum} = text
                    return h('a',{
                        onClick:(e:MouseEvent)=>{
                            console.log(row)
                        }
                    },releaseProductNum)
                }
            },
            {title:'注册时间',dataIndex:'createTime'},
            {title:'最近活跃时间',dataIndex:'lastLoginTime'},
            {title:'粉丝',dataIndex:'fansNum'},
            {title:'被点赞',dataIndex:'otherGoodNum'},
        ])
        const dataSource = ref<[]>([])
        const search = (row:object)=>{
            Object.assign(params,row)
            getData(params)
        }
        const changePage = (page:PageProps)=>{
            Object.assign(pageParams,page)
            const {current,pageSize} = pageParams
            Object.assign(params,{pageSize:pageSize,pageNum:current})
            getData(params)
        }
 
        const getData = async (params:any)=>{
            loading.value = true
            const res = await userMannageList(params)
            loading.value = false
            if(res.status == 200){
                const {records,total} = res.data
                dataSource.value = records
                Object.assign(pageParams,{total})
            }
        }
        const init = (res:any)=>{
            Object.assign(params,res)
            getData(params)
        }
    
        return {
            ...toRefs({list,columns,dataSource,pageParams,loading}),
            changePage,
            search,
            init,
        }
    },
})
</script>

<style lang="scss" scoped>

</style>
