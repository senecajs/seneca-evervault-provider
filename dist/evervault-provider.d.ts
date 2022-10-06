declare type EvervaultProviderOptions = {
    debug: boolean;
};
declare function EvervaultProvider(this: any, options: EvervaultProviderOptions): {
    exports: {
        sdk: () => any;
    };
};
export default EvervaultProvider;
