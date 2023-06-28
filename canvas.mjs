const canvas = document.querySelector("canvas")
export const canva = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

export const canvasWidth = canvas.width
export const canvasHeight = canvas.height

export default canvas
