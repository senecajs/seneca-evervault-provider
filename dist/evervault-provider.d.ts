declare type EvervaultProviderOptions = {
    debug: boolean;
    config: any;
};
declare function EvervaultProvider(this: any, options: EvervaultProviderOptions): {
    exports: {
        sdk: () => any;
    };
};
export default EvervaultProvider;
