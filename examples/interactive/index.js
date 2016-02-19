/*global requestAnimationFrame*/
const Kaleidos = require('../../')
const conf = {
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
const kaleidos = new Kaleidos(conf)
var tx = conf.offsetX
var ty = conf.offsetY
var tr = conf.offsetRotation

function onmousemoved (event) {
  var dx = event.pageX / window.innerWidth
  var dy = event.pageY / window.innerHeight
  var hx = dx - 0.5
  var hy = dy - 0.5
  tx = hx * kaleidos.radius * -2
  ty = hy * kaleidos.radius * 2
  return
}

const render = function () {
  var delta = tr - kaleidos.offsetRotation
  var theta = Math.atan2(Math.sin(delta), Math.cos(delta))
  kaleidos.offsetX += (tx - kaleidos.offsetX) * conf.ease
  kaleidos.offsetY += (ty - kaleidos.offsetY) * conf.ease
  kaleidos.offsetRotation += (theta - kaleidos.offsetRotation) * conf.ease
  kaleidos.draw()
  requestAnimationFrame(render)
}

window.addEventListener('mousemove', onmousemoved)
document.body.appendChild(kaleidos.domElement)
render()
console.log(kaleidos)
