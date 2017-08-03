const defaults = require('lodash.defaults')

module.exports = function (canvas, opts) {
  opts = defaults(opts, require('./defaults'))

  opts.slices = opts.slices % 2 ? opts.slices + 1 : opts.slices

  const className = opts.className
  const offsetX = opts.offsetX
  const offsetY = opts.offsetY
  const offsetRotation = opts.offsetRotation
  const radius = opts.radius
  const slices = opts.slices
  const context = canvas.getContext('2d')
  const style = opts.style

  const initialize = function () {
    if (opts.style) {
      canvas.style.marginLeft = -opts.radius + 'px'
      canvas.style.marginTop = -opts.radius + 'px'
    }
    canvas.setAttribute('class', className)
    canvas.width = canvas.height = opts.radius * 2
    context.fillStyle = context.createPattern(opts.src, 'repeat')
    draw()
  }

  const draw = function () {
    var step = (Math.PI * 2) / slices
    var cx = opts.src.width / 2
    var width = opts.src.width || opts.src.videoWidth
    var height = opts.src.height || opts.src.videoHeight
    var scale = opts.zoom * (opts.radius / Math.min(width, height))
    for (var i = 0; i < slices; i++) {
      context.save()
      context.translate(radius, radius)
      context.rotate(i * step)
      context.beginPath()
      context.moveTo(-0.5, -0.5)
      context.arc(0, 0, radius, step * -0.51, step * 0.51)
      context.lineTo(0.5, 0.5)
      context.closePath()
      context.rotate(Math.PI / 2)
      context.scale(scale, scale)
      context.scale([-1, 1][i % 2], 1)
      context.translate(offsetX - cx, offsetY)
      context.rotate(offsetRotation)
      context.scale(opts.offsetScale, opts.offsetScale)
      context.fill()
      context.restore()
    }
  }

  return {
    canvas,
    initialize
  }
}
