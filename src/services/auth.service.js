import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const authService = {
  login,
  logout,
  signup,
  getLoggedinUser
}

async function login(credentials) {
  try {
    const user = await httpService.post('auth/login', credentials)
    utilService.saveToStorage(STORAGE_KEY_LOGGEDIN, user)

    return user
  } catch ({ response }) {
    throw response.data.err
  }
}

async function signup(userInfo) {
  try {
    const user = await httpService.post('auth/signup', userInfo)
    utilService.saveToStorage(STORAGE_KEY_LOGGEDIN, user)

    return user
  } catch ({ response }) {
    throw response.data.err
  }
}
async function logout() {
  try {
    await httpService.post('auth/logout')
    localStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    // sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
  } catch ({ response }) {
    throw response.data.err
  }
}

function getLoggedinUser() {
  return utilService.loadFromStorage(STORAGE_KEY_LOGGEDIN)
}