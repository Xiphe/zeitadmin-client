'use strict';

const expts = require('./dist/src/');

module.exports = expts.default;

Object.keys(expts).forEach((key) => {
  if (key !== 'default') {
    module.exports[key] = expts[key];
  }
});
