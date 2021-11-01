<template>
    <div class="content">
        <p class="login-text">斗泉运营后台</p>
        <div class='forms-attr'>
            <a-form :model='forms' ref='formRef' :rules='rules' :form="form" :label-col="{span:3}" :wrapper-col="{span:21}">
                <a-form-item label='用户名' name='userName'>
                    <a-input v-model:value="forms.userName">
                        <template #prefix>
                            <UserOutlined/>
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item label='密码' name='passWord'>
                    <a-input-password v-model:value="forms.passWord">
                        <template #prefix>
                            <UnlockOutlined/>
                        </template>
                    </a-input-password>
                </a-form-item>
            </a-form>
            <a-button @click="submit" type="primary" block>登录</a-button>
        </div>
    </div>
</template>
<script lang="ts">
import {
  UserOutlined,
  UnlockOutlined
} from '@ant-design/icons-vue';
import { defineComponent,reactive,onMounted,ref,getCurrentInstance} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {StateStoreProps} from './store/state'
import apis from '@/api/index'
interface RuleCheckattr{
    required:boolean
    message:string
    trigger:string
}
interface Forms{
    userName:string,
    passWord:string
}
interface RuleForms{
    userName:Array<RuleCheckattr>,
    passWord:Array<RuleCheckattr>,
}
export default defineComponent({
    setup(){
        const {Login} = apis
        console.log(apis)
        const internalInstance = getCurrentInstance()
        const store = useStore<StateStoreProps>()
        const router = useRouter()
        const forms:Forms = reactive({
            userName:'',passWord:''
        })
        const rules:RuleForms = {
            userName:[{ required: true, message: 'please enter your username', trigger: 'blur' }],
            passWord:[{required:true,message:'please enter your password',trigger:'blur'}]
        }
        const formRef = ref()
        const login = async (res:any)=>{
            const resp:any = await Login(res)
            const {data,token} = resp.data
            const {status} = resp
            if(status == '200'){
                localStorage.setItem('token',token)
                store.commit('updateUserInfo',data)
                internalInstance?.appContext.config.globalProperties.$message.success(resp.message)
                setTimeout(()=>router.push({path:'/cms'}),200)
            }  
        }
        const submit = ()=>{
            formRef.value.validate()
            .then((res:Object)=>login(res))
            .catch((err:any)=>err)
        }
        onMounted(()=>{})
        return {
            forms,rules,submit,formRef
        }
    },
    components:{UserOutlined,UnlockOutlined}
})
</script>
<style lang="scss" scoped>
.content{width:100%;height:100%;background:rgb(171,59,58);display:flex;justify-content:center;align-items:center;flex-direction:column;
    .login-text{font-size:20px;color:#fff;font-weight: bold;}
    .forms-attr{padding:40px 10px;background:#fff;border-radius:5px;width:500px;}
}
</style>
