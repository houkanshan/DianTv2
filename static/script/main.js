// Global require config
require.config({
    baseUrl: './',
    paths: {
        // here define the module name of jquery, 
        // it couldn't be any other name since jquery define it in Line 9298
        jquery: 'lib/jquery',
        spine: 'lib/spine',
        app: 'application'
    },
    shim: {
        // spine doesn't support AMD, so define it here to let Global var
        // to be the exports 
        spine: {
            deps: ['jquery'],
            exports: 'Spine'
        }
    }
});


// run application
require(['jquery'], function($){
    require(['application/diantv'], function(DianTv){
        DianTv.init();
    });
});
