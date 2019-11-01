import { Movable } from '../types/Movable'

class Player extends Movable {
  /**
   * @param {WebSocket} socket The connection socket of the player
   * @param {Position} position The initial position of the player
   */
  constructor(socket, position) {
    super()

    this.name = Math.floor(10 * Math.random())

    this.id = socket.id
    this.socket = socket
    this.position = position
  }

  update() {
    this.updatePosition()

    return this
  }

  updatePosition() {
    if (this.isMovingRight()) this.position.x += this.getMaxSpeed()
    if (this.isMovingLeft()) this.position.x -= this.getMaxSpeed()
    if (this.isMovingUp()) this.position.y -= this.getMaxSpeed()
    if (this.isMovingDown()) this.position.y += this.getMaxSpeed()
  }

  getSocket() {
    return this.socket
  }

  setX(x) {
    this.position.x = x
    return this
  }

  setY(y) {
    this.position.y = y
    return this
  }

  getX() {
    return this.position.x
  }

  getY() {
    return this.position.y
  }

  setPosition(position) {
    this.position = position
    return this
  }

  getPosition() {
    return this.position
  }

  getId() {
    return this.id
  }

  setName(name) {
    this.name = name
    return this
  }

  getName() {
    return this.name
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      y: this.position.y,
      x: this.position.x
    }
  }
}

/**
 * @typedef {object} Position
 * @property {number} x The X co-ordinate of the position
 * @property {number} y The Y co-ordinate of the position
 */

export { Player }
