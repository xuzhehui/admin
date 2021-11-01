import {ref,reactive} from 'vue'
import { h } from "@vue/runtime-core"
import { PlusOutlined } from '@ant-design/icons-vue'
import {Input,Form,Radio,Checkbox,Select,Switch,DatePicker,Tag,Button,Popover,message,Upload, Modal} from 'ant-design-vue'
import {getBase64} from '@/untils/index'
const {TextArea} = Input
import {Group} from 'ant-design-vue/lib/radio'
const {Item} = Form
const colors:string[] = ['pink','red','orange','green','cyan','blue','purple']

const replaceRender = (array:any,obj:any,option?:any) =>{
    const result = array.map((ele:any)=>{
        switch(ele.name){
            case 'input':
                return renderInput(ele,obj)
            case 'radio':
                return renderRadio(ele,obj)
            case 'check':
                return renderCheckbox(ele,obj)
            case 'select':
                return renderSelect(ele,obj,option)
            case 'switch':
                return renderSwitch(ele,obj)
            case 'date-picker':
                return renderDataPicker(ele,obj)
            case 'tags':
                return renderTags(ele,obj)
            case 'textarea':
                return renderTextArea(ele,obj)
            case 'upload':
                return renderUpload(ele,obj)
            case 'custom':
                return renderCustom(ele,obj)
        }
    })
    return result
}

const renderTextArea = (row:any,obj:any)=>{
    return h(Item,{label:row.title,name:row.serve},()=>[h(TextArea,{
        value:obj[row.serve],
        placeholder:row.placeholder,
        type:row.type||'',
        onInput:(e:any)=>{
            obj[row.serve] = e.target.value
        },
        autoSize:{minRows:2}
    })])
}

const renderInput = (row:any,obj:any) =>{
    return h(Item,{label:row.title,name:row.serve},()=>[h(Input,{
        value:obj[row.serve],
        type:row.type||'',
        placeholder:row.placeholder,
        onInput:(e:any)=>{
            obj[row.serve] = e.target.value
        }
    })])
}

const renderRadio = (row:any,obj:any)=>{
    const {option} = row
    return h(Item,{label:row.title,name:row.serve},()=> h(Group,{
        value:obj[row.serve],
        onChange:(e:any)=>obj[row.serve] = e.target.value
    },()=>option.map((m:any)=>{
        return h(Radio,{
        value:m.value
        },()=>m.label)
    })))
}

const renderCheckbox = (row:any,obj:any)=>{
    const {option} = row
    return h(Item,{label:row.title,name:row.serve},()=>h(Checkbox.Group,{
        value:obj[row.serve],
        options:option,
        onChange:(e:any)=>obj[row.serve] = e
    }))
}

const renderSelect = (row:any,obj:any,globle?:any)=>{
    const {option,change} = row
    return h(Item,{label:row.title,name:row.serve},()=>h(Select,{
        value:obj[row.serve],
        placeholder:row.placeholder,
        onChange:(e)=>{
            obj[row.serve] = e
            change == true ? globle.change(obj) : ''
        }
    },()=>option.map((ele:any)=>h(Select.Option,{
        value:ele[row.optionValue]||ele.value
    },()=>ele[row.optionName]||ele.name))))
}

const renderSwitch = (row:any,obj:any)=>{
    return h(Item,{label:row.title,name:row.serve},()=>h(Switch,{
        checkedChildren:'开',
        unCheckedChildren:'关',
        checked:obj[row.serve],
        onChange:(e:boolean)=>obj[row.serve] = e
    }))
}

const renderDataPicker = (row:any,obj:any)=>{
    return h(Item,{label:row.title,name:row.serve},()=>h(DatePicker,{
        showTime:true,
        placeholder:row.placeholder,
        onChange:(e:any,s)=>obj[row.serve] = s,
        style:{width:'100%'}
    }))
}

const renderTags = (row:any,obj:any)=>{
    const visible = ref(false)
    const tagValue = ref('')
    const tagList = reactive<string[]>(row.value)
    const init = ()=>{
        row.select_value = null
        tagValue.value = ''
        if(row.autoClose){
            visible.value = false
        }
    }
    const inputFocus = ref(false)
    const inputValue = ref('')
    const subContentTagsModal = (m:any)=>{
        const result = tagList.findIndex((ele)=>ele[row.valueName] == m[row.valueName])
        console.log(result)
        if(result<0){
            tagList.push(m)
            init()
        }else{
            message.warning('请勿重复添加相同的标签')
        }
    }
    const subContentTags = (value:string)=>{
        const result = tagList.find(row=>row == value)
        if(result){
            message.warning('请勿重复添加相同的标签')
        }else{
            tagList.push(value)
        }
        inputFocus.value = false
        inputValue.value = ''
    }
    return h(Item,{label:row.title,name:row.serve},()=>h('div',{},[
        tagList.map((ele:any,index:number)=>h(Tag,{
            color:colors[parseInt((Math.random()*colors.length) as any)] as string,
            closable:true,
            onClose:()=>tagList.splice(index,1),
        },()=>row.option&&row.option.length>0 ? ele[row.valueName] : ele)),
        row.option&&row.option.length>0 ? h(Popover,{
            title:'标签类别',
            trigger:"click",
            visible:visible.value,
            content:()=>[h('div',{},[
                h(Select,{
                    style:'width:100%;',
                    value:row.select_value,
                    placeholder:'请选择标签类别',
                    onChange:(e:any)=>row.select_value = e,
                    size:'small',
                },()=>row.option.map((m:any)=>h(Select.Option,{value:m[row.optionValue]},()=>m[row.optionName])))]),
                h(Input,{
                    style:'margin-top:20px;',
                    placeholder:'请输入标签名',
                    size:'small',
                    value:tagValue.value,
                    onInput:(e)=>tagValue.value = e.target.value
                },()=>'123'),
                h('div',{
                    style:'margin-top:20px;text-align:right;'
                },[
                    h(Button,{size:'small',style:'margin-right:10px;',type:'danger',
                        onClick:(e:any)=>visible.value = false
                    },()=>'关闭'),
                    h(Button,{
                        size:'small',
                        type:'primary',
                        onClick:(e)=>{
                            const {select_value} = row
                            if(select_value&&tagValue){
                                let obj = {} as any
                                obj[row.valueFiled] = select_value
                                obj[row.valueName] = tagValue.value
                                subContentTagsModal(obj)
                            }else{
                                return message.warning('请填写标签信息')
                            }
                        }
                    },()=>'添加')
                ])
            ]
        },()=>h(Button,{
            size:'small',
            onclick:(e:any)=>visible.value=true
        },()=>'new tag')) : (inputFocus.value == true ? h(Input,{
            style:{
                width:'78px'
            },
            size:'small',
            value:inputValue.value,
            onInput:(e)=>inputValue.value = e.target.value,
            onBlur:(e)=>inputValue.value ? subContentTags(inputValue.value) : inputFocus.value = false,
            onKeyup:(e:KeyboardEvent)=>e.code === 'Enter' ? inputFocus.value = false : ''
        }) : h(Button,{
            size:'small',
            onClick:()=>inputFocus.value = true,
        },()=>'new tag1'))
         
    ]))
}

export interface UploadFileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    percent?: number;
    url?: string;
    preview?: string;
    originFileObj?: any;
  }
 export interface FileInfo {
    file: UploadFileItem;
    fileList: UploadFileItem[];
  }

const renderUpload = (row:any,obj:any)=>{
    let {value} = row
    const fileList = ref<[]>(value.map((element:any,index:number)=>{
        return {uid:index,name:'image',status:'done',url:element}
    }))
    const action = `${process.env.VUE_APP_BASE_URL}/${row.action ? row.action : 'file/upload'}`
    const previewVisible = ref<boolean>(false)
    const previewImage = ref<string | undefined>('')
    const handlePreview = async (file:any) => {
        if (!file.url && !file.preview) {
          file.preview = (await getBase64(file.originFileObj)) as string;
        }
        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
        return false
    }
    const handleChange = ({ fileList: newFileList }:any) => {
        newFileList.forEach((m:any)=>{
            try{
                const {data} = m.response
                m.url = data
            }catch(e){}
        })
        fileList.value = newFileList
        value = fileList.value.map((ele:any)=>ele.url)
        obj[row.serve] = value
    }
    return h(Item,{label:row.title,name:row.serve},()=>h(Upload,{
        listType:'picture-card',
        onPreview:handlePreview,
        fileList:fileList.value,
        action:action,
        onChange:(e:any)=>handleChange(e)
    },()=>[
        h('div',{},[h(PlusOutlined),h('div',{},'upload')]),
        h(Modal,{
            visible:previewVisible.value,
            footer:null,
            onCancel:(e:any)=>previewVisible.value = false
        },()=>h('img',{
            alt:'',
            style:'width:100%',
            src:previewImage.value
        }))
    ]))
}

const renderCustom = (row:any,obj:any)=>{
    const {customRender} = row
    console.log(customRender)
    return h(Item,{label:row.title,name:row.server},()=>h(customRender()))
}


export default replaceRender
