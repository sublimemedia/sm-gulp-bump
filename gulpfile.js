'use strict'
var gulp = require('gulp')
var pkg = require('./package.json')
gulp.task(
  'push',
  // require('sm-gulp-bump')({ currentVer: pkg.version })
  require('./index')({ currentVer: pkg.version })
)
