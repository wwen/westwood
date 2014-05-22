/**
* Listings View
* Author:       Edison
* Description:  Listings View
* Date:         03/04/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/listings/listingsTmpl.html',
    'views/inventories/inventoriesView',
    'views/search/searchView'
], function($, _, Backbone, listingsTemplate, InventoriesView, SearchView) {

    var searchView = null;

    var ListingsView = Backbone.View.extend({
        id: 'listings',
        tagName: 'div',

        events: {
            'click input#search_btn': 'collect_search_data',
            'click input#search_all_btn': 'search_all'
        },

        initialize: function() {
            this.render();
            if ($('#map_canvas').length) {
                this.init_map('map_canvas');
            }
            var inventories_view = new InventoriesView();
            inventories_view.render();
            $.when(inventories_view.dtd).done(function() {
                searchView = new SearchView();
            });
        },

        render: function() {
            this.$el.html(listingsTemplate);
            $('#content').html(this.el);
        },

        // initialize map
        init_map: function(map_container_str) {
            var map_options = {
                zoom: 10,
                center: new google.maps.LatLng(49.2612260, -123.1139270),
                mapTypeId: google.maps.MapTypeId.TERRAIN,
                scrollwheel: false
            };
            window.listings_map = new google.maps.Map(
                document.getElementById(map_container_str), map_options
            );
        },

        search_all: function() {
            //clear all inputs
            $('#search_wrap input[type=text]').val('');

            var inventories_view = new InventoriesView();
            inventories_view.generate_pages(collection,
                                            '#inventories_container', 5);
            if (markerlist.length) {
                for (var marker in markerlist) {
                    markerlist[marker].setMap(null);
                }
            }
            if ($('#map_canvas').length) {
                inventories_view.code_address(window.listings_map,
                                              window.perpage_collection[0]);
            }
        },

        collect_search_data: function() {
            var search_criteria = {};
            $('section.search_input input').each(function() {
                var cate_id = $(this).data('categoryid');
                var val = $(this).val();
                if (val) {
                    search_criteria[cate_id] = val;
                }
            });
            searchView.search(search_criteria);
        }
    });

    return ListingsView;
});
