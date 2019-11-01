import express from 'express'
import socketIO from 'socket.io'
import { createServer } from 'http'

import { Player } from './models/Player'
import { PlayerController } from './PlayerController'

const fps = process.env.SET_FPS = 25
const port = process.env.SERVER_PORT || 3001
const app = express()

const server = createServer(app)
const io = socketIO(server)

const playerController = new PlayerController()

server.listen(port, () => console.log(`Server listening on port ${port}`))

// On connection to the server
io.on('connection', socket => {
  playerController.onConnect(socket)

  // On socket disconnect, remove player
  socket.on('disconnect', () => playerController.onDisconnect(socket))

  // Handle keypress events from client
  socket.on('keyPress', data => playerController.handleKeyEvents(data, socket.id))
})

// Game loop set to x frames per second
const gameLoop = setInterval(() => {
  const updatePacket = playerController.updatePlayers()

  // Emit game loop update to connected sockets
  io.emit('loop-update', { updatePacket })
}, 1000 / fps)
