/*global Image*/
const Kaleidos = require('../../')
const image = new Image()
const canvas = document.createElement('canvas')

image.src = 'http://i.imgur.com/YaZJZac.jpg'

const kaleidos = new Kaleidos(canvas, {
  src: image,
  radius: document.body.clientWidth / 1.6
})

image.addEventListener('load', function () {
  document.body.appendChild(kaleidos.canvas)
  kaleidos.initialize()
})

console.log(kaleidos)
