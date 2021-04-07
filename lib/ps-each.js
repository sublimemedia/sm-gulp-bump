'use strict'
const exPs = require('./exps')
// var Promise = require('bluebird');
Promise.each = async function (arr, fn) {
  // take an array and a function
  for (const item of arr) await fn(item)
}
exports = module.exports = function (commandArray, logger) {
  const log = logger || console
  let msWait = 5000
  return Promise.each(commandArray, function (command) {
    if (command.indexOf('msWait') > -1) {
      msWait = command.split(':')[1] - 0
      Promise.resolve(0)
    } else {
      const milliseconds = msWait
      msWait = 5000
      return exPs(command + ' 2>&1 | write-host', milliseconds, log)
    }
  })
}
