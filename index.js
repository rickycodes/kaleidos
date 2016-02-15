/*global Image requestAnimationFrame*/
module.exports = function (opts) {
  var k = {}
  var half_pi = Math.PI / 2
  var two_pi = Math.PI * 2
  var tx = opts.offsetX
  var ty = opts.offsetY
  var tr = opts.offsetRotation

  if (opts.slices % 2) opts.slices += 1 // force slices to be even

  k.domElement = document.createElement('canvas')
  k.context = k.domElement.getContext('2d')
  k.image = new Image()
  k.image.src = opts.src

  k.offsetX = opts.offsetX
  k.offsetY = opts.offsetY
  k.offsetRotation = opts.offsetRotation

  k.draw = function () {
    k.domElement.width = k.domElement.height = opts.radius * 2
    k.context.fillStyle = k.context.createPattern(k.image, 'repeat')
    var step = two_pi / opts.slices
    var cx = k.image.width / 2
    var scale = opts.zoom * (opts.radius / Math.min(k.image.width, k.image.height))
    for (var i = 0; i < opts.slices; i++) {
      k.context.save()
      k.context.translate(opts.radius, opts.radius)
      k.context.rotate(i * step)
      k.context.beginPath()
      k.context.moveTo(-0.5, -0.5)
      k.context.arc(0, 0, opts.radius, step * -0.51, step * 0.51)
      k.context.lineTo(0.5, 0.5)
      k.context.closePath()
      k.context.rotate(half_pi)
      k.context.scale(scale, scale)
      k.context.scale([-1, 1][i % 2], 1)
      k.context.translate(k.offsetX - cx, k.offsetY)
      k.context.rotate(k.offsetRotation)
      k.context.scale(k.offsetScale, k.offsetScale)
      k.context.fill()
      k.context.restore()
    }
  }

  k.image.onload = function () {
    k.draw()
  }

  k.domElement.style.position = 'absolute'
  k.domElement.style.marginLeft = -opts.radius + 'px'
  k.domElement.style.marginTop = -opts.radius + 'px'
  k.domElement.style.left = '50%'
  k.domElement.style.top = '50%'
  k.domElement.setAttribute('class', 'kaleidoscope')

  document.body.appendChild(k.domElement)

  function render () {
    var delta, theta
    if (!opts.interactive) {
      var time = new Date().getTime() * 0.0002
      tx = Math.sin(time) * 1920 + 2560
      ty = Math.cos(time * 0.9) * 1920 + 2560
    }

    delta = tr - k.offsetRotation
    theta = Math.atan2(Math.sin(delta), Math.cos(delta))
    k.offsetX += (tx - k.offsetX) * opts.ease
    k.offsetY += (ty - k.offsetY) * opts.ease
    k.offsetRotation += (theta - k.offsetRotation) * opts.ease
    k.draw()
    requestAnimationFrame(render)
  }

  render()

  return k
}
