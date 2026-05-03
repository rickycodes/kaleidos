### Kaleidos  

[![Greenkeeper badge](https://badges.greenkeeper.io/rickycodes/kaleidos.svg)](https://greenkeeper.io/)
[![Build Status](https://api.travis-ci.org/rickycodes/kaleidos.svg?branch=master)](https://travis-ci.org/rickycodes/kaleidos/) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![npm-version](https://img.shields.io/npm/v/kaleidos.svg?style=flat)](https://www.npmjs.com/package/kaleidos)  
`<canvas>` kaleidoscope node module for use with browserify, webpack, etc.

#### Usage:
##### Install:
`npm i kaleidos --save`

##### Require the module:
```js
const Kaleidos = require('kaleidos')
```

##### Instantiate with values:
```js
// create image
const image = new Image()
image.src = 'http://i.imgur.com/YaZJZac.jpg'

// create a canvas
const canvas = document.createElement('canvas')

// instantiate
const kaleidos = new Kaleidos(canvas, {
  src: image // pass above image as source
})
```

##### Append to DOM and initialize on image load:
```js
image.addEventListener('load', function () {
  document.body.appendChild(kaleidos.canvas)
  kaleidos.initialize()
})
```

##### Result:
![kaleidos](http://i.imgur.com/n4O7JXn.jpg)

*Check the <a href='https://github.com/rickycodes/kaleidos/tree/master/examples'>`/examples`</a>  
<a target='_blank' href='https://rickycodes.github.io/kaleidos/'>Try them out</a>*

#### TODO:
~~Add tests~~  
Add _more_ tests  
Add more examples  
~~Make examples better on mobile~~  
~~Fix webcam example in Firefox~~  
~~Update src to be image _or_ video~~  
~~Cleanup~~
