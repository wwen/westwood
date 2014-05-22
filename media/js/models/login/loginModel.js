/**
* Login Model
* Author:       Edison
* Description:  Define a backbone login model
* Date:         02/13/2014
**/

define([
    'jquery-all',
    'underscore',
    'backbone',
    'util'
], function($, _, Backbone, Util) {

    var LoginModel = Backbone.Model.extend({
        urlRoot: 'login',
        defaults: {
            username: '',
            password: ''
        }
    });

    return LoginModel;
});
