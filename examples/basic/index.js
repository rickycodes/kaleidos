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
kaleidos.draw()
document.body.appendChild(kaleidos.domElement)
console.log(kaleidos)
