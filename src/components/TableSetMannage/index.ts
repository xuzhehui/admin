import { Button,Popconfirm} from 'ant-design-vue'
import { defineComponent,h } from 'vue'
export default defineComponent({
    props:{
        list:{type:Array,default:[]}
    },
    setup(props) {
        return ()=>h('div',{
        },props.list.map((row:any)=>row.confirm ? h(Popconfirm,{
            title:row.confirmTitle,
            onConfirm:row.click
        },()=>h(Button,{
            size:'small',
            style:{margin:'0 5px'},
        },()=>row.title)) : h(Button,{
            size:'small',
            style:{margin:'0 5px'},
            onClick:row.click
        },()=>row.title)))
    },
})
