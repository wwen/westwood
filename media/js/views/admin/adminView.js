/**
* Admin Panel View
* Author:       Edison
* Description:  Allow user update, modify, or delete inventories.
* Date:         02/14/2014
**/

define([
    'require',
    'jquery',
    'underscore',
    'backbone',
    'dropzone',
    'text!templates/admin/adminTmpl.html',
    'models/categories/categoriesModel',
    'views/login/loginView',
    'models/inventory/inventoryModel',
    'views/inventories/inventoriesView'
], function(require, $, _, Backbone, Dropzone, adminTemplate,
    CategoriesModel, LoginView, InventoryModel, InventoriesView) {
    var util = new Util($);

    var AdminView = Backbone.View.extend({
        id: 'admin',
        tagName: 'div',
        template: _.template(adminTemplate),

        events: {
            'click input#create': 'create_inventory',
            'click a#link_logout': 'logout_user'
        },

        initialize: function() {
            this.render();
            this.gen_category_form();
            var inventories_view = new InventoriesView();
            inventories_view.render();
        },

        render: function() {
            this.$el.append(this.template(this.model));
        },

        // temporary validation rules
        validation_rules: function() {
            $('form#inventory_form').validate({
                rules: {
                    bedrooms: {
                        digits: true
                    },
                    bathrooms: {
                        digits: true
                    },
                    storage: {
                        digits: true
                    },
                    price: {
                        digits: true
                    },
                    propertytype: {
                        letterswithbasicpunc: true
                    },
                    buildingtype: {
                        letterswithbasicpunc: true
                    },
                    floorarea: {
                        digits: true
                    },
                    lotsize: {
                        digits: true
                    },
                    parking: {
                        digits: true
                    },
                    age: {
                        digits: true
                    },
                    address: 'required',
                    city: 'required',
                    province: 'required',
                    country: 'required',
                    description: 'required',
                    mlsnumber: {
                        required: true,
                        mls: true,
                        maxlength: 8
                    }
                },
                messages: {
                    bedrooms: 'please enter number',
                    bathrooms: 'please enter number',
                    storage: 'please enter number',
                    price: 'please enter number',
                    floorarea: 'please enter number',
                    lotsize: 'please enter number',
                    parking: 'please enter number',
                    age: 'please enter number',
                    mlsnumber: 'Please enter a valid mls number'
                },
                errorPlacement: function(error, element) {
                    error.appendTo(element.parent());
                }
            });
        },

        create_inventory: function() {
            this.validation_rules();
            if ($('form#inventory_form').valid()) {
                var dropzone = this.dropzone;
                this.generate_geocode(dropzone);
            }
        },

        generate_geocode: function(dropzone) {
            var address = $('input[name="address"]').val();
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var location = results[0].geometry.location;
                    var latitude = location.d || location.k;
                    var longitude = location.e || location.A;
                    $('#latitude').val(latitude);
                    $('#longitude').val(longitude);
                    dropzone.processQueue();
                } else {
                    alert('Geocode was not successful: ' + status);
                }
            });
        },

        collect_send_to_server: function() {
            var obj = this;
            var postdata = $('form#inventory_form').data('postdata');

            this.$el.find('form#inventory_form section').each(function() {
                var input = $(this).find('input');
                var cateid = input.data('categoryid');
                var value = input.val();

                postdata.category_data.push({
                    'category_id': cateid,
                    'value': value
                });
            });

            var inventoryModel = new InventoryModel();
            inventoryModel.save(postdata, {
                success: function(model, response, options) {
                    var preloader = '/media/images/preloader/preloader.gif';
                    var preloader_tag = '<img src="' + preloader +
                                        '" id="preloader" />';
                    obj.$el.find('div#inventories_container')
                        .html(preloader_tag);

                    setTimeout(function() {
                        obj.$el.find('div#inventories_container').html('');
                        var inventories_view = new InventoriesView();
                        inventories_view.render();
                    }, 3000);
                },
                error: function(model, response, options) {
                    // handle error here
                },
                wait: true
            });
        },

        init_dropzone: function(selector) {
            var obj = this;
            // Dropzone options configuration
            var dz_config = {
                addRemoveLinks: true,
                autoProcessQueue: false,
                parallelUploads: 10,
                previewsContainer: 'div#dropzonepreview'
            };

            Dropzone.options.dropzone = dz_config;
            var myDropzone = new Dropzone(selector,
                                    { url: '/generic/uploadinventoryphoto'});

            // Addedfile is called each time a photo is added
            // TODO: handle multiple photos only upload once
            myDropzone.on('addedfile', function() {
                // Allow user to resort photos,
                // the first photo will be the main picture
                $('#dropzonepreview').sortable();
            });

            // Bind a success event to handle the server's response
            myDropzone.on('success', function(file, response) {
                var resp = JSON.parse(response);

                if (resp.hasOwnProperty('error')) {
                    obj.$el.find('div#dropzone_errors').
                                                    html(resp['error']);
                }

                if (resp.hasOwnProperty('upload_data')) {
                    var postdata = $('#inventory_form').data('postdata');
                    var update_data = resp['upload_data'];
                    postdata.media.push({
                        'file_ext': update_data['file_ext'],
                        'file_name': update_data['file_name'],
                        'media_id': update_data['raw_name']
                    });
                }
            });

            myDropzone.on('complete', function(file) {
                myDropzone.removeFile(file);
            });

            // TODO: handle dz reset
            myDropzone.on('reset', function() {
                obj.collect_send_to_server();
                obj.gen_category_form();
            });

            this.dropzone = myDropzone;
        },

        gen_category_form: function() {
            var obj = this;
            var categoriesModel = new CategoriesModel();
            categoriesModel.save({}, {
                success: function(model, response, options) {
                    var form_elems = [];
                    var inventory_id = response.inventoryID;
                    var categories = response.categories;
                    var cates_length = categories.length;
                    var clearfix = '<div class="clearfix"></div>';

                    var postdata = {
                        'inventory_id': inventory_id,
                        'media': [],
                        'category_data': []
                    };

                    for (var i = 0; i < cates_length; i++) {
                        var category = categories[i];
                        var cid = category['categoryID'];
                        var cname = category['categoryName'];
                        var str = '';


                        if (cname === 'address') {
                            str = '<section ' +
                                  'class="form_row address_form_row">' +
                                  '<label>' + util.mapping_cn[cname] +
                                  '<input data-categoryid="' +
                                  cid + '"' +
                                  ' placeholder="' + util.mapping_cn[cname] +
                                  '"' +
                                  '" type="text" ' +
                                  'name="' + cname +
                                  '" class="form-control" />' +
                                  '</label>' +
                                  '<div class="tip_wrap">' +
                                  '<div class="form_icon">' +
                                  '<img src=' +
                                  '"media/images/generic/' +
                                  'exclamation.png">' +
                                  '</div>' +
                                  '<span>please enter full address including ' +
                                  'province and country for displaying the ' +
                                  'property correctly on map</span>' +
                                  '<div class="clearfix"></div>' +
                                  '</div>' +
                                  '</section>' +
                                  '<div class="clearfix"></div>';
                        } else if (cname === 'longitude' ||
                                   cname === 'latitude') {
                            str = '<section class="form_row"> ' +
                                  '<input data-categoryid="' +
                                  cid + '"' +
                                  ' id="' + cname +
                                  '" type="hidden" />' +
                                  '</section>';
                        } else {
                            str = '<section class="form_row"> ' +
                                  '<label>' + util.mapping_cn[cname] +
                                  '</label>' +
                                  '<input data-categoryid="' +
                                  cid + '"' +
                                  ' placeholder="' + util.mapping_cn[cname] +
                                  '"' +
                                  '" type="text" ' +
                                  'name="' + cname +
                                  '" class="form-control" />' +
                                  '</section>';
                        }


                        form_elems.push(str);

                        if (i == cates_length - 1) {
                            form_elems.push(clearfix);
                        }
                    }

                    obj.$el.find('#inventory_form').
                        html(form_elems).data('postdata', postdata);

                    if (!obj.hasOwnProperty('dropzone')) {
                        obj.init_dropzone('div#dropzone');
                    }
                }
            });
        },

        logout_user: function() {
            var util = new Util($);
            util.xhr('/generic/logoutUser').done(function(response) {
                var LoginView = require('views/login/loginView');
                var loginview = new LoginView();
            });
        }
    });

    return AdminView;
});
