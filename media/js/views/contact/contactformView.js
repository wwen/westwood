/**
* Contact View
* Author:       Mo Lei
* Description:  Render contact page
* Date:         02/20/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/contact/contactformTmpl.html',
    'models/contact/contactModel'
], function($, _, Backbone, contactTmpl, ContactModel) {

    var ContentView = Backbone.View.extend({
        util: new Util($),

        tagName: 'div',

        template: _.template(contactTmpl),

        events: {
            'click input#btn_email_send': 'onClickEmailSend'
        },

        initialize: function() {
            var contactModel = new ContactModel();
            this.model = contactModel;
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
            return this.el;
        },

        onClickEmailSend: function(e) {
            var name = this.$el.find('#txt_contact_name');
            var email = this.$el.find('#txt_contact_email');
            var phone = this.$el.find('#txt_contact_phone');
            var message = this.$el.find('#txt_contact_message');
            var errorMessage = this.$el.find('#lbl_confirm_message');
            var btn_send = $(e.target);
            var isValid = true;

            //Message refresh
            errorMessage.hide();

            $('.error').each(function() {
                $(this).hide();
            });

            //Validation
            if (!name.val().trim() || name.attr('isDirty') == 'false') {
                isValid = false;
                this.$el.find('#lbl_msg_name').show();
            }


            if (!this.util.isValidEmailAddress(email.val()) ||
                    email.attr('isDirty') == 'false') {
                        isValid = false;
                        this.$el.find('#lbl_msg_email').show();
            }

            if (!message.val().trim() || message.attr('isDirty') == 'false') {
                isValid = false;
                this.$el.find('#lbl_msg_message').show();
            }

            if (isValid) {
                btn_send.val('发送中...').prop('disable', true);
                this.model.save({'name': name.val(),
                             'email': email.val(),
                             'phone': phone.val(),
                             'message': message.val()}, {
                    success: function(model, response, options) {
                        errorMessage.text(response.message).show();

                    },
                    error: function(model, response, options) {
                        errorMessage.text(JSON.parse(response.responseText))
                                    .show();
                    },
                    wait: true
            });
                btn_send.val('发送').prop('disable', false);
                this.util.clearFormInput();
            }
        }
    });

    return ContentView;
});
