# Changes

## 1.0.0 2026-11-21

First entry of this change log. Earlier versions are on npm and in the git history.

* Seneca 4: the peer dependency is `seneca` `^4.0.0`. Seneca 3 users stay on `@seneca/evervault-provider@0.3`.
* The entity peer is `@seneca/entity` `^29.0.0`, replacing `seneca-entity`. The `seneca-promisify` peer is removed, because Seneca 4 has it built in.
* Peers `@seneca/provider` `^5.0.0` and `@seneca/env` `^0.6.0`, the Seneca 4 releases.
* Node.js 24 or later (`engines.node` `>=24`).
* The plugin no longer imports `gubu`, which it never declared: its option defaults are built with the `valid` builders that Seneca passes in, and the `config` option stays an open object that is passed to the Evervault SDK.
* The tests load `@seneca/entity`, `@seneca/env` and `@seneca/provider` by full name, without `promisify`, and set placeholder `EVERVAULT_APP_ID` and `EVERVAULT_API_KEY` values when none are set, so they run without credentials. They make no Evervault call.
* Tested offline only; live calls to the Evervault API were not tested on Seneca 4.
