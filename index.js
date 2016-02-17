/*global Image requestAnimationFrame*/
module.exports = function (conf) {
  var tx = conf.offsetX
  var ty = conf.offsetY
  var tr = conf.offsetRotation

  const Kaleidos = function (conf) {
    if (conf.slices % 2) { // force slices to be even
      conf.slices += 1
    }

    this.className = conf.className
    this.domElement = document.createElement('canvas')
    this.context = this.domElement.getContext('2d')
    this.image = new Image()
    this.image.src = conf.src
    this.offsetX = conf.offsetX
    this.offsetY = conf.offsetY
    this.offsetRotation = conf.offsetRotation
    this.radius = conf.radius

    this.init = function () {
      this.domElement.style.marginLeft = -conf.radius + 'px'
      this.domElement.style.marginTop = -conf.radius + 'px'
      this.domElement.setAttribute('class', this.className)
      this.domElement.width = this.domElement.height = conf.radius * 2
      this.context.fillStyle = this.context.createPattern(this.image, 'repeat')
      this.draw()
      render()
    }

    this.draw = function () {
      var step = (Math.PI * 2) / conf.slices
      var cx = this.image.width / 2
      var scale = conf.zoom * (conf.radius / Math.min(this.image.width, this.image.height))
      for (let i = 0; i < conf.slices; i++) {
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

    return this
  }

  const onmousemoved = function (event) {
    var dx = event.pageX / window.innerWidth
    var dy = event.pageY / window.innerHeight
    var hx = dx - 0.5
    var hy = dy - 0.5
    tx = hx * kaleidos.radius * -2
    ty = hy * kaleidos.radius * 2
    tr = Math.atan2(hy, hx)
    return
  }

  const render = function () {
    if (conf.animate) {
      var time = new Date().getTime() * 0.0002
      tx = Math.sin(time) * 2000 + 3000
      ty = Math.cos(time * 0.9) * 2000 + 3000
    }
    var delta = tr - kaleidos.offsetRotation
    var theta = Math.atan2(Math.sin(delta), Math.cos(delta))
    kaleidos.offsetX += (tx - kaleidos.offsetX) * conf.ease
    kaleidos.offsetY += (ty - kaleidos.offsetY) * conf.ease
    kaleidos.offsetRotation += (theta - kaleidos.offsetRotation) * conf.ease
    kaleidos.draw()
    requestAnimationFrame(render)
  }

  if (conf.interactive) {
    window.addEventListener('mousemove', onmousemoved, false)
  }

  const kaleidos = new Kaleidos(conf)

  kaleidos.image.addEventListener('load', function () {
    kaleidos.init()
  })

  return kaleidos
}
