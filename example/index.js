var opts = {
  src: 'http://i.imgur.com/YaZJZac.jpg',
  interactive: false,
  offsetRotation: 0.0,
  offsetScale: 1.0,
  offsetX: 0.0,
  offsetY: 0.0,
  radius: 800,
  slices: Math.round(Math.random() * 40) + 4,
  zoom: 0.4,
  ease: 0.2
}
var k = require('../')(opts)
console.log(k)
