import { Bullet } from './models/Bullet'

class BulletController {
  constructor() {
    this.bulletList = []
  }

  updateBullets() {
    if (Math.random() < 0.1) {
      this.addBullet(Math.random() * 360)
    }

    this.removeBullets()

    return this.bulletList.map(bullet => bullet.update()
      .serialize())
  }

  addBullet(angle) {
    const bullet = new Bullet(angle)

    this.bulletList.push(bullet)
  }

  removeBullets() {
    const removableBullets = this.bulletList.filter(bullet => bullet.shouldRemove)

    removableBullets.forEach(bullet => {
      const index = this.bulletList.findIndex(item => item.getId() === bullet.getId())
      this.bulletList.splice(index, 1)
    })
  }
}

export { BulletController }
