/*global Image XMLHttpRequest*/
const Kaleidos = require('../../')
const amount = 16
const apodUrl = 'https://api.nasa.gov/planetary/apod?api_key=ZeHs1xlBAtEBIAhcvT2aN6puHvknYEh9rcquGhLE&date='

function randomDate () {
  var start = new Date(1996, 6, 16)
  var end = new Date()
  var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().substring(0, 10)
}

function getPhoto (url) {
  var request = new XMLHttpRequest()
  request.open('GET', url + randomDate(), true)

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText)
      var image = new Image()
      image.src = data.url
      var kaleidos = new Kaleidos({
        className: 'mandala',
        radius: 160,
        src: image,
        slices: Math.round(Math.random() * 20) + 4,
        style: false
      })
      document.body.appendChild(kaleidos.domElement)
    }
  }

  request.onerror = function () {
  }

  request.send()
}

function init () {
  document.body.style.overflow = 'visible'
  for (var i = 0; i < amount; i++) {
    getPhoto(apodUrl)
  }
}

init()
