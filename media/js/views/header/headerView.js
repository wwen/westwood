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

            var that = this;
            _.defer(function() {
                that.navChange();
            });
        },

        onContactClick: function() {
            var contactView = new ContactView();
            $('#wrapper').html(contactView.el);
        },

        navChange: function() {
            var length = 0;


            //$("#google_translate_element > span").val();
                var lis = $("#nav li");

                for (var i=0; i < lis.length; i++) {
                    length += lis.eq(i).width();
                }
                console.log(length);

            var z = $("#google_translate_element").html();
            console.log(z);
            if (length > 440) {
                $("#nav ul").css({"width": "590px"});
                $("#nav ul").css("width");
                $(".translate_wrap").css({"padding-left": "212px"});
            }
        }

    });

    return HeaderView;
});

