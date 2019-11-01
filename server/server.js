import express from 'express'
import socketIO from 'socket.io'
import { createServer } from 'http'
import { Player } from './models/Player'

const port = process.env.SERVER_PORT || 3001
const app = express()

const server = createServer(app)
const io = socketIO(server)

server.listen(port, () => console.log(`Server listening on port ${port}`))

// List of players connected
const players = []

// On connection to the server
io.on('connection', socket => {
  // Random number assigned to player. Used as 'name' to distinguish between connected players
  players.push(new Player(socket, { x: 0, y: 0 }))

  // On socket disconnect, remove player
  socket.on('disconnect', () => removePlayer(socket))

  socket.on('keyPress', data => updatePlayerKeyPress(data, socket.id))
})

// Game loop set to 25 frames per second
const gameLoop = setInterval(() => {
  const updatePacket = players.map(getUpdatedPosition)

  io.emit('loop-update', { updatePacket })
}, 1000 / 25)

// Update the position of the player and return the serialized player
const getUpdatedPosition = player => {
  return player.updatePosition()
    .serialize()
}

// Remove player from the players array when the player disconnects
const removePlayer = socket => {
  players.filter((player, index) => {
    if (player.getId() === socket.id) {
      return players.splice(index, 1)
    }
  })
}

// Update player key press events
const updatePlayerKeyPress = (data, id) => {
  const player = players.find(player => player.getId() === id)

  if (data.input === 'left') player.setMovingLeft(data.state)
  if (data.input === 'right') player.setMovingRight(data.state)
  if (data.input === 'down') player.setMovingDown(data.state)
  if (data.input === 'up') player.setMovingUp(data.state)
}
