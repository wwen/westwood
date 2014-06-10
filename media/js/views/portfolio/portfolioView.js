/**
* About View
* Author:       Will Wang
* Description:  About us information
* Date:         06/09/2014
**/

define(['jquery',
		'underscore',
		'backbone',
		'text!templates/portfolio/portfolioTmpl.html'
	   ], function($, _, Backbone, portfolioTemplate) {

	   		var PortfolioView = Backbone.View.extend({
	   			tagName: 'div',
	   			id: 'service_content',

	   			initialize: function() {
	   				this.render();
	   			},

	   			render: function() {
	   				this.$el.html(portfolioTemplate);

	   				var that = this;

	   				_.defer(function() {
	   					
	   				});
	   			},
	   		});	

	   		return PortfolioView;
});