import canvas, { canva, canvasWidth, canvasHeight } from "./canvas.mjs"
import Enemy from "./Enemy.mjs"
import Player from "./Player.mjs"
import Projectile from "./Projectile.mjs"
import Particle from "./Particle.mjs"

const scoreEl = document.querySelector("#scoreEl")
const bigScoreEl = document.querySelector("#bigScoreEl")
const startGameBtn = document.querySelector("#startGameBtn")
const modalEl = document.querySelector("#modalEl")

const center = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
}

let player = new Player(center.x, center.y, 10, "white")
let projectiles = []
let particles = []
let enemies = []

function init() {
  player = new Player(center.x, center.y, 10, "white")
  projectiles = []
  particles = []
  enemies = []
  score = 0
  scoreEl.innerHTML = score
  bigScoreEl.innerHTML = score
}

function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4
    let x
    let y
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvasWidth + radius
      y = Math.random() * canvasHeight
    } else {
      x = Math.random() * canvasWidth
      y = Math.random() < 0.5 ? 0 - radius : canvasHeight + radius
    }

    const color = `hsl(${Math.random() * 360},50%,50%)`
    const angle = Math.atan2(center.y - y, center.x - x)
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    }
    enemies.push(new Enemy(x, y, radius, color, velocity))
  }, 1000)
}
let animationID
let score = 0
function animate() {
  animationID = requestAnimationFrame(animate)
  canva.fillStyle = "rgba(0,0,0,.1)"
  canva.fillRect(0, 0, canvasWidth, canvasHeight)
  player.draw()
  particles.forEach((particle, particleIndex) => {
    if (particle.alpha <= 0) {
      particles.splice(particleIndex, 1)
    }
    particle.update()
  })
  projectiles.forEach((projectile, projectileIndex) => {
    projectile.update()
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvasWidth ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvasHeight
    ) {
      setTimeout(() => {
        projectiles.splice(projectileIndex, 1)
      }, 0)
    }
  })
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update()
    const distPlayer = Math.hypot(player.x - enemy.x, player.y - enemy.y)
    // endgame
    if (distPlayer - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationID)
      modalEl.style.display = "flex"
      bigScoreEl.innerHTML = score
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const distProjectile = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      )
      // hit enemies
      if (distProjectile - enemy.radius - projectile.radius < 1) {
        // create explosions
        for (let i = 0; i < 8; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                x: (Math.random() - 0.5) * (Math.random() * 6),
                y: (Math.random() - 0.5) * (Math.random() * 6),
              }
            )
          )
        }
        if (enemy.radius - 10 > 5) {
          // score
          score += 100
          scoreEl.innerHTML = score
          gsap.to(enemy, { radius: enemy.radius - 10 })
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1)
          }, 0)
        } else {
          score += 250
          scoreEl.innerHTML = score
          setTimeout(() => {
            enemies.splice(enemyIndex, 1)
            projectiles.splice(projectileIndex, 1)
          }, 0)
        }
      }
    })
  })
}

addEventListener("click", (event) => {
  const angle = Math.atan2(event.clientY - center.y, event.clientX - center.x)
  const velocity = {
    x: Math.cos(angle) * 6,
    y: Math.sin(angle) * 6,
  }
  projectiles.push(new Projectile(center.x, center.y, 5, "white", velocity))
})

startGameBtn.addEventListener("click", () => {
  init()
  animate()
  spawnEnemies()
  modalEl.style.display = "none"
})
 