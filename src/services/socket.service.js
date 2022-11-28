import io from 'socket.io-client'
import { authService } from './auth.service'

const EMITS = {
  SOCKET_EMIT_SEND_MSG: 'chat-send-msg',
  SOCKET_EMIT_SET_TOPIC: 'chat-set-topic',
  SOCKET_EMIT_USER_WATCH: 'user-watch'
}

const EVENTS = {
  SOCKET_EVENT_ADD_MSG: 'chat-add-msg',
  SOCKET_EVENT_USER_UPDATED: 'user-updated',
  SOCKET_EVENT_REVIEW_ADDED: 'review-added',
  SOCKET_EVENT_REVIEW_REMOVED: 'review-removed',
  SOCKET_EVENT_REVIEW_ABOUT_YOU: 'review-about-you'
}

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = authService.getLoggedinUser()
        if (user) this.login(user)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      data = JSON.parse(JSON.stringify(data))
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },
    emits: EMITS,
    events: EVENTS
  }
  return socketService
}
