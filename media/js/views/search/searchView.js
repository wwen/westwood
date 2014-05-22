/**
* Search View
* Author:       Edison Li
* Description:  Create a search based on the categories
* Date:         03/18/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'models/categories/categoriesModel',
    'views/inventories/inventoriesView',
    'collection/inventory/inventoryCollection'
], function($, _, Backbone,
    CategoriesModel, InventoriesView, InventoryCollection) {

    var SearchView = Backbone.View.extend({

        initialize: function() {
            this.render();
        },

        render: function() {
            this.generate_search_inputs();
        },

        generate_search_inputs: function() {
            var categoriesModel = new CategoriesModel();
            categoriesModel.save({}, {
                success: function(model, response, options) {
                    var categories = response.categories;
                    var search_str = '';
                    var util = new Util();
                    // generate first 5 categories for search
                    for (var i = 0; i < 5; i++) {
                        var category = categories[i];
                        var cate_id = category.categoryID;
                        var cate_name = category.categoryName;
                        search_str += '<section class="search_input">' +
                                            '<label>' +
                                            util.mapping_cn[cate_name] +
                                            '</label>' +
                                            '<input data-categoryid="' +
                                            cate_id +
                                            '" type="text" placeholder="' +
                                            util.mapping_cn[cate_name] +
                                            '" />' +
                                      '</section>';
                    }
                    $('#search_wrap').prepend(search_str);
                }
            });
        },

        search: function(search_criteria) {
            var inventories_view = new InventoriesView();

            var obj_array = collection.toJSON();
            var inventoryCollection = new InventoryCollection();
            for (var i = 0; i < obj_array.length; i++) {
                var inventory = obj_array[i];
                var id = inventory.id;
                var categories = inventory.category;
                var match = false;
                var criteria_len = 0;
                var match_counter = 0;

                _.each(search_criteria, function(v, k) {
                    criteria_len++;
                    for (var idx = 0; idx < categories.length; idx++) {
                        var category = categories[idx];
                        var cate_id = category.id;
                        var cate_val = category.value;
                        if (cate_id === k && cate_val === v) {
                            match_counter++;
                        }
                    }
                });

                if (criteria_len === match_counter) {
                    inventoryCollection.push(collection.get(id));
                }
            }

            inventories_view.generate_pages(inventoryCollection,
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
        }
    });

    return SearchView;
});
