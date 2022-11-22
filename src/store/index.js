import { createStore } from 'vuex'

import { toyModule } from './modules/toy.store.js'

export default createStore({
  strict: true,
  state() {
    return {}
  },
  mutations: {},
  getters: {},
  modules: {
    toyModule
  }
})
