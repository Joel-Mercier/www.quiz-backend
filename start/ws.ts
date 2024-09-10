import { Server } from 'socket.io'
import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'

app.ready(() => {
  const io = new Server(server.getNodeServer(), {
    cors: {
      origin: ["http://localhost:8081"],
    }
  })
  io.on('connection', (socket) => {
    console.log('socket connected', socket.id)
  })
})