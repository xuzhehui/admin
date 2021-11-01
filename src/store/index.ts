import { createStore } from 'vuex'

import States from './state'
import Actions from './actions'
import Mutations from './mutations'
export default createStore({
  state:States,
  mutations:Mutations,
  actions:Actions,
  modules: {
  }
})
