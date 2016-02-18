var conf = {
  className: 'kaleidos',
  src: 'http://i.imgur.com/YaZJZac.jpg',
  offsetRotation: 0,
  offsetScale: 1,
  offsetX: 0,
  offsetY: 0,
  radius: 800,
  slices: Math.round(Math.random() * 20) + 4,
  zoom: 0.4,
  ease: 0.1
}
var tx = conf.offsetX
var ty = conf.offsetY
var tr = conf.offsetRotation
var kaleidos = require('../')(conf)

const render = function () {
  var time = new Date().getTime() * 0.0002
  var delta = tr - kaleidos.offsetRotation
  var theta = Math.atan2(Math.sin(delta), Math.cos(delta))
  tx = Math.sin(time) * 2000 + 3000
  ty = Math.cos(time * 0.9) * 2000 + 3000
  kaleidos.offsetX += (tx - kaleidos.offsetX) * conf.ease
  kaleidos.offsetY += (ty - kaleidos.offsetY) * conf.ease
  kaleidos.offsetRotation += (theta - kaleidos.offsetRotation) * conf.ease
  kaleidos.draw()
  requestAnimationFrame(render)
}

document.body.appendChild(kaleidos.domElement)
render()
console.log(kaleidos)
