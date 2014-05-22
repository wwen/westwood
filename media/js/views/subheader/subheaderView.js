/**
* sub header View
* Author:       Will Wang
* Description:  header for other pages except homepage
* Date:         03/5/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/subheader/subheaderTmpl.html'
], function($, _, Backbone, subheaderTemplate) {

    var SubheaderView = Backbone.View.extend({
        id: 'gallery',
        tagName: 'div',

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.append(subheaderTemplate);
            return this;
        }
    });

    return SubheaderView;
});
