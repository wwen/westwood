/**
* About View
* Author:       Will Wang
* Description:  About us information
* Date:         02/13/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/about/aboutTmpl.html'
], function($, _, Backbone, aboutTemplate) {

    var AboutView = Backbone.View.extend({
        tagName: 'div',
        id: 'about_content',

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(aboutTemplate);

            var that = this;

            _.defer(function() {
                that.ochange();
            });
        },

        ochange: function() {
            var aboutObj = '{"Company": {"h3": "qqqqqqq", "context": ["wwwwwww", "eeeeeee"]},' +
                            '"Vision": {"h3": "rrrrrrr", "context": ["ttttttt", "yyyyyyy", "mmmmmmm"]},' +
                            '"Awards": {"h3": "uuuuuuu", "context": ["iiiiiii", "ooooooo"]},' + 
                            '"History": {"h3": "ppppppp", "context": ["aaaaaaa", "sssssss"]},' +
                            '"Team": {"h3": "ddddddd", "context": ["fffffff", "ggggggg"]}' +
                           '}';

            aboutObj = JSON.parse(aboutObj);

            var active = $(".list-active");
            
            for (var x in aboutObj) {
                if (x === active.html()) {
                    $("h3").html(aboutObj[x].h3);

                    for (var i = 0; i < aboutObj[x].context.length; i++) {
                        if (i < aboutObj[x].context.length-1) {
                            $("#about_context").append("<p>" + aboutObj[x].context[i] + "</p><br/>");
                        } else {
                            $("#about_context").append("<p>" + aboutObj[x].context[i] + "</p><br/>");
                        }
                    }
                }
            }

            $("#sidebar ul").on("click", "li", aboutObj, function(e) {
                if (e.target.localName === "a" && !e.target.className) {
                    var active1 = $(".list-active");
                    active1.removeClass("list-active");
                    e.target.setAttribute("class", "list-active");

                    for (var x in aboutObj) {
                        if (x === e.target.innerHTML) {
                            $("h3").html(aboutObj[x].h3);

                            $("#about_context").html("");

                            for (var i = 0; i < aboutObj[x].context.length; i++) {
                                if (i < aboutObj[x].context.length-1) {
                                    $("#about_context").append("<p>" + aboutObj[x].context[i] + "</p><br/>");
                                } else {
                                    $("#about_context").append("<p>" + aboutObj[x].context[i] + "</p><br/>");
                                }
                            }    
                        }
                    }
                } else {
                    e.preventDefault();
                }
            });
        },
    });

    return AboutView;
});
