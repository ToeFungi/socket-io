const client = io('http://localhost:3001')

client.on('connect', () => console.log('Connected to server'))

client.on('newMessage', console.log)

client.on('disconnect', () => console.log('Disconnected from server'))
