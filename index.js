module.exports = function (options) {
  var k = {}
  var half_pi = Math.PI / 2
  var two_pi = Math.PI * 2
  // set defaults
  options = options != null ? options : {
    src: 'http://i.imgur.com/j40ZRls.jpg',
    interactive: true,
    offsetRotation: 0.0,
    offsetScale: 1.0,
    offsetX: 0.0,
    offsetY: 0.0,
    radius: 800,
    slices: Math.round(Math.random() * 40) + 4,
    zoom: 0.4
  }

  if (options.slices % 2) options.slices += 1 // force slices to be even

  k.domElement = document.createElement('canvas')
  k.context = k.domElement.getContext('2d')
  k.image = new Image()
  k.image.src = options.src

  k.draw = function () {
    k.domElement.width = k.domElement.height = options.radius * 2
    console.log(options.radius)
    k.context.fillStyle = k.context.createPattern(k.image, 'repeat')
    var step = two_pi / options.slices
    var cx = k.image.width / 2
    console.log(cx)
    var scale = k.zoom * (options.radius / Math.min(k.image.width, k.image.height))
    for (var i = 0; i < options.slices; i++) {
      k.context.save()
      k.context.translate(options.radius, options.radius)
      k.context.rotate(i * step)
      k.context.beginPath()
      k.context.moveTo(-0.5, -0.5)
      k.context.arc(0, 0, options.radius, step * -0.51, step * 0.51)
      k.context.lineTo(0.5, 0.5)
      k.context.closePath()
      console.log(half_pi)
      k.context.rotate(half_pi)
      k.context.scale(scale, scale)
      k.context.scale([-1, 1][i % 2], 1)
      k.context.translate(options.offsetX - cx, options.offsetY)
      k.context.rotate(options.offsetRotation)
      k.context.scale(options.offsetScale, options.offsetScale)
      k.context.fill()
      k.context.restore()
    }
  }

  k.image.onload = function() {
    console.log('image loaded!')
    k.draw()
  }

  k.domElement.style.position = 'absolute'
  k.domElement.style.marginLeft = -options.radius + 'px'
  k.domElement.style.marginTop = -options.radius + 'px'
  k.domElement.style.left = '50%'
  k.domElement.style.top = '50%'
  k.domElement.setAttribute('class', 'kaleidoscope')

  document.body.appendChild(k.domElement)

  return k
}
