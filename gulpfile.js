'use strict'
var gulp = require('gulp')
var pkg = require('./package.json')
gulp.task(
  'push',
  require('./index')(pkg.version)
)
