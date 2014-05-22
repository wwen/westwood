/**
* Inventories View
* Author:       Edison Li
* Description:  Collection view of inventory
* Date:         02/18/2014
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/inventory/inventoryView',
    'views/detail/detailView',
    'collection/inventory/inventoryCollection'
], function($, _, Backbone, InventoryView, DetailView, InventoryCollection) {
    window.markerlist = [];
    var InventoriesView = Backbone.View.extend({
        id: 'inventories',
        tagName: 'div',

        render: function() {
            var this_obj = this;
            var dtd = $.Deferred();
            var inventoryCollection = new InventoryCollection();
            inventoryCollection.fetch({
                success: function(collection, response, options) {
                    window.collection = collection;
                    $('#inventories_container').html('');

                    this_obj.generate_pages(collection,
                                                '#inventories_container', 5);
                    this_obj.generate_selection();
                    this_obj.select_perpage();
                    this_obj.select_pagination();

                    // This would render the first page listing markers
                    // Map is initialize at InvnetoryView
                    if ($('#map_canvas').length) {
                        this_obj.code_address(window.listings_map,
                                                window.perpage_collection[0]);
                    }
                    dtd.resolve();
                },
                error: function() {

                }
            });
            this.dtd = dtd;
        },

        code_address: function(map, collection) {
            var listing_id;
            var geocodelist = [];
            var idlist = [];

            for (var listing in collection) {
                var item = collection[listing];
                var id = item.id;
                var categories = item.attributes.category;
                var geocode = {};
                for (var idx = 0; idx < categories.length; idx++) {
                    var cate_name = categories[idx].name;
                    if (cate_name === 'latitude') {
                        geocode.latitude = categories[idx].value;
                    }

                    if (cate_name === 'longitude') {
                        geocode.longitude = categories[idx].value;
                    }
                }
                idlist.push(id);
                if (!$.isEmptyObject(geocode)) {
                    geocodelist.push(geocode);
                }
            }

            for (var i = 0; i < geocodelist.length; i++) {
                var latlng = new google.maps.LatLng(
                    Number(geocodelist[i].latitude),
                    Number(geocodelist[i].longitude));

                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: '/media/images/icons/36x36/mappin.png',
                    draggable: false,
                    animation: google.maps.Animation.DROP
                });
                markerlist.push(marker);

                // Each marker associates with the corresponding
                // inventory id
                marker.metadata = {
                    'id': idlist[i]
                };

                var infowindow = new google.maps.InfoWindow({
                    maxWidth: 500
                });

                google.maps.event.addListener(marker, 'click', function() {
                    // this is the marker yoou clicked
                    // this.metadata contains inventory id
                    listing_id = this.metadata.id;

                    // passing the collection to detailView to render
                    // pop up window on google map
                    var obj = {
                        'model': window.collection.get(listing_id)
                    };
                    var detailView = new DetailView(obj);
                    infowindow.setContent(detailView.render());
                    infowindow.open(map, this);
                });

                google.maps.event.addListener(infowindow, 'domready',
                    function() {
                        var model = window.collection.get(listing_id).toJSON();
                        var model_id = model.id;

                        $('.thumbnails a').click(function() {
                            var slide_number = $(this).data('slide');
                            $('.slider > img:eq(' + slide_number + ')')
                                                                    .fadeIn();
                            $('.slider > img:not(:eq(' + slide_number + '))')
                                                                    .fadeOut();
                        });
                });
            }
        },

        generate_pages: function(collection, selector, perpage) {
            var pages = Math.ceil(collection.length / perpage);
            var counter = 1;
            window.perpage_collection = [];
            var sub_collection = [];
            var page1 = [];

            $(selector).html('');

            for (var i = 0; i < collection.length; i++) {
                if (counter > perpage) {
                    counter = 1;
                    window.perpage_collection.push(sub_collection);
                    sub_collection = [];
                }

                sub_collection.push(collection.models[i]);
                counter++;
            }

            if (sub_collection.length) {
                window.perpage_collection.push(sub_collection);
            }

            // perpage_listing[0] is the first page, we only render first page
            _.each(window.perpage_collection[0], function(model) {
                var obj = {
                    'model': model
                };
                var inventoryView = new InventoryView(obj);
                page1.push(inventoryView.render());
            });

            page1 = $('<div class="page">').append(page1);
            $(selector).append(page1);
            this.generate_pagination('#inventories_container', pages);
        },

        generate_pagination: function(selector, pages) {
            if ($('.pagination').length) {
                $('.pagination').remove();
            }

            var pagination_html = "<div class='clearfix'></div>" +
                                    "<div id='pagination_wrap'>" +
                                    "<ul class='pagination'>";
            pagination_html += "<li class='previous' data-page='prev'>" +
                                                            '<a>Prev</a></li>';

            for (var i = 1; i <= pages; i++) {
                if (i === 1) {
                    pagination_html += "<li class='active' data-page='" + i +
                                                    "'><a>" + i + '</a></li>';
                } else {
                    pagination_html += "<li data-page='" + i +
                                                    "'><a>" + i + '</a></li>';
                }
            }
            pagination_html += "<li class='next' data-page='next'>" +
                                                            '<a>Next</a></li>';
            pagination_html += '</ul>' +
                            '</div>';

            if (pages > 1) {
                $(selector).parent().after(pagination_html);
            }

            console.log($(selector).parent()[0].id);
            if ($(selector).parent()[0].id == "inventories_container_wraper") {
                this.updateMap();
            } else if ($(selector).parent()[0].id == "inventories") {
                this.updateAdmin();
            }
        },

        generate_selection: function() {
            var label = '<span>How many inventories per-page:' +
                        '&nbsp&nbsp' +
                        '</span>'
            var select = '<select id="page_select">' +
                             '<option value="5">5</option>' +
                             '<option value="10">10</option>' +
                             '<option value="15">15</option>' +
                             '<option value="20">20</option>' +
                         '</select>';
            $('#page_selection').append(label + select);
        },

        select_perpage: function() {
            var obj = this;

            $('#page_select').change(function() {
                var selection = $(this).val();
                var preloader = '/media/images/preloader/preloader.gif';
                var preloader_tag = '<img src="' + preloader +
                                    '" id="preloader" />';
                $('div#inventories_container').html(preloader_tag);

                setTimeout(function() {
                    obj.generate_pages(window.collection,
                                        '#inventories_container', selection);
                    obj.code_address(window.listings_map,
                                        window.perpage_collection[0]);
                    obj.select_pagination();
                }, 3000);
            });
        },

        select_pagination: function() {
            var this_obj = this;
            var new_page;
            var page;

            $('.pagination li').click(function() {
                // get the current page number
                var current_page = $('.pagination li.active').data('page');
                // get the clicked page number
                page = $(this).data('page');
                // clean page div to insert new content
                $('.page').empty();
                $('.pagination li').removeClass('active');

                if (_.isString(page)) {
                    if (page === 'prev') {
                        $('.pagination li').eq(current_page - 1)
                                            .addClass('active');
                        page = current_page - 1;
                    } else {
                        $('.pagination li').eq(current_page + 1)
                                            .addClass('active');
                        page = current_page + 1;
                    }
                } else {
                    $(this).addClass('active');
                }
                this_obj.render_markers(page);
            });
        },

        render_markers: function(page) {
            var page_listings = [];

            _.each(window.perpage_collection[page - 1], function(model) {
                var obj = {
                    'model': model
                };
                var inventoryView = new InventoryView(obj);
                page_listings.push(inventoryView.render());
            });

            $('.page').append(page_listings);

            if ($('#map_canvas').length) {
                // everytime we click a new page we remove the original markers
                if (markerlist.length) {
                    for (var marker in markerlist) {
                        markerlist[marker].setMap(null);
                    }
                }
                this.code_address(window.listings_map,
                                        window.perpage_collection[page - 1]);
            }
            $('html, body').animate({scrollTop: '0px'}, 300);
        },

        //make the the height of geo-map correspond with inventories_wrap
        updateMap: function() {
            var h = $("#inventories_wrap").outerHeight();
            $("#map_canvas").css({"height": h});
        },

        //make the pagination's position correspond with inventories
        updateAdmin: function() {
            var al = $("#admin_panel #inventories").position().left + 10;
            $("#admin_panel #pagination_wrap").css({"left": al, "top": ah});
        }
    });

    return InventoriesView;
});
