import app from '@adonisjs/core/services/app'
import Ws from '#services/ws_service'

app.ready(() => {
  Ws.boot()
  const io = Ws.io
  console.log(io)
  io?.on('connection', (socket) => {
    console.log(socket.id)
  })
})