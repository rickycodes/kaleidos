/*global requestAnimationFrame*/
const Kaleidos = require('../../')
const options = {
  offsetX: 0,
  offsetY: 0,
  offsetRotation: 0,
  slices: Math.round(Math.random() * 20) + 4,
  ease: 0.1
}
var hash
var kaleidos
var video
var tx = options.offsetX
var ty = options.offsetY
var tr = options.offsetRotation

function onmousemoved (event) {
  var dx = event.pageX / window.innerWidth
  var dy = event.pageY / window.innerHeight
  if (event.type === 'touchmove') {
    if (event.touches.length === 1) {
      var touch = event.touches[0]
      dx = touch.clientX / window.innerWidth
      dy = touch.clientY / window.innerHeight
    }
  }
  var hx = dx - 0.5
  var hy = dy - 0.5
  tx = hx * kaleidos.radius * -2
  ty = hy * kaleidos.radius * 2
  return
}

const render = function () {
  var delta, theta
  if (hash[1] === 'auto') {
    var time = new Date().getTime() * 0.0002
    delta = tr - kaleidos.offsetRotation
    theta = Math.atan2(Math.sin(delta), Math.cos(delta))
    tx = Math.sin(time) * 2000 + 3000
    ty = Math.cos(time * 0.9) * 2000 + 3000
  } else {
    delta = tr - kaleidos.offsetRotation
    theta = Math.atan2(Math.sin(delta), Math.cos(delta))
  }
  kaleidos.offsetX += (tx - kaleidos.offsetX) * options.ease
  kaleidos.offsetY += (ty - kaleidos.offsetY) * options.ease
  kaleidos.offsetRotation += (theta - kaleidos.offsetRotation) * options.ease
  requestAnimationFrame(render)
  kaleidos.context.fillStyle = kaleidos.context.createPattern(video, 'repeat')
  kaleidos.draw()
}

function init () {
  if (kaleidos && kaleidos.domElement !== undefined) {
    document.body.removeChild(kaleidos.domElement)
  }
  hash = window.location.hash.replace('#', '').split(';')
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
  window.URL = window.URL || window.webkitURL

  if (!navigator.getUserMedia) {
    return
  } else {
    navigator.getUserMedia({
      video: { width: 1280, height: 720 }
    }, function (stream) {
      video = document.createElement('video')
      video.autoplay = true
      video.src = (window.URL) ? window.URL.createObjectURL(stream) : stream

      options.src = video
      kaleidos = new Kaleidos(options)
      try {
        kaleidos.init()
      } catch (error) {
        console.log(error)
      }

      if (hash[1] !== 'auto') {
        window.addEventListener('mousemove', onmousemoved)
        window.addEventListener('touchmove', onmousemoved)
      }
      document.body.appendChild(kaleidos.domElement)
      render()
    }, function (error) {
      console.log(error)
    })
  }
}

window.addEventListener('load', init)
window.addEventListener('hashchange', init)
