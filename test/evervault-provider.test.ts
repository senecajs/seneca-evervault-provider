/* Copyright © 2022 Seneca Project Contributors, MIT License. */

import * as Fs from 'fs'


const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')

import EvervaultProvider from '../src/evervault-provider'
import EvervaultProviderDoc from '../src/EvervaultProvider-doc'

const BasicMessages = require('./basic.messages.js')


// Only run some tests locally (not on Github Actions).
let Config = undefined
if (Fs.existsSync(__dirname + '/local-config.js')) {
  Config = require('./local-config')
}


describe('evervault-provider', () => {

  test('happy', async () => {
    expect(EvervaultProvider).toBeDefined()
    expect(EvervaultProviderDoc).toBeDefined()

    const seneca = await makeSeneca()
    let sdk = seneca.export('EvervaultProvider/sdk')()
    expect(sdk).toBeDefined()

    expect(await seneca.post('sys:provider,provider:evervault,get:info'))
      .toMatchObject({
        ok: true,
        name: 'evervault',
      })
  })


  test('messages', async () => {
    const seneca = await makeSeneca()
    await (SenecaMsgTest(seneca, BasicMessages)())
  })


})


async function makeSeneca() {
  const seneca = Seneca({ legacy: false })
    .test()
    .use('promisify')
    .use('entity')
    .use('env', {
      // debug: true,
      file: [__dirname + '/local-env.js;?'],
      var: {
        $EVERVAULT_APP_ID: String,
        $EVERVAULT_API_KEY: String,
      }
    })
    .use('provider', {
      provider: {
        evervault: {
          keys: {
            app_id: { value: '$EVERVAULT_APP_ID' },
            api_key: { value: '$EVERVAULT_API_KEY' },
          }
        }
      }
    })
    .use(EvervaultProvider)

  return seneca.ready()
}

