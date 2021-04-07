'use strict'

// var Promise = require('bluebird');
const gulp = require('gulp')
const versionBump = require('./lib/bump')
const versionTag = require('./lib/tag')
const gitCommit = require('./lib/git-commit')
const gitPush = require('./lib/git-push')

exports = module.exports = function (opts) {
  if (!opts || typeof opts !== 'object') opts = {}
  if (typeof opts.currentVer === 'undefined') opts.currentVer = 'Not supplied'
  if (typeof opts.logger === 'undefined') opts.logger = console
  let verBumped = false
  const push = function (done) {
    return versionBump(gulp, opts.currentVer, opts.logger)
      .then(function (bumped) {
        verBumped = bumped
        return gitCommit(opts.logger, verBumped, opts.currentVer)
      })
      .then(function () {
        if (verBumped) {
          return versionTag(gulp, opts.logger)
        } else {
          return Promise.resolve(false)
        }
      })
      .then(function () {
        return gitPush(opts.logger)
      })
      .then(function () {
        done()
        return null
      })
      .catch(function (err) {
        opts.logger.error(err)
        done()
      })
  }
  return push
}
