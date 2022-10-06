const Seneca = require('seneca')

Seneca({ legacy: false })
  .test()
  .use('promisify')
  .use('entity')
  .use('env', {
    // debug: true,
    file: [__dirname + '/local-env.js;?'],
    var: {
      EVERVAULT_APP_ID: String,
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
  .use('../')
  .ready(async function() {
    const seneca = this

    console.log('SDK:', seneca.export('EvervaultProvider/sdk')())

    console.log(await seneca.post('sys:provider,provider:evervault,get:info'))
  })

