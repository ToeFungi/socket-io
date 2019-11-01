const client = io('http://localhost:3001')

const ctx = document.getElementById('ctx')
  .getContext('2d')

client.on('connect', () => console.log('Connected to server'))

client.on('loop-update', data => {
  console.debug(data)
  ctx.clearRect(0, 0, 500, 500)

  data.updatePacket.forEach(player => {
    ctx.fillText(player.name.toString(), player.x, player.y)
  })
})

client.on('disconnect', () => console.log('Disconnected from server'))

document.onkeydown = event => {
  if (event.keyCode === 68) client.emit('keyPress', { input: 'right', state: true }) // D
  if (event.keyCode === 83) client.emit('keyPress', { input: 'down', state: true }) // S
  if (event.keyCode === 65) client.emit('keyPress', { input: 'left', state: true }) // A
  if (event.keyCode === 87) client.emit('keyPress', { input: 'up', state: true }) // W
}

document.onkeyup = event => {
  if (event.keyCode === 68) client.emit('keyPress', { input: 'right', state: false }) // D
  if (event.keyCode === 83) client.emit('keyPress', { input: 'down', state: false }) // S
  if (event.keyCode === 65) client.emit('keyPress', { input: 'left', state: false }) // A
  if (event.keyCode === 87) client.emit('keyPress', { input: 'up', state: false }) // W
}