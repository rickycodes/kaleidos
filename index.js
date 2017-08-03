const defaults = require('lodash.defaults')

module.exports = function (canvas, opts) {
  const isCanvas = /canvas/i.test(Object.prototype.toString.call(canvas))
  if (!isCanvas) throw new TypeError('first param is not canvas')

  const context = this.context = canvas.getContext('2d')

  opts = defaults(opts, require('./defaults'))

  opts.slices = opts.slices % 2 ? opts.slices + 1 : opts.slices

  // these need to be exposed
  this.offsetX = opts.offsetX
  this.offsetY = opts.offsetY
  this.offsetRotation = opts.offsetRotation
  this.canvas = canvas
  this.className = opts.className
  this.radius = opts.radius
  this.slices = opts.slices
  this.style = opts.style

  this.initialize = function () {
    if (opts.style) {
      canvas.style.marginLeft = -opts.radius + 'px'
      canvas.style.marginTop = -opts.radius + 'px'
    }
    if (this.className !== null) canvas.setAttribute('class', this.className)
    canvas.width = canvas.height = opts.radius * 2
    context.fillStyle = context.createPattern(opts.src, 'repeat')
    this.draw()
  }

  this.draw = function () {
    const step = (Math.PI * 2) / this.slices
    const cx = opts.src.width / 2
    const width = opts.src.width || opts.src.videoWidth
    const height = opts.src.height || opts.src.videoHeight
    const scale = opts.zoom * (opts.radius / Math.min(width, height))
    for (let i = 0; i < this.slices; i++) {
      context.save()
      context.translate(this.radius, this.radius)
      context.rotate(i * step)
      context.beginPath()
      context.moveTo(-0.5, -0.5)
      context.arc(0, 0, this.radius, step * -0.51, step * 0.51)
      context.lineTo(0.5, 0.5)
      context.closePath()
      context.rotate(Math.PI / 2)
      context.scale(scale, scale)
      context.scale([-1, 1][i % 2], 1)
      context.translate(this.offsetX - cx, this.offsetY)
      context.rotate(this.offsetRotation)
      context.scale(opts.offsetScale, opts.offsetScale)
      context.fill()
      context.restore()
    }
  }

  return this
}
