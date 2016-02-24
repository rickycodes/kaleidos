module.exports = function (conf) {
  const _self = this
  if (conf.slices % 2) { // force slices to be even
    conf.slices += 1
  }

  this.className = conf.className
  this.domElement = document.createElement('canvas')
  this.context = this.domElement.getContext('2d')
  this.offsetX = conf.offsetX
  this.offsetY = conf.offsetY
  this.offsetRotation = conf.offsetRotation
  this.radius = conf.radius
  this.slices = conf.slices

  this.init = function () {
    this.domElement.style.marginLeft = -conf.radius + 'px'
    this.domElement.style.marginTop = -conf.radius + 'px'
    this.domElement.setAttribute('class', this.className)
    this.domElement.width = this.domElement.height = conf.radius * 2
    this.context.fillStyle = this.context.createPattern(conf.src, 'repeat')
    this.draw()
  }

  this.draw = function () {
    var step = (Math.PI * 2) / this.slices
    var cx = conf.src.width / 2
    var width = conf.src.width || conf.src.videoWidth
    var height = conf.src.height || conf.src.videoHeight
    var scale = conf.zoom * (conf.radius / Math.min(width, height))
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

  conf.src.addEventListener('load', function () {
    _self.init()
  })

  return this
}
