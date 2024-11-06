import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

class Ws {
  io: Server | undefined
  private booted = false

  boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return
    }

    this.io = new Server(server.getNodeServer(), {
      cors: {
        origin: '*',
      },
    })
    this.booted = true
  }
}

export default new Ws()