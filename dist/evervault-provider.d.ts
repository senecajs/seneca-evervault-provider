type EvervaultProviderOptions = {
    sdk?: Record<string, any>;
    test?: boolean;
    testopts?: Record<string, any>;
};
declare function EvervaultProvider(this: any, options: EvervaultProviderOptions): {
    exports: {
        sdk: () => any;
    };
};
export default EvervaultProvider;
