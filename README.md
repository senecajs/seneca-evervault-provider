![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](http://senecajs.org) plugin

# @seneca/evervault-provider

[![npm version](https://img.shields.io/npm/v/@seneca/evervault-provider.svg)](https://npmjs.com/package/@seneca/evervault-provider)
[![build](https://github.com/senecajs/seneca-evervault-provider/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-evervault-provider/actions/workflows/build.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-evervault-provider/badge.svg)](https://snyk.io/test/github/senecajs/seneca-evervault-provider)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-evervault-provider/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-evervault-provider?branch=main)
[![Maintainability](https://api.codeclimate.com/v1/badges/f76e83896b731bb5d609/maintainability)](https://codeclimate.com/github/senecajs/seneca-evervault-provider/maintainability)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|

## Quick Example


```js

// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca()
  // Get API keys using the seneca-env plugin
  .use('env', {
    var: {
      $EVERVAULT_APIKEY: String,
      $EVERVAULT_USERTOKEN: String,
    }
  })
  .use('provider', {
    provider: {
      evervault: {
        keys: {
          apikey: { value: '$EVERVAULT_APIKEY' },
          usertoken: { value: '$EVERVAULT_USERTOKEN' },
        }
      }
    }
  })
  .use('evervault-provider')

let board = await seneca.entity('provider/evervault/board')
  .load$('<evervault-board-id>')

Console.log('BOARD', board)

board.desc = 'New description'
board = await board.save$()

Console.log('UPDATED BOARD', board)

```

## Install

```sh
$ npm install @seneca/evervault-provider @seneca/env
```



<!--START:options-->

## Quick Example

```js

// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca()
  // Get API keys using the seneca-env plugin
  .use('env', {
    var: {
      $EVERVAULT_APIKEY: String,
      $EVERVAULT_USERTOKEN: String,
    }
  })
  .use('provider', {
    provider: {
      evervault: {
        keys: {
          apikey: { value: '$EVERVAULT_APIKEY' },
          usertoken: { value: '$EVERVAULT_USERTOKEN' },
        }
      }
    }
  })
  .use('evervault-provider')

let board = await seneca.entity('provider/evervault/board')
  .load$('<evervault-board-id>')

Console.log('BOARD', board)

board.desc = 'New description'
board = await board.save$()

Console.log('UPDATED BOARD', board)

```

## More Examples

See [test/](test/) for more usage examples.

## Motivation

A [Seneca.js](http://senecajs.org) plugin.

## Support

If you're using this module and need help, you can:

- Post a [github issue](https://github.com/senecajs/seneca-evervault-provider/issues)
- Tweet to [@senecajs](http://twitter.com/senecajs)
- Ask on the [Gitter](https://gitter.im/senecajs/seneca)

## API

### Options

* `debug` : boolean <i><small>false</small></i>


Set plugin options when loading with:
```js


seneca.use('EvervaultProvider', { name: value, ... })


```


<small>Note: <code>foo.bar</code> in the list above means 
<code>{ foo: { bar: ... } }</code></small> 



<!--END:options-->

<!--START:action-list-->

### Action Patterns

* [role:entity,base:evervault,cmd:load,name:repo,zone:provider](#-roleentitybaseevervaultcmdloadnamerepozoneprovider-)
* [role:entity,base:evervault,cmd:save,name:repo,zone:provider](#-roleentitybaseevervaultcmdsavenamerepozoneprovider-)
* [sys:provider,get:info,provider:evervault](#-sysprovidergetinfoproviderevervault-)


<!--END:action-list-->

<!--START:action-desc-->

### Action Descriptions

### &laquo; `role:entity,base:evervault,cmd:load,name:repo,zone:provider` &raquo;

Load Evervault repository data into an entity.



----------
### &laquo; `role:entity,base:evervault,cmd:save,name:repo,zone:provider` &raquo;

Update Evervault repository data from an entity.



----------
### &laquo; `sys:provider,get:info,provider:evervault` &raquo;

Get information about the provider.



----------


<!--END:action-desc-->

## Contributing

The [Senecajs org](https://github.com/senecajs/) encourages open participation. If you feel you can help in any way, be it with documentation, examples, extra testing, or new features please get in touch.

### Running tests

```sh
npm run test
```

## Background

Part of the [Senecajs org](https://github.com/senecajs/).
