/**
*
* Router Module
* Author:       Edison
* Description:  Define a router module, initialize a backbone router
*               and render different views based on the url
* Date:         03/09/2013
**/

define([
    'jquery-all',
    'underscore',
    'backbone',
    'util',
    'views/login/loginView',
    'views/header/headerView',
    'views/content/contentView',
    'views/footer/footerView',
    'views/admin/adminView',
    'views/listings/listingsView',
    'views/contact/contactView',
    'views/about/aboutView',
    'views/subheader/subheaderView'
], function($, _, Backbone, Util,
    LoginView, HeaderView, ContentView, FooterView,
    AdminView, ListingsView, ContactView, AboutView, SubheaderView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // page start
            '': 'pagestart',
            'listings': 'listings',
            'admin': 'login',
            'contact': 'contact',
            'about': 'about'
        }
    });

    var initialize = function() {
        var util = new Util($);
        var app_router = new AppRouter;
        var $page = $('#wrapper');

        app_router.on('route:pagestart', function() {
            var headerView = new HeaderView();
            var subheaderView = new SubheaderView();
            var contentView = new ContentView();
            var footerView = new FooterView();
            var frames = [headerView.el,
                          subheaderView.el,
                          contentView.el,
                          footerView.el
                         ];
            $page.html(frames);
        });

        app_router.on('route:listings', function() {
            var headerView = new HeaderView();
            var contentView = new ContentView();
            var footerView = new FooterView();
            var frames = [headerView.el, contentView.el, footerView.el];
            $page.html(frames);
            var listingsView = new ListingsView();
        });

        app_router.on('route:login', function() {
            util.xhr('/generic/checkLoginSessionCookie').
            done(function(response) {
                try {
                    var userData = $.parseJSON(response);
                    var loginView = new LoginView();
                    var adminView = new AdminView({ model: userData });

                    loginView.$el.html(adminView.el);
                }
                catch (err) {
                    var loginView = new LoginView();
                }
            }).fail(function(response) {
                var loginView = new LoginView();
            });
        });

        app_router.on('route:contact', function() {
            var $page = $('#wrapper');
            var headerView = new HeaderView();
            var contactView = new ContactView();
            var footerView = new FooterView();
            var frames = [headerView.el, contactView.el, footerView.el];
            $page.html(frames);
        });

        app_router.on('route:about', function() {
            var $page = $('#wrapper');
            var headerView = new HeaderView();
            var aboutView = new AboutView();
            var footerView = new FooterView();
            var frames = [headerView.el, aboutView.el, footerView.el];
            $page.html(frames);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
