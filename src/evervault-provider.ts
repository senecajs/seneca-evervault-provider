/* Copyright © 2022 Seneca Project Contributors, MIT License. */


import type Seneca from 'seneca'

const Pkg = require('../package.json')

const Evervault = require('@evervault/sdk')



type EvervaultProviderOptions = {
  debug: boolean,
  config: any
}


function EvervaultProvider(this: any, options: EvervaultProviderOptions) {
  const seneca: any = this

  const entityBuilder = this.export('provider/entityBuilder')


  seneca
    .message('sys:provider,provider:evervault,get:info', get_info)


  async function get_info(this: any, _msg: any) {
    return {
      ok: true,
      name: 'evervault',
      version: Pkg.version,
      sdk: {
        name: 'evervault',
        version: Pkg.dependencies['@evervault/sdk'],
      }
    }
  }


  entityBuilder(this, {
    provider: {
      name: 'evervault'
    },
    entity: {
    }
  })

  seneca.prepare(async function(this: any) {
    let seneca = this

    let res =
      await seneca.post('sys:provider,get:keymap,provider:evervault')

    if (!res.ok) {
      this.fail('evervault-missing-keymap', res)
    }

    // let app_id = res.keymap.app_id.value
    let api_key = res.keymap.api_key.value

    seneca.shared.sdk = new Evervault(api_key, options.config)
  })


  return {
    exports: {
      sdk: () => this.shared.sdk
    }
  }
}


// Default options, built with the validator that Seneca passes in.
const defaults = ({ valid }: { valid: Seneca.Instance['valid'] }) => ({

  // TODO: Enable debug logging
  debug: false,

  // Passed straight to the Evervault SDK client, so any keys are allowed.
  config: valid.Open({}),
})


Object.assign(EvervaultProvider, { defaults })

export default EvervaultProvider

if ('undefined' !== typeof (module)) {
  module.exports = EvervaultProvider
}
