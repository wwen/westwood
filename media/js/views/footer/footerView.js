/**
* Footer View
* Author:       Edison Li
* Description:  Template footer
* Date:         02/13/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/footer/footerTmpl.html',
    'views/contact/contactformView'
], function($, _, Backbone, footerTemplate, ContactformView) {

    var FooterView = Backbone.View.extend({
        tagName: 'footer',

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.append(footerTemplate);
            if (Backbone.history.fragment != 'contact') {
                var contactformView = new ContactformView();
                this.$el.find('#footer_contact_form').html(contactformView.el)
                .find('#txt_contact_phone').val('No Phone Number.').hide();
            } else {
            }
        }
    });

    return FooterView;
});
