'use strict'
const gulp = require('gulp')
const currentVer = require('./package.json').version
const bumpTask = require('sm-gulp-bump')({ currentVer })
gulp.task('push', bumpTask)
