/**
* Inventory Model
* Author:       Edison
* Description:  Define a backbone login model
* Date:         02/13/2014
**/

define([
    'jquery-all',
    'underscore',
    'backbone',
    'util'
], function($, _, Backbone, Util) {

    var InventoryModel = Backbone.Model.extend({
        urlRoot: 'inventory/index',
        defaults: {
            'category': [],
            'media': [],
            'created': '',
            'modified': ''
        }
    });

    return InventoryModel;
});
