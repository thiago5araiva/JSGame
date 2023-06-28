import { canva } from "./canvas.mjs"
const friction = 0.99
export default class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.alpha = 1
  }
  draw() {
    canva.save()
    canva.globalAlpha = this.alpha
    canva.beginPath()
    canva.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    canva.fillStyle = this.color
    canva.fill()
    canva.restore()
  }
  update() {
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    this.alpha -= 0.01
  }
}
