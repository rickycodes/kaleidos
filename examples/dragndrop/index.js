/*global Image FileReader requestAnimationFrame*/
const Kaleidos = require('../../')
const image = new Image()
image.src = 'http://i.imgur.com/YaZJZac.jpg'
const options = {
  src: image,
  offsetX: 0,
  offsetY: 0,
  offsetRotation: 0,
  slices: Math.round(Math.random() * 20) + 4,
  ease: 0.1
}
const kaleidos = new Kaleidos(options)
var dropTarget
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
  var delta = tr - kaleidos.offsetRotation
  var theta = Math.atan2(Math.sin(delta), Math.cos(delta))
  kaleidos.offsetX += (tx - kaleidos.offsetX) * options.ease
  kaleidos.offsetY += (ty - kaleidos.offsetY) * options.ease
  kaleidos.offsetRotation += (theta - kaleidos.offsetRotation) * options.ease
  kaleidos.draw()
  requestAnimationFrame(render)
}

function dragover (event) {
  event.preventDefault()
  dropTarget.style.opacity = 0.4
}

function updateSrc (img, src) {
  img.src = src
  img.addEventListener('load', function () {
    kaleidos.context.fillStyle = kaleidos.context.createPattern(img, 'repeat')
  })
}

function drop (e) {
  e.preventDefault()
  dropTarget.style.opacity = 0
  var reader = new FileReader()
  var dt = e.dataTransfer
  var file = dt.files[0]
  if (dt.getData('URL')) {
    updateSrc(new Image(), dt.getData('URL'))
    return
  }
  reader.addEventListener('load', function (event) {
    updateSrc(new Image(), event.target.result)
  })
  reader.readAsDataURL(file)
}

function init () {
  dropTarget = document.createElement('div')
  dropTarget.setAttribute('class', 'drop')

  var instructions = document.createElement('div')
  instructions.setAttribute('class', 'instructions')
  instructions.textContent = 'Drag an image from your desktop or browser context (or click here)'

  var input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', '.jpg,.jpeg,.gif,.png')

  input.addEventListener('change', function (event) {
    var reader = new FileReader()
    reader.addEventListener('load', function (event) {
      updateSrc(new Image(), event.target.result)
    })
    reader.readAsDataURL(this.files[0])
  })

  instructions.appendChild(input)

  window.addEventListener('mousemove', onmousemoved)
  window.addEventListener('touchmove', onmousemoved)
  image.addEventListener('load', function () {
    document.body.appendChild(instructions)
    document.body.appendChild(dropTarget)
    document.body.appendChild(kaleidos.domElement)
    dropTarget.addEventListener('dragover', dragover, false)
    dropTarget.addEventListener('drop', drop, false)
    kaleidos.init()
  })
  render()
}

init()
