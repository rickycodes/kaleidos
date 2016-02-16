/*global Image requestAnimationFrame*/
module.exports = function (conf) {
  var half_pi = Math.PI / 2
  var two_pi = Math.PI * 2
  var tx = conf.offsetX
  var ty = conf.offsetY
  var tr = conf.offsetRotation

  function Kaleidos (conf) {
    var _self = this
    if (conf.slices % 2) {
      conf.slices += 1 // force slices to be even
    }

    this.domElement = document.createElement('canvas')
    this.context = this.domElement.getContext('2d')
    this.image = new Image()
    this.image.src = conf.src
    this.offsetX = conf.offsetX
    this.offsetY = conf.offsetY
    this.offsetRotation = conf.offsetRotation
    this.radius = conf.radius

    this.init = function () {
      this.domElement.style.position = 'absolute'
      this.domElement.style.marginLeft = -conf.radius + 'px'
      this.domElement.style.marginTop = -conf.radius + 'px'
      this.domElement.style.left = '50%'
      this.domElement.style.top = '50%'
      this.domElement.setAttribute('class', 'kaleidoscope')
      this.domElement.width = this.domElement.height = conf.radius * 2
      this.context.fillStyle = this.context.createPattern(this.image, 'repeat')
      this.draw()
    }

    this.draw = function () {
      var step = two_pi / conf.slices
      var cx = this.image.width / 2
      var scale = conf.zoom * (conf.radius / Math.min(this.image.width, this.image.height))
      for (var i = 0; i < conf.slices; i++) {
        this.context.save()
        this.context.translate(this.radius, this.radius)
        this.context.rotate(i * step)
        this.context.beginPath()
        this.context.moveTo(-0.5, -0.5)
        this.context.arc(0, 0, this.radius, step * -0.51, step * 0.51)
        this.context.lineTo(0.5, 0.5)
        this.context.closePath()
        this.context.rotate(half_pi)
        this.context.scale(scale, scale)
        this.context.scale([-1, 1][i % 2], 1)
        this.context.translate(this.offsetX - cx, this.offsetY)
        this.context.rotate(this.offsetRotation)
        this.context.scale(this.offsetScale, this.offsetScale)
        this.context.fill()
        this.context.restore()
      }
    }

    this.image.addEventListener('load', function () {
      _self.init()
      render()
    })

    return this
  }

  function onmousemoved (event) {
    var dx = event.pageX / window.innerWidth
    var dy = event.pageY / window.innerHeight
    var hx = dx - 0.5
    var hy = dy - 0.5
    tx = hx * kaleidos.radius * -2
    ty = hy * kaleidos.radius * 2
    tr = Math.atan2(hy, hx)
    return
  }

  function render () {
    if (conf.animate) {
      var time = new Date().getTime() * 0.0002
      tx = Math.sin(time) * 1920 + 2560
      ty = Math.cos(time * 0.9) * 1920 + 2560
    }
    var delta = tr - kaleidos.offsetRotation
    var theta = Math.atan2(Math.sin(delta), Math.cos(delta))
    kaleidos.offsetX += (tx - kaleidos.offsetX) * conf.ease
    kaleidos.offsetY += (ty - kaleidos.offsetY) * conf.ease
    kaleidos.offsetRotation += (theta - kaleidos.offsetRotation) * conf.ease
    kaleidos.draw()
    requestAnimationFrame(render)
  }

  var kaleidos = new Kaleidos(conf)

  if (conf.interactive) {
    window.addEventListener('mousemove', onmousemoved, false)
  }

  return kaleidos
}
