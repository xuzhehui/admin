<template>
    <div class="top-search-content">
        <div class="top-search">
            <div class="search-items" v-for="(item,key) of list" :key="key">
                <span class="search-auto">{{item.title}}:</span>
                <div 
                v-if='item.name == "a-input" || item.name == "a-select"'
                :allowClear='item.allowClear === false ? false : true'
                :style="'width:'+(item.width||150)+'px'" 
                :size='item.size||"small"' 
                v-is='item.name' 
                v-model:value='item.value' 
                :placeholder='item.placeholder' 
                >   
                    <a-select-option v-for='(row) of item.option' :key="row[item.optionValue]">{{row[item.optionName]}}</a-select-option>
                </div>

                <div 
                v-if='item.name == "a-radio-group"'
                :size='item.size||"small"' 
                v-is='item.name' 
                v-model:value='item.value' 
                >   
                    <a-radio v-for="(row,n) of item.option" :value='row.value' :key="n">{{row.label}}</a-radio>
                </div>

                <div 
                v-if='item.name == "a-checkbox-group"'
                :size='item.size||"small"' 
                v-is='item.name' 
                v-model:value='item.value' 
                >   
                    <a-checkbox v-for="(row,n) of item.option" :key="n" :value='row.value'>{{row.label}}</a-checkbox>
                </div>

                <div 
                v-if='item.name == "a-range-picker"'
                :size='item.size||"small"' 
                :placeholder='item.placeholder'
                v-is='item.name' 
                v-model:value='item.value' 
                >   
                </div>
            </div>

            <a-button @click="search" size='small' style="margin-left:10px;">搜索</a-button>
        </div>
        
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        list:{type:Array,default:null}
    },
    setup(props,context) {
        const wash:()=>object = ()=>{
            const params:any = {}
            props.list.forEach((ele:any)=>{
                if(ele.name == 'a-checkbox-group'){
                    params[ele.serve] = Object.values(ele.value).join(',')
                }else if(ele.name=='a-range-picker'){
                    const timeStap = Object.values(ele.value)
                    if(timeStap.length&&timeStap.length>0){
                        const timeData = timeStap.map((row:any)=>{
                            return new Date(row._d).toLocaleDateString().replace(/\//g,"-")
                        })
                        const [start,end] = timeData
                        params['start_time'] = start
                        params['end_time'] = end
                    }
                    
                }else{
                    params[ele.serve] = ele.value||''
                }
                
            })
            return params
        }

        const search = ()=>{
            const result:object = wash()
            context.emit('search',result)
        }

        const init = ()=>{
            const result:object = wash()
            context.emit('init',result)
        }
        init()
        return {
            search
        }
    },
})
</script>

<style lang="scss" scoped>
.top-search-content{width:100%;height:auto;display: flex;justify-content: space-between;align-items: flex-start;}
.top-search{display: flex;flex-wrap:wrap;align-items:flex-start;
    .search-items{display: flex;align-items:center;margin-bottom:5px;
        .search-auto{margin:0 5px;}
    }
}
</style>
