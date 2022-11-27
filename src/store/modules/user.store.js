import { authService } from '../../services/auth.service.js'

export const mutations = {
  setUser: user => ({ type: 'setUser', user }),
}

export const actions = {
  setUser: user => ({ type: 'loadUser' }),
}

export const userModule = {
  state() {
    return {
      user: null
    }
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user
    }
  },
  actions: {
    loadUser({ commit }) {
      authService.getLoggedinUser()
        .then(user => commit(mutations.setUser(user)))
        .catch(() => console.log('[loadUser] Cannot load user'))
    }
  },
  getters: {
    user({ user }) {
      return user
    }
  }
}