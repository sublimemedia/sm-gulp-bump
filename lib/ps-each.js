'use strict';
var exPs = require('./exps');
var Promise = require('bluebird');
exports = module.exports = function (commandArray, logger) {
  var log = logger || console;
  var msWait = 5000;
  return Promise.each(commandArray,
    function (command) {
      if (command.indexOf('msWait') > -1) {
        msWait = command.split(':')[1] - 0;
        Promise.resolve(0);
      } else {
        var milliseconds = msWait;
        msWait = 5000;
        return exPs(command + ' 2>&1 | write-host', milliseconds, log);
      }
    }
  );
};
