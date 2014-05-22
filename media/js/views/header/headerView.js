/**
* Header View
* Author:       Edison Li
* Description:  Template Header
* Date:         02/13/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header/headerTmpl.html',
    'views/contact/contactView'
], function($, _, Backbone, headerTemplate, ContactView) {

    var HeaderView = Backbone.View.extend({
        tagName: 'header',

        events: {
             'click a#li_contact': 'onContactClick'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.append(headerTemplate);
        },

        onContactClick: function() {
            var contactView = new ContactView();
            $('#wrapper').html(contactView.el);
        }
    });

    return HeaderView;
});
