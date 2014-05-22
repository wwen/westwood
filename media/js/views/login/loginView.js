/**
* Login View
* Author:       Edison Li
* Description:  Allow admin user to login and update the inventory
* Date:         02/13/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/login/loginTmpl.html',
    'models/login/loginModel',
    'views/admin/adminView'
], function($, _, Backbone,
    loginTemplate, LoginModel, AdminView) {

    var LoginView = Backbone.View.extend({
        el: '#wrapper',

        events: {
            'click button.btn-primary': 'onclickSubmit',
            'keypress': 'onKeypressSubmit'
        },

        initialize: function() {
            var loginModel = new LoginModel();
            this.model = loginModel;
            this.render();
        },

        render: function() {
            this.$el.html(loginTemplate);
        },

        onKeypressSubmit: function(e) {
            if (e.keyCode === $.ui.keyCode.ENTER) {
                this.onclickSubmit();
            }
        },

        onclickSubmit: function(e) {
            var username = $('#username').val();
            var password = $('#password').val();
            var obj = this;

            this.model.save({'username': username,
                            'password': password}, {
                success: function(model, response, options) {
                    // success
                    var userdata = response;
                    var adminView = new AdminView({model: userdata});
                    obj.$el.html(adminView.el);
                },
                error: function(model, response, options) {
                    $('.error').remove();
                    var err_msg = '<span class="error">' +
                                    JSON.parse(response.responseText) +
                                  '</span>';
                    obj.$el.find('h2').after(err_msg);
                },
                wait: true
            });
        }
    });

    return LoginView;
});
