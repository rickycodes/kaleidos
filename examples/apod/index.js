/*global Image XMLHttpRequest*/
var Kaleidos = require('../../')
var amount = 40
var api_key = 'ZeHs1xlBAtEBIAhcvT2aN6puHvknYEh9rcquGhLE'
var apod_url = 'https://api.nasa.gov/planetary/apod?api_key=' + api_key + '&date='
var html
var body
var overlay
var overlay_content
var overlay_bg
var content

function qs (selector) {
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
    '?api_key="' + api_key + '" /><p>',
    data.explanation,
    '</div>'
  ].join('')
}

function getPageHeight () {
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight, html.offsetHeight
  ) + 'px'
}

function toggleOverlay (event) {
  event.preventDefault()
  var toggleClass = 'overlay-enabled'
  body.classList.toggle(toggleClass)
  if (body.classList.contains(toggleClass)) {
    overlay_content.innerHTML = this.dataset.overlay
    overlay.style.height = getPageHeight()
    body.scrollTop = 0
  }
}

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
        content.appendChild(a)
        kaleidos.init()
      })
    }
  }

  request.onerror = function () {
  }

  request.send()
}

function init () {
  body = document.body
  html = document.documentElement
  var close = qs('.close')
  overlay = qs('.overlay')
  overlay_content = qs('.overlay .wrap div')
  content = qs('.content')
  overlay_bg = qs('.bg')
  close.addEventListener('click', toggleOverlay)
  overlay_bg.addEventListener('click', toggleOverlay)
  body.style.overflow = 'visible'
  for (var i = 0; i < amount; i++) {
    getPhoto(apod_url + randomDate())
  }
}

init()
