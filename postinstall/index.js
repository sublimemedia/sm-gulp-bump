'use strict'
const gentlyCopy = require('gently-copy')
const path = require('path')
const fs = require('fs')
const filesToCopy = ['./files/gulpfile.js', './files/Ω-git-bump-push.bat']

// User's local directory
const userPath = process.env.INIT_CWD
const pkgPath = path.join(userPath, '/package.json')
const pkg = require(pkgPath)
pkg.scripts.push = 'gulp push'
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

// Moving files to user's local directory
gentlyCopy(filesToCopy, userPath, { overwrite: true })
