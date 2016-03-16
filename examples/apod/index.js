/*global Image XMLHttpRequest*/
const Kaleidos = require('../../')
const amount = 40
const apodUrl = 'https://api.nasa.gov/planetary/apod?api_key=ZeHs1xlBAtEBIAhcvT2aN6puHvknYEh9rcquGhLE&date='

function randomDate () {
  var start = new Date(1996, 6, 16)
  var end = new Date()
  var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().substring(0, 10)
}

function getPhoto (url) {
  var request = new XMLHttpRequest()
  request.open('GET', url, true)

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText)
      var image = new Image()
      image.src = data.url
      var kaleidos = new Kaleidos({
        className: data.url,
        radius: 400,
        src: image,
        slices: Math.round(Math.random() * 80) + 4,
        style: false
      })

      var a = document.createElement('a')
      a.setAttribute('title', data.title)
      a.setAttribute('target', '_blank')
      a.setAttribute('class', 'mandala')

      a.addEventListener('click', function (event) {
        event.preventDefault()
        var w = window.open('about:blank', data.url)
        var t = [
          '<body style="background:#2B2B2B;">',
          '<div style="padding:20;font-family:sans-serif;color:#F7F7F7;">',
          '<h2>',
          data.title,
          '</h2>',
          '<h3>',
          'Date: ',
          data.date,
          '</h3>',
          '<img style="max-width: 100%;" src="',
          data.hdurl || data.url,
          '?api_key=ZeHs1xlBAtEBIAhcvT2aN6puHvknYEh9rcquGhLE" />',
          '<p>',
          data.explanation,
          '</p>',
          '</div>',
          '</body>'
        ]
        w.document.write(t.join(''))
      })

      a.appendChild(kaleidos.domElement)

      image.addEventListener('load', function () {
        document.body.appendChild(a)
        kaleidos.init()
      })
    }
  }

  request.onerror = function () {
  }

  request.send()
}

function init () {
  document.body.style.overflow = 'visible'
  for (var i = 0; i < amount; i++) {
    getPhoto(apodUrl + randomDate())
  }
}

init()
