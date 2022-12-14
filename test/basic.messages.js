/* Copyright © 2022 Seneca Project Contributors, MIT License. */

const Pkg = require('../package.json')

module.exports = {
  print: false,
  pattern: 'sys:provider,provider:evervault',
  allow: { missing: true },

  calls: [
    {
      pattern: 'get:info',
      out: {
        ok: true,
        name: 'evervault',
        version: Pkg.version,
        sdk: {
          name: 'evervault',
          version: Pkg.dependencies['@evervault/sdk'],
        }
      },
    }
  ]
}
