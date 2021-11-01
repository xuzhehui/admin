<template>
    <div class="content">
        <PageTemplate autoSize :loading='loading' @init='init' @changePage='changePage' :list="list" @search='search' :columns='columns' :dataSource='dataSource' :pagination='pageParams'>
            <a-button size='small' @click="changeData({})">录入商品</a-button>
        </PageTemplate>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,h,toRefs,getCurrentInstance,ref} from 'vue'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
import {listProps} from '@/components/PageTemplate/index.vue'
import {PageProps} from '@/globleInterface/index'
import { Popconfirm} from 'ant-design-vue';
export default defineComponent({
    setup(){
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
            {title:'作者',value:'',placeholder:'作者',name:'a-input',serve:'dynastyName'},
            {title:'内容',value:null,placeholder:'内容',name:'a-select',serve:'dynastySort',
                option:result,optionName:'name',optionValue:'value'},
            {title:'日期',name:'a-range-picker',value:[],serve:'time',placeholder:['开始日期','结束日期']},
            {title:'大币种',value:'',placeholder:'大币种',name:'a-input',serve:'dynastyName'},
            {title:'发布者ID',value:'',placeholder:'发布者ID',name:'a-input',serve:'dynastyName'},
        ])
        const columns:ColumnProps[] = reactive([
            {title:'图片',align:'center',fixed:'left',width:150,
                customRender:(row:any)=>{
                    const {text} = row
                    const {coverUrl} = text
                    return h('div',{
                        style:{
                            'width':'100px',
                            'height':'100px',
                            'display':'flex',
                            'align-items':'center',
                            'justify-content':'center',
                        }
                    },[h('img',{
                        src:coverUrl,
                        style:{
                            'max-width':'100px',
                            'max-height':'100px'
                        }
                    })])
                }
            },
            {title:'描述',dataIndex:'productName',width:200,},
            {title:'大币种',dataIndex:'coinKindName',width:100,align:'center'},
            {title:'商品编号',dataIndex:'productNo',width:200,align:'center'},
            {title:'标签',width:100},
            {title:'作者',dataIndex:'userName',width:200,align:'center'},
            {title:'加权状态',width:100,
                customRender:(row:any)=>{
                    const {isWeight} = row.text
                    return h('span',{},isWeight === -1 ? '降权' : (isWeight === 0 ? '正常' : '加权'))
                }
            },
            {title:'发布时间',dataIndex:'createTime',width:200,align:'center'},
            {title:'修改时间',dataIndex:'updateTime',width:200,align:'center'},
            {title:'状态',width:100,
                customRender:(row:any)=>{
                    const {onShelf} = row.text
                    const inner = onShelf == 1 ? '上架' : '下架'
                    return h('span',{
                        style:{
                            color:onShelf == 1 ? 'green' : 'red'
                        }
                    },inner)
                }
            },
            {title:'浏览',width:100,dataIndex:'goodNum'},
            {title:'点赞',width:100,dataIndex:'visitNum'},
            {title:'操作',align:'center',width:200,fixed:'right',
                customRender: (text:any) => {
                    return h('div', {},[
                        h('a',{
                            style:{marginRight:'5px'},
                            onClick:()=>changeData(text)
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

        const changeData:(row:any)=>void = (row:any)=>{
            const {id = null} = row
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
            const res = await axios('/dq_admin/product/getOnePriceList',{params:params})
            loading.value = false
            if(res.status == '200'){
                const {records,total} = res.data
                Object.assign(dataSource,{value:records})
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
            changeData
        }
    },
})
</script>

<style lang="scss" scoped>

</style>
