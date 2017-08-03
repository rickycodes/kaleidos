const defaults = require('lodash.defaults')

module.exports = function (canvas, opts) {
  opts = defaults(opts, require('./defaults'))

  opts.slices = opts.slices % 2 ? opts.slices + 1 : opts.slices

  this.className = opts.className
  this.offsetX = opts.offsetX
  this.offsetY = opts.offsetY
  this.offsetRotation = opts.offsetRotation
  this.radius = opts.radius
  this.slices = opts.slices
  // this needs to be a param
  this.domElement = canvas
  const context = canvas.getContext('2d')
  this.style = opts.style

  this.init = function () {
    if (opts.style) {
      this.domElement.style.marginLeft = -opts.radius + 'px'
      this.domElement.style.marginTop = -opts.radius + 'px'
    }
    this.domElement.setAttribute('class', this.className)
    this.domElement.width = this.domElement.height = opts.radius * 2
    context.fillStyle = context.createPattern(opts.src, 'repeat')
    this.draw()
  }

  this.draw = function () {
    var step = (Math.PI * 2) / this.slices
    var cx = opts.src.width / 2
    var width = opts.src.width || opts.src.videoWidth
    var height = opts.src.height || opts.src.videoHeight
    var scale = opts.zoom * (opts.radius / Math.min(width, height))
    for (var i = 0; i < this.slices; i++) {
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
      context.scale(this.offsetScale, this.offsetScale)
      context.fill()
      context.restore()
    }
  }

  return this
}
