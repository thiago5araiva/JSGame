import { canva } from "./canvas.mjs"

export default class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }
  draw() {
    canva.beginPath()
    canva.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    canva.fillStyle = this.color
    canva.fill()
  }
  update() {
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}
