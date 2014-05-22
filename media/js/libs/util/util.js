/**
* Javascript Utility
* Author:       Edison
* Description:  The util class contains different tools
*               to facilitate developers
* Date:         06/29/2013
**/
(function(window) {
    window.Util = function($) {
        /**
         * return ajax deferred obj
         * @param  {[string]} url
         * @param  {[string]} type
         * @param  {[object]} data
         */
        var xhr = function(url, type, data) {
            if (type !== 'POST') {
                type = 'GET';
            }
            if (typeof url !== 'undefined') {

                return $.ajax({
                    'url': url,
                    'type': type,
                    'data': data
                });
            }
        };

        /**
         * get a specific cookie value
         * @param  {[string]} name
         */
        var getCookie = function(name) {
            var cookie = document.cookie;
            var start_index = cookie.indexOf(' ' + name + '=');
            if (start_index == -1) {
                start_index = cookie.indexOf(name + '=');
            }
            if (start_index == -1) {
                cookie = null;
            }
            else {
                start_index = cookie.indexOf('=', start_index) + 1;
                var end_index = cookie.indexOf(';', start_index);
            if (end_index == -1) {
                end_index = cookie.length;
            }
                cookie = unescape(cookie.substring(start_index, end_index));
            }
            return cookie;
        };

        /**
         * set a cookie with a specific expire day, if the
         * the expire day is not passed. the cookie will
         * expire after one year.
         * @param  {[string]} name
         * @param  {[string]} value
         * @param  {[integer]} exdays
         */
        var setCookie = function(name, value, exdays) {
            if (typeof exdays === 'undefined') {
                exdays = 365;
            }
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value);
            c_value += (exdays == null) ?
                     '' : '; expires=' + exdate.toUTCString();
            document.cookie = name + '=' + c_value;
        };

        /**
         * check if a specific cookie exsit
         * @param  {[string]} name
         */
        var hasCookie = function(name) {
            var exist = false;
            var cookies = document.cookie.split('; ');
            for (var i = 0; i < cookies.length; i++) {
                var c_name = cookies[i].substring(0, cookies[i].indexOf('='));
                if (name === c_name) {
                    exist = true;
                }
            }

            return exist;
        };

        /**
         * remove a specific cookie
         * @param  {[string]} name
         */
        var removeCookie = function(name) {
            var c_date = new Date();
            c_date.setTime(c_date.getTime() - 1);
            document.cookie = name += '=; expires=' + c_date.toGMTString();
        };

        /**
         * generate div with error as classname and find parent div
         * and insert the div
         * @param  {[string]} selector
         * @param  {[string]} message
         */
        var generateErrorMsg = function(selector, message) {
            current_div = $(selector);
            current_div.after("<span class='error'>" + message + "</span>");
        }

        /**
         * removes error msg
         * @param  {[string]} selector id or classname
         */
        var removeErrorMsg = function(selector) {
            var $sel = $(selector);
            if ($sel.hasClass('error')) {
                $sel.remove();
            } else {
                $sel.siblings('.error').remove();
            }
        }

        /**
         * generate a jquery ui dialog box with the content
         * and append into the parent.
         * Drap, Resize, Move and Close
         * @param  {[selector string]} content [dialog content]
         * @param  {[selector string]} parent  [the container of the content]
         */
        var contentDialog = function (content, parent){
            var parent_width = $(parent).width();
            var parent_height = $(parent).height();
            var ratio = 0.6;
            $(content).dialog({
                appendTo: parent,
                closeOnEscape: true,
                width: parent_width * ratio,
                height: parent_height * ratio,
                position: {my: "center", at: "center", of: parent},
                close: function(event, ui) {
                    $(this).dialog("destroy");
                }
            }).parent().resizable({
                containment: parent
            }).draggable({
                containment: parent,
                opacity: 0.7
            });
        };

        /**
         * A key map t
         * @param  take key as a string
         * @return corrsponding value to the key
         */
        var getKeyCode = function(key) {
            var keycode = {
                'enter': 13,
                'shift': 16,
                'ctrl': 17
            };

            if (!(key in keycode)) {
                return;
            }

            return keycode[key];
        };

        /**
         * Gett he
         * @param  {[type]} queryString [description]
         * @return {[type]}             [description]
         */
        var parseQueryString = function(queryString) {
            var params = {};
            if(queryString){
                _.each(
                    _.map(decodeURI(queryString).split(/&/g),function(el,i){
                        var aux = el.split('='), o = {};
                        if(aux.length >= 1){
                            var val = undefined;
                            if(aux.length == 2)
                                val = aux[1];
                            o[aux[0]] = val;
                        }
                        return o;
                    }),
                    function(o){
                        _.extend(params,o);
                    }
                );
            }
            return params;
        }

        //Reset textbox values for current form
        var clearFormInput = function(){
            $(':input[type=text]').each(function(){
                $(this).val('');
            });
            $('textarea').each(function(){
                $(this).val('');
            });
        };

        /**
        Returns a datetime with a fromat like '2014-3-8 hh:mm:ss'
        *@param d = new Date()
        **/
        var getFormatDate = function(d){
            var month = d.getMonth()+1;
            var day = d.getDate();
            var hour = d.getHours();
            var minute = d.getMinutes();
            var second = d.getSeconds();

            var output = d.getFullYear() + '-' +
                ((''+month).length<2 ? '0' : '') + month + '-' +
                ((''+day).length<2 ? '0' : '') + day + ' ' +
                ((''+hour).length<2 ? '0' :'') + hour + ':' +
                ((''+minute).length<2 ? '0' :'') + minute + ':' +
                ((''+second).length<2 ? '0' :'') + second;

            return output;
        };

        function isValidEmailAddress(emailAddress) {
            var pattern = new RegExp(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i);
            return pattern.test(emailAddress);
        };

        var mapping_en = {
            'bedrooms': 'bedrooms',
            'bathrooms': 'bathrooms',
            'storage': 'storage',
            'price': 'price',
            'propertytype': 'property type',
            'buildingtype': 'building type',
            'floorarea': 'floor area',
            'lotsize': 'lot size',
            'parking': 'parking',
            'age': 'age',
            'address': 'address',
            'city': 'city',
            'province': 'province',
            'country': 'country',
            'description': 'description',
            'mlsnumber': 'mls number'
        };

        var mapping_cn = {
            'bedrooms': '卧室',
            'bathrooms': '卫生间',
            'storage': '储藏室',
            'price': '价格',
            'propertytype': 'property type',
            'buildingtype': 'building type',
            'floorarea': 'floor area',
            'lotsize': 'lot size',
            'parking': '停车位',
            'age': '屋龄',
            'address': '地址',
            'city': '城市',
            'province': '省份',
            'country': '国家',
            'description': '详细信息',
            'mlsnumber': 'mls number'
        };

        return {
            'xhr': xhr,
            'getCookie': getCookie,
            'setCookie': setCookie,
            'hasCookie': hasCookie,
            'removeCookie': removeCookie,
            'generateErrorMsg': generateErrorMsg,
            'removeErrorMsg': removeErrorMsg,
            'contentDialog': contentDialog,
            'getKeyCode': getKeyCode,
            'parseQueryString': parseQueryString,
            'clearFormInput': clearFormInput,
            'mapping_en': mapping_en,
            'mapping_cn': mapping_cn,
            'getFormatDate': getFormatDate,
            'isValidEmailAddress': isValidEmailAddress
        };
    };
})(window);
