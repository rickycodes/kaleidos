/*global Image */
const test = require('tape')
const Kaleidos = require('../')

const image = new Image()
image.src = 'http://i.imgur.com/YaZJZac.jpg'
const conf = {
  className: 'kaleidos',
  src: image,
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
console.log(kaleidos)

test('offsetRotation should update', function (t) {
  t.plan(1)
  var value = 0.4
  kaleidos.offsetRotation = value
  t.equal(kaleidos.offsetRotation, value)
})

test('offsetX should update', function (t) {
  t.plan(1)
  var initial = kaleidos.offsetX
  var value = 0.4
  kaleidos.offsetX += value
  t.equal(kaleidos.offsetX, initial + value)
})

test('offsetY should update', function (t) {
  t.plan(1)
  var initial = kaleidos.offsetY
  var value = 0.8
  kaleidos.offsetY += value
  t.equal(kaleidos.offsetY, initial + value)
})

test('slices should be even', function (t) {
  t.plan(1)
  t.equal(kaleidos.slices % 2, 0)
})
