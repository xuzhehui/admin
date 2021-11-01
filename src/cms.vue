<template>
    <div class="cms-content">
        <div class="cms-left">
            <div class="cms-header text-center">斗泉运营后台</div>
            <Navigation style="flex:1;overflow-y:auto;" @update='updates'/>
        </div>
        <div class="cms-right">
            <div class="cms-header login-set">
                <div>
                    <a-avatar>{{name}}</a-avatar>
                    <a-popconfirm
                        title="确认退出么？"
                        ok-text="是"
                        cancel-text="取消"
                        @confirm="loginOut"
                        @cancel="cancel">
                        <a>退出</a>
                    </a-popconfirm>
                </div>
            </div>
             <Breadcrumb/>
             <div class="cms-router"><router-view style="width:100%;height:100%;"></router-view></div>
        </div>
    </div>
</template>

<script lang="ts">
import Navigation from './components/Navigation/index.vue'
import Breadcrumb from './components/Breadcrumb/index.vue'
interface loginOutProps{
    message:string
    status:string
}
import {defineComponent,reactive,onMounted,ref,getCurrentInstance,computed} from 'vue'
import {StateStoreProps} from './store/state'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default defineComponent({
    setup(props) {
        const internalInstance = getCurrentInstance()
        const store = useStore<StateStoreProps>()
        const {userName} = store.state.userInfo||{userName:'admin'}
        const name = computed(()=>userName)
        const router = useRouter()
        const {NavigationsData} = store.state
        const loginOut = async ()=>{
            const resp:loginOutProps = await internalInstance?.appContext.app.config.globalProperties.axios('/platform/page/platformLogOut')
            const {message,status} = resp
            if(status == 'SUCCESS'){
                internalInstance?.appContext.app.config.globalProperties.$message.success(message)
                localStorage.removeItem('token')
                setTimeout(()=>location.reload(),500)
            }
        }
        const cancel = ()=>{}
        const updates = (o:[string&number])=>{
            o.reverse()
            const current_index:number = o[0]||0//优化处理，减少递归调用次数
            const result = o.map(rows=> matchBreads(rows,[NavigationsData[current_index]]))
            if(result&&result[result.length-1].path){
                router.push({path:result[result.length-1].path})//此处可能会有一些小问题，可以优化
            }
            store.commit('updateBread',result)
        }
        const matchBreads = (keys:any,array:any):any=>{
            if(!array||array.length<1){return}
            const obj = {}
            for(let i = 0;i<array.length;i++){
                if(array[i].key === keys){
                    const {title,key,path} = array[i]
                    Object.assign(obj,{title,key,path})
                    return obj
                }else{
                    if(array[i].children){
                        const result = matchBreads(keys,array[i].children)
                        if(result){
                            return result
                        }
                    }
                }
            }
            return obj
        }
        onMounted(()=>{
            store.commit('setBreads')
        })
        return {
            loginOut,
            name,updates,cancel

        }
    },
    components:{Navigation,Breadcrumb}
})
</script>

<style lang="scss" scoped>
.cms-content{display: flex;height:100%;
    .cms-left{width:250px;min-width:250px;border-right:5px solid #fff;height:100%;display: flex;flex-direction: column;}
    .cms-right{flex:1;height:100%;display: flex;flex-direction: column;}
}
.cms-header{width:100%;height:60px;background:rgb(171,58,59)}
.text-center{display: flex;justify-content: center;align-items: center;color:#fff;font-size:30px;}
.login-set{display: flex;justify-content:flex-end;align-items: center;padding-right:20px;
    a{margin-left:10px;color:#fff;}
}
.cms-router{flex:1;background: rgb(242,242,242);padding:10px;overflow: hidden;}
.map-margin{margin:5px;}
</style>
