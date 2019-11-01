import { Player } from './models/Player'

class PlayerController {
  constructor() {
    this.playerList = []
  }

  getPlayerBySocketId(id) {
    return this.playerList.find(player => player.getId() === id)
  }

  onConnect(socket) {
    const position = {
      x: 200,
      y: 200
    }
    const player = new Player(socket, position)

    this.playerList.push(player)
  }

  onDisconnect(socket) {
    const playerIndex = this.playerList.findIndex(player => player.getId() === socket.id)
    this.playerList.splice(playerIndex, 1)
  }

  updatePlayers() {
    return this.playerList.map(player => player.update()
      .serialize())
  }

  handleKeyEvents(data, id) {
    const player = this.playerList.find(player => player.getId() === id)

    if (data.input === 'left') player.setMovingLeft(data.state)
    if (data.input === 'right') player.setMovingRight(data.state)
    if (data.input === 'down') player.setMovingDown(data.state)
    if (data.input === 'up') player.setMovingUp(data.state)
  }
}

export { PlayerController }
