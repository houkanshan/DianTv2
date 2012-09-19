// Global require config
require.config({
    baseUrl: './',
    paths: {
        // Lib
        // here define the module name of jquery, 
        // it couldn't be any other name since jquery define it in Line 9298
        'jquery': 'lib/jquery',
        'spine': 'lib/spine',
        'spine.route': 'lib/route',
        'handlebars': 'lib/handlebars',

        // Mod
        'app': 'application',
        'controller': 'application/controller',
        'model': 'application/model'
    },
    shim: {
        // spine doesn't support AMD, so define it here to let Global var
        // to be the exports 
        spine: {
            deps: ['jquery'],
            exports: 'Spine'
        },
        handlebars: {
            deps: [],
            exports: 'handlebars'
        }
    }
});

var debugOn = true;

// run application
require(['jquery'], function($) {
    if (debugOn) {
        // auto refresh page for debug
        require(['lib/live.js']);
    }

    require(['application/diantv'], function(DianTv) {
        // run !
        new DianTv();
    });
});

