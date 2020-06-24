'use strict';

var Promise = require('bluebird');
var gulp = require('gulp');
var versionBump = require('./lib/bump');
var versionTag = require('./lib/tag');
var gitCommit = require('./lib/git-commit');
var gitPush = require('./lib/git-push');

exports = module.exports = function (currentVer, logger) {
  var log = logger || console;
  var verBumped = false;
  var push = function (done) {
    return versionBump(gulp, currentVer, log)
      .then(function (bumped){
        verBumped = bumped
        return gitCommit(log, verBumped, currentVer)
      })
      .then(function () {
        if (verBumped) {
          return versionTag(gulp, log);
        } else {
          return Promise.resolve(false);
        }
      })
      .then(function () {
        return gitPush(verBumped, log);
      })
      .then(function () {
        done();
        return null;
      })
      .catch(function (err) {
        log.error(err);
        done();
      });
  };
  return push;
};
