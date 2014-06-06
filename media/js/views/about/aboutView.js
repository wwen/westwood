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

            /*var aboutObj = '{"company": {"h3": "WESTWOOD CONSTRUCTION", "context": ["TQ Construction ' +
                             'is a professional home renovation company with a 30-year tradition of ' +
                             'excellence in BC’s home improvement, renovation and construction ' +
                             'industry. TQ stands for Top Quality. We are a complete service ' +
                             'design/build team that includes engineers, designers, carpenters ' +
                             'project managers and office staff who strive for exceptional quality ' + 
                             'in every renovation that we do. That’s why you can confidently trust ' +
                             'TQ to deliver superior value and results, professional and personal ' +
                             'service, as well as innovative liveability and sustainability solutions ' + 
                             'for your home.", "We work with our clients to design, and reinvent by ' +
                             'adding and reusing materials. We transform vision into reality responsibly, ' +
                             'and with skill, knowledge, expertise, and reliability. At TQ, we believe ' +
                             'that a successful renovation isn’t simply about tearing down and starting ' +
                             'over. It’s about retaining materials and labour which have value and ' +
                             'history. It’s about taking a home that’s already good and making it even ' + 
                             'better."]}, ' +
                             '"vision": {"h3": "vision", "context": ["TQ’s complete design and build 
                             service transforms ideas into reality with skill, knowledge, expertise and 
                             reliability. Because we see TQ as a "neighbourhood" within the city we 
                             serve, we treat our valued customers as neighbours, friends and members 
                             of our own community.", "", "", "", ""]}' +
                           '}';*/
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

            $("#about_sidebar ul").on("click", "li", aboutObj, function(e) {
                if (e.target.localName === "a" && !e.target.className) {
                    var active1 = $(".list-active");
                    active1.removeClass("list-active");
                    e.target.setAttribute("class", "list-active");
                    console.log(e);
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

                }
            });
        },
    });

    return AboutView;
});
