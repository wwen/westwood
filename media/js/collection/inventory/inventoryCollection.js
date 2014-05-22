/**
* Inventory Collection
* Author:       Edison
* Description:  A collection of InventoryModels
* Date:         02/21/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'models/inventory/inventoryModel'
], function($, _, Backbone, InventoryModel) {
    var InventoryCollection = Backbone.Collection.extend({
        url: 'inventory',
        model: InventoryModel
    });

    return InventoryCollection;
});
