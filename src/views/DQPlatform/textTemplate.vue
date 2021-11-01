<template>
    <div class="content">
        <PageTemplate :loading='loading' @init='init' @changePage='changePage' :list="list" @search='search' :columns='columns' :dataSource='dataSource' :pagination='pageParams'>
            <a-button size='small' @click="changeData({})">新增</a-button>
        </PageTemplate>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,h,toRefs,getCurrentInstance,ref} from 'vue'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
import {listProps} from '@/components/PageTemplate/index.vue'
import {PageProps} from '@/globleInterface/index'
import TableSetCoustom from '@/components/TableSetMannage/index'
import apis from '@/api/index'
export default defineComponent({
    setup(){
        const {getagreementTemplate} = apis
        const internalInstance = getCurrentInstance()
        const axios = internalInstance?.appContext.app.config.globalProperties.axios
        const openFormsModal = internalInstance?.appContext.app.config.globalProperties.openFormsModal
        const result = [{name:'jack',value:22},{name:'top',value:23}]
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
            {title:'标题',value:'',placeholder:'标题',name:'a-input',serve:'dynastyName'},
        ])
        const columns:ColumnProps[] = reactive([
            {title:'序号',dataIndex:'id'},
            {title:'标题',dataIndex:'title'},
            {title:'关键字',dataIndex:'typeKey'},
            {title:'内容',dataIndex:'text'},
            {title:'操作',align:'center',width:150,
                customRender: (row:any) => {
                    const {text} = row
                    const setups = [
                        {title:'编辑',click:()=>{
                            console.log('编辑')
                        }},
                        {title:'删除',click:(row:any)=>{
                            console.log(text)
                        },confirm:1,confirmTitle:'确认删除么?'},
                    ]
                    return h(TableSetCoustom,{
                        list:setups
                    })
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

        const changeData:(row:any)=>void = (row:any)=>{
            const {id} = row
            openFormsModal({
                title:'修改朝代',
                list:[
                    {name:'input',title:'朝代',placeholder:'朝代',serve:'a',value:'',type:'textarea'},
                    {name:'input',title:'年份',placeholder:'年份',serve:'b',value:''},
                    {name:'select',title:'下拉',change:true,placeholder:'下拉',serve:'select',value:null,option:[{label:'1',value:1},{label:'2',value:2}]},
                    {name:'radio',title:'类型',serve:'c',value:'',option:[{label:'1',value:1},{label:'2',value:2}]},
                    {name:'check',title:'类型',serve:'check',value:[],option:[{label:'1',value:1},{label:'2',value:2}]},
                    {name:'switch',title:'开关',serve:'str',value:false},
                    {name:'date-picker',title:'月份',placeholder:'请选择时间',serve:'year',value:''},
                    {name:'tags',title:'标签',serve:'asb',value:[
                        {id:1,name:'234'},{id:2,name:'555'}
                    ],coustom:1,option:[
                        {label:'标签1',value:1}],
                        optionName:'label',optionValue:'value',valueName:'name',valueFiled:'id'},
                    {name:'tags',title:'标签1',serve:'asb',value:['123','5556'],coustom:1,},
                    {name:'textarea',title:'描述',placeholder:'请输入描述',serve:'cce',value:'',type:'textarea'},
                    {name:'upload',title:'上传',serve:'btc',value:[
                        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=612942180,1289909311&fm=224&gp=0.jpg',
                        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4004015197,310880283&fm=224&gp=0.jpg',
                        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=474795651,100164686&fm=26&gp=0.jpg'
                    ]},                
                ],                
                                
                rules:{
                    a:[{required:true,message:'朝代',trigger:'blur'}],
                    b:[{required:true,message:'年份',trigger:'blur'}],
                    c:[{type:'number',required:true,message:'类型',trigger:'change'}],
                    check:[{type:'array',required:true,message:'多选',trigger:'change'}],
                    select:[{type:'number',required:true,message:'下拉',trigger:'change'}],
                    str:[{type:'boolean',required:true,message:'开关',trigger:'change'}],
                    year:[{required:true,message:'日期',trigger:'change'}], 
                },
                then:(result:any)=>{
                    console.log('success',result)
                },
                change:(result:any)=>{
                    console.log('change',result)
                    result.str = true
                },
                cancel:(err:any)=>console.log('close',err)
            })
        }
 
        const getData = async (params:any)=>{
            loading.value = true
            const res:any = await getagreementTemplate(params)
            loading.value = false
            if(res.status == '200'||res.status == 'SUCCESS'){
                const {records,total} = res.data
                Object.assign(pageParams,{total})
                Object.assign(dataSource,{value:records})
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
