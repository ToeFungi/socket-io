const client = io('http://localhost:3001')

let isTyping = false

const ctx = document.getElementById('ctx')
  .getContext('2d')

const handleSendMessage = () => {
  const messageBox = document.getElementById('message')
  client.emit('create-message', { message: messageBox.value })
  messageBox.value = ''
}

const handleIncomingMessages = ({ message, username }) => {
  const messageBox = document.getElementById('text-area')
  messageBox.innerHTML += `<p><strong>${username}:</strong> ${message}</p>`
}

document.getElementById('sendButton').onclick = handleSendMessage
document.getElementById('message').onblur = () => isTyping = false
document.getElementById('message').onfocus = () => isTyping = true

client.on('connect', () => console.log('Connected to server'))

client.on('loop-update', data => {
  ctx.clearRect(0, 0, 500, 500)

  data.updatePacket.player.forEach(player => {
    ctx.fillText(player.name.toString(), player.x, player.y)
  })

  data.updatePacket.bullet.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, 5, 5)
  })
})

client.on('message-update', handleIncomingMessages)

client.on('disconnect', () => console.log('Disconnected from server'))

document.onkeydown = event => {
  if (!isTyping) {
    if (event.keyCode === 68) client.emit('keyPress', { input: 'right', state: true }) // D
    if (event.keyCode === 83) client.emit('keyPress', { input: 'down', state: true }) // S
    if (event.keyCode === 65) client.emit('keyPress', { input: 'left', state: true }) // A
    if (event.keyCode === 87) client.emit('keyPress', { input: 'up', state: true }) // W
  }
}

document.onkeyup = event => {
  if (event.keyCode === 68) client.emit('keyPress', { input: 'right', state: false }) // D
  if (event.keyCode === 83) client.emit('keyPress', { input: 'down', state: false }) // S
  if (event.keyCode === 65) client.emit('keyPress', { input: 'left', state: false }) // A
  if (event.keyCode === 87) client.emit('keyPress', { input: 'up', state: false }) // W
}
