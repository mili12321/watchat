import io from 'socket.io-client'

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030/'

let socket

export const socketService = {
  setup,
  terminate,
  on,
  off,
  emit,
  broadcast,
}

function setup() {
  socket = io.connect(BASE_URL)
}

function terminate() {
  socket = null
}

function on(eventName, cb) {
  console.log('ON SOCKET EVENT')
  socket.on(eventName, cb)
}

function off(eventName, cb) {
  socket.off(eventName, cb)
}

function emit(eventName, data) {
  socket.emit(eventName, data)
}

function broadcast(eventName, data) {
  socket.broadcast.emit(eventName, data)
}
