'use strict'
const psEach = require('./ps-each')
const inquirer = require('inquirer')
exports = module.exports = function (bumped, logger) {
  const log = logger || console
  const cmds = ['git push origin']
  if (bumped) {
    cmds.push('git push origin --tags')
  }
  log.info('Pushing to remote branch.')
  return psEach(cmds)
}
