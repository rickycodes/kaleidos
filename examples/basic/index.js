/*global Image*/
const Kaleidos = require('../../')
const image = new Image()
image.src = 'http://i.imgur.com/YaZJZac.jpg'
const kaleidos = new Kaleidos({
  src: image
})
image.addEventListener('load', function () {
  kaleidos.init()
  document.body.appendChild(kaleidos.domElement)
})
console.log(kaleidos)
