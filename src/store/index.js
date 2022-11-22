import { createStore } from 'vuex'

import { toyModule } from './modules/toy.store.js'

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {}
  },
  mutations: {},
  getters: {},
  modules: {
    toyModule
  }
})
