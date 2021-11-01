
interface loginDataProps{
    token:string;
    data:Object
}
export interface UserinfoProps {
    id: number;
    userName: string;
    avatar?: string;
    email?: string;
    roleId?:number
}

export interface ResponesPros {
    status:string;
    data?:loginDataProps;
}

export interface PageProps{
    total:number
    current:number
    pageSize:number
    showTotal:Function
}
export default {}