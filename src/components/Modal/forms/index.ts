import {createApp,h,ref,reactive,toRefs} from 'vue'
import {Modal,Form} from 'ant-design-vue'
import formsRender from './replaceRender'
interface FormsModalProps{
    list:[any]
    title:string
    rules:any,
    then:(result:object|null)=>object|null
    cancel:(err:object|string)=>object|string
    change:()=>void
}
const createFormsModal = (option={} as FormsModalProps)=>{
    const mountNode = document.createElement('div')
    const formsInstance = createApp({
        setup(){
            const {list,rules} = option
            let formsObj = {} as any
            const maxHeight = window.innerHeight
            list.forEach((ele:any)=>formsObj[ele.serve] = ele.value)
            const formsData = reactive({...formsObj})
            const formsRule = reactive({...rules})
            const formsRef = ref()
            const formsElement = formsRender(list,formsData,option)
            const visible = ref(true)
            const close = ()=>{
                visible.value = false
                setTimeout(()=>{
                    mountNode.remove()
                    formsInstance.unmount()
                },200) 
            }

            return ()=>h(Modal,{
                visible:visible.value,
                centered:true,
                closable:true,
                keyboard:true,
                title:option.title,
                onOk:()=>{
                    formsRef
                    .value
                    .validate()
                    .then((res = {} as any)=>{
                        option.then(res)
                        close()
                    })
                    .catch((err:any)=>{
                        console.log(err)
                        return err
                    })
                },
                onCancel:(el = {} as MouseEvent)=>{
                    formsRef.value.resetFields()
                    if(typeof option.cancel === 'function'){
                        option.cancel(el)
                    }
                    close()
                }
            },
            ()=>h('div',{
                style:`max-height:${maxHeight-200}px;overflow-y:auto;padding:5px;`
            },[h(Form,{
                labelCol:{span:4},
                wrapperCol:{span:20},
                rules:formsRule,
                model:formsData,
                ref:formsRef,
                scrollToFirstError:true,
            },
            ()=>formsElement)]
            ))
        }
    })
    document.body.appendChild(mountNode)
    formsInstance.mount(mountNode)
}

export default createFormsModal

