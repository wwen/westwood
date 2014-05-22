/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
* Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */(function(e){e.extend(e.fn,{validate:function(n){if(!this.length)return n&&n.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."),void 0;var r=e.data(this[0],"validator");return r?r:(this.attr("novalidate","novalidate"),r=new e.validator(n,this[0]),e.data(this[0],"validator",r),r.settings.onsubmit&&(this.validateDelegate(":submit","click",function(n){r.settings.submitHandler&&(r.submitButton=n.target),e(n.target).hasClass("cancel")&&(r.cancelSubmit=!0),void 0!==e(n.target).attr("formnovalidate")&&(r.cancelSubmit=!0)}),this.submit(function(n){function s(){var s;return r.settings.submitHandler?(r.submitButton&&(s=e("<input type='hidden'/>").attr("name",r.submitButton.name).val(e(r.submitButton).val()).appendTo(r.currentForm)),r.settings.submitHandler.call(r,r.currentForm,n),r.submitButton&&s.remove(),!1):!0}return r.settings.debug&&n.preventDefault(),r.cancelSubmit?(r.cancelSubmit=!1,s()):r.form()?r.pendingRequest?(r.formSubmitted=!0,!1):s():(r.focusInvalid(),!1)})),r)},valid:function(){if(e(this[0]).is("form"))return this.validate().form();var n=!0,r=e(this[0].form).validate();return this.each(function(){n=n&&r.element(this)}),n},removeAttrs:function(n){var r={},i=this;return e.each(n.split(/\s/),function(e,t){r[t]=i.attr(t),i.removeAttr(t)}),r},rules:function(n,r){var i=this[0];if(n){var s=e.data(i.form,"validator").settings,o=s.rules,u=e.validator.staticRules(i);switch(n){case"add":e.extend(u,e.validator.normalizeRule(r)),delete u.messages,o[i.name]=u,r.messages&&(s.messages[i.name]=e.extend(s.messages[i.name],r.messages));break;case"remove":if(!r)return delete o[i.name],u;var a={};return e.each(r.split(/\s/),function(e,t){a[t]=u[t],delete u[t]}),a}}var f=e.validator.normalizeRules(e.extend({},e.validator.classRules(i),e.validator.attributeRules(i),e.validator.dataRules(i),e.validator.staticRules(i)),i);if(f.required){var l=f.required;delete f.required,f=e.extend({required:l},f)}return f}}),e.extend(e.expr[":"],{blank:function(n){return!e.trim(""+e(n).val())},filled:function(n){return!!e.trim(""+e(n).val())},unchecked:function(n){return!e(n).prop("checked")}}),e.validator=function(n,r){this.settings=e.extend(!0,{},e.validator.defaults,n),this.currentForm=r,this.init()},e.validator.format=function(n,r){return 1===arguments.length?function(){var r=e.makeArray(arguments);return r.unshift(n),e.validator.format.apply(this,r)}:(arguments.length>2&&r.constructor!==Array&&(r=e.makeArray(arguments).slice(1)),r.constructor!==Array&&(r=[r]),e.each(r,function(e,t){n=n.replace(RegExp("\\{"+e+"\\}","g"),function(){return t})}),n)},e.extend(e.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:e([]),errorLabelContainer:e([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(e){this.lastActive=e,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,e,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(e)).hide())},onfocusout:function(e){this.checkable(e)||!(e.name in this.submitted)&&this.optional(e)||this.element(e)},onkeyup:function(e,t){(9!==t.which||""!==this.elementValue(e))&&(e.name in this.submitted||e===this.lastElement)&&this.element(e)},onclick:function(e){e.name in this.submitted?this.element(e):e.parentNode.name in this.submitted&&this.element(e.parentNode)},highlight:function(n,r,i){"radio"===n.type?this.findByName(n.name).addClass(r).removeClass(i):e(n).addClass(r).removeClass(i)},unhighlight:function(n,r,i){"radio"===n.type?this.findByName(n.name).removeClass(r).addClass(i):e(n).removeClass(r).addClass(i)}},setDefaults:function(n){e.extend(e.validator.defaults,n)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:e.validator.format("Please enter no more than {0} characters."),minlength:e.validator.format("Please enter at least {0} characters."),rangelength:e.validator.format("Please enter a value between {0} and {1} characters long."),range:e.validator.format("Please enter a value between {0} and {1}."),max:e.validator.format("Please enter a value less than or equal to {0}."),min:e.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function n(n){var r=e.data(this[0].form,"validator"),i="on"+n.type.replace(/^validate/,"");r.settings[i]&&r.settings[i].call(r,this[0],n)}this.labelContainer=e(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||e(this.currentForm),this.containers=e(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var r=this.groups={};e.each(this.settings.groups,function(n,i){"string"==typeof i&&(i=i.split(/\s/)),e.each(i,function(e,t){r[t]=n})});var i=this.settings.rules;e.each(i,function(n,r){i[n]=e.validator.normalizeRule(r)}),e(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",n).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",n),this.settings.invalidHandler&&e(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),e.extend(this.submitted,this.errorMap),this.invalid=e.extend({},this.errorMap),this.valid()||e(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var e=0,t=this.currentElements=this.elements();t[e];e++)this.check(t[e]);return this.valid()},element:function(n){n=this.validationTargetFor(this.clean(n)),this.lastElement=n,this.prepareElement(n),this.currentElements=e(n);var r=this.check(n)!==!1;return r?delete this.invalid[n.name]:this.invalid[n.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),r},showErrors:function(n){if(n){e.extend(this.errorMap,n),this.errorList=[];for(var r in n)this.errorList.push({message:n[r],element:this.findByName(r)[0]});this.successList=e.grep(this.successList,function(e){return!(e.name in n)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){e.fn.resetForm&&e(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(e){var t=0;for(var n in e)t++;return t},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{e(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(n){}},findLastActive:function(){var n=this.lastActive;return n&&1===e.grep(this.errorList,function(e){return e.element.name===n.name}).length&&n},elements:function(){var n=this,r={};return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&n.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in r||!n.objectLength(e(this).rules())?!1:(r[this.name]=!0,!0)})},clean:function(n){return e(n)[0]},errors:function(){var n=this.settings.errorClass.replace(" ",".");return e(this.settings.errorElement+"."+n,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=e([]),this.toHide=e([]),this.currentElements=e([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(e){this.reset(),this.toHide=this.errorsFor(e)},elementValue:function(n){var r=e(n).attr("type"),i=e(n).val();return"radio"===r||"checkbox"===r?e("input[name='"+e(n).attr("name")+"']:checked").val():"string"==typeof i?i.replace(/\r/g,""):i},check:function(n){n=this.validationTargetFor(this.clean(n));var r,i=e(n).rules(),s=!1,o=this.elementValue(n);for(var u in i){var a={method:u,parameters:i[u]};try{if(r=e.validator.methods[u].call(this,o,n,a.parameters),"dependency-mismatch"===r){s=!0;continue}if(s=!1,"pending"===r)return this.toHide=this.toHide.not(this.errorsFor(n)),void 0;if(!r)return this.formatAndAdd(n,a),!1}catch(f){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+n.id+", check the '"+a.method+"' method.",f),f}}return s?void 0:(this.objectLength(i)&&this.successList.push(n),!0)},customDataMessage:function(n,r){return e(n).data("msg-"+r.toLowerCase())||n.attributes&&e(n).attr("data-msg-"+r.toLowerCase())},customMessage:function(e,t){var n=this.settings.messages[e];return n&&(n.constructor===String?n:n[t])},findDefined:function(){for(var e=0;arguments.length>e;e++)if(void 0!==arguments[e])return arguments[e];return void 0},defaultMessage:function(n,r){return this.findDefined(this.customMessage(n.name,r),this.customDataMessage(n,r),!this.settings.ignoreTitle&&n.title||void 0,e.validator.messages[r],"<strong>Warning: No message defined for "+n.name+"</strong>")},formatAndAdd:function(n,r){var i=this.defaultMessage(n,r.method),s=/\$?\{(\d+)\}/g;"function"==typeof i?i=i.call(this,r.parameters,n):s.test(i)&&(i=e.validator.format(i.replace(s,"{$1}"),r.parameters)),this.errorList.push({message:i,element:n}),this.errorMap[n.name]=i,this.submitted[n.name]=i},addWrapper:function(e){return this.settings.wrapper&&(e=e.add(e.parent(this.settings.wrapper))),e},defaultShowErrors:function(){var e,t;for(e=0;this.errorList[e];e++){var n=this.errorList[e];this.settings.highlight&&this.settings.highlight.call(this,n.element,this.settings.errorClass,this.settings.validClass),this.showLabel(n.element,n.message)}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(e=0;this.successList[e];e++)this.showLabel(this.successList[e]);if(this.settings.unhighlight)for(e=0,t=this.validElements();t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return e(this.errorList).map(function(){return this.element})},showLabel:function(n,r){var i=this.errorsFor(n);i.length?(i.removeClass(this.settings.validClass).addClass(this.settings.errorClass),i.html(r)):(i=e("<"+this.settings.errorElement+">").attr("for",this.idOrName(n)).addClass(this.settings.errorClass).html(r||""),this.settings.wrapper&&(i=i.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(i).length||(this.settings.errorPlacement?this.settings.errorPlacement(i,e(n)):i.insertAfter(n))),!r&&this.settings.success&&(i.text(""),"string"==typeof this.settings.success?i.addClass(this.settings.success):this.settings.success(i,n)),this.toShow=this.toShow.add(i)},errorsFor:function(n){var r=this.idOrName(n);return this.errors().filter(function(){return e(this).attr("for")===r})},idOrName:function(e){return this.groups[e.name]||(this.checkable(e)?e.name:e.id||e.name)},validationTargetFor:function(e){return this.checkable(e)&&(e=this.findByName(e.name).not(this.settings.ignore)[0]),e},checkable:function(e){return/radio|checkbox/i.test(e.type)},findByName:function(n){return e(this.currentForm).find("[name='"+n+"']")},getLength:function(n,r){switch(r.nodeName.toLowerCase()){case"select":return e("option:selected",r).length;case"input":if(this.checkable(r))return this.findByName(r.name).filter(":checked").length}return n.length},depend:function(e,t){return this.dependTypes[typeof e]?this.dependTypes[typeof e](e,t):!0},dependTypes:{"boolean":function(e){return e},string:function(n,r){return!!e(n,r.form).length},"function":function(e,t){return e(t)}},optional:function(n){var r=this.elementValue(n);return!e.validator.methods.required.call(this,r,n)&&"dependency-mismatch"},startRequest:function(e){this.pending[e.name]||(this.pendingRequest++,this.pending[e.name]=!0)},stopRequest:function(n,r){this.pendingRequest--,0>this.pendingRequest&&(this.pendingRequest=0),delete this.pending[n.name],r&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(e(this.currentForm).submit(),this.formSubmitted=!1):!r&&0===this.pendingRequest&&this.formSubmitted&&(e(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(n){return e.data(n,"previousValue")||e.data(n,"previousValue",{old:null,valid:!0,message:this.defaultMessage(n,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(n,r){n.constructor===String?this.classRuleSettings[n]=r:e.extend(this.classRuleSettings,n)},classRules:function(n){var r={},i=e(n).attr("class");return i&&e.each(i.split(" "),function(){this in e.validator.classRuleSettings&&e.extend(r,e.validator.classRuleSettings[this])}),r},attributeRules:function(n){var r={},i=e(n),s=i[0].getAttribute("type");for(var o in e.validator.methods){var u;"required"===o?(u=i.get(0).getAttribute(o),""===u&&(u=!0),u=!!u):u=i.attr(o),/min|max/.test(o)&&(null===s||/number|range|text/.test(s))&&(u=Number(u)),u?r[o]=u:s===o&&"range"!==s&&(r[o]=!0)}return r.maxlength&&/-1|2147483647|524288/.test(r.maxlength)&&delete r.maxlength,r},dataRules:function(n){var r,i,s={},o=e(n);for(r in e.validator.methods)i=o.data("rule-"+r.toLowerCase()),void 0!==i&&(s[r]=i);return s},staticRules:function(n){var r={},i=e.data(n.form,"validator");return i.settings.rules&&(r=e.validator.normalizeRule(i.settings.rules[n.name])||{}),r},normalizeRules:function(n,r){return e.each(n,function(s,o){if(o===!1)return delete n[s],void 0;if(o.param||o.depends){var u=!0;switch(typeof o.depends){case"string":u=!!e(o.depends,r.form).length;break;case"function":u=o.depends.call(r,r)}u?n[s]=void 0!==o.param?o.param:!0:delete n[s]}}),e.each(n,function(s,o){n[s]=e.isFunction(o)?o(r):o}),e.each(["minlength","maxlength"],function(){n[this]&&(n[this]=Number(n[this]))}),e.each(["rangelength","range"],function(){var r;n[this]&&(e.isArray(n[this])?n[this]=[Number(n[this][0]),Number(n[this][1])]:"string"==typeof n[this]&&(r=n[this].split(/[\s,]+/),n[this]=[Number(r[0]),Number(r[1])]))}),e.validator.autoCreateRanges&&(n.min&&n.max&&(n.range=[n.min,n.max],delete n.min,delete n.max),n.minlength&&n.maxlength&&(n.rangelength=[n.minlength,n.maxlength],delete n.minlength,delete n.maxlength)),n},normalizeRule:function(n){if("string"==typeof n){var r={};e.each(n.split(/\s/),function(){r[this]=!0}),n=r}return n},addMethod:function(n,r,i){e.validator.methods[n]=r,e.validator.messages[n]=void 0!==i?i:e.validator.messages[n],3>r.length&&e.validator.addClassRules(n,e.validator.normalizeRule(n))},methods:{required:function(n,r,i){if(!this.depend(i,r))return"dependency-mismatch";if("select"===r.nodeName.toLowerCase()){var s=e(r).val();return s&&s.length>0}return this.checkable(r)?this.getLength(n,r)>0:e.trim(n).length>0},email:function(e,t){return this.optional(t)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e)},url:function(e,t){return this.optional(t)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)},date:function(e,t){return this.optional(t)||!/Invalid|NaN/.test(""+new Date(e))},dateISO:function(e,t){return this.optional(t)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(e)},number:function(e,t){return this.optional(t)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)},digits:function(e,t){return this.optional(t)||/^\d+$/.test(e)},mls:function(e,t){return this.optional(t)||/^(v|V)[0-9]{7}$/.test(e)},creditcard:function(e,t){if(this.optional(t))return"dependency-mismatch";if(/[^0-9 \-]+/.test(e))return!1;var n=0,r=0,i=!1;e=e.replace(/\D/g,"");for(var s=e.length-1;s>=0;s--){var o=e.charAt(s);r=parseInt(o,10),i&&(r*=2)>9&&(r-=9),n+=r,i=!i}return 0===n%10},minlength:function(n,r,i){var s=e.isArray(n)?n.length:this.getLength(e.trim(n),r);return this.optional(r)||s>=i},maxlength:function(n,r,i){var s=e.isArray(n)?n.length:this.getLength(e.trim(n),r);return this.optional(r)||i>=s},rangelength:function(n,r,i){var s=e.isArray(n)?n.length:this.getLength(e.trim(n),r);return this.optional(r)||s>=i[0]&&i[1]>=s},min:function(e,t,n){return this.optional(t)||e>=n},max:function(e,t,n){return this.optional(t)||n>=e},range:function(e,t,n){return this.optional(t)||e>=n[0]&&n[1]>=e},equalTo:function(n,r,i){var s=e(i);return this.settings.onfocusout&&s.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){e(r).valid()}),n===s.val()},remote:function(n,r,i){if(this.optional(r))return"dependency-mismatch";var s=this.previousValue(r);if(this.settings.messages[r.name]||(this.settings.messages[r.name]={}),s.originalMessage=this.settings.messages[r.name].remote,this.settings.messages[r.name].remote=s.message,i="string"==typeof i&&{url:i}||i,s.old===n)return s.valid;s.old=n;var o=this;this.startRequest(r);var u={};return u[r.name]=n,e.ajax(e.extend(!0,{url:i,mode:"abort",port:"validate"+r.name,dataType:"json",data:u,success:function(i){o.settings.messages[r.name].remote=s.originalMessage;var u=i===!0||"true"===i;if(u){var a=o.formSubmitted;o.prepareElement(r),o.formSubmitted=a,o.successList.push(r),delete o.invalid[r.name],o.showErrors()}else{var f={},l=i||o.defaultMessage(r,"remote");f[r.name]=s.message=e.isFunction(l)?l(n):l,o.invalid[r.name]=!0,o.showErrors(f)}s.valid=u,o.stopRequest(r,u)}},i)),"pending"}}}),e.format=e.validator.format})(jQuery),function(e){var t={};if(e.ajaxPrefilter)e.ajaxPrefilter(function(e,n,r){var i=e.port;"abort"===e.mode&&(t[i]&&t[i].abort(),t[i]=r)});else{var n=e.ajax;e.ajax=function(r){var s=("mode"in r?r:e.ajaxSettings).mode,o=("port"in r?r:e.ajaxSettings).port;return"abort"===s?(t[o]&&t[o].abort(),t[o]=n.apply(this,arguments),t[o]):n.apply(this,arguments)}}}(jQuery),function(e){e.extend(e.fn,{validateDelegate:function(n,r,i){return this.bind(r,function(r){var o=e(r.target);return o.is(n)?i.apply(o,arguments):void 0})}})}(jQuery)