/**
* Inventory View
* Author:       Edison Li
* Description:  Lorem ipsum dolor sit amet, consectetur
*               adipisicing elit, sed do eiusmod tempor incididunt
*               ut labore et dolore magna aliqua. Ut enim ad minim veniam.
* Date:         02/18/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/inventory/inventoryTmpl.html',
    'views/inventories/inventoriesView'
], function($, _, Backbone, inventoryTmpl, InventoriesView) {
    var photosize = ['80x60', '160x120', '320x240', '640x480', '1024x768'];
    var photopath = '/uploads/photos/inventories/';
    var util = new Util($);

    var InventoryView = Backbone.View.extend({
        className: 'inventory',
        tagName: 'section',

        template: _.template(inventoryTmpl),

        events: {
            'click input.save': 'save_inventory',
            'click input.del': 'delete_inventory',
            'click input.edit': 'edit_inventory',
            'click input.cancel': 'cancel_inventory'
        },

        initialize: function() {
            var obj = this.model.toJSON();
            if (obj.media.length > 0) {
                var thumbnails = [];

                for (var i = 0; i < obj.media.length; i++) {
                   thumbnails.push(obj.media[i].name);
                }

                var category = obj.category;

                this.$el.attr('id', obj.id);

                var edit_btn = '<input type="button" ' +
                                'class="edit btn btn-xs" />';
                var cancel_btn = '<input type="button" ' +
                                'class="cancel btn btn-xs" />';
                var save_btn = '<input type="button" ' +
                                'class="save btn btn-xs btn-success"' +
                               ' />';
                var remove_btn = '<input type="button" ' +
                                 'class="del btn btn-xs btn-danger"' +
                                 ' />';

                var inventory_html = '';
                var inventory_subphoto_html = '';
                var counter = 0;
                var row = '';
                var table = '';
                var cprice = '$';
                var caddr = '';

                for (var i = 0; i < category.length; i++) {
                    var cate = category[i];
                    var cid = cate['id'];
                    var cname = cate['name'];
                    var calue = cate['value'];

                    // trim description
                    //if (cname === 'description') {
                    //    calue = calue.substring(0, 19) + ' ...';
                    //}

                    //style the table format
                    if (cname === 'price') {
                        var cprice = '$' + calue;
                    } else if (cname === 'address') {
                        var caddr = calue;
                    } else if (cname === 'longitude' || cname === 'latitude') {
                        continue;
                    } else {
                        counter = counter + 1;

                        row += '<td class="des-value-col" id="listing_' +
                                    cname + '">' +
                                    '<label class="left label_' +
                                    cname + '">' + util.mapping_cn[cname] +
                                    ': </label>' +
                                    '<span class="right value">' +
                                    calue +
                                    '</span>' +
                                    '<input class="control_hide_defult value"' +
                                    'id="' + cname + '" type="text"' +
                                    ' value="' + calue + '"/>' +
                               '</td>';

                        if (counter === 4) {
                            table += '<tr>' + row + '</tr>';
                            counter = 0;
                            row = '';
                        }
                    }
                }

                if (row.length) {
                    table += '<tr>' + row + '</tr>';
                }

                for (var j = 1; j < thumbnails.length; j++) {
                    inventory_subphoto_html = inventory_subphoto_html +
                    '<img src=' +
                    photopath + photosize[0] + '/' + thumbnails[j] + ' />';
                }

                var inventory_obj = {
                    'thumbnail': photopath + photosize[2] + '/' + thumbnails[0],
                    'created': obj.created,
                    'modified': obj.modified,
                    'address': caddr,
                    'price': cprice
                };

                var current_router = Backbone.history.fragment;
                var edit_button = '';

                if (current_router == 'admin') {
                    edit_button = '<div class="edit_button">' +
                                    '<div id="edit_btn">' +
                                    edit_btn +
                                    '</div>' +
                                    '<div id="cancel_btn">' +
                                    cancel_btn +
                                    '</div>' +
                                    '<div id="save_btn"> ' +
                                    save_btn +
                                    '</div>' +
                                    '<div id="remove_btn"> ' +
                                    remove_btn +
                                    '</div>' +
                                    '<div class="clearfix"></div>' +
                                  '</div>';
                }

                inventory_html = '<table>' + table + '</table>' +
                                    '<div class="clearfix"></div>' +
                                    '<div class="created">created: ' +
                                    obj.modified +
                                    '</div>' +
                                    '<div class="modified">modified: ' +
                                    obj.modified +
                                    '</div>' +
                                  edit_button;

                this.$el.html(this.template(inventory_obj));

                this.$el.find('.description').html(inventory_html);
                this.$el.find('.sub_photo').html(inventory_subphoto_html);
            }
        },

        getPostData: function() {
            var id = this.model.id;
            var categories = this.model.attributes.category;
            var new_categories = [];
            var catvalues = [];
            var modified;

            //Update Categories
            catvalues = $(this.el).find('.des-value-col').toArray();

            for (var i = 0; i < catvalues.length; i++)
            {
                var input = $(catvalues[i]).find('input:text');
                var cname = input.attr('id');
                var cvalue = input.val();

                var category = $.grep(categories, function(c) {
                    if (c['name'] == cname) {
                        return c;
                    }
                })[0];

                if (category != 'undefined') {
                    category['value'] = cvalue;
                }

                new_categories.push(category);
            }

            modified = util.getFormatDate(new Date());

            //Reset model
            this.model.set({
                'category': categories,
                'modified': modified
            });

            var postdata = {};
            postdata.inventoryID = id;
            postdata.modified = modified;
            postdata.categories = new_categories;

            return postdata;
        },

        edit_inventory: function() {
            this.$el.find('.des-value-col').each(function() {
                var that = $(this);
                var span = that.find('span');
                var input = that.find('input:text');

                span.hide();
                input.val(span.text())
                    .css('display', 'inline-block');
            });
        },

        cancel_inventory: function() {
            this.$el.find('.des-value-col').each(function() {
                var that = $(this);
                var span = that.find('span');
                var input = that.find('input:text');

                span.css('display', 'inline-block');
                input.val(span.text()).hide();
            });
        },

        save_inventory: function() {
            var that = this;
            var postdata = that.getPostData();
            util.xhr('/inventory/update_inventory', 'POST', postdata)
            .done(function(response) {
                alert(response);
                that.update_UI(postdata);
            });
        },

        delete_inventory: function() {
            this.model.destroy({
                success: function(model, response, options) {
                    var InventoriesView = require('views/inventories/' +
                                                  'inventoriesView');
                    var preloader = '/media/images/preloader/preloader.gif';
                    var preloader_tag = '<img src="' + preloader +
                                        '" id="preloader" />';
                    $('div#inventories_container').html(preloader_tag);

                    setTimeout(function() {
                        $('div#inventories_container').html('');
                        new InventoriesView();
                    }, 3000);
                },
                error: function(model, response, options) {
                    // handle error here
                },
                wait: true
            });
        },

        render: function() {
            return this.el;
        },

        update_UI: function(data) {
            //var id = data.inventoryID;
            var modified = data.modified;
            //var section = this.$el.find('#' + id + '.inventory');
            var div = this.$el.find('div .modified');
            div.html('modified: ' + modified);
            this.$el.find('.des-value-col').each(function() {
                var that = $(this);
                var span = that.find('span');
                var input = that.find('input:text');

                span.text(input.val()).css('display', 'inline-block');
                input.hide();
            });
        }
    });

    return InventoryView;
});
