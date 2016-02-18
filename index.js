/*global Image*/
module.exports = function (conf) {
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
    }

    this.draw = function () {
      var step = (Math.PI * 2) / conf.slices
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

  const kaleidos = new Kaleidos(conf)

  kaleidos.image.addEventListener('load', function () {
    kaleidos.init()
  })

  return kaleidos
}
