/**
* App Module
* Author:       Edison
* Description:  Define a module and call another dependancy module
*               router.js(Router Module) for initialize the page.
* Date:         03/07/2013
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function($, _, Backbone, Router) {
    var initialize = function() {

        // Pass in the Router module and call its initialize function
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});
