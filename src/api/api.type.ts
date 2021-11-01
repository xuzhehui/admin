export interface PagesInfo{
    pageSize:number
    pageNum:number
}

export interface DataProps{
    start_time?:string,
    end_time?:string
}

export interface LoginProps{
    userName:string,
    passWord:string
}

export interface UserListProps extends PagesInfo,DataProps{
    userName?:string,
    userPhone?:string|number
}

export interface DynastyProps extends PagesInfo,DataProps{
    dynastyName?:string,
    dynastySort?:string|number
}