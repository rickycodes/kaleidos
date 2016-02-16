/*global Image requestAnimationFrame*/
module.exports = function (opts) {
  var k = {}
  var half_pi = Math.PI / 2
  var two_pi = Math.PI * 2
  var tx = opts.offsetX
  var ty = opts.offsetY
  var tr = opts.offsetRotation

  k.draw = function () {
    var step = two_pi / opts.slices
    var cx = k.image.width / 2
    var scale = opts.zoom * (opts.radius / Math.min(k.image.width, k.image.height))
    for (var i = 0; i < opts.slices; i++) {
      k.context.save()
      k.context.translate(k.radius, k.radius)
      k.context.rotate(i * step)
      k.context.beginPath()
      k.context.moveTo(-0.5, -0.5)
      k.context.arc(0, 0, k.radius, step * -0.51, step * 0.51)
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

  function setup () {
    if (opts.slices % 2) {
      opts.slices += 1 // force slices to be even
    }

    k.domElement = document.createElement('canvas')
    k.context = k.domElement.getContext('2d')
    k.image = new Image()
    k.image.src = opts.src

    k.offsetX = opts.offsetX
    k.offsetY = opts.offsetY
    k.offsetRotation = opts.offsetRotation
    k.radius = opts.radius
  }

  function init () {
    k.domElement.style.position = 'absolute'
    k.domElement.style.marginLeft = -opts.radius + 'px'
    k.domElement.style.marginTop = -opts.radius + 'px'
    k.domElement.style.left = '50%'
    k.domElement.style.top = '50%'
    k.domElement.setAttribute('class', 'kaleidoscope')
    k.domElement.width = k.domElement.height = opts.radius * 2
    k.context.fillStyle = k.context.createPattern(k.image, 'repeat')

    document.body.appendChild(k.domElement)

    if (opts.interactive) {
      window.addEventListener('mousemove', onMouseMoved, false)
    }

    render()
    k.draw()
  }

  function onMouseMoved (event) {
    var dx = event.pageX / window.innerWidth
    var dy = event.pageY / window.innerHeight
    var hx = dx - 0.5
    var hy = dy - 0.5
    tx = hx * k.radius * -2
    ty = hy * k.radius * 2
    tr = Math.atan2(hy, hx)
    return
  }

  function render () {
    if (opts.animate) {
      var time = new Date().getTime() * 0.0002
      tx = Math.sin(time) * 1920 + 2560
      ty = Math.cos(time * 0.9) * 1920 + 2560
    }
    var delta = tr - k.offsetRotation
    var theta = Math.atan2(Math.sin(delta), Math.cos(delta))
    k.offsetX += (tx - k.offsetX) * opts.ease
    k.offsetY += (ty - k.offsetY) * opts.ease
    k.offsetRotation += (theta - k.offsetRotation) * opts.ease
    k.draw()
    requestAnimationFrame(render)
  }

  setup()
  k.image.addEventListener('load', init)

  return k
}
