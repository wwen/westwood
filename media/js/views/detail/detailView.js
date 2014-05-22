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
    'text!templates/detail/detailTmpl.html'
], function($, _, Backbone, detailTmpl) {

    var photosize = ['80x60', '160x120', '320x240', '640x480', '1024x768'];
    var photopath = '/uploads/photos/inventories/';
    var util = new Util($);

    var DetailView = Backbone.View.extend({
        id: 'inventory_detail_container',
        tagName: 'div',

        initialize: function() {
            var obj = this.model.toJSON();
            var slider_html = '';
            var thumbnail_html = '';
            var detail_html = '';

            for (var photo in obj.media) {
                slider_html += '<img src="' + photopath + photosize[3] + '/' +
                                                obj.media[photo].name + '"/>';

                thumbnail_html += '<a data-slide="' + photo + '">' +
                                '<img src="' + photopath + photosize[0] + '/' +
                                                obj.media[photo].name + '"/>' +
                                                                        '</a>';
            }

            for (var category in obj.category) {
                var cname = obj.category[category].name;
                var cvalue = obj.category[category].value;

                if (cname !== 'longitude' && cname !== 'latitude') {
                    if (cname === 'mlsnumber') {
                        detail_html += '<div class="detail_' + cname + '_row">';
                        detail_html += '<label class="detail_label_' +
                                                    cname + '">MLS: </label>' +
                                    '<div class="detail_' + cname + '">' +
                                                            cvalue + '</div>';
                        detail_html += '</div>';
                    } else if (cname === 'propertytype') {
                        detail_html += '<div class="detail_' + cname + '_row">';
                        detail_html += '<label class="detail_label_' +
                                        cname + '">Property Type: </label>' +
                                    '<div class="detail_' + cname + '">' +
                                                            cvalue + '</div>';
                        detail_html += '</div>';
                    } else if (cname === 'buildingtype') {
                        detail_html += '<div class="detail_' + cname + '_row">';
                        detail_html += '<label class="detail_label_' +
                                        cname + '">Building Type: </label>' +
                                    '<div class="detail_' + cname + '">' +
                                                            cvalue + '</div>';
                        detail_html += '</div>';
                    }else if (cname === 'price') {
                        detail_html += '<div class="detail_' + cname + '_row">';
                        detail_html += '<label class="detail_label_' +
                                        cname + '">Building Type: </label>' +
                                    '<div class="detail_' + cname + '">$' +
                                                            cvalue + '</div>';
                        detail_html += '</div>';
                    } else {
                        detail_html += '<div class="detail_' + cname + '_row">';
                        detail_html += '<label class="detail_label_' +
                                        cname + '">' + cname + ': </label>' +
                                    '<div class="detail_' + cname + '">' +
                                                            cvalue + '</div>';
                        detail_html += '</div>';
                    }
                }
            }

            this.$el.html(detailTmpl);
            this.$el.find('.slider').html(slider_html);
            this.$el.find('.thumbnails').html(thumbnail_html);
            this.$el.find('#inventory_detail').html(detail_html);
        },

        render: function() {
            return this.el;
        }
    });

    return DetailView;
});
