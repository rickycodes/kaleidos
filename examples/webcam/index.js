/*global requestAnimationFrame*/
const Kaleidos = require('../../')
const conf = {
  className: 'kaleidos',
  offsetRotation: 0,
  offsetScale: 1,
  offsetX: 0,
  offsetY: 0,
  radius: 800,
  slices: Math.round(Math.random() * 20) + 4,
  zoom: 0.4,
  ease: 0.1
}
var kaleidos
var video
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
  kaleidos.context.fillStyle = kaleidos.context.createPattern(video, 'repeat')
  kaleidos.draw()
  requestAnimationFrame(render)
}

function init () {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
  window.URL = window.URL || window.webkitURL

  if (!navigator.getUserMedia) {
    return
  } else {
    navigator.getUserMedia({
      video: true
    }, function (stream) {
      video = document.createElement('video')
      video.autoplay = true
      video.src = (window.URL) ? window.URL.createObjectURL(stream) : stream

      kaleidos = new Kaleidos(conf)
      kaleidos.init()

      window.addEventListener('mousemove', onmousemoved)
      document.body.appendChild(kaleidos.domElement)
      render()
    }, function (error) {
      console.log(error)
    })
  }
}

init()
