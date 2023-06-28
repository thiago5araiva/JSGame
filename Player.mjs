import { canva } from "./canvas.mjs"

class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }
  draw() {
    canva.beginPath()
    canva.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    canva.fillStyle = this.color
    canva.fill()
  }
}

export default Player
