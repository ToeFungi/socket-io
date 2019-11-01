/**
 * Abstract class that provides `Movable` functionality to a class
 * @abstract
 */
class Movable {
  constructor() {
    this.movingRight = false
    this.movingLeft = false
    this.movingUp = false
    this.movingDown = false

    this.maxSpeed = 10
  }

  /**
   * Sets whether or not object is moving to the right
   * @param {boolean} movingRight
   * @return this
   */
  setMovingRight(movingRight) {
    this.movingRight = movingRight
    return this
  }

  /**
   * Gets current state of object moving right
   * @returns {boolean}
   */
  isMovingRight() {
    return this.movingRight
  }

  /**
   * Sets whether or not object is moving to the left
   * @param {boolean} movingLeft
   * @return this
   */
  setMovingLeft(movingLeft) {
    this.movingLeft = movingLeft
    return this
  }

  /**
   * Gets current state of object moving left
   * @returns {boolean}
   */
  isMovingLeft() {
    return this.movingLeft
  }

  /**
   * Sets whether or not object is moving to the up
   * @param {boolean} movingUp
   * @return this
   */
  setMovingUp(movingUp) {
    this.movingUp = movingUp
    return this
  }

  /**
   * Gets current state of object moving up
   * @returns {boolean}
   */
  isMovingUp() {
    return this.movingUp
  }

  /**
   * Sets whether or not object is moving to the down
   * @param {boolean} movingDown
   * @return this
   */
  setMovingDown(movingDown) {
    this.movingDown = movingDown
    return this
  }

  /**
   * Gets current state of object moving down
   * @returns {boolean}
   */
  isMovingDown() {
    return this.movingDown
  }

  /**
   * Sets the maximum speed of an object moving
   * @param {number} maxSpeed
   * @return this
   */
  setMaxSpeed(maxSpeed) {
    this.maxSpeed = maxSpeed
    return this
  }

  /**
   * Get the maximum speed of an object moving
   * @returns {number}
   */
  getMaxSpeed() {
    return this.maxSpeed
  }
}

export { Movable }
