/**
* RequireJS Optimizer Configuration
* Author:       Edison
* Description:  Please use relative path to setup corresponding
*               modules to minify them together
* Date:         06/26/2013
**/
({
    baseUrl: "../../js",
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
    },
    name: "main",
    out: "../../js/all.js"
})