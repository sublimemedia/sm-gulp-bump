'use strict';
var PSShell = require('node-powershell');
var Promise = require('bluebird');
exports = module.exports = function (command, msWait, logger) {
  var log = logger || console;
  return new Promise(function (resolve, reject) {
    if (!command || typeof (command) !== 'string') {
      reject(new Error('The first argument must be a string.'));
    }
    if (!msWait || typeof (msWait) !== 'number') {
      reject(new Error('The second argument must be a number.'));
    }
    var ps = new PSShell({
      executionPolicy: 'Bypass', verbose: true, noProfile: false
    });
    var timeout;
    if (!msWait) {
      msWait = 5000;
    }
    var execCommand = function (command) {
      ps.addCommand(command)
        .then(function () {
          return ps.invoke();
        })
        .then(function (output) {
          log.info(output);
          return null;
        })
        .catch(function (err) {
          log.error(err);
        });
    };
    ps.streams.stdout.on('data', function (chunk) {
      if (chunk.indexOf('EOI') > -1) {
        // Watch for end of invocation in the event of
        // an error. Only way to determine end of
        // error stream.
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
          ps.dispose();
        }, msWait);
      }
    });
    ps.on('output', function (data) {
      log.info(data);
    });
    ps.on('err', function (err) {
      log.error(err);
    });
    ps.on('end', function (code) {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
    execCommand(command);
  });
};
