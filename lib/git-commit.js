'use strict';

// var Promise = require('bluebird');
var psEach = require('./ps-each');
var inquirer = require('inquirer');
exports = module.exports = function (logger, bumped, currentVer) {
  var log = logger || console;
  return inquirer.prompt({type: 'input', name: 'gitmessage', message: 'Pushing to git origin. Commit message:'})
    .then(function (res) {
      var message = ''
      if (res.gitmessage === '' && bumped) {
        message = 'Bumping from ' + currentVer
        log.info(message);
      } else {
        message = res.gitmessage
      }
      if (message !== '') {
        return psEach([
          'git add .',
          'git commit -m "' + message + '"',
        ]);
      } else {
        log.info('No bump and no commit message. Skipping commit.');
        return Promise.resolve();
      }
    });
};