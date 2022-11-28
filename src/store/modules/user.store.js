import { authService } from '../../services/auth.service'
import { socketService } from '../../services/socket.service'

export const mutations = {
  setUser: user => ({ type: 'setUser', user }),
}

export const actions = {
  loadUser: () => ({ type: 'loadUser' }),
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
    },
  },
  actions: {
    loadUser({ commit }) {
      const user = authService.getLoggedinUser()
      if (!user) return

      commit(mutations.setUser(user))
    }
  },
  getters: {
    user({ user }) {
      return user
    }
  }
}