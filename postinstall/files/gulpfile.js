'use strict'
const fs = require('fs')
const gulp = require('gulp')
const pkg = require('./package.json')
const repoOrigin = require('remote-origin-url').sync()
if (repoOrigin) {
  pkg.name = repoOrigin.match(/.+\/(.+)\.git/)[1]
  pkg.repository.url = 'git+' + repoOrigin
  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2))
}
const currentVer = pkg.version
const bumpTask = require('sm-gulp-bump')({ currentVer })
gulp.task('push', bumpTask)
