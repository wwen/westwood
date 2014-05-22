/**
* Contact Model
* Author:       Lei
* Description:  Define a backbone contact model
* Date:         02/20/2014
**/

define([
    'jquery-all',
    'underscore',
    'backbone',
    'util'
], function($, _, Backbone, Util) {

    var ContactModel = Backbone.Model.extend({
        urlRoot: 'contact'
    });

    return ContactModel;
});
