<template>
    <div class="page-template-content">
        <div style="padding-bottom:20px;" ref='heightREfs'>
            <TopSearch @init='init' :list="list" @search='search'><slot></slot></TopSearch>
        </div>
        
        <div class="table-content">
            <a-table :style="autoSize ? computedStyle : ''" :scroll='autoSize ? pageTableX : {}' :loading='loading' @change="change" :dataSource="dataSource" :columns="columns" :pagination='pagination' :rowKey='(row,index)=>index'></a-table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,computed,onMounted,ref} from 'vue'

import TopSearch from '../../components/TopSearch/index.vue'
export interface listProps{
    title:string
    value:any
    placeholder?:string|string[]
    name:string
    serve:string
}
export default defineComponent({
    props:{
        list:{type:Array,default:null,},
        dataSource:{type:Array,default:[],},
        columns:{type:Array,default:[],},
        pagination:{type:Object,default:{}},
        loading:{type:Boolean,default:false,},
        autoSize:{type:Boolean,default:false,}
    },
    setup(props,context) {
        const list:any= props.list
        const search = (row:object)=>{
            context.emit('search',row)
        }
        const heightREfs = ref<any>(null)
        const change = (page:any)=>{
            context.emit('changePage',page)
        }
        const init = (res:any)=>{
            context.emit('init',res)
        }
        const {innerWidth,innerHeight} = window
        const width = ref<number>(innerWidth)
        const height = ref<number>(innerHeight)
        const pageTableX:any = computed(()=>{
            const {offsetHeight}=heightREfs.value||{offsetHeight:0}
            const params = {x:width.value-280,y:height.value}
            if(offsetHeight){
                params.y = height.value - (offsetHeight+240)
            }
            return params
        })
        addEventListener('resize',(e:any)=>{
            const {innerWidth,innerHeight} = e.currentTarget
            width.value = innerWidth
            height.value = innerHeight
        })


        const computedStyle = computed<string>(()=>{
            const {x} = pageTableX.value
            const inner:string|boolean = `width:${x}px`
            return inner
        })

        return {pageTableX,computedStyle,heightREfs,
            list,search,change,init,
        }
    },
    components:{TopSearch}
})
</script>

<style lang="scss" scoped>
.page-template-content{display: flex;flex-direction: column;width:100%;height:100%;
    .table-content{flex:1;overflow-y: auto;}
}
</style>
