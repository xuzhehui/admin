import {StateStoreProps} from './state'

interface BreadDataProps {
    keys_array:[]
    key:string
    children:[]
}
const Mutations = {
    updateUserInfo:(state:StateStoreProps,payload:any)=>{
        state.userInfo = payload
    },
    setBreads(state:StateStoreProps):[]&any{
        let {NavigationsData} = state
        const deep_set_key = function(array:any,test?:any):any{
            if(!array||array.length<1) return
            const args = Array.from(arguments)
            const parent_key_array = args.length == 2 ? args[1] : [];//取出父级key对子集做递归做连接
            array.map((rows:BreadDataProps,index:any)=>{
                rows.keys_array = parent_key_array.concat([index])
                rows.key = rows.keys_array.join('-')
                if(rows.children&&rows.children.length>0){
                    deep_set_key(rows.children,rows.keys_array)
                }
            })
            return array
        }
        const result = deep_set_key(NavigationsData)
        NavigationsData = result
    },
    updateBread(state:StateStoreProps,payload:[]){
        state.breadList = payload
    }
}

export default Mutations