/**
* Contacts View
* Author:       Will Wang
* Description:  Contacts information
* Date:         02/13/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/contact/contactTmpl.html',
    'views/contact/contactformView'
], function($, _, Backbone, contactTemplate, ContactformView) {

    var ContactView = Backbone.View.extend({
        tagName: 'div',

        initialize: function() {
            this.render();
        },

        render: function() {
            var contactformView = new ContactformView();
            this.$el.html(contactTemplate)
                    .find('#contact_form')
                    .html(contactformView.render());
        }
    });

    return ContactView;
});
