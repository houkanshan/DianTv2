var debugOn = true;
// Global require config
require.config({
    baseUrl: '.',
    paths: {
        // Lib
        // here define the module name of jquery, 
        // it couldn't be any other name since jquery define it in Line 9298
        'jquery': 'lib/jquery',
        'spine': 'lib/spine',
        'route': 'lib/route',
        'handlebars': 'lib/handlebars',
        'dcss': 'lib/dcss/dcss',

        // Mod
        'app': 'application',
        'controller': 'application/controller',
        'model': 'application/model',
        'widget': 'application/widget'
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
            exports: 'Handlebars'
        },
        route: {
            deps: ['spine'],
            exports: 'route'
        }
    }
});


// run application
require(['jquery', 'script/lang'], function($) {
    if (debugOn) {
        // auto refresh page for debug
        require(['lib/live.js']);
    }

    require(['application/diantv'], function(DianTv) {
        // run !
        $(document).ready(function(){
            new DianTv();
        });
    });
});

