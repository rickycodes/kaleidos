const defaults = require('lodash.defaults')

module.exports = function (options) {
  const _self = this

  options = defaults(options, {
    className: 'kaleidos',
    offsetRotation: 0,
    offsetScale: 1,
    offsetX: 0,
    offsetY: 0,
    radius: 800,
    slices: 20,
    zoom: 0.4,
    ease: 0.1,
    style: true
  })

  if (options.slices % 2) { // force slices to be even
    options.slices += 1
  }

  this.className = options.className
  this.offsetX = options.offsetX
  this.offsetY = options.offsetY
  this.offsetRotation = options.offsetRotation
  this.radius = options.radius
  this.slices = options.slices
  this.domElement = document.createElement('canvas')
  this.context = this.domElement.getContext('2d')
  this.style = options.style

  this.init = function () {
    if (options.style) {
      this.domElement.style.marginLeft = -options.radius + 'px'
      this.domElement.style.marginTop = -options.radius + 'px'
    }
    this.domElement.setAttribute('class', this.className)
    this.domElement.width = this.domElement.height = options.radius * 2
    this.context.fillStyle = this.context.createPattern(options.src, 'repeat')
    this.draw()
  }

  this.draw = function () {
    var step = (Math.PI * 2) / this.slices
    var cx = options.src.width / 2
    var width = options.src.width || options.src.videoWidth
    var height = options.src.height || options.src.videoHeight
    var scale = options.zoom * (options.radius / Math.min(width, height))
    for (var i = 0; i < this.slices; i++) {
      this.context.save()
      this.context.translate(this.radius, this.radius)
      this.context.rotate(i * step)
      this.context.beginPath()
      this.context.moveTo(-0.5, -0.5)
      this.context.arc(0, 0, this.radius, step * -0.51, step * 0.51)
      this.context.lineTo(0.5, 0.5)
      this.context.closePath()
      this.context.rotate(Math.PI / 2)
      this.context.scale(scale, scale)
      this.context.scale([-1, 1][i % 2], 1)
      this.context.translate(this.offsetX - cx, this.offsetY)
      this.context.rotate(this.offsetRotation)
      this.context.scale(this.offsetScale, this.offsetScale)
      this.context.fill()
      this.context.restore()
    }
  }

  options.src.addEventListener('load', function () {
    _self.init()
  })

  return this
}
