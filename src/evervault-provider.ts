/* Copyright © 2022 Seneca Project Contributors, MIT License. */


import { Open } from 'gubu'

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


// Default options.
const defaults: EvervaultProviderOptions = {

  // TODO: Enable debug logging
  debug: false,

  config: Open({}),
}


Object.assign(EvervaultProvider, { defaults })

export default EvervaultProvider

if ('undefined' !== typeof (module)) {
  module.exports = EvervaultProvider
}
