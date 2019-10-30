import express from 'express'
import socketIO from 'socket.io'
import { createServer } from 'http'
import { generateMessage } from './messaging'

const port = process.env.SERVER_PORT || 3001
const app = express()

const server = createServer(app)
const io = socketIO(server)

server.listen(port, () => console.log(`Server listening on port ${port}`))

io.on('connection', socket => {
  console.log('New user', socket.id)

  // Emit to this specific socket
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'))

  // Emit to all sockets except the one broadcasting. Broadcasting `from` this socket
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'User joined the chat!'))

  socket.on('createMessage', ({ from, message }) => {
    console.log('Incoming message', { from, message })
    // Emit to all sockets
    // io.emit('newMessage', message)
    socket.broadcast.emit('newMessage', generateMessage(from, message))
  })

  socket.on('disconnect', (socket, data, other) => {
    console.log('Disconnected', socket, data, other)
  })
})
