/*global Image requestAnimationFrame*/
const Kaleidos = require('../../')
const image = new Image()
image.src = 'http://i.imgur.com/YaZJZac.jpg'
const options = {
  src: image,
  offsetX: 0,
  offsetY: 0,
  offsetRotation: 0,
  slices: Math.round(Math.random() * 20) + 4,
  ease: 0.1
}
const kaleidos = new Kaleidos(options)
var tx = options.offsetX
var ty = options.offsetY
var tr = options.offsetRotation

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
  kaleidos.offsetX += (tx - kaleidos.offsetX) * options.ease
  kaleidos.offsetY += (ty - kaleidos.offsetY) * options.ease
  kaleidos.offsetRotation += (theta - kaleidos.offsetRotation) * options.ease
  kaleidos.draw()
  requestAnimationFrame(render)
}

window.addEventListener('mousemove', onmousemoved)
document.body.appendChild(kaleidos.domElement)
render()
console.log(kaleidos)
