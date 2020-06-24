'use strict';
var psEach = require('./ps-each');
var inquirer = require('inquirer');
exports = module.exports = function (bumped, logger) {
  var log = logger || console;
  var cmds = ['git push origin']
  if (bumped) {
    cmds.push('git push origin --tags')
  }
  log.info('Pushing to remote branch.');
  return psEach(cmds);
};