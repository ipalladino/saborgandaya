/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
!function(e){"use strict";e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",d),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var p in m.extraData)m.extraData.hasOwnProperty(p)&&l.push(e.isPlainObject(m.extraData[p])&&m.extraData[p].hasOwnProperty("name")&&m.extraData[p].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[p].name+'">').val(m.extraData[p].value).appendTo(w)[0]:e('<input type="hidden" name="'+p+'">').val(m.extraData[p]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var d=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];d?x.responseText=d.textContent?d.textContent:d.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(b){i="parsererror",x.error=r=b||i}}catch(b){a("error caught: ",b),i="error",x.error=r=b||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),p&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),p&&e.event.trigger("ajaxError",[x,m,r])),p&&e.event.trigger("ajaxComplete",[x,m]),p&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,p,d,v,g,x,b,y,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,d="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),y=v.attr2("name"),y?d=y:v.attr2("name",d)):(v=e('<iframe name="'+d+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),p&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},p=m.global,p&&0===e.active++&&e.event.trigger("ajaxStart"),p&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;b=w.clk,b&&(y=b.name,y&&!b.disabled&&(m.extraData=m.extraData||{},m.extraData[y]=b.value,"image"==b.type&&(m.extraData[y+".x"]=w.clk_x,m.extraData[y+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var p=t.traditional;void 0===p&&(p=e.ajaxSettings.traditional);var d,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,d=e.param(t.data,p)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,p);d&&(g=g?g+"&"+d:d),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var b=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(b,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var y=t.error;t.error=function(e,r,a){var n=t.context||this;y.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,p,d,h;for(c=0,d=u.length;d>c;c++)if(p=u[c],f=p.name,f&&!p.disabled)if(t&&o.clk&&"image"==p.type)o.clk==p&&(a.push({name:f,value:e(p).val(),type:p.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(p,!0),m&&m.constructor==Array)for(r&&r.push(p),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==p.type){r&&r.push(p);var v=p.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:p.type});else a.push({name:f,value:"",type:p.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(p),a.push({name:f,value:m,type:p.type,required:p.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var p=m.value;if(p||(p=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return p;s.push(p)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});;
/*! jQuery UI - v1.11.4 - 2015-09-25
* http://jqueryui.com
* Includes: core.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define("jquery.ui",["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}}});;

/*
 * jQuery UI Datepicker 1.8.7
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function(d,G){function K(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass=
"ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su",
"Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",
minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};d.extend(this._defaults,this.regional[""]);this.dpDiv=d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')}function E(a,b){d.extend(a,b);for(var c in b)if(b[c]==
null||b[c]==G)a[c]=b[c];return a}d.extend(d.ui,{datepicker:{version:"1.8.7"}});var y=(new Date).getTime();d.extend(K.prototype,{markerClassName:"hasDatepicker",log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){E(this._defaults,a||{});return this},_attachDatepicker:function(a,b){var c=null;for(var e in this._defaults){var f=a.getAttribute("date:"+e);if(f){c=c||{};try{c[e]=eval(f)}catch(h){c[e]=f}}}e=a.nodeName.toLowerCase();
f=e=="div"||e=="span";if(!a.id){this.uuid+=1;a.id="dp"+this.uuid}var i=this._newInst(d(a),f);i.settings=d.extend({},b||{},c||{});if(e=="input")this._connectDatepicker(a,i);else f&&this._inlineDatepicker(a,i)},_newInst:function(a,b){return{id:a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:!b?this.dpDiv:d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')}},
_connectDatepicker:function(a,b){var c=d(a);b.append=d([]);b.trigger=d([]);if(!c.hasClass(this.markerClassName)){this._attachments(c,b);c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});this._autoSize(b);d.data(a,"datepicker",b)}},_attachments:function(a,b){var c=this._get(b,"appendText"),e=this._get(b,"isRTL");b.append&&
b.append.remove();if(c){b.append=d('<span class="'+this._appendClass+'">'+c+"</span>");a[e?"before":"after"](b.append)}a.unbind("focus",this._showDatepicker);b.trigger&&b.trigger.remove();c=this._get(b,"showOn");if(c=="focus"||c=="both")a.focus(this._showDatepicker);if(c=="button"||c=="both"){c=this._get(b,"buttonText");var f=this._get(b,"buttonImage");b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({src:f,alt:c,title:c}):d('<button type="button"></button>').addClass(this._triggerClass).html(f==
""?c:d("<img/>").attr({src:f,alt:c,title:c})));a[e?"before":"after"](b.trigger);b.trigger.click(function(){d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);return false})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var e=function(f){for(var h=0,i=0,g=0;g<f.length;g++)if(f[g].length>h){h=f[g].length;i=g}return i};b.setMonth(e(this._get(a,
c.match(/MM/)?"monthNames":"monthNamesShort")));b.setDate(e(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=d(a);if(!c.hasClass(this.markerClassName)){c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});d.data(a,"datepicker",b);this._setDate(b,this._getDefaultDate(b),
true);this._updateDatepicker(b);this._updateAlternate(b);b.dpDiv.show()}},_dialogDatepicker:function(a,b,c,e,f){a=this._dialogInst;if(!a){this.uuid+=1;this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);d("body").append(this._dialogInput);a=this._dialogInst=this._newInst(this._dialogInput,false);a.settings={};d.data(this._dialogInput[0],"datepicker",a)}E(a.settings,e||{});
b=b&&b.constructor==Date?this._formatDate(a,b):b;this._dialogInput.val(b);this._pos=f?f.length?f:[f.pageX,f.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");a.settings.onSelect=c;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);d.blockUI&&d.blockUI(this.dpDiv);d.data(this._dialogInput[0],"datepicker",a);return this},_destroyDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();d.removeData(a,"datepicker");if(e=="input"){c.append.remove();c.trigger.remove();b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",
this._doKeyUp)}else if(e=="div"||e=="span")b.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=false;c.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().removeClass("ui-state-disabled");this._disabledInputs=d.map(this._disabledInputs,
function(f){return f==a?null:f})}},_disableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=true;c.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else if(e=="div"||e=="span")b.children("."+this._inlineClass).children().addClass("ui-state-disabled");this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:
f});this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return false;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return true;return false},_getInst:function(a){try{return d.data(a,"datepicker")}catch(b){throw"Missing instance data for this datepicker";}},_optionDatepicker:function(a,b,c){var e=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},
e.settings):this._get(e,b):null;var f=b||{};if(typeof b=="string"){f={};f[b]=c}if(e){this._curInst==e&&this._hideDatepicker();var h=this._getDateDatepicker(a,true);E(e.settings,f);this._attachments(d(a),e);this._autoSize(e);this._setDateDatepicker(a,h);this._updateDatepicker(e)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)},_setDateDatepicker:function(a,b){if(a=this._getInst(a)){this._setDate(a,b);
this._updateDatepicker(a);this._updateAlternate(a)}},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&!a.inline&&this._setDateFromField(a,b);return a?this._getDate(a):null},_doKeyDown:function(a){var b=d.datepicker._getInst(a.target),c=true,e=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=true;if(d.datepicker._datepickerShowing)switch(a.keyCode){case 9:d.datepicker._hideDatepicker();c=false;break;case 13:c=d("td."+d.datepicker._dayOverClass+":not(."+d.datepicker._currentClass+")",b.dpDiv);c[0]?
d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]):d.datepicker._hideDatepicker();return false;case 27:d.datepicker._hideDatepicker();break;case 33:d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 34:d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 35:if(a.ctrlKey||a.metaKey)d.datepicker._clearDate(a.target);c=a.ctrlKey||
a.metaKey;break;case 36:if(a.ctrlKey||a.metaKey)d.datepicker._gotoToday(a.target);c=a.ctrlKey||a.metaKey;break;case 37:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?+1:-1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 38:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,-7,"D");c=a.ctrlKey||a.metaKey;break;case 39:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,
e?-1:+1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 40:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,+7,"D");c=a.ctrlKey||a.metaKey;break;default:c=false}else if(a.keyCode==36&&a.ctrlKey)d.datepicker._showDatepicker(this);else c=false;if(c){a.preventDefault();a.stopPropagation()}},_doKeyPress:function(a){var b=d.datepicker._getInst(a.target);if(d.datepicker._get(b,
"constrainInput")){b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));var c=String.fromCharCode(a.charCode==G?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||c<" "||!b||b.indexOf(c)>-1}},_doKeyUp:function(a){a=d.datepicker._getInst(a.target);if(a.input.val()!=a.lastVal)try{if(d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),a.input?a.input.val():null,d.datepicker._getFormatConfig(a))){d.datepicker._setDateFromField(a);d.datepicker._updateAlternate(a);d.datepicker._updateDatepicker(a)}}catch(b){d.datepicker.log(b)}return true},
_showDatepicker:function(a){a=a.target||a;if(a.nodeName.toLowerCase()!="input")a=d("input",a.parentNode)[0];if(!(d.datepicker._isDisabledDatepicker(a)||d.datepicker._lastInput==a)){var b=d.datepicker._getInst(a);d.datepicker._curInst&&d.datepicker._curInst!=b&&d.datepicker._curInst.dpDiv.stop(true,true);var c=d.datepicker._get(b,"beforeShow");E(b.settings,c?c.apply(a,[a,b]):{});b.lastVal=null;d.datepicker._lastInput=a;d.datepicker._setDateFromField(b);if(d.datepicker._inDialog)a.value="";if(!d.datepicker._pos){d.datepicker._pos=
d.datepicker._findPos(a);d.datepicker._pos[1]+=a.offsetHeight}var e=false;d(a).parents().each(function(){e|=d(this).css("position")=="fixed";return!e});if(e&&d.browser.opera){d.datepicker._pos[0]-=document.documentElement.scrollLeft;d.datepicker._pos[1]-=document.documentElement.scrollTop}c={left:d.datepicker._pos[0],top:d.datepicker._pos[1]};d.datepicker._pos=null;b.dpDiv.empty();b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});d.datepicker._updateDatepicker(b);c=d.datepicker._checkOffset(b,
c,e);b.dpDiv.css({position:d.datepicker._inDialog&&d.blockUI?"static":e?"fixed":"absolute",display:"none",left:c.left+"px",top:c.top+"px"});if(!b.inline){c=d.datepicker._get(b,"showAnim");var f=d.datepicker._get(b,"duration"),h=function(){d.datepicker._datepickerShowing=true;var i=b.dpDiv.find("iframe.ui-datepicker-cover");if(i.length){var g=d.datepicker._getBorders(b.dpDiv);i.css({left:-g[0],top:-g[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex(d(a).zIndex()+1);d.effects&&
d.effects[c]?b.dpDiv.show(c,d.datepicker._get(b,"showOptions"),f,h):b.dpDiv[c||"show"](c?f:null,h);if(!c||!f)h();b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus();d.datepicker._curInst=b}}},_updateDatepicker:function(a){var b=this,c=d.datepicker._getBorders(a.dpDiv);a.dpDiv.empty().append(this._generateHTML(a));var e=a.dpDiv.find("iframe.ui-datepicker-cover");e.length&&e.css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()});a.dpDiv.find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",
function(){d(this).removeClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=-1&&d(this).removeClass("ui-datepicker-prev-hover");this.className.indexOf("ui-datepicker-next")!=-1&&d(this).removeClass("ui-datepicker-next-hover")}).bind("mouseover",function(){if(!b._isDisabledDatepicker(a.inline?a.dpDiv.parent()[0]:a.input[0])){d(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");d(this).addClass("ui-state-hover");this.className.indexOf("ui-datepicker-prev")!=
-1&&d(this).addClass("ui-datepicker-prev-hover");this.className.indexOf("ui-datepicker-next")!=-1&&d(this).addClass("ui-datepicker-next-hover")}}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end();c=this._getNumberOfMonths(a);e=c[1];e>1?a.dpDiv.addClass("ui-datepicker-multi-"+e).css("width",17*e+"em"):a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");a.dpDiv[(c[0]!=1||c[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");a.dpDiv[(this._get(a,
"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");a==d.datepicker._curInst&&d.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input.focus();if(a.yearshtml){var f=a.yearshtml;setTimeout(function(){f===a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml);f=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(c){return{thin:1,medium:2,thick:3}[c]||c};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},
_checkOffset:function(a,b,c){var e=a.dpDiv.outerWidth(),f=a.dpDiv.outerHeight(),h=a.input?a.input.outerWidth():0,i=a.input?a.input.outerHeight():0,g=document.documentElement.clientWidth+d(document).scrollLeft(),j=document.documentElement.clientHeight+d(document).scrollTop();b.left-=this._get(a,"isRTL")?e-h:0;b.left-=c&&b.left==a.input.offset().left?d(document).scrollLeft():0;b.top-=c&&b.top==a.input.offset().top+i?d(document).scrollTop():0;b.left-=Math.min(b.left,b.left+e>g&&g>e?Math.abs(b.left+e-
g):0);b.top-=Math.min(b.top,b.top+f>j&&j>f?Math.abs(f+i):0);return b},_findPos:function(a){for(var b=this._get(this._getInst(a),"isRTL");a&&(a.type=="hidden"||a.nodeType!=1);)a=a[b?"previousSibling":"nextSibling"];a=d(a).offset();return[a.left,a.top]},_hideDatepicker:function(a){var b=this._curInst;if(!(!b||a&&b!=d.data(a,"datepicker")))if(this._datepickerShowing){a=this._get(b,"showAnim");var c=this._get(b,"duration"),e=function(){d.datepicker._tidyDialog(b);this._curInst=null};d.effects&&d.effects[a]?
b.dpDiv.hide(a,d.datepicker._get(b,"showOptions"),c,e):b.dpDiv[a=="slideDown"?"slideUp":a=="fadeIn"?"fadeOut":"hide"](a?c:null,e);a||e();if(a=this._get(b,"onClose"))a.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b]);this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if(d.blockUI){d.unblockUI();d("body").append(this.dpDiv)}}this._inDialog=false}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},
_checkExternalClick:function(a){if(d.datepicker._curInst){a=d(a.target);a[0].id!=d.datepicker._mainDivId&&a.parents("#"+d.datepicker._mainDivId).length==0&&!a.hasClass(d.datepicker.markerClassName)&&!a.hasClass(d.datepicker._triggerClass)&&d.datepicker._datepickerShowing&&!(d.datepicker._inDialog&&d.blockUI)&&d.datepicker._hideDatepicker()}},_adjustDate:function(a,b,c){a=d(a);var e=this._getInst(a[0]);if(!this._isDisabledDatepicker(a[0])){this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):
0),c);this._updateDatepicker(e)}},_gotoToday:function(a){a=d(a);var b=this._getInst(a[0]);if(this._get(b,"gotoCurrent")&&b.currentDay){b.selectedDay=b.currentDay;b.drawMonth=b.selectedMonth=b.currentMonth;b.drawYear=b.selectedYear=b.currentYear}else{var c=new Date;b.selectedDay=c.getDate();b.drawMonth=b.selectedMonth=c.getMonth();b.drawYear=b.selectedYear=c.getFullYear()}this._notifyChange(b);this._adjustDate(a)},_selectMonthYear:function(a,b,c){a=d(a);var e=this._getInst(a[0]);e._selectingMonthYear=
false;e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10);this._notifyChange(e);this._adjustDate(a)},_clickMonthYear:function(a){var b=this._getInst(d(a)[0]);b.input&&b._selectingMonthYear&&setTimeout(function(){b.input.focus()},0);b._selectingMonthYear=!b._selectingMonthYear},_selectDay:function(a,b,c,e){var f=d(a);if(!(d(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(f[0]))){f=this._getInst(f[0]);f.selectedDay=f.currentDay=
d("a",e).html();f.selectedMonth=f.currentMonth=b;f.selectedYear=f.currentYear=c;this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))}},_clearDate:function(a){a=d(a);this._getInst(a[0]);this._selectDate(a,"")},_selectDate:function(a,b){a=this._getInst(d(a)[0]);b=b!=null?b:this._formatDate(a);a.input&&a.input.val(b);this._updateAlternate(a);var c=this._get(a,"onSelect");if(c)c.apply(a.input?a.input[0]:null,[b,a]);else a.input&&a.input.trigger("change");if(a.inline)this._updateDatepicker(a);
else{this._hideDatepicker();this._lastInput=a.input[0];typeof a.input[0]!="object"&&a.input.focus();this._lastInput=null}},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),e=this._getDate(a),f=this.formatDate(c,e,this._getFormatConfig(a));d(b).each(function(){d(this).val(f)})}},noWeekends:function(a){a=a.getDay();return[a>0&&a<6,""]},iso8601Week:function(a){a=new Date(a.getTime());a.setDate(a.getDate()+4-(a.getDay()||7));var b=
a.getTime();a.setMonth(0);a.setDate(1);return Math.floor(Math.round((b-a)/864E5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;for(var e=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff,f=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,h=(c?c.dayNames:null)||this._defaults.dayNames,i=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,
j=c=-1,l=-1,u=-1,k=false,o=function(p){(p=z+1<a.length&&a.charAt(z+1)==p)&&z++;return p},m=function(p){var v=o(p);p=new RegExp("^\\d{1,"+(p=="@"?14:p=="!"?20:p=="y"&&v?4:p=="o"?3:2)+"}");p=b.substring(s).match(p);if(!p)throw"Missing number at position "+s;s+=p[0].length;return parseInt(p[0],10)},n=function(p,v,H){p=o(p)?H:v;for(v=0;v<p.length;v++)if(b.substr(s,p[v].length).toLowerCase()==p[v].toLowerCase()){s+=p[v].length;return v+1}throw"Unknown name at position "+s;},r=function(){if(b.charAt(s)!=
a.charAt(z))throw"Unexpected literal at position "+s;s++},s=0,z=0;z<a.length;z++)if(k)if(a.charAt(z)=="'"&&!o("'"))k=false;else r();else switch(a.charAt(z)){case "d":l=m("d");break;case "D":n("D",f,h);break;case "o":u=m("o");break;case "m":j=m("m");break;case "M":j=n("M",i,g);break;case "y":c=m("y");break;case "@":var w=new Date(m("@"));c=w.getFullYear();j=w.getMonth()+1;l=w.getDate();break;case "!":w=new Date((m("!")-this._ticksTo1970)/1E4);c=w.getFullYear();j=w.getMonth()+1;l=w.getDate();break;
case "'":if(o("'"))r();else k=true;break;default:r()}if(c==-1)c=(new Date).getFullYear();else if(c<100)c+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c<=e?0:-100);if(u>-1){j=1;l=u;do{e=this._getDaysInMonth(c,j-1);if(l<=e)break;j++;l-=e}while(1)}w=this._daylightSavingAdjust(new Date(c,j-1,l));if(w.getFullYear()!=c||w.getMonth()+1!=j||w.getDate()!=l)throw"Invalid date";return w},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",
RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1E7,formatDate:function(a,b,c){if(!b)return"";var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,h=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort;c=(c?c.monthNames:null)||this._defaults.monthNames;var i=function(o){(o=k+1<a.length&&a.charAt(k+1)==o)&&k++;
return o},g=function(o,m,n){m=""+m;if(i(o))for(;m.length<n;)m="0"+m;return m},j=function(o,m,n,r){return i(o)?r[m]:n[m]},l="",u=false;if(b)for(var k=0;k<a.length;k++)if(u)if(a.charAt(k)=="'"&&!i("'"))u=false;else l+=a.charAt(k);else switch(a.charAt(k)){case "d":l+=g("d",b.getDate(),2);break;case "D":l+=j("D",b.getDay(),e,f);break;case "o":l+=g("o",(b.getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":l+=g("m",b.getMonth()+1,2);break;case "M":l+=j("M",b.getMonth(),h,c);break;
case "y":l+=i("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case "@":l+=b.getTime();break;case "!":l+=b.getTime()*1E4+this._ticksTo1970;break;case "'":if(i("'"))l+="'";else u=true;break;default:l+=a.charAt(k)}return l},_possibleChars:function(a){for(var b="",c=false,e=function(h){(h=f+1<a.length&&a.charAt(f+1)==h)&&f++;return h},f=0;f<a.length;f++)if(c)if(a.charAt(f)=="'"&&!e("'"))c=false;else b+=a.charAt(f);else switch(a.charAt(f)){case "d":case "m":case "y":case "@":b+=
"0123456789";break;case "D":case "M":return null;case "'":if(e("'"))b+="'";else c=true;break;default:b+=a.charAt(f)}return b},_get:function(a,b){return a.settings[b]!==G?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),e=a.lastVal=a.input?a.input.val():null,f,h;f=h=this._getDefaultDate(a);var i=this._getFormatConfig(a);try{f=this.parseDate(c,e,i)||h}catch(g){this.log(g);e=b?"":e}a.selectedDay=f.getDate();a.drawMonth=a.selectedMonth=
f.getMonth();a.drawYear=a.selectedYear=f.getFullYear();a.currentDay=e?f.getDate():0;a.currentMonth=e?f.getMonth():0;a.currentYear=e?f.getFullYear():0;this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var e=function(h){var i=new Date;i.setDate(i.getDate()+h);return i},f=function(h){try{return d.datepicker.parseDate(d.datepicker._get(a,"dateFormat"),h,d.datepicker._getFormatConfig(a))}catch(i){}var g=
(h.toLowerCase().match(/^c/)?d.datepicker._getDate(a):null)||new Date,j=g.getFullYear(),l=g.getMonth();g=g.getDate();for(var u=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,k=u.exec(h);k;){switch(k[2]||"d"){case "d":case "D":g+=parseInt(k[1],10);break;case "w":case "W":g+=parseInt(k[1],10)*7;break;case "m":case "M":l+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break;case "y":case "Y":j+=parseInt(k[1],10);g=Math.min(g,d.datepicker._getDaysInMonth(j,l));break}k=u.exec(h)}return new Date(j,
l,g)};if(b=(b=b==null||b===""?c:typeof b=="string"?f(b):typeof b=="number"?isNaN(b)?c:e(b):new Date(b.getTime()))&&b.toString()=="Invalid Date"?c:b){b.setHours(0);b.setMinutes(0);b.setSeconds(0);b.setMilliseconds(0)}return this._daylightSavingAdjust(b)},_daylightSavingAdjust:function(a){if(!a)return null;a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var e=!b,f=a.selectedMonth,h=a.selectedYear;b=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=
a.currentDay=b.getDate();a.drawMonth=a.selectedMonth=a.currentMonth=b.getMonth();a.drawYear=a.selectedYear=a.currentYear=b.getFullYear();if((f!=a.selectedMonth||h!=a.selectedYear)&&!c)this._notifyChange(a);this._adjustInstDate(a);if(a.input)a.input.val(e?"":this._formatDate(a))},_getDate:function(a){return!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay))},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),
b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),e=this._get(a,"showButtonPanel"),f=this._get(a,"hideIfNoPrevNext"),h=this._get(a,"navigationAsDateFormat"),i=this._getNumberOfMonths(a),g=this._get(a,"showCurrentAtPos"),j=this._get(a,"stepMonths"),l=i[0]!=1||i[1]!=1,u=this._daylightSavingAdjust(!a.currentDay?new Date(9999,9,9):new Date(a.currentYear,a.currentMonth,a.currentDay)),k=this._getMinMaxDate(a,"min"),o=this._getMinMaxDate(a,"max");g=a.drawMonth-g;var m=a.drawYear;if(g<0){g+=12;m--}if(o){var n=
this._daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth()-i[0]*i[1]+1,o.getDate()));for(n=k&&n<k?k:n;this._daylightSavingAdjust(new Date(m,g,1))>n;){g--;if(g<0){g=11;m--}}}a.drawMonth=g;a.drawYear=m;n=this._get(a,"prevText");n=!h?n:this.formatDate(n,this._daylightSavingAdjust(new Date(m,g-j,1)),this._getFormatConfig(a));n=this._canAdjustMonth(a,-1,m,g)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', -"+j+", 'M');\" title=\""+n+'"><span class="ui-icon ui-icon-circle-triangle-'+
(c?"e":"w")+'">'+n+"</span></a>":f?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+n+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+n+"</span></a>";var r=this._get(a,"nextText");r=!h?r:this.formatDate(r,this._daylightSavingAdjust(new Date(m,g+j,1)),this._getFormatConfig(a));f=this._canAdjustMonth(a,+1,m,g)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._adjustDate('#"+a.id+"', +"+j+", 'M');\" title=\""+r+'"><span class="ui-icon ui-icon-circle-triangle-'+
(c?"w":"e")+'">'+r+"</span></a>":f?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+r+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+r+"</span></a>";j=this._get(a,"currentText");r=this._get(a,"gotoCurrent")&&a.currentDay?u:b;j=!h?j:this.formatDate(j,r,this._getFormatConfig(a));h=!a.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+y+'.datepicker._hideDatepicker();">'+this._get(a,
"closeText")+"</button>":"";e=e?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?h:"")+(this._isInRange(a,r)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+y+".datepicker._gotoToday('#"+a.id+"');\">"+j+"</button>":"")+(c?"":h)+"</div>":"";h=parseInt(this._get(a,"firstDay"),10);h=isNaN(h)?0:h;j=this._get(a,"showWeek");r=this._get(a,"dayNames");this._get(a,"dayNamesShort");var s=this._get(a,"dayNamesMin"),z=
this._get(a,"monthNames"),w=this._get(a,"monthNamesShort"),p=this._get(a,"beforeShowDay"),v=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths");this._get(a,"calculateWeek");for(var L=this._getDefaultDate(a),I="",C=0;C<i[0];C++){for(var M="",D=0;D<i[1];D++){var N=this._daylightSavingAdjust(new Date(m,g,a.selectedDay)),t=" ui-corner-all",x="";if(l){x+='<div class="ui-datepicker-group';if(i[1]>1)switch(D){case 0:x+=" ui-datepicker-group-first";t=" ui-corner-"+(c?"right":"left");break;case i[1]-
1:x+=" ui-datepicker-group-last";t=" ui-corner-"+(c?"left":"right");break;default:x+=" ui-datepicker-group-middle";t="";break}x+='">'}x+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+t+'">'+(/all|left/.test(t)&&C==0?c?f:n:"")+(/all|right/.test(t)&&C==0?c?n:f:"")+this._generateMonthYearHeader(a,g,m,k,o,C>0||D>0,z,w)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var A=j?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(t=0;t<7;t++){var q=
(t+h)%7;A+="<th"+((t+h+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+r[q]+'">'+s[q]+"</span></th>"}x+=A+"</tr></thead><tbody>";A=this._getDaysInMonth(m,g);if(m==a.selectedYear&&g==a.selectedMonth)a.selectedDay=Math.min(a.selectedDay,A);t=(this._getFirstDayOfMonth(m,g)-h+7)%7;A=l?6:Math.ceil((t+A)/7);q=this._daylightSavingAdjust(new Date(m,g,1-t));for(var O=0;O<A;O++){x+="<tr>";var P=!j?"":'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(q)+"</td>";for(t=0;t<7;t++){var F=
p?p.apply(a.input?a.input[0]:null,[q]):[true,""],B=q.getMonth()!=g,J=B&&!H||!F[0]||k&&q<k||o&&q>o;P+='<td class="'+((t+h+6)%7>=5?" ui-datepicker-week-end":"")+(B?" ui-datepicker-other-month":"")+(q.getTime()==N.getTime()&&g==a.selectedMonth&&a._keyEvent||L.getTime()==q.getTime()&&L.getTime()==N.getTime()?" "+this._dayOverClass:"")+(J?" "+this._unselectableClass+" ui-state-disabled":"")+(B&&!v?"":" "+F[1]+(q.getTime()==u.getTime()?" "+this._currentClass:"")+(q.getTime()==b.getTime()?" ui-datepicker-today":
""))+'"'+((!B||v)&&F[2]?' title="'+F[2]+'"':"")+(J?"":' onclick="DP_jQuery_'+y+".datepicker._selectDay('#"+a.id+"',"+q.getMonth()+","+q.getFullYear()+', this);return false;"')+">"+(B&&!v?"&#xa0;":J?'<span class="ui-state-default">'+q.getDate()+"</span>":'<a class="ui-state-default'+(q.getTime()==b.getTime()?" ui-state-highlight":"")+(q.getTime()==u.getTime()?" ui-state-active":"")+(B?" ui-priority-secondary":"")+'" href="#">'+q.getDate()+"</a>")+"</td>";q.setDate(q.getDate()+1);q=this._daylightSavingAdjust(q)}x+=
P+"</tr>"}g++;if(g>11){g=0;m++}x+="</tbody></table>"+(l?"</div>"+(i[0]>0&&D==i[1]-1?'<div class="ui-datepicker-row-break"></div>':""):"");M+=x}I+=M}I+=e+(d.browser.msie&&parseInt(d.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");a._keyEvent=false;return I},_generateMonthYearHeader:function(a,b,c,e,f,h,i,g){var j=this._get(a,"changeMonth"),l=this._get(a,"changeYear"),u=this._get(a,"showMonthAfterYear"),k='<div class="ui-datepicker-title">',
o="";if(h||!j)o+='<span class="ui-datepicker-month">'+i[b]+"</span>";else{i=e&&e.getFullYear()==c;var m=f&&f.getFullYear()==c;o+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+a.id+"');\">";for(var n=0;n<12;n++)if((!i||n>=e.getMonth())&&(!m||n<=f.getMonth()))o+='<option value="'+n+'"'+(n==b?' selected="selected"':"")+">"+g[n]+"</option>";o+="</select>"}u||(k+=o+(h||!(j&&
l)?"&#xa0;":""));a.yearshtml="";if(h||!l)k+='<span class="ui-datepicker-year">'+c+"</span>";else{g=this._get(a,"yearRange").split(":");var r=(new Date).getFullYear();i=function(s){s=s.match(/c[+-].*/)?c+parseInt(s.substring(1),10):s.match(/[+-].*/)?r+parseInt(s,10):parseInt(s,10);return isNaN(s)?r:s};b=i(g[0]);g=Math.max(b,i(g[1]||""));b=e?Math.max(b,e.getFullYear()):b;g=f?Math.min(g,f.getFullYear()):g;for(a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+y+".datepicker._selectMonthYear('#"+
a.id+"', this, 'Y');\" onclick=\"DP_jQuery_"+y+".datepicker._clickMonthYear('#"+a.id+"');\">";b<=g;b++)a.yearshtml+='<option value="'+b+'"'+(b==c?' selected="selected"':"")+">"+b+"</option>";a.yearshtml+="</select>";if(d.browser.mozilla)k+='<select class="ui-datepicker-year"><option value="'+c+'" selected="selected">'+c+"</option></select>";else{k+=a.yearshtml;a.yearshtml=null}}k+=this._get(a,"yearSuffix");if(u)k+=(h||!(j&&l)?"&#xa0;":"")+o;k+="</div>";return k},_adjustInstDate:function(a,b,c){var e=
a.drawYear+(c=="Y"?b:0),f=a.drawMonth+(c=="M"?b:0);b=Math.min(a.selectedDay,this._getDaysInMonth(e,f))+(c=="D"?b:0);e=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(e,f,b)));a.selectedDay=e.getDate();a.drawMonth=a.selectedMonth=e.getMonth();a.drawYear=a.selectedYear=e.getFullYear();if(c=="M"||c=="Y")this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");b=c&&b<c?c:b;return b=a&&b>a?a:b},_notifyChange:function(a){var b=this._get(a,
"onChangeMonthYear");if(b)b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){a=this._get(a,"numberOfMonths");return a==null?[1,1]:typeof a=="number"?[1,a]:a},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,e){var f=this._getNumberOfMonths(a);
c=this._daylightSavingAdjust(new Date(c,e+(b<0?b:f[0]*f[1]),1));b<0&&c.setDate(this._getDaysInMonth(c.getFullYear(),c.getMonth()));return this._isInRange(a,c)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min");a=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!a||b.getTime()<=a.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,
"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,e){if(!b){a.currentDay=a.selectedDay;a.currentMonth=a.selectedMonth;a.currentYear=a.selectedYear}b=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(e,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),b,this._getFormatConfig(a))}});d.fn.datepicker=
function(a){if(!d.datepicker.initialized){d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);d.datepicker.initialized=true}var b=Array.prototype.slice.call(arguments,1);if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget"))return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string")return d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this[0]].concat(b));
return this.each(function(){typeof a=="string"?d.datepicker["_"+a+"Datepicker"].apply(d.datepicker,[this].concat(b)):d.datepicker._attachDatepicker(this,a)})};d.datepicker=new K;d.datepicker.initialized=false;d.datepicker.uuid=(new Date).getTime();d.datepicker.version="1.8.7";window["DP_jQuery_"+y]=d})(jQuery);
;
/*!
	Colorbox v1.4.37 - 2014-02-11
	jQuery lightbox and modal window plugin
	(c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(e,t,i){function o(i,o,n){var r=t.createElement(i);return o&&(r.id=Z+o),n&&(r.style.cssText=n),e(r)}function n(){return i.innerHeight?i.innerHeight:e(i).height()}function r(e){var t=k.length,i=(j+e)%t;return 0>i?t+i:i}function h(e,t){return Math.round((/%/.test(e)?("x"===t?E.width():n())/100:1)*parseInt(e,10))}function s(e,t){return e.photo||e.photoRegex.test(t)}function l(e,t){return e.retinaUrl&&i.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function a(e){"contains"in g[0]&&!g[0].contains(e.target)&&(e.stopPropagation(),g.focus())}function d(){var t,i=e.data(N,Y);null==i?(B=e.extend({},X),console&&console.log&&console.log("Error: cboxElement missing settings object")):B=e.extend({},i);for(t in B)e.isFunction(B[t])&&"on"!==t.slice(0,2)&&(B[t]=B[t].call(N));B.rel=B.rel||N.rel||e(N).data("rel")||"nofollow",B.href=B.href||e(N).attr("href"),B.title=B.title||N.title,"string"==typeof B.href&&(B.href=e.trim(B.href))}function c(i,o){e(t).trigger(i),st.triggerHandler(i),e.isFunction(o)&&o.call(N)}function u(i){q||(N=i,d(),k=e(N),j=0,"nofollow"!==B.rel&&(k=e("."+et).filter(function(){var t,i=e.data(this,Y);return i&&(t=e(this).data("rel")||i.rel||this.rel),t===B.rel}),j=k.index(N),-1===j&&(k=k.add(N),j=k.length-1)),w.css({opacity:parseFloat(B.opacity),cursor:B.overlayClose?"pointer":"auto",visibility:"visible"}).show(),J&&g.add(w).removeClass(J),B.className&&g.add(w).addClass(B.className),J=B.className,B.closeButton?K.html(B.close).appendTo(x):K.appendTo("<div/>"),U||(U=$=!0,g.css({visibility:"hidden",display:"block"}),H=o(lt,"LoadedContent","width:0; height:0; overflow:hidden"),x.css({width:"",height:""}).append(H),O=y.height()+C.height()+x.outerHeight(!0)-x.height(),_=b.width()+T.width()+x.outerWidth(!0)-x.width(),D=H.outerHeight(!0),A=H.outerWidth(!0),B.w=h(B.initialWidth,"x"),B.h=h(B.initialHeight,"y"),H.css({width:"",height:B.h}),Q.position(),c(tt,B.onOpen),P.add(L).hide(),g.focus(),B.trapFocus&&t.addEventListener&&(t.addEventListener("focus",a,!0),st.one(rt,function(){t.removeEventListener("focus",a,!0)})),B.returnFocus&&st.one(rt,function(){e(N).focus()})),m())}function f(){!g&&t.body&&(V=!1,E=e(i),g=o(lt).attr({id:Y,"class":e.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),w=o(lt,"Overlay").hide(),W=e([o(lt,"LoadingOverlay")[0],o(lt,"LoadingGraphic")[0]]),v=o(lt,"Wrapper"),x=o(lt,"Content").append(L=o(lt,"Title"),S=o(lt,"Current"),I=e('<button type="button"/>').attr({id:Z+"Previous"}),R=e('<button type="button"/>').attr({id:Z+"Next"}),M=o("button","Slideshow"),W),K=e('<button type="button"/>').attr({id:Z+"Close"}),v.append(o(lt).append(o(lt,"TopLeft"),y=o(lt,"TopCenter"),o(lt,"TopRight")),o(lt,!1,"clear:left").append(b=o(lt,"MiddleLeft"),x,T=o(lt,"MiddleRight")),o(lt,!1,"clear:left").append(o(lt,"BottomLeft"),C=o(lt,"BottomCenter"),o(lt,"BottomRight"))).find("div div").css({"float":"left"}),F=o(lt,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),P=R.add(I).add(S).add(M),e(t.body).append(w,g.append(v,F)))}function p(){function i(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||e.ctrlKey||(e.preventDefault(),u(this))}return g?(V||(V=!0,R.click(function(){Q.next()}),I.click(function(){Q.prev()}),K.click(function(){Q.close()}),w.click(function(){B.overlayClose&&Q.close()}),e(t).bind("keydown."+Z,function(e){var t=e.keyCode;U&&B.escKey&&27===t&&(e.preventDefault(),Q.close()),U&&B.arrowKey&&k[1]&&!e.altKey&&(37===t?(e.preventDefault(),I.click()):39===t&&(e.preventDefault(),R.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+Z,"."+et,i):e("."+et).live("click."+Z,i)),!0):!1}function m(){var n,r,a,u=Q.prep,f=++at;$=!0,z=!1,N=k[j],d(),c(ht),c(it,B.onLoad),B.h=B.height?h(B.height,"y")-D-O:B.innerHeight&&h(B.innerHeight,"y"),B.w=B.width?h(B.width,"x")-A-_:B.innerWidth&&h(B.innerWidth,"x"),B.mw=B.w,B.mh=B.h,B.maxWidth&&(B.mw=h(B.maxWidth,"x")-A-_,B.mw=B.w&&B.w<B.mw?B.w:B.mw),B.maxHeight&&(B.mh=h(B.maxHeight,"y")-D-O,B.mh=B.h&&B.h<B.mh?B.h:B.mh),n=B.href,G=setTimeout(function(){W.show()},100),B.inline?(a=o(lt).hide().insertBefore(e(n)[0]),st.one(ht,function(){a.replaceWith(H.children())}),u(e(n))):B.iframe?u(" "):B.html?u(B.html):s(B,n)?(n=l(B,n),z=t.createElement("img"),e(z).addClass(Z+"Photo").bind("error",function(){B.title=!1,u(o(lt,"Error").html(B.imgError))}).one("load",function(){var t;f===at&&(e.each(["alt","longdesc","aria-describedby"],function(t,i){var o=e(N).attr(i)||e(N).attr("data-"+i);o&&z.setAttribute(i,o)}),B.retinaImage&&i.devicePixelRatio>1&&(z.height=z.height/i.devicePixelRatio,z.width=z.width/i.devicePixelRatio),B.scalePhotos&&(r=function(){z.height-=z.height*t,z.width-=z.width*t},B.mw&&z.width>B.mw&&(t=(z.width-B.mw)/z.width,r()),B.mh&&z.height>B.mh&&(t=(z.height-B.mh)/z.height,r())),B.h&&(z.style.marginTop=Math.max(B.mh-z.height,0)/2+"px"),k[1]&&(B.loop||k[j+1])&&(z.style.cursor="pointer",z.onclick=function(){Q.next()}),z.style.width=z.width+"px",z.style.height=z.height+"px",setTimeout(function(){u(z)},1))}),setTimeout(function(){z.src=n},1)):n&&F.load(n,B.data,function(t,i){f===at&&u("error"===i?o(lt,"Error").html(B.xhrError):e(this).contents())})}var w,g,v,x,y,b,T,C,k,E,H,F,W,L,S,M,R,I,K,P,B,O,_,D,A,N,j,z,U,$,q,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1},Y="colorbox",Z="cbox",et=Z+"Element",tt=Z+"_open",it=Z+"_load",ot=Z+"_complete",nt=Z+"_cleanup",rt=Z+"_closed",ht=Z+"_purge",st=e("<a/>"),lt="div",at=0,dt={},ct=function(){function e(){clearTimeout(h)}function t(){(B.loop||k[j+1])&&(e(),h=setTimeout(Q.next,B.slideshowSpeed))}function i(){M.html(B.slideshowStop).unbind(l).one(l,o),st.bind(ot,t).bind(it,e),g.removeClass(s+"off").addClass(s+"on")}function o(){e(),st.unbind(ot,t).unbind(it,e),M.html(B.slideshowStart).unbind(l).one(l,function(){Q.next(),i()}),g.removeClass(s+"on").addClass(s+"off")}function n(){r=!1,M.hide(),e(),st.unbind(ot,t).unbind(it,e),g.removeClass(s+"off "+s+"on")}var r,h,s=Z+"Slideshow_",l="click."+Z;return function(){r?B.slideshow||(st.unbind(nt,n),n()):B.slideshow&&k[1]&&(r=!0,st.one(nt,n),B.slideshowAuto?i():o(),M.show())}}();e.colorbox||(e(f),Q=e.fn[Y]=e[Y]=function(t,i){var o=this;if(t=t||{},f(),p()){if(e.isFunction(o))o=e("<a/>"),t.open=!0;else if(!o[0])return o;i&&(t.onComplete=i),o.each(function(){e.data(this,Y,e.extend({},e.data(this,Y)||X,t))}).addClass(et),(e.isFunction(t.open)&&t.open.call(o)||t.open)&&u(o[0])}return o},Q.position=function(t,i){function o(){y[0].style.width=C[0].style.width=x[0].style.width=parseInt(g[0].style.width,10)-_+"px",x[0].style.height=b[0].style.height=T[0].style.height=parseInt(g[0].style.height,10)-O+"px"}var r,s,l,a=0,d=0,c=g.offset();if(E.unbind("resize."+Z),g.css({top:-9e4,left:-9e4}),s=E.scrollTop(),l=E.scrollLeft(),B.fixed?(c.top-=s,c.left-=l,g.css({position:"fixed"})):(a=s,d=l,g.css({position:"absolute"})),d+=B.right!==!1?Math.max(E.width()-B.w-A-_-h(B.right,"x"),0):B.left!==!1?h(B.left,"x"):Math.round(Math.max(E.width()-B.w-A-_,0)/2),a+=B.bottom!==!1?Math.max(n()-B.h-D-O-h(B.bottom,"y"),0):B.top!==!1?h(B.top,"y"):Math.round(Math.max(n()-B.h-D-O,0)/2),g.css({top:c.top,left:c.left,visibility:"visible"}),v[0].style.width=v[0].style.height="9999px",r={width:B.w+A+_,height:B.h+D+O,top:a,left:d},t){var u=0;e.each(r,function(e){return r[e]!==dt[e]?(u=t,void 0):void 0}),t=u}dt=r,t||g.css(r),g.dequeue().animate(r,{duration:t||0,complete:function(){o(),$=!1,v[0].style.width=B.w+A+_+"px",v[0].style.height=B.h+D+O+"px",B.reposition&&setTimeout(function(){E.bind("resize."+Z,function(){Q.position()})},1),e.isFunction(i)&&i()},step:o})},Q.resize=function(e){var t;U&&(e=e||{},e.width&&(B.w=h(e.width,"x")-A-_),e.innerWidth&&(B.w=h(e.innerWidth,"x")),H.css({width:B.w}),e.height&&(B.h=h(e.height,"y")-D-O),e.innerHeight&&(B.h=h(e.innerHeight,"y")),e.innerHeight||e.height||(t=H.scrollTop(),H.css({height:"auto"}),B.h=H.height()),H.css({height:B.h}),t&&H.scrollTop(t),Q.position("none"===B.transition?0:B.speed))},Q.prep=function(i){function n(){return B.w=B.w||H.width(),B.w=B.mw&&B.mw<B.w?B.mw:B.w,B.w}function h(){return B.h=B.h||H.height(),B.h=B.mh&&B.mh<B.h?B.mh:B.h,B.h}if(U){var a,d="none"===B.transition?0:B.speed;H.empty().remove(),H=o(lt,"LoadedContent").append(i),H.hide().appendTo(F.show()).css({width:n(),overflow:B.scrolling?"auto":"hidden"}).css({height:h()}).prependTo(x),F.hide(),e(z).css({"float":"none"}),a=function(){function i(){e.support.opacity===!1&&g[0].style.removeAttribute("filter")}var n,h,a=k.length,u="frameBorder",f="allowTransparency";U&&(h=function(){clearTimeout(G),W.hide(),c(ot,B.onComplete)},L.html(B.title).add(H).show(),a>1?("string"==typeof B.current&&S.html(B.current.replace("{current}",j+1).replace("{total}",a)).show(),R[B.loop||a-1>j?"show":"hide"]().html(B.next),I[B.loop||j?"show":"hide"]().html(B.previous),ct(),B.preloading&&e.each([r(-1),r(1)],function(){var i,o,n=k[this],r=e.data(n,Y);r&&r.href?(i=r.href,e.isFunction(i)&&(i=i.call(n))):i=e(n).attr("href"),i&&s(r,i)&&(i=l(r,i),o=t.createElement("img"),o.src=i)})):P.hide(),B.iframe?(n=o("iframe")[0],u in n&&(n[u]=0),f in n&&(n[f]="true"),B.scrolling||(n.scrolling="no"),e(n).attr({src:B.href,name:(new Date).getTime(),"class":Z+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",h).appendTo(H),st.one(ht,function(){n.src="//about:blank"}),B.fastIframe&&e(n).trigger("load")):h(),"fade"===B.transition?g.fadeTo(d,1,i):i())},"fade"===B.transition?g.fadeTo(d,0,function(){Q.position(0,a)}):Q.position(d,a)}},Q.next=function(){!$&&k[1]&&(B.loop||k[j+1])&&(j=r(1),u(k[j]))},Q.prev=function(){!$&&k[1]&&(B.loop||j)&&(j=r(-1),u(k[j]))},Q.close=function(){U&&!q&&(q=!0,U=!1,c(nt,B.onCleanup),E.unbind("."+Z),w.fadeTo(B.fadeOut||0,0),g.stop().fadeTo(B.fadeOut||0,0,function(){g.add(w).css({opacity:1,cursor:"auto"}).hide(),c(ht),H.empty().remove(),setTimeout(function(){q=!1,c(rt,B.onClosed)},1)}))},Q.remove=function(){g&&(g.stop(),e.colorbox.close(),g.stop().remove(),w.remove(),q=!1,g=null,e("."+et).removeData(Y).removeClass(et),e(t).unbind("click."+Z))},Q.element=function(){return e(N)},Q.settings=X)})(jQuery,document,window);;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $('.colorbox', context)
      .once('init-colorbox').each(function(){
        $(this).colorbox(settings.colorbox);
      });
  }
};

{
  $(document).bind('cbox_complete', function () {
    Drupal.attachBehaviors('#cboxLoadedContent');
  });
}

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(document).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

/**
 * Attaches the AJAX behavior to Views exposed filter forms and key View links.
 */
Drupal.behaviors.ViewsAjaxView = {};
Drupal.behaviors.ViewsAjaxView.attach = function() {
  if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
    $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
      Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
    });
  }
};

Drupal.views = {};
Drupal.views.instances = {};

/**
 * Javascript object for a certain view.
 */
Drupal.views.ajaxView = function(settings) {
  var selector = '.view-dom-id-' + settings.view_dom_id;
  this.$view = $(selector);

  // Retrieve the path to use for views' ajax.
  var ajax_path = Drupal.settings.views.ajax_path;

  // If there are multiple views this might've ended up showing up multiple times.
  if (ajax_path.constructor.toString().indexOf("Array") != -1) {
    ajax_path = ajax_path[0];
  }

  // Check if there are any GET parameters to send to views.
  var queryString = window.location.search || '';
  if (queryString !== '') {
    // Remove the question mark and Drupal path component if any.
    var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
    if (queryString !== '') {
      // If there is a '?' in ajax_path, clean url are on and & should be used to add parameters.
      queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
    }
  }

  this.element_settings = {
    url: ajax_path + queryString,
    submit: settings,
    setClick: true,
    event: 'click',
    selector: selector,
    progress: { type: 'throbber' }
  };

  this.settings = settings;

  // Add the ajax to exposed forms.
  this.$exposed_form = this.$view.children('.view-filters').children('form');
  this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

  // Add the ajax to pagers.
  this.$view.once(jQuery.proxy(this.attachPagerAjax, this));

  // Add a trigger to update this view specifically. In order to trigger a
  // refresh use the following code.
  //
  // @code
  // jQuery('.view-name').trigger('RefreshView');
  // @endcode
  // Add a trigger to update this view specifically.
  var self_settings = this.element_settings;
  self_settings.event = 'RefreshView';
  this.refreshViewAjax = new Drupal.ajax(this.selector, this.$view, self_settings);
};

Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
  var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
  button = button[0];

  this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
};

Drupal.views.ajaxView.prototype.filterNestedViews= function() {
  // If there is at least one parent with a view class, this view
  // is nested (e.g., an attachment). Bail.
  return !this.$view.parents('.view').size();
};

/**
 * Attach the ajax behavior to each link.
 */
Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
  this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
  .each(jQuery.proxy(this.attachPagerLinkAjax, this));
};

/**
 * Attach the ajax behavior to a singe link.
 */
Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
  var $link = $(link);
  // Don't attach to pagers inside nested views.
  if ($link.closest('.view')[0] !== this.$view[0]) {
    return;
  }
  var viewData = {};
  var href = $link.attr('href');
  // Construct an object using the settings defaults and then overriding
  // with data specific to the link.
  $.extend(
    viewData,
    this.settings,
    Drupal.Views.parseQueryString(href),
    // Extract argument data from the URL.
    Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
  );

  // For anchor tags, these will go to the target of the anchor rather
  // than the usual location.
  $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

  // If the view has arguments in the settings, then use them instead of
  // the parsed args.
  if(this.settings.view_args){
    viewData.view_args = this.settings.view_args;
  }

  this.element_settings.submit = viewData;
  this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
};

Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
  // Scroll to the top of the view. This will allow users
  // to browse newly loaded content after e.g. clicking a pager
  // link.
  var offset = $(response.selector).offset();
  // We can't guarantee that the scrollable object should be
  // the body, as the view could be embedded in something
  // more complex such as a modal popup. Recurse up the DOM
  // and scroll the first element that has a non-zero top.
  var scrollTarget = response.selector;
  while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
    scrollTarget = $(scrollTarget).parent();
  }
  // Only scroll upward
  if (offset.top - 10 < $(scrollTarget).scrollTop()) {
    $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
  }
};

})(jQuery);
;
/**
 * @file views_load_more.js
 *
 * Handles the AJAX pager for the view_load_more plugin.
 */
(function ($) {

  /**
   * Provide a series of commands that the server can request the client perform.
   */
  Drupal.ajax.prototype.commands.viewsLoadMoreAppend = function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var targetList = response.targetList || '';
    var effect = ajax.getEffect(response);
    var pager_selector = response.options.pager_selector ? response.options.pager_selector : '> .pager-load-more';

    // We don't know what response.data contains: it might be a string of text
    // without HTML, so don't rely on jQuery correctly iterpreting
    // $(response.data) as new HTML rather than a CSS selector. Also, if
    // response.data contains top-level text nodes, they get lost with either
    // $(response.data) or $('<div></div>').replaceWith(response.data).
    var new_content_wrapped = $('<div></div>').html(response.data);
    var new_content = new_content_wrapped.contents();

    // For legacy reasons, the effects processing code assumes that new_content
    // consists of a single top-level element. Also, it has not been
    // sufficiently tested whether attachBehaviors() can be successfully called
    // with a context object that includes top-level text nodes. However, to
    // give developers full control of the HTML appearing in the page, and to
    // enable Ajax content to be inserted in places where DIV elements are not
    // allowed (e.g., within TABLE, TR, and SPAN parents), we check if the new
    // content satisfies the requirement of a single top-level element, and
    // only use the container DIV created above when it doesn't. For more
    // information, please see http://drupal.org/node/736066.
    if (new_content.length != 1 || new_content.get(0).nodeType != 1) {
      new_content = new_content_wrapped;
    }
    // If removing content from the wrapper, detach behaviors first.
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors(wrapper, settings);
    if ($.waypoints != undefined) {
      $.waypoints('refresh');
    }

    // Set up our default query options. This is for advance users that might
    // change there views layout classes. This allows them to write there own
    // jquery selector to replace the content with.
    // Provide sensible defaults for unordered list, ordered list and table
    // view styles.
    var content_query = targetList && !response.options.content ? '> .view-content ' + targetList : response.options.content || '> .view-content';

    // If we're using any effects. Hide the new content before adding it to the DOM.
    if (effect.showEffect != 'show') {
      new_content.find(content_query).children().hide();
    }

    // Update the pager
    // Find both for the wrapper as the newly loaded content the direct child
    // .item-list in case of nested pagers
    wrapper.find(pager_selector).replaceWith(new_content.find(pager_selector));

    // Add the new content to the page.
    wrapper.find(content_query)[method](new_content.find(content_query).children());

    // Re-class the loaded content.
    // @todo this is faulty in many ways.  first of which is that user may have configured view to not have these classes at all.
    wrapper.find(content_query).children()
      .removeClass('views-row-first views-row-last views-row-odd views-row-even')
      .filter(':first')
        .addClass('views-row-first')
        .end()
      .filter(':last')
        .addClass('views-row-last')
        .end()
      .filter(':even')
        .addClass('views-row-odd')
        .end()
      .filter(':odd')
        .addClass('views-row-even')
        .end();

    if (effect.showEffect != 'show') {
      wrapper.find(content_query).children(':not(:visible)')[effect.showEffect](effect.showSpeed);
    }

    // Additional processing over new content
    wrapper.trigger('views_load_more.new_content', new_content.clone());

    // Attach all JavaScript behaviors to the new content
    // Remove the Jquery once Class, TODO: There needs to be a better
    // way of doing this, look at .removeOnce() :-/
    var classes = wrapper.attr('class');
    var onceClass = classes.match(/jquery-once-[0-9]*-[a-z]*/);
    wrapper.removeClass(onceClass[0]);
    settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.attachBehaviors(wrapper, settings);
  };

  /**
   * Attaches the AJAX behavior to Views Load More waypoint support.
   */
  Drupal.behaviors.ViewsLoadMore = {
    attach: function (context, settings) {
      var default_opts = {
          offset: '100%'
        };

      if (settings && settings.viewsLoadMore && settings.views && settings.views.ajaxViews) {
        $.each(settings.viewsLoadMore, function(i, setting) {
          var view = '.view-id-' + setting.view_name + '.view-display-id-' + setting.view_display_id + ' .pager-next a',
            opts = {};

          $.extend(opts, default_opts, settings.viewsLoadMore[i].opts);

          $(view).waypoint('destroy');
          $(view).waypoint(function(event, direction) {
            $(view).click();
          }, opts);
        });
      }
    },
    detach: function (context, settings, trigger) {
      if (settings && settings.viewsLoadMore && settings.views && settings.views.ajaxViews) {
        $.each(settings.viewsLoadMore, function(i, setting) {
          var view = '.view-id-' + setting.view_name + '.view-display-id-' + setting.view_display_id;
          if ($(context).is(view)) {
            $('.pager-next a', view).waypoint('destroy');
          }
          else {
            $(view, context).waypoint('destroy');
          }
        });
      }
    }
  };
})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = {
  attach: function (context) {
    if ($.viewsUi && $.viewsUi.tabs) {
      $('#views-tabset').once('views-processed').viewsTabs({
        selectedClass: 'active'
      });
    }

    $('a.views-remove-link').once('views-processed').click(function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
   });
  /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row)
    */
  $('a.display-remove-link')
    .addClass('display-processed')
    .click(function() {
      var id = $(this).attr('id').replace('display-remove-link-', '');
      $('#display-row-' + id).hide();
      $('#display-removed-' + id).attr('checked', true);
      return false;
  });
  }
};

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
(function ($) {
  // Store the original beforeSerialize, as we want to continue using
  // it after we've overridden it.
  Drupal.ajax.prototype.originalBeforeSerialize = Drupal.ajax.prototype.beforeSerialize;

  /**
   * Override core's beforeSerialize.
   *
   * We switch to using GET if this is for an ajax View.
   * We also avoid adding ajax_html_id and ajax_page_state.
   * (This happens in core's beforeSerialize).
   */
  Drupal.ajax.prototype.beforeSerialize = function (element, options) {

    // @See Drupal.ajax.prototype.beforeSerialize
    if (this.form) {
      var settings = this.settings || Drupal.settings;
      Drupal.detachBehaviors(this.form, settings, 'serialize');
    }

    // If this is for a view, switch to GET.
    if (options.url &&
      options.url.indexOf('/views/ajax') !== -1 &&
      Drupal.settings.viewsAjaxGet &&
      $.inArray(options.data.view_name, Drupal.settings.viewsAjaxGet) !== -1) {
      options.type = 'GET';
      return;
    }

    return this.originalBeforeSerialize(element, options);
  };

})(jQuery);
;

/**
 * JavaScript behaviors for the front-end display of webforms.
 */

(function ($) {

Drupal.behaviors.webform = Drupal.behaviors.webform || {};

Drupal.behaviors.webform.attach = function(context) {
  // Calendar datepicker behavior.
  Drupal.webform.datepicker(context);

  // Conditional logic.
  if (Drupal.settings.webform && Drupal.settings.webform.conditionals) {
    Drupal.webform.conditional(context);
  }
};

Drupal.webform = Drupal.webform || {};

Drupal.webform.datepicker = function(context) {
  $('div.webform-datepicker').each(function() {
    var $webformDatepicker = $(this);
    var $calendar = $webformDatepicker.find('input.webform-calendar');

    // Ensure the page we're on actually contains a datepicker.
    if ($calendar.length == 0) {
      return;
    }

    var startDate = $calendar[0].className.replace(/.*webform-calendar-start-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
    var endDate = $calendar[0].className.replace(/.*webform-calendar-end-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
    var firstDay = $calendar[0].className.replace(/.*webform-calendar-day-(\d).*/, '$1');
    // Convert date strings into actual Date objects.
    startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
    endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);

    // Ensure that start comes before end for datepicker.
    if (startDate > endDate) {
      var laterDate = startDate;
      startDate = endDate;
      endDate = laterDate;
    }

    var startYear = startDate.getFullYear();
    var endYear = endDate.getFullYear();

    // Set up the jQuery datepicker element.
    $calendar.datepicker({
      dateFormat: 'yy-mm-dd',
      yearRange: startYear + ':' + endYear,
      firstDay: parseInt(firstDay),
      minDate: startDate,
      maxDate: endDate,
      onSelect: function(dateText, inst) {
        var date = dateText.split('-');
        $webformDatepicker.find('select.year, input.year').val(+date[0]).trigger('change');
        $webformDatepicker.find('select.month').val(+date[1]).trigger('change');
        $webformDatepicker.find('select.day').val(+date[2]).trigger('change');
      },
      beforeShow: function(input, inst) {
        // Get the select list values.
        var year = $webformDatepicker.find('select.year, input.year').val();
        var month = $webformDatepicker.find('select.month').val();
        var day = $webformDatepicker.find('select.day').val();

        // If empty, default to the current year/month/day in the popup.
        var today = new Date();
        year = year ? year : today.getFullYear();
        month = month ? month : today.getMonth() + 1;
        day = day ? day : today.getDate();

        // Make sure that the default year fits in the available options.
        year = (year < startYear || year > endYear) ? startYear : year;

        // jQuery UI Datepicker will read the input field and base its date off
        // of that, even though in our case the input field is a button.
        $(input).val(year + '-' + month + '-' + day);
      }
    });

    // Prevent the calendar button from submitting the form.
    $calendar.click(function(event) {
      $(this).focus();
      event.preventDefault();
    });
  });
};

Drupal.webform.conditional = function(context) {
  // Add the bindings to each webform on the page.
  $.each(Drupal.settings.webform.conditionals, function(formKey, settings) {
    var $form = $('.' + formKey + ':not(.webform-conditional-processed)');
    $form.each(function(index, currentForm) {
      var $currentForm = $(currentForm);
      $currentForm.addClass('webform-conditional-processed');
      $currentForm.bind('change', { 'settings': settings }, Drupal.webform.conditionalCheck);

      // Trigger all the elements that cause conditionals on this form.
      $.each(Drupal.settings.webform.conditionals[formKey]['sourceMap'], function(elementKey) {
        $currentForm.find('.' + elementKey).find('input,select,textarea').filter(':first').trigger('change');
      });
    })
  });
};

/**
 * Event handler to respond to field changes in a form.
 *
 * This event is bound to the entire form, not individual fields.
 */
Drupal.webform.conditionalCheck = function(e) {
  var $triggerElement = $(e.target).closest('.webform-component');
  var $form = $triggerElement.closest('form');
  var triggerElementKey = $triggerElement.attr('class').match(/webform-component--[^ ]+/)[0];
  var settings = e.data.settings;


  if (settings.sourceMap[triggerElementKey]) {
    $.each(settings.sourceMap[triggerElementKey], function(n, rgid) {
      var ruleGroup = settings.ruleGroups[rgid];

      // Perform the comparison callback and build the results for this group.
      var conditionalResult = true;
      var conditionalResults = [];
      $.each(ruleGroup['rules'], function(m, rule) {
        var elementKey = rule['source'];
        var element = $form.find('.' + elementKey)[0];
        var existingValue = settings.values[elementKey] ? settings.values[elementKey] : null;
        conditionalResults.push(window['Drupal']['webform'][rule.callback](element, existingValue, rule['value'] ));
      });

      // Filter out false values.
      var filteredResults = [];
      for (var i = 0; i < conditionalResults.length; i++) {
        if (conditionalResults[i]) {
          filteredResults.push(conditionalResults[i]);
        }
      }

      // Calculate the and/or result.
      if (ruleGroup['andor'] === 'or') {
        conditionalResult = filteredResults.length > 0;
      }
      else {
        conditionalResult = filteredResults.length === conditionalResults.length;
      }

      // Flip the result of the action is to hide.
      var showComponent;
      if (ruleGroup['action'] == 'hide') {
        showComponent = !conditionalResult;
      }
      else {
        showComponent = conditionalResult;
      }

      var $target = $form.find('.' + ruleGroup['target']);
      var $targetElements;
      if (showComponent) {
        $targetElements = $target.find('.webform-conditional-disabled').removeClass('webform-conditional-disabled');
        $.fn.prop ? $targetElements.prop('disabled', false) : $targetElements.removeAttr('disabled');
        $target.show();
      }
      else {
        $targetElements = $target.find(':input').addClass('webform-conditional-disabled');
        $.fn.prop ? $targetElements.prop('disabled', true) : $targetElements.attr('disabled', true);
        $target.hide();
      }
    });
  }

};

Drupal.webform.conditionalOperatorStringEqual = function(element, existingValue, ruleValue) {
  var returnValue = false;
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  $.each(currentValue, function(n, value) {
    if (value.toLowerCase() === ruleValue.toLowerCase()) {
      returnValue = true;
      return false; // break.
    }
  });
  return returnValue;
};

Drupal.webform.conditionalOperatorStringNotEqual = function(element, existingValue, ruleValue) {
  var found = false;
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  $.each(currentValue, function(n, value) {
    if (value.toLowerCase() === ruleValue.toLowerCase()) {
      found = true;
    }
  });
  return !found;
};

Drupal.webform.conditionalOperatorStringContains = function(element, existingValue, ruleValue) {
  var returnValue = false;
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  $.each(currentValue, function(n, value) {
    if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) > -1) {
      returnValue = true;
      return false; // break.
    }
  });
  return returnValue;
};

Drupal.webform.conditionalOperatorStringDoesNotContain = function(element, existingValue, ruleValue) {
  var found = false;
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  $.each(currentValue, function(n, value) {
    if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) > -1) {
      found = true;
    }
  });
  return !found;
};

Drupal.webform.conditionalOperatorStringBeginsWith = function(element, existingValue, ruleValue) {
  var returnValue = false;
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  $.each(currentValue, function(n, value) {
    if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) === 0) {
      returnValue = true;
      return false; // break.
    }
  });
  return returnValue;
};

Drupal.webform.conditionalOperatorStringEndsWith = function(element, existingValue, ruleValue) {
  var returnValue = false;
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  $.each(currentValue, function(n, value) {
    if (value.toLowerCase().lastIndexOf(ruleValue.toLowerCase()) === value.length - ruleValue.length) {
      returnValue = true;
      return false; // break.
    }
  });
  return returnValue;
};

Drupal.webform.conditionalOperatorStringEmpty = function(element, existingValue, ruleValue) {
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  var returnValue = true;
  $.each(currentValue, function(n, value) {
    if (value !== '') {
      returnValue = false;
      return false; // break.
    }
  });
  return returnValue;
};

Drupal.webform.conditionalOperatorStringNotEmpty = function(element, existingValue, ruleValue) {
  return !Drupal.webform.conditionalOperatorStringEmpty(element, existingValue, ruleValue);
};

Drupal.webform.conditionalOperatorNumericEqual = function(element, existingValue, ruleValue) {
  // See float comparison: http://php.net/manual/en/language.types.float.php
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  var epsilon = 0.000001;
  // An empty string does not match any number.
  return currentValue[0] === '' ? false : (Math.abs(parseFloat(currentValue[0]) - parseFloat(ruleValue)) < epsilon);
};

Drupal.webform.conditionalOperatorNumericNotEqual = function(element, existingValue, ruleValue) {
  // See float comparison: http://php.net/manual/en/language.types.float.php
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  var epsilon = 0.000001;
  // An empty string does not match any number.
  return currentValue[0] === '' ? true : (Math.abs(parseFloat(currentValue[0]) - parseFloat(ruleValue)) >= epsilon);
};

Drupal.webform.conditionalOperatorNumericGreaterThan = function(element, existingValue, ruleValue) {
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  return parseFloat(currentValue[0]) > parseFloat(ruleValue);
};

Drupal.webform.conditionalOperatorNumericLessThan = function(element, existingValue, ruleValue) {
  var currentValue = Drupal.webform.stringValue(element, existingValue);
  return parseFloat(currentValue[0]) < parseFloat(ruleValue);
};

Drupal.webform.conditionalOperatorDateEqual = function(element, existingValue, ruleValue) {
  var currentValue = Drupal.webform.dateValue(element, existingValue);
  return currentValue === ruleValue;
};

Drupal.webform.conditionalOperatorDateBefore = function(element, existingValue, ruleValue) {
  var currentValue = Drupal.webform.dateValue(element, existingValue);
  return (currentValue !== false) && currentValue < ruleValue;
};

Drupal.webform.conditionalOperatorDateAfter = function(element, existingValue, ruleValue) {
  var currentValue = Drupal.webform.dateValue(element, existingValue);
  return (currentValue !== false) && currentValue > ruleValue;
};

Drupal.webform.conditionalOperatorTimeEqual = function(element, existingValue, ruleValue) {
  var currentValue = Drupal.webform.timeValue(element, existingValue);
  return currentValue === ruleValue;
};

Drupal.webform.conditionalOperatorTimeBefore = function(element, existingValue, ruleValue) {
  // Date and time operators intentionally exclusive for "before".
  var currentValue = Drupal.webform.timeValue(element, existingValue);
  return (currentValue !== false) && (currentValue < ruleValue);
};

Drupal.webform.conditionalOperatorTimeAfter = function(element, existingValue, ruleValue) {
  // Date and time operators intentionally inclusive for "after".
  var currentValue = Drupal.webform.timeValue(element, existingValue);
  return (currentValue !== false) && (currentValue >= ruleValue);
};

/**
 * Utility function to get a string value from a select/radios/text/etc. field.
 */
Drupal.webform.stringValue = function(element, existingValue) {
  var value = [];

  if (element) {
    // Checkboxes and radios.
    $(element).find('input[type=checkbox]:checked,input[type=radio]:checked').each(function() {
      value.push(this.value);
    });
    // Select lists.
    if (!value.length) {
      var selectValue = $(element).find('select').val();
      if (selectValue) {
        value.push(selectValue);
      }
    }
    // Simple text fields. This check is done last so that the select list in
    // select-or-other fields comes before the "other" text field.
    if (!value.length) {
      $(element).find('input:not([type=checkbox],[type=radio]),textarea').each(function() {
        value.push(this.value);
      });
    }
  }
  else if (existingValue) {
    value = existingValue;
  }

  return value;
};

/**
 * Utility function to calculate a millisecond timestamp from a time field.
 */
Drupal.webform.dateValue = function(element, existingValue) {
  if (element) {
    var day = $(element).find('[name*=day]').val();
    var month = $(element).find('[name*=month]').val();
    var year = $(element).find('[name*=year]').val();
    // Months are 0 indexed in JavaScript.
    if (month) {
      month--;
    }
    return (year !== '' && month !== '' && day !== '') ? Date.UTC(year, month, day) / 1000 : false;
  }
  else {
    var existingValue = existingValue.length ? existingValue[0].split('-') : existingValue;
    return existingValue.length ? Date.UTC(existingValue[0], existingValue[1], existingValue[2]) / 1000 : false;
  }
};

/**
 * Utility function to calculate a millisecond timestamp from a time field.
 */
Drupal.webform.timeValue = function(element, existingValue) {
  if (element) {
    var hour = $(element).find('[name*=hour]').val();
    var minute = $(element).find('[name*=minute]').val();
    var ampm = $(element).find('[name*=ampm]:checked').val();

    // Convert to integers if set.
    hour = (hour === '') ? hour : parseInt(hour);
    minute = (minute === '') ? minute : parseInt(minute);

    if (hour !== '') {
      hour = (hour < 12 && ampm == 'pm') ? hour + 12 : hour;
      hour = (hour === 12 && ampm == 'am') ? 0 : hour;
    }
    return (hour !== '' && minute !== '') ? Date.UTC(1970, 0, 1, hour, minute) / 1000 : false;
  }
  else {
    var existingValue = existingValue.length ? existingValue[0].split(':') : existingValue;
    return existingValue.length ? Date.UTC(1970, 0, 1, existingValue[0], existingValue[1]) / 1000 : false;
  }
};

})(jQuery);
;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", "event", "Downloads", Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(), Drupal.googleanalytics.getPageUrl(this.href));
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(this.href) });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", "event", "Mails", "Click", this.href.substring(7));
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode != 2 || (Drupal.settings.googleanalytics.trackDomainMode == 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", "event", "Outbound links", "Click", this.href);
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga('send', 'pageview', location.pathname + location.search + location.hash);
    }
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function () {
    var href = $.colorbox.element().attr("href");
    if (href) {
      ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(href) });
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.openid = {
  attach: function (context) {
    var loginElements = $('.form-item-name, .form-item-pass, li.openid-link');
    var openidElements = $('.form-item-openid-identifier, li.user-link');
    var cookie = $.cookie('Drupal.visitor.openid_identifier');

    // This behavior attaches by ID, so is only valid once on a page.
    if (!$('#edit-openid-identifier.openid-processed').length) {
      if (cookie) {
        $('#edit-openid-identifier').val(cookie);
      }
      if ($('#edit-openid-identifier').val() || location.hash == '#openid-login') {
        $('#edit-openid-identifier').addClass('openid-processed');
        loginElements.hide();
        // Use .css('display', 'block') instead of .show() to be Konqueror friendly.
        openidElements.css('display', 'block');
      }
    }

    $('li.openid-link:not(.openid-processed)', context)
      .addClass('openid-processed')
      .click(function () {
         loginElements.hide();
         openidElements.css('display', 'block');
        // Remove possible error message.
        $('#edit-name, #edit-pass').removeClass('error');
        $('div.messages.error').hide();
        // Set focus on OpenID Identifier field.
        $('#edit-openid-identifier')[0].focus();
        return false;
      });
    $('li.user-link:not(.openid-processed)', context)
      .addClass('openid-processed')
      .click(function () {
         openidElements.hide();
         loginElements.css('display', 'block');
        // Clear OpenID Identifier field and remove possible error message.
        $('#edit-openid-identifier').val('').removeClass('error');
        $('div.messages.error').css('display', 'block');
        // Set focus on username field.
        $('#edit-name')[0].focus();
        return false;
      });
  }
};

})(jQuery);
;
!function(){try{window.fbAsyncInit=function(){var e={channelUrl:IGA.config.facebook.channelUrl,status:!0,xfbml:!0};IGA.config.facebook.appId&&(e.appId=IGA.config.facebook.appId),FB.init(e),IGA.social.attach.facebook(FB)},function(e,n,c){var t,o=e.getElementsByTagName(n)[0];e.getElementById(c)||(t=e.createElement(n),t.id=c,t.src="https://connect.facebook.net/en_US/all.js",o.parentNode.insertBefore(t,o))}(document,"script","facebook-jssdk")}catch(e){}}();;
!function(){try{window.twttr=function(t,e,r){var n,i,c=t.getElementsByTagName(e)[0];if(!t.getElementById(r))return i=t.createElement(e),i.id=r,i.src="https://platform.twitter.com/widgets.js",c.parentNode.insertBefore(i,c),window.twttr||(n={_e:[],ready:function(t){n._e.push(t)}})}(document,"script","twitter-wjs"),twttr.ready(function(t){IGA.social.attach.twitter(t)})}catch(t){}}();;
!function(){try{var e=IGA.config.googleplus.publisherId;!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://apis.google.com/js/plusone.js?onload=gplusLoadCallback"+(e?"&publisherid="+e:"");var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(t,a)}(),window.gplusLoadCallback=function(){IGA.social.attach.googleplus()}}catch(t){}}();;
/**
 * @file Twitter, Facebook, and Google+ social scripts and GA Event tracking
 */

(function(){
	"use strict";
	// # Social Scripts

	// ## Google Analytics Event Tracking
	var __icsaStart = Date.now(),
		ga = (typeof window.ga === "undefined") ? function(){} : window.ga;
	var attachGAEvents =
	IGA.social = {
		attach: {
			facebook: function(FB){
				if(IGA.social.fbAttached){ return; }else{ IGA.social.fbAttached = true; }
				FB.Event.subscribe('edge.create',
					function(href, widget) {
						//when a user has liked a url.
						ga("send", "event", "Social", "facebook.like", href );
					}
				);
				FB.Event.subscribe('edge.remove',
					function(href, widget) {
						//when a user has unliked a url.
						ga("send","event", "Social", "facebook.unlike", href );
					}
				);
				FB.Event.subscribe('message.send',
					function(href) {
						//when a user has used the send button.
						ga("send", "event", "Social", "facebook.message.send", href );
					}
				);
				ga('send', 'timing', 'Facebook', 'fbAsyncInit', Date.now() - __icsaStart);
			},
			googleplus: function(){
				if(IGA.social.gpAttached){ return; }else{ IGA.social.gpAttached = true; }
				IGA.onYtEvent = function(payload){
					if (payload.eventType === 'subscribe') {
						ga("send", "event", "Social", "youtube.subscribe", payload.channelExternalId );
					} else if (payload.eventType === 'unsubscribe') {
						ga("send","event", "Social", "youtube.unsubscribe", payload.channelExternalId );
					}
				};

				window.googleplusone_callback = function (data){//{"href": target URL, "state": "on"|"off" }
					ga("send", "event", "Social", "googleplus.plusone"+((data.state === "off")?".off":""), data.href );
				};
				ga('send', 'timing', 'Googleplus', 'gplusLoad', Date.now() - __icsaStart);
			},
			twitter: function(twttr){
				if(IGA.social.twAttached){ return; }else{ IGA.social.twAttached = true; }
				var event_names = {
					"click" :   "" ,// Track first interaction click
					"tweet" :  "",
					"retweet" : "source_tweet_id",
					"follow" : "screen_name",
					"favorite" : "tweet_id"
				};
				function trackIntent(intent_event){
					if(intent_event){
						var label = intent_event.type==="click" ? intent_event.region : (intent_event.data) ? intent_event.data[event_names[intent_event.type]] : "";
						ga("send", "event", "Social", "twitter." + intent_event.type, label);
					}
				}
				for(var event_name in event_names){
					if(event_names.hasOwnProperty(event_name)){
						twttr.events.bind(event_name, trackIntent);
					}
				}
				ga('send', 'timing', 'Twitter', 'twttr.ready', Date.now() - __icsaStart);
			}
		}
	};
})();;
/**
 * @author Malcolm Poindexter <malcolm.poindexter@umusic.com>
 */
//# Main Carousel Banner Analytics Tracking
define("bolero.slickAnalytics", ["jquery", "underscore", "IGA.events", "bolero.analytics", "googleanalytics", "jquery/plugins/jquery.viewport.min"],
	function($, _, events, boleroAnalytics, ga){
	"use strict";
	function SlickAnalytics(el){
		this.$el = $(el);
		this.$slides = [];
		this.noDupes = {};
		var $el = this.$el, name = "NONE", eventId = "slick";
		if($el.is(".l-banner .l-region--banner")){
			name = "Banner";
			eventId = "banner";
		}else if($el.is(".view")){
			name = $el.attr("data-view-name");
			eventId = "view-"+$el.attr("data-view-id")+"--"+$el.attr("data-view-display-id");
		}
		this.name = name;
		this.eventId = eventId;
		this.initialized = false;
		this.viewed = [];
	}

	SlickAnalytics.prototype.init = function(slider){
		var self = this;
		this.slider = slider;
		this.$slides = slider.$slides;
		this.trackClicks();
		var _trackViews = _.bind(this.trackViews, this);
		IGA.events.on("bolero."+this.eventId+".beforechange", function(){ self.noDupes = {}; });//clear out duplicate detection buffer
		IGA.events.on("bolero."+this.eventId+".afterchange", _trackViews);
		if(!this.initialized){
			_.defer(_trackViews);
		}
		if(!$.mobile){
			require(["jquery/plugins/jquery.scrollstop"], function(){
				//$.event.special.scrollstop.setup();
				$(window).on("scrollstop", _trackViews);
			});
		}else{
			$(window).on("scrollstop", _trackViews);
		}
		this.$slides.not(".slick-cloned, .bolero-sa-initialized").addClass("bolero-sa-initialized");
		this.initialized = true;
	};

	 function _findOriginalSlide($clone, $slides){
		var classes = $clone[0].className.replace("slick-cloned", "").trim(),
			slideSelector = "."+classes.split(/\s+/).join("."), //let's get all the classes into a selector
			$originalSlide = $slides.filter(slideSelector).first();
		//here it is, use this slide index instead.
		return $originalSlide;
	}

	SlickAnalytics.prototype.trackViews = function(){
		var self = this,
			_slideZTop = 0;
		_.each(this.$slides, function(el){
			var _z = parseInt(el.style["z-index"]);
			if(_z > _slideZTop){ _slideZTop = _z; }
		});

		this.$slides.siblings().each(function(i){//.not(".slick-cloned")
			var $this = $(this),
				$slide = $this,
				$node = $slide.children(".node"),
				z_index = parseInt(this.style["z-index"] || 0),
				offset = $this.offset(),
				$container = $this.parent().parent(),
				container_offset = $container.offset(),
				container_width = $container.width();
			//## Track which slides have been seen
			if( z_index >= _slideZTop && $this.is(":visible") && //not faded out or display:none
				$.inviewport($this, { threshold: -100 }) && !$.leftofscreen($this, {threshold: 100}) && //on the screen
				offset.left - container_offset.left >= 0 && offset.left - container_offset.left < container_width && //in the container
				!self.noDupes[i])
			{
				//To count slides must be on the top of the z-index, visible, within the viewport, and within the container.
				if($this.is(".slick-cloned")){
					//... but what is the actual, not-cloned slide?
					$slide = _findOriginalSlide($this, self.$slides);
				}
				var slide_num = _.indexOf(self.$slides, $slide[0]) + 1,
					ga_label = boleroAnalytics.label($node) || "slide-"+slide_num,
					timing = Date.now() - boleroAnalytics.start;// track when the node was viewed
				self.noDupes[i] = true;
				//Track that the banner at this index has been seen.
				if(!self.viewed[slide_num]){ ga("send", "event", "Carousel : " + self.name, "impression", ga_label, timing, {nonInteraction: 1}); }
				self.viewed[slide_num] = true;
				//TODO add nodeID tracking when using DS.
			}
		});
	};

	SlickAnalytics.prototype.trackClicks = function(){
		//## Track clicks on slides
		var self = this;
		this.$slides.siblings().not(".bolero-sa-initialized").each(function(i){
			// that haven't already been initialized
			$(this).one("click", function(){
				var $this = $(this),
					$slide = $this,
					$node = $slide.children(".node");
				if($this.is(".slick-cloned")){
					//... but what is the actual, not-cloned slide?
					$slide = _findOriginalSlide($this, self.$slides);
				}
				var slide_num = _.indexOf(self.$slides, $slide[0]) + 1,
					ga_label = boleroAnalytics.label($node)|| "slide-"+slide_num;
				ga("send", "event", "Carousel : " + self.name, "click", ga_label, 1);
			});
		});
	};

	return SlickAnalytics;
});;
/**
 * Load / reload
 */
define("bolero.form", ["jquery", "underscore", "Drupal.ajax"], function ($, _) {
	"use strict";
	function BoleroForm($container, form_id, data, settings) {
		//TODO change settings.useAjax -> settings.ajaxLoad
		this.data = data || {};
		this.settings = settings || {};
		//TODO if $container.is("form") wrap it.
		if($container.is("form")){
			if(!$container.parent().is(".bolero-ajax-form-wrapper")){
				$container.parent().addClass("bolero-ajax-form-wrapper");
			}
			$container = $container.parent();
		}else if(!$container.is(".bolero-ajax-form-wrapper")){
			$container.addClass("bolero-ajax-form-wrapper");
		}
		//Check the registry for existing forms
		this.$container = $container;
		if(!form_id){
			form_id = $container.attr("data-bolero-form-id");
		}
		this.$form = $container.children("form");

		if(this.$form.length > 0){
			if(!form_id){
				form_id = this.$form.find("input[name=form_id]").val();
			}
			this.setupForm();
		}
		if(BoleroForm.registry[form_id]){
			var bf = BoleroForm.registry[form_id];
			if(data){ bf.data = data; }
			_.extend(bf.settings, settings);
			return bf;
		}
		this.form_id = form_id;
		this.endpoint = "/api/bolero/form/"+form_id;
		this.ajax = new Drupal.ajax(null, $container, { url: this.endpoint });
		this.initSettings();
		//TODO use form_build_id ?

		BoleroForm.registry[form_id] = this;
		return this;
	}

	BoleroForm.registry = [];

	BoleroForm.prototype.delete = function(){
		delete BoleroForm.registry[this.form_id];
		this.$container.remove();
	};

	BoleroForm.prototype.load = function(reload){
		if(reload === true){
			this.$form.remove();
		}
		if(this.$form.length === 0){
			return this.get();
		}else{
			var deferred = $.Deferred();
			deferred.resolve(false);
			//return a jQuery promise to mimic $.ajax().done()
			return deferred.promise();
		}
	};

	BoleroForm.prototype.request = function(endpoint){
		endpoint = this.endpoint + (endpoint || "");
		if(this.inProgress){ return $.Deferred().promise(); }
		var self = this,
			postData = this.$form.serializeArray() || [];
		//add ajax_page_state to allow drupal_add_js/css ajax to work.
		_.each(["css", "js"], function(type){
			if(Drupal.settings.ajaxPageState){
				for(var key in Drupal.settings.ajaxPageState[type]) {
					postData.push({name:"ajax_page_state["+type+"]["+key+"]", value: 1});
				}
			}
		});
		//Drupal forms use non-unique ids with an id--# suffix so we must pass all of the existing elements
		//@see misc/ajax.js : Drupal.ajax.prototype.beforeSerialize
		var html_ids = _.reduce($('[id]'), function(ids, el){
			ids.push(el.id);
			return ids;
		}, []);
		postData.push({name:"ajax_html_ids[]", value: html_ids});
		//TODO
		//options.data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
		//options.data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;

		for(var key in this.data) {
			postData.push({name:key, value: this.data[key]});
		}

		var has_triggering_element = false;
		for(var data in postData){
			if(data.name === '_triggering_element_name'){
				has_triggering_element = true;
			}
		}
		if(!has_triggering_element && self.settings[this.formSubmitId] && self.settings[this.formSubmitId].submit){
			var tEN = self.settings[this.formSubmitId].submit._triggering_element_name;
			if(tEN){
				postData.push({ name:"_triggering_element_name", value: tEN });
			}
		}

		this.inProgress = true;
		return $.ajax({
			type: 'POST',
			url: endpoint,
			data: postData
		}).always(function(){ self.inProgress = false; });
	};

	BoleroForm.prototype.get = function(endpoint){
		return this.request(endpoint).done(_.bind(this.insert, this));
	};

	BoleroForm.prototype.rebuild = function(){
		return this.get("/rebuild");
	};

	BoleroForm.prototype.validate = function(){
		this.submitText();
		return this.get("/validate");
	};

	BoleroForm.prototype.submit = function(){
		var self = this;
		this.submitText();
		if(this.settings.useAjax === false){
			var form = this.$form[0];
			form.action = location.pathname;
			form.submit();
		}else if(this.settings.ajax && this.settings.ajaxSubmit){
			//if there are ajax settings for this form then submit it
			this.$form.ajaxSubmit({
				success: function(response, status){
					self.insert(response, status);
					self.$form.removeClass("state--submitting");
				}
			});
		}else{
			//otherwise, use the bolero ajax form submit
			return this.get("/submit").done(function(){
				self.$form.removeClass("state--submitting");
			});
		}
	};

	BoleroForm.prototype.submitText = function(){
		var self = this;
		this.$form.addClass("state--submitting");
		if(this.$formSubmit){
			if(!this._submitAttached){
				var defaultText = this.$formSubmit.val();
				this.$form.on("submitted validated error", function(){
					self.$form.removeClass("state--submitting");
					self.$formSubmit.val(defaultText);
				});
				this._submitAttached = true;
			}
			this.$formSubmit.val(this.settings.submitText || "Submitting...");
		}

	};

	BoleroForm.prototype.insert = function(response, status){
		var data, settings;
		for(var i = 0; i< response.length; i++){
			data = response[i];
			if(data.command === "settings"){ settings = data.settings; }
			if(data.settings && data.settings.bolero_form === true ){
				data.selector = this.$container;
				//merge in the settings b/c they aren't available until the end of ajax_render
				data.settings = $.extend(data.settings, settings);
				//insert and Drupal.attachBehaviors
				this.ajax.commands.insert(this.ajax, data, status);
				this.$form = this.$container.children("form");
				this.setupForm(settings);
			}else if(data){
				data.selector = data.selector || this.$form;
				if(typeof this.ajax.commands[data.command] === "function"){
					this.ajax.commands[data.command](this.ajax, data, status);
				}
			}
		}
		this.initSettings(settings);
	};

	//## When we have a form
	BoleroForm.prototype.setupForm = function(){
		var self = this;
		this.$formSubmit = this.$form.find(".form-submit");
		this.formSubmitId = (this.$formSubmit.length) ? this.$formSubmit[0].id : null;
		//override Drupal ajaxSubmit
		this.$formSubmit.each(function(){
			var $formSubmit = $(this),
				ajax = Drupal.ajax[this.id];
			$formSubmit.once("bolero-form", function(){
				$formSubmit.on("click", function(e){
					//If there are events bound to the form submit
					var events = $._data(self.$form[0], "events");
					if(events && events.submit){
						// trigger them
						var fe = $.Event("submit");
						self.$form.trigger(fe);// submit.bolero.formSubmit
						if(!fe.isPropagationStopped() && ajax){
							// and continue or allow submit event handlers to prevent ajaxSubmit
							ajax.eventResponse(this, e);
						}
					}else{
						if(!self.settings.ajaxSubmit){
							self.submit();
						}else if(ajax){
							ajax.eventResponse(this, e);
						}
					}
				}).addClass("ajax-processed");
				if(Drupal.ajax[this.id]){
					$formSubmit.off("mousedown");
					//delete Drupal.ajax[this.id];
				}
			});
		});
	};

	BoleroForm.prototype.initSettings = function(){
		var self = this;
		this.settings = this.settings || {};
		if(this.$form.length > 0){
			this.$formSubmit.each(function(){
				var submit_id = this.id;
				self.settings.ajax = false;
				self.settings.ajaxSubmit = false;
				if(Drupal.settings.ajax && Drupal.settings.ajax[submit_id]){
					self.settings[submit_id] = Drupal.settings.ajax[submit_id];
					self.settings.ajax = true;
					//by default use the Bolero form submit instead b/c it has better error handling w/ events.
					self.settings.ajaxSubmit = self.settings.ajaxSubmit || false;
				}
			});
		}
		return this.settings;
	};

	return BoleroForm;
});
;
/**
 * @file Bolero User Login
 */
//# Bolero User Login
define("bolero.user_login", ["jquery", "underscore", "IGA.events"], function($, _, events){
    "use strict";
	// module scope static vars
	var $forms = $("#block-bolero-user-login-user-login-modal"),
		dbae = Drupal.behaviors.ae_social_login,
		dsbul = Drupal.settings.bolero_user_login || {},
		ae_form_field_mapping = Drupal.settings.ae_social_login ? Drupal.settings.ae_social_login.form_field_mapping : null,
		ae_forms = Drupal.settings.ae_social_login ? Drupal.settings.ae_social_login.forms || [] : [];

    var bul = {
	    flow: "login",
	    $forms: $forms,
	    isBlock: $forms.length > 0,
	    isModal: $forms.is("[data-reveal]"),
	    opened: false, // TODO isOpened, isInitialized
	    initialized: false,
	    //## Initialize Bolero Modal
	    init: function(){
		    if(!bul.initialized){
			    $forms.form = $forms.find(".user-login-forms .login form");
			    // ### Attach login / register form handler
			    var $ae_reg_forms = $('form#user-login, form#user-register-form, form#ae-required-fields');
			    if($ae_reg_forms.length > 0){
				    $forms = $ae_reg_forms;
			        bul.isModal = false;
				    bul.isBlock = false;
				    this.attach();
				    $ae_reg_forms.each(bul.handlers.ae_register_form);
		        }else if(bul.isBlock){
				    //### Update the Drupal login to show the modal
				    IGA.drupal.login = function(){
					    //Override to use Foundation reveal modal login block if present.
					    bul.open();
				    };
				    this.attach();
				    if($forms.attr("data-default-form") === "register"){
					    bul.handlers.register();
				    }else{
					    bul.handlers.login();
				    }
			    }

			    //### Attach social handler
			    if($forms.social){
				    $forms.social.on("click", bul.actions.social);
			    }

			    //### Listen for AE Connect social login
			    events.on("ae_ready", bul.attachAE).replay("ae_ready", bul.attachAE);

			    this.initialized = true;
			    //### Basic ui events
			    $forms.on("close.fndtn.reveal", function(){
				    bul.opened = false;
			    });
				if(IGA.user.ae_user){
					// Add connected service classes
					var $html = $("html"),
						ae_user = IGA.user.ae_user;
					for(var s in ae_user.services){
						$html.addClass("ae-connected--"+ ae_user.services[s].Service);
					}
				}
		    }
		    return this;
	    },
	    open: function(){
		    //TODO update bul.opened once onLogin provides sso flag
		    if(!bul.isModal){
			    if(bul.isBlock){
				    // inline block, treat the same but no need for reveal.
				    IGA.conversionPt = "bolero.user_login";
				    bul.$forms.removeClass("hidden").show();
				    // scroll to $forms
				    $('html,body').animate({
					    scrollTop: bul.$forms.offset().top
				    }, 800);
			    }else{
				    //window.location = "/user/" + bul.flow; return;
			    }
		    }else{
			    require(["foundation.reveal"], function(){
				    events.trigger("bolero.user_login.open");
				    $forms.foundation('reveal', 'open');
			    });
			    IGA.conversionPt = "bolero.user_login.modal";
		    }
		    bul.opened = true;
	    },
	    close: function(){
		    events.trigger("bolero.user_login.close");
		    $forms.foundation('reveal', 'close');
	    },
	    //## (re)Attach DOM Elements
	    attach: function(){
		    var self = this;
		    $.extend(true, $forms, {
			    state: "state--login state--register state--password state--required-fields",
			    header: {
					login: $forms.find("header .login"),
					register: $forms.find("header .register")
			    },
			    forms: $forms.find(".user-login-forms"),
			    login: $forms.find(".user-login-forms .login, header"),
			    register: $forms.find(".user-login-forms .register, header"),
			    password: $forms.find(".user-login-forms .password"),
			    messages: $forms.find(".messages"),
			    social: $forms.find(".ae-social-login-links a")
			});

		    if(!bul.isModal){
			    // use page messages
			    $forms.messages = $(".messages");
		    }

		    //### Show user_register form
		    $forms.find("header .register").once("bolero-emcee-login", function(){
			   $(this).on("click", _.bind(bul.handlers.register, self));
		    });

		    //### Show user_login form
		    $forms.find("header .login, .user-login-forms .password .user-login-link").once("bolero-emcee-login", function(){
			   $(this).on("click", _.bind(bul.handlers.login, self));
		    });

		    if(IGA.user.uid){
			    // In the authenticated state update to "connect"
			    $forms.header.login.find("h2").text("Connect");
			    $forms.header.login.find("h2 + span").text(" an additional account");
			    $forms.find("#bolero-user-login-submit").val("Connect");
			    $forms.login.removeAttr("data-ae-type");
			    $forms.addClass("state--connect");
		    }

		    //### Show user_password form
		    $forms.find(".password-reset-link a").once("bolero-emcee-login", function(){
			  $(this).on("click", _.bind(bul.handlers.password, self));
		    });

			bul.attachRegister();
			return this;
	    },
	    //### Update Registration Form UI
	    attachRegister: function(){
		    $("form#bolero-user-register, form#user-register-form").once(function(){
			    var $register = $(this),
				    $email = $register.find("#edit-mail"),
				    $username = $email.parent().siblings(".form-item").find(".username").first(),
				    $password = $register.find(".form-item-pass-pass1"),
				    $password_confirm = $register.find(".form-item-pass-pass2"),
				    $password_strength = $password.find(".password-strength"),
				    $password_confirm_msg = $password_confirm.find("div.password-confirm");
			    //Autocomplete username based off of the email
			    var updateUsername = _.debounce(function(){
				    var username = $email.val().split("@")[0];
				    $username.val(username);
			    }, 200);
			    $email.on("input", updateUsername);
			    // but remove the autocomplete if the user updates their username
			    $username.on("focus", function(){ $email.off("input", updateUsername); });

			    //move the password strength & confirm check
			    $password_strength.detach().appendTo($password);
			    $password_confirm_msg.detach().appendTo($password_confirm);

		    });
		    return this;
	    },
	    //## Once AE is ready
	    attachAE: function(aeJS){
		    // Listen for AE user events;
		    if(bul.isBlock){
				aeJS.events.onLogin.addHandler(bul.handlers.required_fields);
		        aeJS.events.onUser.addHandler(bul.handlers.required_fields);
		    }
		    aeJS.events.onFlow.addHandler(function(e){
			    if(e.step === "error"){
				    bul.handlers.error(null, {
					    type: "AE " + bul.flow,
					    message: e.error,
					    errors : { ae_user: true }
				    }, true);
			    }
		    });
		    //TODO tracktiming b/w social open & onUser / onLogin
		},
	    //## Attach Forms
	    attachForm: function(bolero_form){
		    var $form = bolero_form.$form,
			    form_id = bolero_form.$form.attr('id');// element Id
		    function ae_attach(aeJS){
			    // If AE is available, submit w/ AE.
			    if(!$form.is("[data-ae-register-form]") && ae_forms.indexOf(form_id) >= 0 || bolero_form.settings.ae_attached === false ){
				    $form.attr("data-ae-register-form", "email");
				    aeJS.trigger.attach($form[0]);
				    bolero_form.settings.ae_attached = true;
			    }
			    if($form.is("form[data-ae-type=login]")){
				    $form.one("user", function(){
					    $form.removeAttr("data-ae-type");
				    });
			    }
		    }

		    // Attach custom submit + validate handler
		    bolero_form.onSubmit = _.partial(bul.actions.submit, bolero_form);
		    $form.on("submit", bolero_form.onSubmit);

		    events.on("ae_ready", ae_attach).replay("ae_ready", ae_attach);
		    if(!bolero_form.settings.attached){
			    // One-time form initialization
			    bolero_form.$form.on("login", bul.events.login).on("register", bul.events.register);
			    bul.setOptout(bolero_form);
			    bolero_form.settings.attached = true;
		    }
	    },
	    detachForm: function(bolero_form){
		    bolero_form.$form.find("input[name=ae_user]").empty();
		    // Remove the AE form submit and error handler
		    bolero_form.$form.off("submit error");
		    bolero_form.settings.ae_attached = false;
	    },
	    setOptout:function(bolero_form){
		    var $et_lists = bolero_form.$form.find(".et-lists input"),
			    subscribedCount = 0;
		    if(!require.specified("ExactTarget")){ return; }
			require(["ExactTarget", "IGA.webshim.storage"], function(ET){
				$et_lists.each(function(){
					var $et_list = $(this),
						listId = $et_list.val(),
				        isOptedOut = ET.isOptedOut(listId),
					    isSubscribed = ET.isSubscribed(listId);
				    if(isOptedOut || isSubscribed){
					    // If the user has opted out of the list, respect opt-out;
					    // also uncheck if the user is already subscribed so ET doesn't attempt to re-subscribe (b/c expensive).
					    $et_list.prop( "checked", false );
					    $.cookie("et_subscribe_default_"+listId, 0, { expires: -1 });
				    }else{
					    // otherwise, pre-check the checkbox
					    $et_list.prop( "checked", true );
					    $.cookie("et_subscribe_default_"+listId, '1'); // cookie used for redirect
				    }
				    if(isSubscribed){
					    $et_list.closest(".form-item").hide();
					    subscribedCount++;
				    }
				    // and listen for any future opt-out / opt-in.
				    $et_list.on("click", function(){
					    bul.et_optout = true;
					    // After the user has checked an ET optin
					    var checked = $et_list.prop("checked");
					    // update their opt-out status.
					    if(checked === false){
						    ET.setOptOut(listId, true);
					    }else if(checked === true){
						    ET.setOptOut(listId, false);
					    }
				    });
				    ET.addList($et_list, "bolero_user_login", bolero_form.$form);
			    });
			    if(subscribedCount === $et_lists.length){
				    $forms.form.find(".et-lists.form-checkboxes").closest(".form-item-lists").hide();
				    $forms.form.find(".et-disclaimer").hide();
			    }
		    });
	    },
	    actions: {
		    //### Social Login / Registration
		    social: function(e){
			    var $social = $(this),
				    network = $social.attr("data-ae-register-form-link");
			    e.preventDefault();
			    IGA.conversionPt = "bolero."+network;
			    $forms.form.attr("data-ae-register-form", network);
			    function submit(){
				    aeJS.trigger.authenticate(network);
				    //TODO allow social + form, currently broken due to birthdate conflict
				    /*if(aeJS.user.data){
					    // Don't submit the form if the user is already logged into AE, just connect the social.
					    aeJS.trigger.authenticate(network);
				    }else{
					    dbae.map_ae_fields($forms.form);
					    aeJS.trigger.submit($forms.form);
				    }*/
			    }
			    events.on("ae_ready", submit).replay("ae_ready", submit);
		    },
		    //### Email Login / Registration
		    submit: function(bolero_form, e){
			    e.preventDefault();
			    e.stopImmediatePropagation();
			    var $form = bolero_form.$form, form = $form[0];
			    IGA.conversionPt = "bolero.email";
			    function removeSubmit(){
				    // If no errors submitting to AE remove AE submit
				    bolero_form.$form.off("submit", bolero_form.onSubmit);
				    // defer removing this listener otherwise it breaks loop
				    _.defer(function(){ aeJS.events.onUser.removeHandler(removeSubmit); });
			    }
			    if($form.is("form[data-ae-register-form]")){
				    aeJS.events.onUser.addHandler(removeSubmit);
				    $form.once("bul-form-submit", function(){
					    bolero_form.$form.on("validated", function(){
						    //#### Once Validated

						    removeSubmit();
						    if(bul.flow === "login"){
							    // Map user login name / email field to username / email
							    var $name = $form.find('input[name="name"]'),
								    name = $name.val();
							    if(name.indexOf("@") > 0){
								    // name is an email
								    var username = name.split('@')[0];
								    ae_form_field_mapping[bolero_form.form_id + ".name"] = "email";
								    // set a default username
							    }else{
								    //form name is an username
								    ae_form_field_mapping[bolero_form.form_id + ".name"] = "username";
							    }
						    }
						    dbae.map_ae_fields($form);
						    // submit the form to AE login / register.
						    aeJS.trigger.submit(form);
					    });
				    });
				    bolero_form.validate();
			    }else{
				    // Otherwise, just submit.
				    bolero_form.submit();
			    }
		    },
		    //## AE Login / Register Form Submit
		    login: function(ae_user, type, options){
			    options = options || {};
			    //This should be the local flow rather than if this is a login / register in ae
			    bul.handlers[bul.flow](null, false);
			    // add the ae_user data to the form hidden input
			    var $ae_user = $forms.form.find("input[name=ae_user]");
			    $ae_user.val(JSON.stringify(ae_user));
			    dbae.remove_ae_field_mappings($forms.form);
			    // and submit via AJAX.
			    require(["bolero.form"], function(BoleroForm){
				    var bolero_form = new BoleroForm($forms.form);
				    $forms.form[0].action = (bolero_form.formSubmitId) ? Drupal.settings.ajax[bolero_form.formSubmitId].url  : "/system/ajax";
				    bolero_form.submit();
			    });

			    bul.handlers.prevent = false;
		    },
		    clear_subscriptions: function(){
			    $forms.form.find(".et-lists input").each(function(){
				    $(this).prop( "checked", false );
			    });
		    }
	    },
	    events: {
		    //## Login event callback
		    login: function(e, user){
			    var options = {},
				    alreadyLoggedIn = IGA.user.uid ? true : false;
			    if(typeof aeJS !== "undefined"){ options.ae_user = aeJS.user; }
			    if(alreadyLoggedIn){
				    bul.events.updated(user.user);
			    }
			    events.trigger("login", [user, options]);
			    if(!alreadyLoggedIn){
				    $forms.form.addClass("state--loading");
				    IGA.location.reload();
			    }else{
				    bul.handlers.prevent = false;
				    bul.handlers.login();
			    }
		    },
		    updated: function(user){
			    bul.close();
			    var action = "connected", connected_service;
			    if(IGA.user.ae_user && user.ae_user){
				    if(user.ae_user.services.length === IGA.user.ae_user.services.length){
					    // No new services have been added.
					    action = "updated";
				    }else{
					    // Otherwise, find the new service.
					    var service, orig_service
					    for(var s in user.ae_user.services){
						    service = user.ae_user.services[s];
						    connected_service = false;
						    for(var o in IGA.user.ae_user.services){
							    if(service.ID === IGA.user.ae_user.services[o].ID){
								    connected_service = true;
								    break;
							    }
						    }
						    if(connected_service === false){
							    connected_service = service;
						    }
					    }
				    }
			    }
			    require(["IGA.bolero.Snackbar"], function(Snackbar){
				    if(action === "connected" && typeof connected_service === "object"){
					    $("html").addClass("ae-connected--"+connected_service.Service);
					    Snackbar.add('<i class="icon icon-'+connected_service.Service+'"</i>Now connected as '+ connected_service.Username + '.', true, null, { type: "success"});
				    }else{
					    Snackbar.add("Success! Your account has been "+action+".", true, null, { type: "success"});
				    }
			    });
		    },
		    remote_login: function(user){
			    // TODO it'd be nice if we could figure out new vs. connected vs. already connected.
			    require(["IGA.bolero.Snackbar"], function(Snackbar){
				    Snackbar.add("Success! Your account has been updated.", true, null, { type: "success"});
			    });
		    },
		    //## Register event callback
		    register: function(e, user){
			    var options = {};
			    if(typeof aeJS !== "undefined"){ options.ae_user = aeJS.user; }
			    events.trigger("register", [user, options]);
			    bul.events.login(e, user);
		    }
	    },
	    handlers: {
		    prevent: false,
		    login: function(e, attach, error){
			    if(bul.handlers.prevent){ return false; }
			    if(e){ e.preventDefault(); }
			    bul.flow = "login";
			    $forms.removeClass($forms.state).addClass("state--login");
			    $forms.header.login.addClass("active");
			    $forms.header.register.removeClass("active");
			    var formSelector = "form#bolero-user-login, form.bolero-user-login, form.user-login, form#user-login",
				    authAction = IGA.user.uid ? "Connect" : "Login";
			    $forms.form = $forms.find(formSelector).andSelf().filter(formSelector);
			    $forms.social.find(".auth-action").text(authAction);
			    //On state change, hide the previous messages
			    if(!error){ $forms.messages.hide(); }
			    require(["bolero.form"], function(BoleroForm){
				    var submitText = (IGA.user.uid) ? "Connecting..." : "Logging In...",
					    bolero_form = new BoleroForm($forms.form, null, null, { submitText: submitText });
				    attach = attach || !bolero_form.settings.attached;
				    if(attach !== false){
					    bul.handlers.form($forms.form);
					    // If using AE connect validate using bolero_form and submit to AE before submitting locally.
					    bul.attachForm(bolero_form);

				    }
			    });
		    },
		    register: function(e, attach, error){
			    if(bul.handlers.prevent){ return false; }
			    if(e){ e.preventDefault(); }
			    bul.flow = "register";
			    require(["bolero.form"], function(BoleroForm){
				    var $container = $forms.register.filter(".register.bolero-ajax-form-wrapper"),
				        bolero_form = new BoleroForm($container, null, null, { submitText: "Creating Account..." });
					bolero_form.load().done(function(response){
					    if(response !== false){
					        // Because the form was loaded via ajax we should re-attach it
					        bul.attach();
					    }else{
						    attach = attach || !bolero_form.settings.attached;
					    }
					    $forms.removeClass($forms.state).addClass("state--register");
					    $forms.header.register.addClass("active");
					    $forms.header.login.removeClass("active");
						var formSelector = "form#bolero-user-register, form.bolero-user-register, form#user-register-form, form.user-register-form";
						$forms.form = $forms.find(formSelector).andSelf().filter(formSelector);
					    $forms.social.find(".auth-action").text("Register");
						if(!error){ $forms.messages.hide(); }
						if(attach !== false){
							bul.handlers.form(bolero_form.$form);
							// If using AE connect validate using bolero_form and submit to AE before submitting locally.
							bul.attachForm(bolero_form);
						}
				    });
			    });
		    },
		    ae_register_form: function(){
			    var $ae_reg_form = $(this),
				    formId = this.id;
			    require(["bolero.form"], function(BoleroForm){
				    var bolero_form = new BoleroForm($ae_reg_form, null, null, { useAjax:false, ajaxSubmit:false });
				    function attach_register_form(){
					    function ae_submit(ae_user, type){
						    if(type === "init"){ return; }
						    var $ae_user = bolero_form.$form.find("input[name=ae_user]");
						    $ae_user.val(JSON.stringify(ae_user));
						    dbae.remove_ae_field_mappings(bolero_form.$form);
						    bolero_form.submit();
					    }
					    aeJS.events.onLogin.addHandler(ae_submit);
					    aeJS.events.onUser.addHandler(ae_submit);
					    bolero_form.$formSubmit.on("click", function(){
						    $forms.form = bolero_form.$form;
						    bul.flow = (formId.indexOf("register") >= 0) ? "register" : "login";
					    });
				    }
				    bul.handlers.form(bolero_form.$form);
				    if(formId !== "ae-required-fields"){
					    bul.attachForm(bolero_form);
					    events.on("ae_ready", attach_register_form).replay("ae_ready", attach_register_form);
				    }else{
					    $forms.form = bolero_form.$form;
				    }
			    });
		    },
		    password: function(e, error){
			    if(bul.handlers.prevent){ return false; }
			    if(e){ e.preventDefault(); }
			    require(["bolero.form"], function(BoleroForm){
				    var $container = $forms.password.filter(".password").find(".bolero-ajax-form-wrapper"),
					    bolero_form = new BoleroForm($container, null, null, { submitText: "Sending Email..." });
				    bolero_form.load().done(function(response){
					    if(response !== false){
					        // Because the form was loaded via ajax we should re-attach it
					        bul.attach();
					    }
					    $forms.removeClass($forms.state).addClass("state--password");
					    if(!error){ $forms.messages.hide(); }
					    $forms.form = bolero_form.$form;
					    if(this.xhr){
						    bul.handlers.form($forms.form);
					    }
				    });
			    });
		    },
		    required_fields: function(user, type, sso){
			    if(type === "init" || sso === true || !bul.isBlock){ return; }
			    if(dbae.remoteOnly){
				    if(bul.opened){ bul.close(); }
				    return bul.events.remote_login(user);
			    }
			    var $container = $forms.required_fields || $('<div class="required-fields ae-form" style="display:none"></div>');
			    if(!$forms.required_fields){
				    $forms.forms.append($container);
				    $forms.required_fields = $container;
			    }
			    require(["bolero.form"], function(BoleroForm){
				    var bolero_form = new BoleroForm($container, 'ae_required_fields', {ae_user: JSON.stringify(user) });
				    bolero_form.load().done(function(response){
					    if(response === false){
						    // The form has already been loaded, no ajax request needed.
						    if(!bul.required_fields_complete && !bul.opened){
							    // If the user hasn't satisfied all required fields ask them again;
							    bul.handlers.show($container, 'required-fields');
							    bul.open();
						    }else{
							    // otherwise, continue with login / update.
							    if(!bul.opened){ bul.actions.clear_subscriptions(); }
							    bul.actions.login(user, type);
						    }
						    return;
					    }
					    var $form = bolero_form.$form,
						    $required_fields = $form.find('input[name=required_fields]'),
						    has_required_fields = $required_fields.val() !== "",
						    required_fields_exacttarget = dsbul.required_fields_exacttarget;
						bul.required_fields_complete = false;
					    required_fields_exacttarget = bul.handlers.required_fields_et($form);

					    //If the required fields screen is triggered, open the modal.
					    if(!has_required_fields){
						    // If already logged in then we're all set.
						    dbae.updateForm($forms.form);
						    if(required_fields_exacttarget > 0){
							    $form.find("#ae-required-fields-submit").val("Continue");
							    $form.on("submit", function(e){
								    e.preventDefault();
								    e.stopImmediatePropagation();
								    $form.addClass("state--loading");
								    bul.required_fields_complete = true;
								    bul.actions.login(user, type);
							    });
							    bul.handlers.show($container, 'required-fields');
						    }else{
							    if(!bul.opened){
								    // Uncheck ET mailing lists if the user hasn't seen the login form yet
								    // so that we don't blindly subscribe them.
								    bul.actions.clear_subscriptions();
							    }
							    bul.required_fields_complete = true;
							    bul.actions.login(user, type);
						    }
						    return;
					    }
					    // ### If there are some required fields left
					    // Show the form
					    if(!bul.opened){ bul.open(); }
					    bolero_form.$container.show();
					    bul.handlers.form($form);
					    bul.handlers.show($container, 'required-fields');
					    //##### Validate the form
					    function validate(e){
						    bolero_form.validate();
						    return false;
					    }
					    function ae_continue(user, state){
						    // use the updated user from AE
						    aeJS.events.onUser.removeHandler(ae_continue);
						    aeJS.events.onLogin.addHandler(bul.handlers.required_fields);
						    aeJS.events.onUser.addHandler(bul.handlers.required_fields);
						    bul.handlers.prevent = false;
						    bolero_form.$container.hide();
						    //update the form fields with AE user data
						    dbae.updateForm($forms.form);
						    bul.handlers[bul.flow](null, false);
						    bolero_form.delete();
						    bul.handlers.prevent = true;
						    bul.actions.login(user, type);

					    }
					    $form.on("submit", validate);
					    // Once the form has been validated server-side, submit to AE
					    bolero_form.$form.on("validated", function(){
						    $form.off("submit", validate);
						    $form.attr("data-ae-register-form", $forms.form.attr("data-ae-register-form"));
						    dbae.map_ae_fields($form);
						    aeJS.trigger.attach($form[0]);
						    // and continue with login/registration.
						    aeJS.events.onLogin.removeHandler(bul.handlers.required_fields);
						    aeJS.events.onUser.removeHandler(bul.handlers.required_fields);
						    aeJS.events.onUser.addHandler(ae_continue);
						    aeJS.trigger.submit($form[0]);
					    });
				    });
			    });
		    },
		    required_fields_et: function($form){
			    var subscriptionCount = 0,
				    level = dsbul.required_fields_exacttarget;
			    // ### Copy the ET required fields as part of the required_fields form
			    var $et_lists = $forms.form.find(".et-lists.form-checkboxes").closest(".form-item-lists").clone(),
				    $et_list_items = $et_lists.find("input"),
				    $et_disclaimer = $forms.form.find(".et-disclaimer").clone();

			    $et_list_items.each(function(){
				    var $et_list = $(this),
					    $form_et_list = $forms.form.find('input.et-lists[name="'+$et_list.attr("name")+'"]'),
					    listId = $et_list.val(),
					    isChecked = $et_list.is(":checked"),
					    isOptedOut = localStorage.getItem("et_list_optout_"+listId) === "1",
					    isSubscribed = localStorage.getItem("et_list_subscribed_"+listId) === "1";
				    $et_list.removeAttr("id");
				    if(isChecked && bul.opened || isSubscribed || isOptedOut && level !== 3){
					    // We can skip the required fields screen if the user has subscribed or opted out of lists.
					    subscriptionCount++;
				    }
				    if(level === 3 && !isSubscribed && !bul.et_optout){
					    $et_list.prop("checked", true);
					    $form_et_list.prop("checked", true);
				    }
				    $et_list.on("click", function(){ $form_et_list.click();});
				    $et_list.siblings("label").on("click", function(){
					    // Cloned labels retain original for="id", just need to update checked status.
					    setTimeout(function(){$et_list.prop("checked", $form_et_list.prop("checked"));},0);
				    });
			    });
			    if( bul.et_optout || level === 1  && subscriptionCount > 0 ||
				    level >= 2 && subscriptionCount === $et_list_items.length ){
				    dsbul.required_fields_exacttarget = level = 0;
			    }
			    $form.find(".form-actions").before($et_lists).before($et_disclaimer);
			    return level;
		    },
		    error: function(e, error, fatal){
			    if(error){
				    // force error.message to be interpreted as html
				    var $error = $($.parseHTML(error.message)),
					    error_message = error.message;

				    if($error.is("#messages")){ error_message = $error.children(".messages").html(); }
				    if($error.is(".messages")){ error_message = $error.html(); }
				    error_message = bul.handlers.custom_errors(error_message);

				    $forms.messages = $forms.find("#messages, .messages");
				    $forms.messages.empty().addClass("messages error messages--error").first().siblings("#messages, .messages").remove();
				    $forms.messages.html(error_message).show()
				    if(bul.isBlock){
					    // update links to trigger screen handlers
					    $forms.messages.find("a").each(function(){
						    var $link = $(this),
							    href = $link[0].href;
						    if(href.indexOf("/user/login", href.length - 11) !== -1){
							    $link.on("click", bul.handlers.login);
						    }else if(href.indexOf("/user/register", href.length - 14) !== -1){
							    $link.on("click", bul.handlers.register);
						    }else if(href.indexOf("/user/password", href.length - 14) !== -1){
							    $link.on("click", bul.handlers.password);
						    }
					    });
				    }

				    if(error.errors && (error.errors.ae_user) && $forms.form && $forms.form.get(0).id !== "ae-required-fields"){
				    // or form is validated
					    // If ae_user error then logout of AE so another attempt can be made.
					    aeJS.trigger.logout();
					    if(bul.isBlock){
						    aeJS.events.onLogin.addHandler(bul.handlers.required_fields);
						    aeJS.events.onUser.addHandler(bul.handlers.required_fields);
					    }
					    // re-attach Bolero form
					    require(["bolero.form"], function(BoleroForm){
						    var bolero_form = new BoleroForm($forms.form);
						    // Detach & re-attach form.
						    bul.detachForm(bolero_form);
						    bul.handlers[bul.flow](null, true, true);
						    // In this case we want to preserve the display of the error messages.
						    $forms.messages.show();
					    });
				    }
					// Make sure the modal is displayed if needed.
				    if(!bul.opened){ bul.open(); }

				    $error.children(".element-invisible").remove();
				    var error_text = $error.text();
				    if(typeof fatal !== "undefined"){
					    ga("send", "exception", {
						    appName: error.type || "Bolero Login",
						    exDescription:  error_text,
						    exFatal: fatal
					    });
				    }else{
					    ga("send", "event", "Bolero Login", "error", error_text, null, {nonInteraction: 1});
				    }
			    }else{
				    $forms.messages.text("Unable to login, an error has occurred.").show();
			    }
		    },
		    custom_errors: function(message){
			  switch(message){
				  case "email account already exists with a different password":
					  return 'An account with this e-mail address already exists with a different password. <a href="/user/password">Reset&nbsp;Your&nbsp;Password</a>';
				  case "no account exists with those credentials.":
					  return 'No account exists with that e-mail / password. <a href="/user/register">Create&nbsp;an&nbsp;Account</a> or <a href="/user/password">Reset&nbsp;Your&nbsp;Password</a>';
			  }
			  return message;
		    },
		    form: function($form){
			    $form.on("error", bul.handlers.error);
			    //$form.find(".messages").remove();
			    if( require.specified("IGA.common.webform") && Modernizr && Modernizr.inputtypes.date){
				    require(["IGA.common.webform"], function(Webform){
					    $form.find(".form-item-birthdate.form-type-date-text input").attr({
						    type: "date",
						    autocomplete: "bday",
						    placeholder: "mm/dd/yyyy",
						    required: null
					    });
					    $form.find(".form-type-date, .form-type-date-select, .form-type-date-text").each(Webform.dateInput);
				    });
			    }
		    },
		    show: function($form, state){
			    $forms.removeClass($forms.state).addClass("state--"+state);
			    $form.show();
			    bul.handlers.prevent = true;
			    $forms.messages.hide();
			    if(!bul.opened){ bul.open(); }
		    }
	    }
    };

    return bul;
});

//## Drupal Behaviors
(function($){
	"use strict";
	Drupal.behaviors.bolero_user_login = {
		attach:function(context, settings){
			$("a.ae-register-link[data-ae-register-link], .button.user-login-link", context).each(function(){
				var $link = $(this);
				if(IGA.user.uid){
					$link.addClass("state--connect");
					$link.find(".auth-action").text("Connect");
				}
			});
		}
	};
	$("a.user-login.bolero-modal, a[href*='user/login'], a.user-login-link").each(function(){
		var $login_link = $(this);
		$login_link.on("click", function(e){ e.preventDefault(); e.stopImmediatePropagation(); IGA.drupal.login(); });
	});
	var $block = $("#block-bolero-user-login-user-login-modal");

	require(["bolero.user_login"], function(BoleroLogin){
		BoleroLogin.init();
	});

	if($block.length){
		IGA.drupal.login = function(){
			//If the user clicks login before we've attached.
			require(["bolero.user_login"], function(BoleroLogin){
				BoleroLogin.init().open();
			});
		};
	}
})(jQuery);
;
/**
 * @file Code to initialize a slick carousel on the banner region
 * @see https://github.com/kenwheeler/slick/
 */
// # Bolero Banner
// ## Slick
define("bolero.banner.slick", ["jquery","underscore", "bolero.slickAnalytics", "IGA.events", "css!jquery/slick/slick.css", "jquery/slick/slick.min"],
	function($, _, SlickAnalytics, events){
	"use strict";
	function BoleroBanner($banner){
		var tracking = new SlickAnalytics($banner);
		var slick_defaults = {
			infinite:true, centerMode:false, centerPadding: '0px', arrows:true,
			autoplay:false, autoplaySpeed:5000, pauseOnHover:true,
			responsive: [{
				breakpoint: 600,
				settings:{ fade:false }
			},
				{
					breakpoint: 599,
					settings: { fade:false, arrows: false /*centerMode: true,*//*centerPadding: '10%'*/ }
				}],
			onInit: function(slider){
				tracking.init(slider);
				events.trigger("bolero.banner.init", [slider]);
			},
			onReInit: function(slider){
				tracking.init(slider);
				events.trigger("bolero.banner.reinit", [slider]);
			},
			onBeforeChange: function(slider, currentIndex, targetIndex){
				events.trigger("bolero.banner.beforechange", [slider, currentIndex, targetIndex] );
			},
			onAfterChange: function(slider, index){
				events.trigger("bolero.banner.afterchange", [slider, index]);
			}
		};

		var _settings = _.extend(slick_defaults, Drupal.settings.bolero.banner.slick);
		$banner.slick(_settings);

		function personalize(event, $personalize_block, chosen_option, osid){
			if($banner.find($personalize_block).length > 0){
				// If this personalize block is within the banner.
				var $block = $personalize_block.children(".block").first(),
					$block_content = $block.children("div.block__content"),
					block_content = $block_content.html();
				if(block_content && block_content.trim() === ""){
					// Remove empty personalized blocks
					var $slides = $personalize_block.siblings(":not(.slick-cloned)").andSelf(),
						index = $slides.index($personalize_block);
					$banner.slickRemove(index);
				}else{
					// and personalized slides already in the banner carousel.
					var $block_node = $block_content.children(".node[data-nid]"),
						block_nid = null;
					if($block_node.length > 0){ block_nid = $block_node.attr("data-nid"); }
					$personalize_block.siblings().each(function(){
						// ### For each slide
						var $slide = $(this),
							$entity = $slide;
						if($slide.not(".node, .block")){
							// Find the node or block inside it.
							$entity = $slide.children(".node, .block").first();
						}
						if($entity.length > 0 && $block.length > 0){
							if($block[0].id === $entity[0].id || block_nid && block_nid === $entity.attr("data-nid")){
								// If the same block or node is present elsewhere in the banner remove it as a duplicate.
								var $slides = $slide.siblings(":not(.slick-cloned)").andSelf(),
									index = $slides.index($slide);
								// Note: `.views-row` classes are not updated.
								$banner.slickRemove(index);
							}
						}else if(Drupal.settings.personalize.option_sets[osid].executor === "callback"){
							//TODO support executor = callback to update slick asynchronously.
						}
					});
				}
				$personalize_block.addClass("visible");
			}
		}

		events.on("personalize.personalizeDecision", personalize).replay("personalize.personalizeDecision", personalize);
	}
	return BoleroBanner;
});

(function($){
    "use strict";
    //## Initialize Banner Region
    var $banner = $(".l-banner .l-region--banner").first(),
	    carousel_version = Drupal.settings.bolero.banner.library || "slick";
	Drupal.settings.bolero.banner.$banner = $banner;
	if($banner.length === 0){ return; }
	// and load the carousel
    switch(carousel_version){
        case "owl":
            // ### Owl Carousel
            require(["css!jquery/owl-carousel/owl.carousel.css", "css!jquery/owl-carousel/owl.theme.css","jquery/owl-carousel/owl.carousel.min"], function(){
                $banner.addClass("carousel");
                $banner.owlCarousel({ items:1, loop:true, autoplay:true, autoplayTimeout: 5000, autoplayHoverPause:true, autoHeight:true, navigation:true, dots:true });
            });
            break;
        case "flexslider":
	        require(["jquery/flexslider/jquery.flexslider-min", "css!jquery/flexslider/flexslider.css"], function(){
		        var options = $.extend(Drupal.settings.bolero.banner.flexslider || {}, { animation: "slide", selector: ".l-region--banner > *" });
		        $banner.parent().flexslider(options);
	        });
            break;
        case "slick":
        default:
	        // ### Slick Carousel
            if($banner.children().length > 1){
                require(["bolero.banner.slick"], function(BoleroBanner){
                    new BoleroBanner($banner);
                });
            }
    }
})(jQuery);
;
/**
 * @file bolero-main.layout.js
 */
(function($){
    "use strict";
	$(".l-off-canvas .iga-signin").on("click", function(e){
		IGA.conversionPt = "Janrain Login : Off Canvas";
	});

	//# Setup Menu Icon Animation
    function activateHamburger(event) {
        var el = $(this);
        if (el.hasClass('active')){
            el.addClass('active-end');
            el.one('transitionend', function(){
                el.removeClass('active active-end');
            });
        } else {
            el.addClass('active');
        }
    }
    $('.menu-icon').click(activateHamburger);
})(jQuery);
;
/**
 * @file bolero.offcanvas.js
 *
 */
//# Bolero Off Canvas
//TODO re-do data-oc-presentation to allow multiple oc sides.
define("bolero.offcanvas", ["jquery", "underscore", "IGA.events"], function($, _, events){
    "use strict";
    var OffCanvas = {
        init: function($offCanvasWrap){
            OffCanvas.initAjaxDetails($offCanvasWrap);
            if(require.specified("Soundmanager.360.events")){
                //initialize 360 player
                OffCanvas.init360();
            }
            var presentationClass = $offCanvasWrap.attr("data-oc-presentation");
            $offCanvasWrap.find(".off-canvas-close").on("click", function(e){
                var $this = $(this),
                    presentation = $this.attr("data-oc-presentation") || presentationClass;
                e.preventDefault();
                $offCanvasWrap.foundation('offcanvas', 'hide', presentation);
            });

            $offCanvasWrap.find("a.bolero-off-canvas-toggle").once(function(){
                //Foundation open / close events don't play well with standard *-toggle class links so we do this with JS.
                var $this = $(this),
                    presentation = $this.attr("data-oc-presentation") || "move-left",
                    menuSelector = $this.attr("data-oc-menu"),
                    $offCanvasMenu = $offCanvasWrap.find("."+menuSelector);
                $this.on("click", function(e){
                    e.preventDefault();
                    $offCanvasWrap.foundation('offcanvas', 'toggle', presentation);
                    OffCanvas.position($offCanvasWrap, $offCanvasMenu);
                });
            });

            //initialize scrolling listener
            OffCanvas.onscroll();
        },
        refresh: function($container){
            if(typeof threeSixtyPlayer !== "undefined" && $container.is(".view.view-releases")){
                threeSixtyPlayer.init();
            }
            OffCanvas.initAjaxDetails($container);
        },
        initAjaxDetails: function($container){
            // Attach details link click listener
            $container.find(".ajax_details:not(.drupal-attached)").each(function() {
                var $this = $(this),
                    $track = $this.closest(".field-collection-item-field-tracks");
                $this.on("click", function(e) {
                    OffCanvas.details(e, $this);
                });
                $track.on("click", function(e){
                    var $target = $(e.target),
                        smLink = $track.find(".sm2_link").get(0),
                        sound = threeSixtyPlayer.lastSound;
                    if(!$target.is("a") && typeof threeSixtyPlayer !== "undefined" &&
                        (!sound || sound.url !== smLink.href) &&
                        $target.parents(".paragraphs-items-field-providers").length === 0 ){
                        //Fake an event for the soundmanager player
                        threeSixtyPlayer.handleClick({ target: smLink });
                    }
                });
            }).addClass("drupal-attached");
        },
        onscroll: _.once(function (){
            // Hide off canvas main when scrolled past content.
            // Only call this function once.
            require(["underscore","jquery/plugins/jquery.viewport.min"], function(_){
                var $offCanvasMain = $('.l-main.off-canvas-wrap'),
                    presentationClass = $offCanvasMain.attr("data-oc-presentation");
                var onScroll = _.debounce(function() {
                    if ($offCanvasMain.find(".ajax-target .details-more-link:above-the-top").length > 0) {
                        $offCanvasMain.removeClass('offcanvasActive');
                        $offCanvasMain.foundation('offcanvas', 'hide', presentationClass);
                        $(".ajax_details").removeClass('active');
                    }

                    if ($offCanvasMain.find(".ajax-target .field--name-title:below-the-fold").length > 0) {
                        $offCanvasMain.removeClass('offcanvasActive');
                        $offCanvasMain.foundation('offcanvas', 'hide', presentationClass);
                        $(".ajax_details").removeClass('active');
                    }
                }, 200);
                //debounce to fire every 200ms instead of constantly
                $(window).on("scroll", onScroll);
            });
        }),
        init360: _.once(function(){
            //listen for Soundmanager 360 events in tracks
            require(["Soundmanager.360.events"], function(events){
                events.on("Soundmanager.360.play", OffCanvas.on360Play);
                events.on("Soundmanager.360.resume", OffCanvas.on360Play);
                events.on("Soundmanager.360.pause", OffCanvas.on360Pause);
                events.on("Soundmanager.360.stop", OffCanvas.on360Pause);
                events.on("Soundmanager.360.finish", OffCanvas.on360Pause);
            });
        }),
        on360Play: function(three60Player){
            var $link = $(three60Player._360data.oLink),
                $track = $link.closest(".field-collection-item-field-tracks"),
                $detailsLink = $track.find(".ajax_details:first"),
                $offCanvasWrap = $detailsLink.closest(".off-canvas-wrap"),
                $field = $link.closest(".field"),
	            $node = $link.closest("article.node"),
                sound = threeSixtyPlayer.lastSound;
            if($track.closest(".field").is(".field--name-field-tracks")){
                //only trigger off canvas details if this play event is within the releases view.
                $track.addClass("active");
	            $node.addClass("active");
                if( !$offCanvasWrap.is(".offcanvasActive") || !sound || sound.url !== $link.attr("href") ){
                    OffCanvas.details(null, $detailsLink);
                }
            }
        },
        on360Pause: function(three60Player){
            var $link = $(three60Player._360data.oLink),
                $track = $link.closest(".field-collection-item-field-tracks"),
	            $node = $link.closest("article.node");
            $track.removeClass("active");
	        $node.removeClass("active");
        },
        loadContent: function($el, $offCanvasAjax, callback) {
            var target = $el.attr('href'),
                base =  $el.attr('id');
            // ajax callback to replace contents in offCanvas
            require(["jquery","Drupal.ajax"], function($){
                $.ajax({
                    url: target
                }).done(function(response) {
                    var ajax = new Drupal.ajax(base, $el, { url: target}),
                        data = response[1];
                    //todo replace selector in response?
                    data.selector = $offCanvasAjax;
                    ajax.commands.insert(ajax, data);
                    if(callback){ callback($offCanvasAjax, data); }
                });
            });
        },
        details: function(e, $el) {
            var $offCanvasWrap = $el.closest(".off-canvas-wrap"),
                $offCanvasOuter = $('#page'),
                presentationClass = $offCanvasWrap.attr("data-oc-presentation"),
                side = $offCanvasWrap.attr("data-oc-side"),
                menuSelector = "."+side+"-off-canvas-menu",
                $offCanvasMenu = $offCanvasWrap.children(menuSelector),
                $offCanvasInner = $offCanvasWrap.children(".inner-wrap"),
                $offCanvasAjax = $offCanvasWrap.find("> aside .ajax-target");
            if($offCanvasWrap.is(".view")){
                $offCanvasOuter = $offCanvasWrap.closest(".block--views");
            }
            $offCanvasAjax.empty();
            // prevent default behavior
            if (e !== null) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }

            var $track = $el.closest(".field-collection-item-field-tracks"),
	            $node = $el.closest("article.node");
            if($track.length > 0){
                $(".field-collection-item-field-tracks").removeClass("active");
                $track.addClass("active");
	            $node.addClass("active").siblings(".node").removeClass("active");
            }

            //todo .ajax-details -> .offcanvas-details
            OffCanvas.loadContent($el, $offCanvasAjax, _.partial(OffCanvas.position, $offCanvasWrap, $offCanvasMenu));

            //remove all other off canvas close listeners
            $offCanvasInner.off("click.offcanvas");
            $offCanvasOuter.off("click.offcanvas", offCanvasClose);
            function offCanvasClose(e) {
                var $target = $(e.target);
                if ($offCanvasWrap.is(".offcanvasActive") && $target.closest(".field-collection-item-field-tracks").length === 0 &&
                    $target.closest(menuSelector).get(0) !== $offCanvasMenu.get(0) )
                {
                    $offCanvasWrap.removeClass('offcanvasActive');
                    $offCanvasWrap.foundation('offcanvas', 'hide', presentationClass);
                    $(".ajax_details").removeClass('active');
                    events.trigger("bolero.offcanvas.close", [$offCanvasWrap, $el, $offCanvasAjax, presentationClass]);
                    $offCanvasInner.off("click.offcanvas", offCanvasClose);
                    $offCanvasOuter.off("click.offcanvas", offCanvasClose);
	                $node.removeClass("active");
                }
            }

            // if active details link
            if ($el.hasClass('active')) {
                // hide off canvas
                $offCanvasWrap.foundation('offcanvas', 'hide', presentationClass).removeClass('offcanvasActive');
                $el.removeClass('active');
            } else {
                //TODO empty offcanvas, loading?
                // show offcanvas
                $offCanvasWrap.foundation('offcanvas', 'show', presentationClass);
                $offCanvasWrap.addClass('offcanvasActive');
                events.trigger("bolero.offcanvas.show", [$offCanvasWrap, $el, $offCanvasAjax, presentationClass]);

                // Close offcanvas
                setTimeout(function(){
                    //without the deferred call 360 player triggers a close.
                    $offCanvasInner.on("click.offcanvas", offCanvasClose);
                    $offCanvasOuter.on("click.offCanvas", offCanvasClose);
                },0);

                // remove the active state current details link
                $(".ajax_details").removeClass('active');
                // set active state
                $el.addClass('active');
            }
        },
        position: function($offCanvasWrap, $offCanvasMenu){
            var $window = $(window),
                $offCanvasContainer = $offCanvasMenu.children(".off-canvas-container");
            if($offCanvasMenu.height() > $window.height()){
                //If the off-canvas region is bigger than the window then we need to position it.
                var scrollTop = $window.scrollTop(),
                    offCanvasPadding = parseInt($offCanvasWrap.css('padding').replace("px", ""));
                // calculate position
                var offset = $offCanvasWrap.offset(),
                    position = $offCanvasWrap.position(),
                    headerHeight = $("#page > .inner-wrap > .l-header").height(),
                    ocWrapHeight = $offCanvasWrap.outerHeight(true),
                    margin = 0;
                if (scrollTop > offset.top) {
                    margin = scrollTop - position.top - offCanvasPadding + headerHeight;
                }
                $offCanvasContainer.css('margin-top', margin);
                require(["imagesloaded"], function(imagesLoaded){
                    imagesLoaded($offCanvasContainer.get(0)).on("always", function(){
                        //var ocHeight = $offCanvasAjax.height() + margin;
                        var ocHeight = $offCanvasContainer.outerHeight(true);
                        if(ocHeight > ocWrapHeight){
                            // If the off-canvas menu is taller than the wrapper, add a margin-bottom to the wrapper.
                            //$offCanvasWrap.css("padding-bottom", "+=" + (ocHeight - ocWrapHeight));
                            $offCanvasContainer.css("margin-top", "-=" + (ocHeight - ocWrapHeight));
                        }
                        //TODO follow & .off on close.
                    });
                });
            }
        }
    };
    return OffCanvas;
});

(function($){
    Drupal.behaviors.boleroOffCanvas = {
        attach: function(context, settings){
            var presentationClass,
                $context = $(context);
			if(!settings.bolero){ return; }
            if (settings.bolero.offCanvasContentSide === 'right') {
                presentationClass = settings.bolero.offCanvasContentAnimation + '-left';
            } else {
                presentationClass = settings.bolero.offCanvasContentAnimation + '-right';
            }
            if($context.is(".view")){
                //views load more
                require(["bolero.offcanvas"], function(OffCanvas){
                    OffCanvas.refresh($context);
                });
            }else{
                $('.off-canvas-wrap:not(.drupal-attached)', context).not("#page").once(function() {
                    //TODO support load more / re-binding links
                    var $offCanvasWrap = $(this);
                    $offCanvasWrap.attr("data-oc-presentation", presentationClass).attr("data-oc-side", settings.bolero.offCanvasContentSide);
                    require(["bolero.offcanvas"], function(OffCanvas){
                        OffCanvas.init($offCanvasWrap);
                    });
                }).addClass("drupal-attached");
            }
        }
    };
})(jQuery);
;
