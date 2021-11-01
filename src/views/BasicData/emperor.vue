<template>
    <div class="content">
        <PageTemplate :loading='loading' @init='init' @changePage='changePage' :list="list" @search='search' :columns='columns' :dataSource='dataSource' :pagination='pageParams'>
            <a-button size='small' @click="changeData({})">新增皇帝</a-button>
        </PageTemplate>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,h,toRefs,getCurrentInstance,ref} from 'vue'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
import {listProps} from '@/components/PageTemplate/index.vue'
import {PageProps} from '@/globleInterface/index'
import { Popconfirm} from 'ant-design-vue';
import apis from '@/api/index'
export default defineComponent({
    setup(){
        const internalInstance = getCurrentInstance()
        const axios = internalInstance?.appContext.app.config.globalProperties.axios
        const openFormsModal = internalInstance?.appContext.app.config.globalProperties.openFormsModal
        const {getEmperor} = apis
        let dynastyData:[] = []
        const getDynastyData = async ()=>{
            const res = await axios('/dq_admin/dynasty/list')
            const {records = []} = res.data
            dynastyData = records
        }
        getDynastyData()
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
            {title:'朝代',value:'',placeholder:'朝代',name:'a-input',serve:'dynastyName'},
            {title:'皇帝',value:'',placeholder:'皇帝',name:'a-input',serve:'rulerName'},
            {title:'年号',value:'',placeholder:'年号',name:'a-input',serve:'rulerDynastyName'},
        ])
        const columns:ColumnProps[] = reactive([
            {title:'ID',dataIndex:'id'},
            {title:'朝代',dataIndex:'dynastyName'},
            {title:'皇帝',dataIndex:'rulerName'},
            {title:'年号',dataIndex:'rulerDynastyName'},
            {title:'操作',align:'center',width:'100',
                customRender: (row:any) => {
                    return h('div', {},[
                        h('a',{
                            style:{marginRight:'5px'},
                            onClick:()=>{
                                const {text} = row
                                changeData(text)
                            }
                        },'编辑'),
                        h(Popconfirm,{
                            style:{marginLeft:'5px'},
                            title:'Are You Sure',
                        },()=>[
                             h('a',{},'删除')
                        ])
                    ]);
                } 
            },
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

        const changeData = (row:any)=>{
            const {id} = row
            openFormsModal({
                title:'修改朝代',
                list:[
                    {name:'select',title:'朝代',placeholder:'朝代',serve:'dynastyId',value: id ? row.dynastyId : null,option:dynastyData,optionName:'dynastyName',optionValue:'id'},
                    {name:'input',title:'皇帝',placeholder:'皇帝',serve:'rulerName',value:id ? row.rulerName : ''},
                    {name:'input',title:'年号',placeholder:'年号',serve:'rulerDynastyName',value:id ? row.rulerDynastyName||'' : ''},
                ],
                rules:{
                    dynastyId:[{type:'number',required:true,message:'朝代',trigger:'change'}],
                    rulerName:[{required:true,message:'朝代',trigger:'blur'}],
                    rulerDynastyName:[{required:true,message:'年份',trigger:'blur'}],
                },
                then:(result:any)=>{
                    console.log('success',result)
                },
            })
        }
 
        const getData = async (params:any)=>{
            loading.value = true
            const res = await getEmperor(params)
            loading.value = false
            const {records,total} = res.data
            dataSource.value = records
            pageParams.total = total
        }
        const init = (res:any)=>{
            Object.assign(params,res)
            getData(params)
        }
    
        return {
            ...toRefs({list,columns,dataSource,pageParams,loading}),
            changePage,
            changeData,
            search,
            init,
        }
    },
})
</script>

<style lang="scss" scoped>

</style>
