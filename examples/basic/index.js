/*global Image*/
const Kaleidos = require('../../')
const image = new Image()
image.src = 'http://i.imgur.com/YaZJZac.jpg'
const kaleidos = new Kaleidos({
  src: image
})
image.addEventListener('load', function () {
  document.body.appendChild(kaleidos.domElement)
  kaleidos.init()
})
console.log(kaleidos)
