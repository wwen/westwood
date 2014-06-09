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
            var that = this;

            _.defer(function() {
                that.map_initialize();
            });

            var contactformView = new ContactformView();
            this.$el.html(contactTemplate)
                    .find('#contact_form')
                    .html(contactformView.render());
        },

        map_initialize: function() {
            var mapDiv = document.getElementById("contact_geo_map");
            var myLatLng = new google.maps.LatLng(49.229296, -122.928236);
            var mapOptions = {
                zoom: 16,
                center: myLatLng
            }

            var map = new google.maps.Map(mapDiv, mapOptions);

            // To add the marker to the map, use the 'map' property
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title:"WestWood Contruction"
            });
        }
    });

    return ContactView;
});
