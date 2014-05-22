/**
* Require.js
* Author:       Edison
* Descritpion:  Configure all the library variables relative to the
*               baseURL which is "media/js/".
* Date:         03/07/2013
**/

require.config({
    paths: {
        'jquery': 'libs/jquery/jquery-min',
        'jquery-ui': 'libs/jquery/jquery-ui-min',
        'jquery-form': 'libs/jquery/jquery-form',
        'jquery-serialize': 'libs/jquery/jquery-serialize',
        'jquery-validate': 'libs/jquery/jquery-validate-min',
        'jquery-validate-methods':
                            'libs/jquery/jquery-validate-additional-method-min',
        'dropzone': 'libs/dropzone/dropzone-amd-module',
        'jquery-all': 'libs/jquery/jquery-all',
        'underscore': 'libs/underscore/underscore-min',
        'backbone': 'libs/backbone/backbone-min',
        'bootstrap': 'libs/bootstrap/bootstrap-min',
        'util': 'libs/util/util',
        'templates': '../templates'
    },
    shim: {
        'jquery-all': {
            exports: '$',
            deps: ['jquery', 'jquery-ui', 'jquery-form',
                    'jquery-serialize', 'jquery-validate', 'bootstrap',
                    'jquery-validate-methods']
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'util': {
            exports: 'Util'
        }
    }
});

// Load the app module and pass it to the definition function
require([
    'app'
], function(App) {

    // Call the initialized function in app.js(App Module)
    App.initialize();

});
