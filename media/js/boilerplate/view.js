/**
* View Name
* Author:       Developer Name
* Description:  Lorem ipsum dolor sit amet, consectetur
*               adipisicing elit, sed do eiusmod tempor incididunt
*               ut labore et dolore magna aliqua. Ut enim ad minim veniam.
* Date:         mm/dd/yyyy
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/login/loginTemplate.html'
], function($, _, Backbone, loginTemplate) {

    var LoginView = Backbone.View.extend({
        el: '#cg-admin-wrapper',

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.append(loginTemplate);
        }
    });

    return LoginView;
});
