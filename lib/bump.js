'use strict'
const gulpBump = require('gulp-bump')
// var Promise = require('bluebird');
const inquirer = require('inquirer')
exports = module.exports = function (gulp, currentVer, logger) {
  const log = logger || console
  return inquirer
    .prompt({
      type: 'list',
      name: 'bumptype',
      message:
        'Current version is ' +
        currentVer +
        '. What type of version bump would you like to do?',
      choices: ['none', 'patch', 'minor', 'major'],
      default: 'none'
    })
    .then(function (res) {
      if (res.bumptype === 'none') {
        log.info('Skipping bump.')
        return Promise.resolve(false)
      } else {
        return new Promise(function (resolve, reject) {
          log.info('Bumping ' + res.bumptype + ' version.')
          gulp
            .src(['./package.json'])
            .pipe(gulpBump({ type: res.bumptype }))
            .pipe(gulp.dest('./'))
            .on('error', function (err) {
              log.error('Error bumping version: ', err)
              reject(err)
            })
            .on('end', function () {
              resolve(true)
            })
        })
      }
    })
}
