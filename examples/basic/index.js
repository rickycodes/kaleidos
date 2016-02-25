/*global Image*/
const Kaleidos = require('../../')
const image = new Image()
image.src = 'http://i.imgur.com/YaZJZac.jpg'
const kaleidos = new Kaleidos({
  src: image
})
document.body.appendChild(kaleidos.domElement)
console.log(kaleidos)
