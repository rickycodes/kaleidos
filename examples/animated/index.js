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

const render = function () {
  var time = new Date().getTime() * 0.0002
  var delta = tr - kaleidos.offsetRotation
  var theta = Math.atan2(Math.sin(delta), Math.cos(delta))
  tx = Math.sin(time) * 2000 + 3000
  ty = Math.cos(time * 0.9) * 2000 + 3000
  kaleidos.offsetX += (tx - kaleidos.offsetX) * options.ease
  kaleidos.offsetY += (ty - kaleidos.offsetY) * options.ease
  kaleidos.offsetRotation += (theta - kaleidos.offsetRotation) * options.ease
  kaleidos.draw()
  requestAnimationFrame(render)
}

document.body.appendChild(kaleidos.domElement)
render()
console.log(kaleidos)
