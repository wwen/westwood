/**
* Content View
* Author:       Edison Li
* Description:  Template content
* Date:         02/13/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/content/contentTmpl.html',
    'collection/inventory/inventoryCollection'
], function($, _, Backbone, contentTemplate, InventoryCollection) {
    var photosize = '320x240';
    var photopath = '/uploads/photos/inventories/' + photosize + '/';
    var ContentView = Backbone.View.extend({
        id: 'content',
        tagName: 'div',
        template: _.template(contentTemplate),
        initialize: function() {
            var current_router = Backbone.history.fragment;
            if (current_router == '' || current_router == undefined) {
                var that = this;
                that.collection = new InventoryCollection();
                that.collection.fetch({
                    success: function(collection, response, options) {
                        var models = collection.models;
                        var random_models =
                            that.getRandomItems(3, models, new Array());
                        var inventories = [];
                        for (var i = 0; i < random_models.length; i++) {
                            var obj = {};
                            var model = random_models[i];
                            if (model.attributes.media.length) {
                                obj.photo = photopath +
                                            model.attributes.media[0].name;
                            }
                            obj.category = model.attributes.category;
                            inventories.push(obj);
                        }
                        that.render(inventories);
                    }
                });
            }
        },

        getRandomItems: function(n, array_from, array_to) {
            if (n > 0) {
                var index = Math.floor(Math.random() * array_from.length);
                array_to.push(array_from[index]);
                array_from.splice(index, 1);
                n--;
                return this.getRandomItems(n, array_from, array_to);
            } else {
                return array_to;
            }
        },

        render: function(models) {
            this.$el.append(this.template({items: models}));
            
            var t = this;
            _.defer(function() {
                t.updatePosition();
            });
        },

        updatePosition: function() {
            var offset1 = "8px";
            var offset2 = "13px";
            var l= $(".col-sm-4").length;
            for (var i = 1; i<l; i++) {
                if(i == 1) {
                    var p = $(".col-sm-4 .feature_photo")[i].style.left = offset1;
                    var g = $(".col-sm-4 table")[i].style.left = offset1;
                } else if(i == 2) {
                    var p = $(".col-sm-4 .feature_photo")[i].style.left = offset2;
                    var g = $(".col-sm-4 table")[i].style.left = offset2;
                }
            }
        }
    });

    return ContentView;
});
