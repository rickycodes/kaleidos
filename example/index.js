var opts = {
  src: 'http://i.imgur.com/YaZJZac.jpg',
  animate: true,
  offsetRotation: 0,
  offsetScale: 1,
  offsetX: 0,
  offsetY: 0,
  radius: 800,
  slices: Math.round(Math.random() * 40) + 4,
  zoom: 0.4,
  ease: 0.1
}
var k = require('../')(opts)
console.log(k)
