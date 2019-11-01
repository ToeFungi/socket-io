class Bullet {
  constructor(angle) {
    this.id = Math.random()

    this.position = {
      x: 250,
      y: 250
    }

    this.speedX = Math.cos(angle / 180 * Math.PI) * 10
    this.speedY = Math.sin(angle / 180 * Math.PI) * 10

    this.lifeSpan = 0
    this.maxLifeSpan = 10
    this.shouldRemove = false
  }

  getPosition() {
    return this.position
  }

  getX() {
    return this.position.x
  }

  getY() {
    return this.position.y
  }

  getId() {
    return this.id
  }

  update() {
    if (this.lifeSpan++ > this.maxLifeSpan) {
      this.shouldRemove = true
    }

    this.updatePosition()

    return this
  }

  updatePosition() {
    this.position.x += this.speedX
    this.position.y += this.speedY

    return this
  }

  setMaxLifeSpan(maxLifeSpan) {
    this.maxLifeSpan = maxLifeSpan
    return this
  }

  serialize() {
    return {
      x: this.position.x,
      y: this.position.y,
      speedX: this.speedX,
      speedY: this.speedY
    }
  }
}

export { Bullet }
