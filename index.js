'use strict';

var Promise = require('bluebird');
var gulp = require('gulp');
var versionBump = require('./lib/bump');
var versionTag = require('./lib/tag');
var gitCommit = require('./lib/git-commit');
var gitPush = require('./lib/git-push');

exports = module.exports = function (opts) {
  if (!opts || typeof opts !== 'object') opts = {}
  if (typeof opts.currentVer === 'undefined') opts.currentVer = 'Not supplied';
  if (typeof opts.logger === 'undefined') opts.logger = console;
  var verBumped = false;
  var push = function (done) {
    return versionBump(gulp, opts.currentVer, opts.logger)
      .then(function (bumped){
        verBumped = bumped
        return gitCommit(opts.logger, verBumped, opts.currentVer)
      })
      .then(function () {
        if (verBumped) {
          return versionTag(gulp, opts.logger);
        } else {
          return Promise.resolve(false);
        }
      })
      .then(function () {
        return gitPush(opts.logger);
      })
      .then(function () {
        done();
        return null;
      })
      .catch(function (err) {
        opts.logger.error(err);
        done();
      });
  };
  return push;
};
