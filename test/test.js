/*global Image */
const test = require('tape')
const Kaleidos = require('../')

const image = new Image()
image.src = 'http://i.imgur.com/YaZJZac.jpg'

const kaleidos = new Kaleidos({
  src: image,
  slices: Math.round(Math.random() * 20) + 4
})

test('offsetRotation should update', function (t) {
  t.plan(1)
  var value = 0.4
  kaleidos.offsetRotation = value
  t.strictEqual(kaleidos.offsetRotation, value)
})

test('offsetX should update', function (t) {
  t.plan(1)
  var initial = kaleidos.offsetX
  var value = 0.4
  kaleidos.offsetX += value
  t.strictEqual(kaleidos.offsetX, initial + value)
})

test('offsetY should update', function (t) {
  t.plan(1)
  var initial = kaleidos.offsetY
  var value = 0.8
  kaleidos.offsetY += value
  t.strictEqual(kaleidos.offsetY, initial + value)
})

test('slices should be even', function (t) {
  t.plan(1)
  var k = new Kaleidos({
    src: image,
    slices: 5
  })
  t.strictEqual(k.slices % 2, 0)
})

test('default className should be set', function (t) {
  t.plan(1)
  t.strictEqual(kaleidos.className, 'kaleidos')
})

test('className should be customizable', function (t) {
  t.plan(1)
  var k = new Kaleidos({
    src: image,
    className: 'custom'
  })
  t.strictEqual(k.className, 'custom')
})

test('style should be truthy', function (t) {
  t.plan(1)
  t.strictEqual(kaleidos.style, true)
})

test('style should update', function (t) {
  t.plan(1)
  var k = new Kaleidos({
    src: image,
    className: 'custom',
    style: false
  })
  t.strictEqual(k.style, false)
})
