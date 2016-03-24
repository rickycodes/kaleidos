/*global Image XMLHttpRequest*/
var Kaleidos = require('../../')
var amount = 40
var api_key = 'ZeHs1xlBAtEBIAhcvT2aN6puHvknYEh9rcquGhLE'
var apod_url = 'https://api.nasa.gov/planetary/apod?api_key=' + api_key + '&date='
var body

function $ (selector) {
  return document.querySelector(selector)
}

function overlayTemplate (data) {
  return [
    '<h2>',
    data.title,
    '</h2><h3>Date: ',
    data.date,
    '</h3><img style="max-width: 100%;" src="',
    data.hdurl || data.url,
    '?api_key=',
    api_key,
    '" /><p>',
    data.explanation,
    '</p>'
  ].join('')
}

function getRandomDate () {
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
        className: 'apod',
        radius: 400,
        src: image,
        slices: Math.round(Math.random() * 20) + 4,
        style: false
      })

      var a = document.createElement('a')
      a.setAttribute('title', data.title)
      a.setAttribute('target', '_blank')
      a.setAttribute('class', 'mandala')
      a.setAttribute('data-overlay', overlayTemplate(data))
      a.addEventListener('click', toggleOverlay)
      a.appendChild(kaleidos.domElement)

      image.addEventListener('load', function () {
        $('.content').appendChild(a)
        kaleidos.init()
      })
    }
  }

  request.onerror = function () {
  }

  request.send()
}

function toggleOverlay (event) {
  event.preventDefault()
  var tcl = event.target.classList
  if (tcl.contains('apod') || tcl.contains('overlay') || tcl.contains('close')) {
    var toggleClass = 'overlay-enabled'
    body.classList.toggle(toggleClass)
    if (body.classList.contains(toggleClass)) {
      $('.overlay .wrap div').innerHTML = this.dataset.overlay
    }
  }
}

function init () {
  body = document.body
  $('.overlay').addEventListener('click', toggleOverlay)
  body.style.overflow = 'visible'
  for (var i = 0; i < amount; i++) {
    getPhoto(apod_url + getRandomDate())
  }
}

init()
