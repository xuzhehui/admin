import PageTemplate from './PageTemplate/index.vue'

import openFormsModal from './Modal/forms/index'

import TableSetCoustom from './TableSetMannage/index'

export default (app:any)=>{
    app.component('PageTemplate',PageTemplate)
    app.component('TableSetCoustom',TableSetCoustom)
    app.config.globalProperties.openFormsModal = openFormsModal
}