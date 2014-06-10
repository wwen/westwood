/**
* About View
* Author:       Will Wang
* Description:  About us information
* Date:         06/09/2014
**/

define(['jquery',
		'underscore',
		'backbone',
		'text!templates/services/servicesTmpl.html',
		'text!templates/services/step.html',
		'text!templates/services/planning.html'
	   ], function($, _, Backbone, servicesTemplate, stepTemplate,
	   				planningTemplate) {

	   		var ServicesView = Backbone.View.extend({
	   			tagName: 'div',
	   			id: 'service_content',

	   			initialize: function() {
	   				this.render();
	   			},

	   			render: function() {
	   				this.$el.html(servicesTemplate);

	   				var that = this;

	   				_.defer(function() {
	   					that.sectionChange();
	   				});
	   			},

	   			sectionChange: function() {
	   				var sections = {"3 steps to renovation": stepTemplate,
	   								planning: planningTemplate
	   								};

	   				$('#service_des').html(sections["3 steps to renovation"]);


	   				$('#sidebar ul').on("click", "li", sections, function(e) {
	   					if (e.target.localName === "a" && !e.target.className) {
	   						var active = $(".list-active");

	   						active.removeClass("list-active");
	   						e.target.setAttribute("class", "list-active");

	   						for (var x in sections) {
	   							if (x == e.target.innerHTML) {
	   								$('#service_des').html(sections[x]);
	   							}
	   						}
	   					}
	   				});
	   			}
	   		});	

	   		return ServicesView;
});