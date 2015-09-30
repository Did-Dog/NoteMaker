require.config({
    shim:{
        jquery: {
            exports: "$"
        },
        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: 'scripts/lib/jquery.min',
        "jquery-ui": "scripts/lib/jquery-ui-1.11.4/jquery-ui.min",
        underscore: 'scripts/lib/underscore.min',
        backbone: 'scripts/lib/backbone.min',
        text: 'scripts/lib/text',
        QUnit: 'http://code.jquery.com/qunit/qunit-1.11.0.js'
    }
});

require(['main'], function(Main){
    Main.initialize();

});