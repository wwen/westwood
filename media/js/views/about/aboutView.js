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
    //'models/categories/categoriesModel'
], function($, _, Backbone, aboutTemplate) {

    var AboutView = Backbone.View.extend({
        tagName: 'div',
        id: 'about_content',

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(aboutTemplate);
        }
    });

    return AboutView;
});
