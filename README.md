### Kaleidos  
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

// instantiate
const kaleidos = new Kaleidos({
  src: image // pass above image as source
})
```

##### Append to DOM:
```js
document.body.appendChild(kaleidos.domElement)
```

##### Result:
![kaleidos](http://i.imgur.com/n4O7JXn.jpg)

*Check the <a href='https://github.com/rickycodes/kaleidos/tree/master/examples'>`/examples`</a>  
<a target='_blank' href='https://rickycodes.github.io/kaleidos/'>Try them out</a>*

#### TODO:
~~Add tests~~  
Add _more_ tests  
Add more examples  
Make examples better on mobile  
~~Fix webcam example in Firefox~~  
~~Update src to be image _or_ video~~  
~~Cleanup~~
