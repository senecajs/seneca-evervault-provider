"use strict";
/* Copyright © 2022 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
const gubu_1 = require("gubu");
const Pkg = require('../package.json');
const Evervault = require('@evervault/sdk');
function EvervaultProvider(options) {
    const seneca = this;
    const entityBuilder = this.export('provider/entityBuilder');
    seneca
        .message('sys:provider,provider:evervault,get:info', get_info);
    async function get_info(_msg) {
        return {
            ok: true,
            name: 'evervault',
            version: Pkg.version,
            sdk: {
                name: 'evervault',
                version: Pkg.dependencies['@evervault/sdk'],
            }
        };
    }
    entityBuilder(this, {
        provider: {
            name: 'evervault'
        },
        entity: {}
    });
    seneca.prepare(async function () {
        let seneca = this;
        let res = await seneca.post('sys:provider,get:keymap,provider:evervault');
        if (!res.ok) {
            this.fail('evervault-missing-keymap', res);
        }
        let app_id = res.keymap.app_id.value;
        let api_key = res.keymap.api_key.value;
        seneca.shared.sdk = new Evervault(api_key, options.config);
    });
    return {
        exports: {
            sdk: () => this.shared.sdk
        }
    };
}
// Default options.
const defaults = {
    // TODO: Enable debug logging
    debug: false,
    config: (0, gubu_1.Open)({}),
};
Object.assign(EvervaultProvider, { defaults });
exports.default = EvervaultProvider;
if ('undefined' !== typeof (module)) {
    module.exports = EvervaultProvider;
}
//# sourceMappingURL=evervault-provider.js.map