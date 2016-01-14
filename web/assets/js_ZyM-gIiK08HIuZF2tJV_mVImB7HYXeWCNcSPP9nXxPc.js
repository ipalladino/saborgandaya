/*
 RequireJS 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(ca){function G(b){return"[object Function]"===M.call(b)}function H(b){return"[object Array]"===M.call(b)}function v(b,c){if(b){var d;for(d=0;d<b.length&&(!b[d]||!c(b[d],d,b));d+=1);}}function U(b,c){if(b){var d;for(d=b.length-1;-1<d&&(!b[d]||!c(b[d],d,b));d-=1);}}function s(b,c){return ga.call(b,c)}function j(b,c){return s(b,c)&&b[c]}function B(b,c){for(var d in b)if(s(b,d)&&c(b[d],d))break}function V(b,c,d,g){c&&B(c,function(c,h){if(d||!s(b,h))g&&"object"===typeof c&&c&&!H(c)&&!G(c)&&!(c instanceof
RegExp)?(b[h]||(b[h]={}),V(b[h],c,d,g)):b[h]=c});return b}function t(b,c){return function(){return c.apply(b,arguments)}}function da(b){throw b;}function ea(b){if(!b)return b;var c=ca;v(b.split("."),function(b){c=c[b]});return c}function C(b,c,d,g){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=g;d&&(c.originalError=d);return c}function ha(b){function c(a,e,b){var f,n,c,d,g,h,i,I=e&&e.split("/");n=I;var m=l.map,k=m&&m["*"];if(a&&"."===a.charAt(0))if(e){n=
I.slice(0,I.length-1);a=a.split("/");e=a.length-1;l.nodeIdCompat&&R.test(a[e])&&(a[e]=a[e].replace(R,""));n=a=n.concat(a);d=n.length;for(e=0;e<d;e++)if(c=n[e],"."===c)n.splice(e,1),e-=1;else if(".."===c)if(1===e&&(".."===n[2]||".."===n[0]))break;else 0<e&&(n.splice(e-1,2),e-=2);a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if(b&&m&&(I||k)){n=a.split("/");e=n.length;a:for(;0<e;e-=1){d=n.slice(0,e).join("/");if(I)for(c=I.length;0<c;c-=1)if(b=j(m,I.slice(0,c).join("/")))if(b=j(b,d)){f=b;
g=e;break a}!h&&(k&&j(k,d))&&(h=j(k,d),i=e)}!f&&h&&(f=h,g=i);f&&(n.splice(0,g,f),a=n.join("/"))}return(f=j(l.pkgs,a))?f:a}function d(a){z&&v(document.getElementsByTagName("script"),function(e){if(e.getAttribute("data-requiremodule")===a&&e.getAttribute("data-requirecontext")===i.contextName)return e.parentNode.removeChild(e),!0})}function g(a){var e=j(l.paths,a);if(e&&H(e)&&1<e.length)return e.shift(),i.require.undef(a),i.require([a]),!0}function u(a){var e,b=a?a.indexOf("!"):-1;-1<b&&(e=a.substring(0,
b),a=a.substring(b+1,a.length));return[e,a]}function m(a,e,b,f){var n,d,g=null,h=e?e.name:null,l=a,m=!0,k="";a||(m=!1,a="_@r"+(M+=1));a=u(a);g=a[0];a=a[1];g&&(g=c(g,h,f),d=j(p,g));a&&(g?k=d&&d.normalize?d.normalize(a,function(a){return c(a,h,f)}):c(a,h,f):(k=c(a,h,f),a=u(k),g=a[0],k=a[1],b=!0,n=i.nameToUrl(k)));b=g&&!d&&!b?"_unnormalized"+(Q+=1):"";return{prefix:g,name:k,parentMap:e,unnormalized:!!b,url:n,originalName:l,isDefine:m,id:(g?g+"!"+k:k)+b}}function q(a){var e=a.id,b=j(k,e);b||(b=k[e]=new i.Module(a));
return b}function r(a,e,b){var f=a.id,n=j(k,f);if(s(p,f)&&(!n||n.defineEmitComplete))"defined"===e&&b(p[f]);else if(n=q(a),n.error&&"error"===e)b(n.error);else n.on(e,b)}function w(a,e){var b=a.requireModules,f=!1;if(e)e(a);else if(v(b,function(e){if(e=j(k,e))e.error=a,e.events.error&&(f=!0,e.emit("error",a))}),!f)h.onError(a)}function x(){S.length&&(ia.apply(A,[A.length,0].concat(S)),S=[])}function y(a){delete k[a];delete W[a]}function F(a,e,b){var f=a.map.id;a.error?a.emit("error",a.error):(e[f]=
!0,v(a.depMaps,function(f,c){var d=f.id,g=j(k,d);g&&(!a.depMatched[c]&&!b[d])&&(j(e,d)?(a.defineDep(c,p[d]),a.check()):F(g,e,b))}),b[f]=!0)}function D(){var a,e,b=(a=1E3*l.waitSeconds)&&i.startTime+a<(new Date).getTime(),f=[],c=[],h=!1,k=!0;if(!X){X=!0;B(W,function(a){var i=a.map,m=i.id;if(a.enabled&&(i.isDefine||c.push(a),!a.error))if(!a.inited&&b)g(m)?h=e=!0:(f.push(m),d(m));else if(!a.inited&&(a.fetched&&i.isDefine)&&(h=!0,!i.prefix))return k=!1});if(b&&f.length)return a=C("timeout","Load timeout for modules: "+
f,null,f),a.contextName=i.contextName,w(a);k&&v(c,function(a){F(a,{},{})});if((!b||e)&&h)if((z||fa)&&!Y)Y=setTimeout(function(){Y=0;D()},50);X=!1}}function E(a){s(p,a[0])||q(m(a[0],null,!0)).init(a[1],a[2])}function K(a){var a=a.currentTarget||a.srcElement,e=i.onScriptLoad;a.detachEvent&&!Z?a.detachEvent("onreadystatechange",e):a.removeEventListener("load",e,!1);e=i.onScriptError;(!a.detachEvent||Z)&&a.removeEventListener("error",e,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function L(){var a;
for(x();A.length;){a=A.shift();if(null===a[0])return w(C("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));E(a)}}var X,$,i,N,Y,l={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},k={},W={},aa={},A=[],p={},T={},ba={},M=1,Q=1;N={require:function(a){return a.require?a.require:a.require=i.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?p[a.map.id]=a.exports:a.exports=p[a.map.id]={}},module:function(a){return a.module?
a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return j(l.config,a.map.id)||{}},exports:a.exports||(a.exports={})}}};$=function(a){this.events=j(aa,a.id)||{};this.map=a;this.shim=j(l.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};$.prototype={init:function(a,e,b,f){f=f||{};if(!this.inited){this.factory=e;if(b)this.on("error",b);else this.events.error&&(b=t(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=
b;this.inited=!0;this.ignore=f.ignore;f.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,e){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=e)},fetch:function(){if(!this.fetched){this.fetched=!0;i.startTime=(new Date).getTime();var a=this.map;if(this.shim)i.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],t(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=
this.map.url;T[a]||(T[a]=!0,i.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,e,b=this.map.id;e=this.depExports;var f=this.exports,c=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(G(c)){if(this.events.error&&this.map.isDefine||h.onError!==da)try{f=i.execCb(b,c,e,f)}catch(d){a=d}else f=i.execCb(b,c,e,f);this.map.isDefine&&void 0===f&&((e=this.module)?f=e.exports:this.usingExports&&
(f=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",w(this.error=a)}else f=c;this.exports=f;if(this.map.isDefine&&!this.ignore&&(p[b]=f,h.onResourceLoad))h.onResourceLoad(i,this.map,this.depMaps);y(b);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=
this.map,b=a.id,d=m(a.prefix);this.depMaps.push(d);r(d,"defined",t(this,function(f){var d,g;g=j(ba,this.map.id);var J=this.map.name,u=this.map.parentMap?this.map.parentMap.name:null,p=i.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(f.normalize&&(J=f.normalize(J,function(a){return c(a,u,!0)})||""),f=m(a.prefix+"!"+J,this.map.parentMap),r(f,"defined",t(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),g=j(k,f.id)){this.depMaps.push(f);
if(this.events.error)g.on("error",t(this,function(a){this.emit("error",a)}));g.enable()}}else g?(this.map.url=i.nameToUrl(g),this.load()):(d=t(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),d.error=t(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];B(k,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&y(a.map.id)});w(a)}),d.fromText=t(this,function(f,c){var g=a.name,J=m(g),k=O;c&&(f=c);k&&(O=!1);q(J);s(l.config,b)&&(l.config[g]=l.config[b]);try{h.exec(f)}catch(j){return w(C("fromtexteval",
"fromText eval for "+b+" failed: "+j,j,[b]))}k&&(O=!0);this.depMaps.push(J);i.completeLoad(g);p([g],d)}),f.load(a.name,p,d,l))}));i.enable(d,this);this.pluginMaps[d.id]=d},enable:function(){W[this.map.id]=this;this.enabling=this.enabled=!0;v(this.depMaps,t(this,function(a,b){var c,f;if("string"===typeof a){a=m(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=j(N,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;r(a,"defined",t(this,function(a){this.defineDep(b,
a);this.check()}));this.errback&&r(a,"error",t(this,this.errback))}c=a.id;f=k[c];!s(N,c)&&(f&&!f.enabled)&&i.enable(a,this)}));B(this.pluginMaps,t(this,function(a){var b=j(k,a.id);b&&!b.enabled&&i.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){v(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};i={config:l,contextName:b,registry:k,defined:p,urlFetched:T,defQueue:A,Module:$,makeModuleMap:m,
nextTick:h.nextTick,onError:w,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=l.shim,c={paths:!0,bundles:!0,config:!0,map:!0};B(a,function(a,b){c[b]?(l[b]||(l[b]={}),V(l[b],a,!0,!0)):l[b]=a});a.bundles&&B(a.bundles,function(a,b){v(a,function(a){a!==b&&(ba[a]=b)})});a.shim&&(B(a.shim,function(a,c){H(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=i.makeShimExports(a);b[c]=a}),l.shim=b);a.packages&&v(a.packages,function(a){var b,
a="string"===typeof a?{name:a}:a;b=a.name;a.location&&(l.paths[b]=a.location);l.pkgs[b]=a.name+"/"+(a.main||"main").replace(ja,"").replace(R,"")});B(k,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=m(b))});if(a.deps||a.callback)i.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(ca,arguments));return b||a.exports&&ea(a.exports)}},makeRequire:function(a,e){function g(f,c,d){var j,l;e.enableBuildCallback&&(c&&G(c))&&(c.__requireJsBuild=
!0);if("string"===typeof f){if(G(c))return w(C("requireargs","Invalid require call"),d);if(a&&s(N,f))return N[f](k[a.id]);if(h.get)return h.get(i,f,a,g);j=m(f,a,!1,!0);j=j.id;return!s(p,j)?w(C("notloaded",'Module name "'+j+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):p[j]}L();i.nextTick(function(){L();l=q(m(null,a));l.skipMap=e.skipMap;l.init(f,c,d,{enabled:!0});D()});return g}e=e||{};V(g,{isBrowser:z,toUrl:function(b){var e,d=b.lastIndexOf("."),g=b.split("/")[0];if(-1!==
d&&(!("."===g||".."===g)||1<d))e=b.substring(d,b.length),b=b.substring(0,d);return i.nameToUrl(c(b,a&&a.id,!0),e,!0)},defined:function(b){return s(p,m(b,a,!1,!0).id)},specified:function(b){b=m(b,a,!1,!0).id;return s(p,b)||s(k,b)}});a||(g.undef=function(b){x();var c=m(b,a,!0),e=j(k,b);d(b);delete p[b];delete T[c.url];delete aa[b];U(A,function(a,c){a[0]===b&&A.splice(c,1)});e&&(e.events.defined&&(aa[b]=e.events),y(b))});return g},enable:function(a){j(k,a.id)&&q(a).enable()},completeLoad:function(a){var b,
c,f=j(l.shim,a)||{},d=f.exports;for(x();A.length;){c=A.shift();if(null===c[0]){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}c=j(k,a);if(!b&&!s(p,a)&&c&&!c.inited){if(l.enforceDefine&&(!d||!ea(d)))return g(a)?void 0:w(C("nodefine","No define call for "+a,null,[a]));E([a,f.deps||[],f.exportsFn])}D()},nameToUrl:function(a,b,c){var f,d,g;(f=j(l.pkgs,a))&&(a=f);if(f=j(ba,a))return i.nameToUrl(f,b,c);if(h.jsExtRegExp.test(a))f=a+(b||"");else{f=l.paths;a=a.split("/");for(d=a.length;0<d;d-=1)if(g=a.slice(0,
d).join("/"),g=j(f,g)){H(g)&&(g=g[0]);a.splice(0,d,g);break}f=a.join("/");f+=b||(/^data\:|\?/.test(f)||c?"":".js");f=("/"===f.charAt(0)||f.match(/^[\w\+\.\-]+:/)?"":l.baseUrl)+f}return l.urlArgs?f+((-1===f.indexOf("?")?"?":"&")+l.urlArgs):f},load:function(a,b){h.load(i,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ka.test((a.currentTarget||a.srcElement).readyState))P=null,a=K(a),i.completeLoad(a.id)},onScriptError:function(a){var b=K(a);if(!g(b.id))return w(C("scripterror",
"Script error for: "+b.id,a,[b.id]))}};i.require=i.makeRequire();return i}var h,x,y,D,K,E,P,L,q,Q,la=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ma=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,R=/\.js$/,ja=/^\.\//;x=Object.prototype;var M=x.toString,ga=x.hasOwnProperty,ia=Array.prototype.splice,z=!!("undefined"!==typeof window&&"undefined"!==typeof navigator&&window.document),fa=!z&&"undefined"!==typeof importScripts,ka=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,
Z="undefined"!==typeof opera&&"[object Opera]"===opera.toString(),F={},r={},S=[],O=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(G(requirejs))return;r=requirejs;requirejs=void 0}"undefined"!==typeof require&&!G(require)&&(r=require,require=void 0);h=requirejs=function(b,c,d,g){var u,m="_";!H(b)&&"string"!==typeof b&&(u=b,H(c)?(b=c,c=d,d=g):b=[]);u&&u.context&&(m=u.context);(g=j(F,m))||(g=F[m]=h.s.newContext(m));u&&g.configure(u);return g.require(b,c,d)};h.config=function(b){return h(b)};
h.nextTick="undefined"!==typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=h);h.version="2.1.11";h.jsExtRegExp=/^\/|:|\?|\.js$/;h.isBrowser=z;x=h.s={contexts:F,newContext:ha};h({});v(["toUrl","undef","defined","specified"],function(b){h[b]=function(){var c=F._;return c.require[b].apply(c,arguments)}});if(z&&(y=x.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0]))y=x.head=D.parentNode;h.onError=da;h.createNode=function(b){var c=
b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};h.load=function(b,c,d){var g=b&&b.config||{};if(z)return g=h.createNode(g,c,d),g.setAttribute("data-requirecontext",b.contextName),g.setAttribute("data-requiremodule",c),g.attachEvent&&!(g.attachEvent.toString&&0>g.attachEvent.toString().indexOf("[native code"))&&!Z?(O=!0,g.attachEvent("onreadystatechange",b.onScriptLoad)):
(g.addEventListener("load",b.onScriptLoad,!1),g.addEventListener("error",b.onScriptError,!1)),g.src=d,L=g,D?y.insertBefore(g,D):y.appendChild(g),L=null,g;if(fa)try{importScripts(d),b.completeLoad(c)}catch(j){b.onError(C("importscripts","importScripts failed for "+c+" at "+d,j,[c]))}};z&&!r.skipDataMain&&U(document.getElementsByTagName("script"),function(b){y||(y=b.parentNode);if(K=b.getAttribute("data-main"))return q=K,r.baseUrl||(E=q.split("/"),q=E.pop(),Q=E.length?E.join("/")+"/":"./",r.baseUrl=
Q),q=q.replace(R,""),h.jsExtRegExp.test(q)&&(q=K),r.deps=r.deps?r.deps.concat(q):[q],!0});define=function(b,c,d){var g,h;"string"!==typeof b&&(d=c,c=b,b=null);H(c)||(d=c,c=null);!c&&G(d)&&(c=[],d.length&&(d.toString().replace(la,"").replace(ma,function(b,d){c.push(d)}),c=(1===d.length?["require"]:["require","exports","module"]).concat(c)));if(O){if(!(g=L))P&&"interactive"===P.readyState||U(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return P=b}),g=P;g&&(b||
(b=g.getAttribute("data-requiremodule")),h=F[g.getAttribute("data-requirecontext")])}(h?h.defQueue:S).push([b,c,d])};define.amd={jQuery:!0};h.exec=function(b){return eval(b)};h(r)}})(this);;
require.config({baseUrl:"//cache.umusic.com/_global/js/",paths:{"jquery-ui.min":"//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min","jquery-mobile.min":"//code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min","jquery-1.9":"//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min","jquery-1.8":"//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min",json2:"lib/core",text:"lib/iga.require.text",css:"lib/requirejs-css-plugin/css",base64:"lib/base64/base64.min",history:"lib/jquery.history.min",underscore:"lib/underscore/underscore-min",handlebars:"lib/handlebars",mustache:"lib/mustache",hogan:"lib/hogan/hogan-2.0.0.min.amd",hgn:"lib/hogan/hgn",imagesloaded:"lib/imagesloaded.min",eventie:"lib/eventie.min",EventEmitter:"lib/EventEmitter/EventEmitter",backbone:"lib/backbone","backbone.layoutmanager":"lib/backbone.layoutmanager","backbone.nestedmodel":"lib/backbone.nestedmodel","google.jsapi":"https://www.google.com/jsapi",responsejs:"responsejs/response.min.js",fyre:"//zor.livefyre.com/wjs/v3.0/javascripts/livefyre","livefyre/streamhub-sdk":"//cdn.livefyre.com/libs/sdk/v2.6.1/streamhub-sdk.min","livefyre/streamhub-wall":"//cdn.livefyre.com/libs/apps/Livefyre/streamhub-wall/v2.2.4-build.159/streamhub-wall.min","livefyre/streamhub-feed":"//cdn.livefyre.com/libs/apps/Livefyre/streamhub-feed/v2.0.1-build.9/streamhub-feed.min","livefyre/streamhub-gallery":"//cdn.livefyre.com/libs/apps/Livefyre/streamhub-gallery/v0.2.2-build.8/streamhub-gallery.min","livefyre/streamhub-map":"//cdn.livefyre.com/libs/apps/cheung31/streamhub-map/v1.0.2-build.40/streamhub-map.min",auth:"//cdn.livefyre.com/libs/livefyre-auth/0.1.0/livefyre-auth.min","livefyre-auth":"//cdn.livefyre.com/libs/livefyre-auth/0.1.0/livefyre-auth.min",IGA:"iga/utils/iga.utils","IGA.echo":"iga/echo/iga.echo","IGA.Backplane":"iga/misc/iga.backplane","IGA.GoogleAnalytics":"iga/misc/iga.GoogleAnalytics","IGA.widgets.TwitterIntent":"iga/apps/twitterintent",JanrainReady:"iga/utils/iga.JanrainReady",BackplaneReady:"iga/utils/iga.BackplaneReady",FyreReady:"iga/utils/iga.FyreReady"},packages:[{name:"IGA.utils",location:"iga/utils",main:"iga.utils"},{name:"isotope",location:"jquery-plugins",main:"jquery.isotope.min"},{name:"streamhub-sdk",location:"livefyre/streamhub-sdk"},{name:"streamhub-wall",location:"livefyre/streamhub-wall"},{name:"streamhub-backbone",location:"livefyre/streamhub-backbone"},{name:"streamhub-isotope",location:"livefyre/streamhub-isotope"},{name:"streamhub-isotope-iga",location:"livefyre/streamhub-isotope-iga"}],shim:{jquery:{exports:"jQuery"},"jquery-1.8":{exports:"jQuery"},"jquery-1.9":{exports:"jQuery"},"jquery-ui-min":{deps:["jquery"],exports:"jQuery.ui"},"jquery-plugins/jquery.jscrollpane.min":{deps:["jquery-plugins/jquery.mousewheel.min","jquery-plugins/mwheelIntent.min"]},Livefyre:{exports:"Livefyre"},fyre:{exports:"fyre"},"livefyre/streamhub-wall":{deps:["livefyre/streamhub-sdk"]},"livefyre/streamhub-feed":{deps:["livefyre/streamhub-sdk"]},"livefyre/streamhub-gallery":{deps:["livefyre/streamhub-sdk"]},"livefyre/streamhub-map":{deps:["livefyre/streamhub-sdk"]},base64:{exports:"btoa"},json2:{exports:"JSON"},fancybox:{deps:["css!jquery-plugins/fancybox2/jquery.fancybox.min.css"]},qtip:{deps:["css!jquery-plugins/jquery.qtip.min.css"]},history:{deps:["json2","jquery"],exports:"History"},underscore:{exports:"_"},handlebars:{exports:"Handlebars"},backbone:{deps:["underscore","jquery","json2"],exports:"Backbone"},"backbone.layoutmanager":["backbone"],"backbone.nestedmodel":{exports:"Backbone.NestedModel",deps:["jquery","backbone"]},"google.jsapi":{exports:"google"},isotope:{deps:["modernizr"],exports:"jQuery.fn.isotope"},modernizr:{exports:"Modernizr"}},waitSeconds:20});try{if(requirejs.createNode){var cN=requirejs.createNode;requirejs.createNode=function(e,n,t){var r=cN.apply(this,arguments);return 0===t.indexOf("//cache.umusic.com/")&&r.setAttribute("crossorigin","anonymous"),r}}}catch(e){}var IGA=window.IGA||{};window.IGA=IGA,define("IGA",function(){"use strict";return IGA.requireConfig="undefined"!=typeof _igaRequireConfig?_igaRequireConfig:{},IGA}),define("IGA.inherits",["IGA"],function(e){"use strict";return e.inherits=function(e,n){var t=function(){};t.prototype=n.prototype,e.prototype=new t,e.prototype.constructor=e},e.inherits}),define("jquery",function(){return window.jQuery}),define("jquery-1.8 noConflict",["jquery-1.8"],function(e){return e.noConflict(!0),e}),define("jquery-1.9 noConflict",["jquery-1.9"],function(e){return e.noConflict(!0),e}),define("Drupal",function(){return window.Drupal}),define("jquery-ui",["jquery-ui.min","IGA.utils"],function(e,n){return document.getElementById("jquery-ui-stylesheet")||n.appendTag("link","text/css",null,"head",function(e){e.rel="stylesheet",e.href="//code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css",e.media="all"}),e}),define("jquery-mobile",["jquery-mobile.min","IGA.utils"],function(e,n){return document.getElementById("jquery-mobile-stylesheet")||n.appendTag("link","text/css",null,"head",function(e){e.rel="stylesheet",e.href="//code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css",e.media="all"}),e}),define("jquery-mobile-structure",["jquery-mobile.min","IGA.utils"],function(e,n){return n.appendTag("link","text/css",null,"head",function(e){e.rel="stylesheet",e.href="//code.jquery.com/mobile/1.2.0/jquery.mobile.structure-1.2.0.min.css",e.media="all"}),e}),define("jasmine",["IGA.utils","jasmine-testing/jasmine","jasmine-testing/jasmine-html"],function(e,n){return e.appendTag("link","text/css",null,null,function(e){e.rel="stylesheet",e.href="/_global/js/jasmine-testing/jasmine.css",e.media="all"}),n}),define("eventEmitter",["EventEmitter"],function(e){return e}),define("eventEmitter/EventEmitter",["EventEmitter"],function(e){return e}),define("eventEmitter",["EventEmitter"],function(e){return e}),define("wolfy87-eventemitter",["EventEmitter"],function(e){return e}),define("eventie/eventie",["eventie"],function(e){return e}),IGA.module_define=function(){var e,n,t=arguments[0],r=arguments[1],i=[],o=0;arguments[2]instanceof Array&&(i=arguments[2],o=1),arguments.length>2+o&&(e=arguments[2+o]),arguments.length>3+o&&(n=arguments[3+o]),require.specified(t)||(define("_"+t,i,{load:function(t,i,o){var u="undefined"!=typeof e?e()||null:null,a=u?[]:r,s=null;u||"undefined"==typeof n||"undefined"==typeof(s=n())?i(a,function(n){t?i([t],function(n){o(n||("undefined"!=typeof e?e():null))}):o(n||("undefined"!=typeof e?e():null))}):i(["underscore"],function(n){s=n.wrap(s,function(n){n(),o("undefined"!=typeof e?e():null)})})}}),define(t,["_"+t+"!"],function(e){return e}))},IGA.module_define("twitter",["https://platform.twitter.com/widgets.js"],function(){return window.twttr}),IGA.module_define("twttr",["twitter"]),IGA.module_define("facebook",["//connect.facebook.net/en_US/all.js"],function(){return window.FB},function(){return window.fbAsyncInit}),IGA.module_define("google",["https://apis.google.com/js/platform.js"],function(){return window.gapi}),IGA.module_define("googleplus",["https://apis.google.com/js/plusone.js"],function(){return window.gapi},function(){return window.gplusLoadCallback}),IGA.module_define("tumblr",["//platform.tumblr.com/v1/share.js"],function(){return window.Tumblr}),IGA.module_define("jquery.fancybox",["jquery/fancybox2/jquery.fancybox.pack","css!jquery/fancybox2/jquery.fancybox.min.css"],function(){return jQuery.fn.fancybox}),IGA.module_define("fancybox",["jquery.fancybox"]),IGA.module_define("jquery.flexslider",["jquery/flexslider/jquery.flexslider-min","css!jquery/flexslider/flexslider.css"],function(){return jQuery.fn.flexslider}),IGA.module_define("jquery.qtip",["jquery/qtip/jquery.qtip.min","css!jquery/qtip/jquery.qtip.min.css"],function(){return jQuery.fn.qtip}),IGA.module_define("qtip",["jquery.qtip"]),IGA.module_define("modernizr",["modernizr/modernizr.custom.iga"],function(){return window.Modernizr}),IGA.module_define("Livefyre",["//cdn.livefyre.com/Livefyre.js"],function(){return window.Livefyre}),define("inherits",function(){"use strict";function e(e,n){e.super_=n,e.prototype=Object.create(n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function n(e,n){e.super_=n;var t=function(){};t.prototype=n.prototype,e.prototype=new t,e.prototype.constructor=e}return"function"==typeof Object.create?e:n}),"function"!=typeof Object.create&&!function(){"use strict";var e=function(){};Object.create=function(n){if(arguments.length>1)throw Error("Second argument not supported");if(null===n)throw Error("Cannot set a null [[Prototype]]");if("object"!=typeof n)throw TypeError("Argument must be an object");return e.prototype=n,new e}}(),Array.prototype.indexOf||(Array.prototype.indexOf=function(e,n){if(void 0===this||null===this)throw new TypeError('"this" is null or not defined');var t=this.length>>>0;for(n=+n||0,1/0===Math.abs(n)&&(n=0),0>n&&(n+=t,0>n&&(n=0));t>n;n++)if(this[n]===e)return n;return-1}),define("IGA.webshim",["jquery","webshim/polyfiller"],function(){"use strict";return webshim.addPolyfill("storage",{test:function(){return!("undefined"==typeof window.localStorage||"undefined"==typeof window.sessionStorage)}}),webshim.setOptions({loadStyles:!1,waitReady:!1}),{load:function(e,n,t){webshim.polyfill(e),webshim.ready(e,function(){t(webshims)})}}}),define("IGA.webshim.geolocation",["IGA.webshim!geolocation"],function(){}),define("IGA.webshim.storage",["IGA.webshim!storage"],function(){}),define("IGA.utils",["underscore","IGA"],function(e,n){"use strict";function t(e,n){this.size=n/e|0;var t=this.bins=[];this._bin=0;for(var r=0;e>=r;r++)t.push({index:r,percentage:r/e*100|0,start:this.size*r,end:this.size*(r+1)})}e.templateSettings={interpolate:/\{\{(.+?)\}\}/g};var r=function(){var e=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,n=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,t=/[^-+\dA-Z]/g,i=function(e,n){for(e=String(e),n=n||2;e.length<n;)e="0"+e;return e};return function(o,u,a){var s=r;if(1!==arguments.length||"[object String]"!==Object.prototype.toString.call(o)||/\d/.test(o)||(u=o,o=void 0),o=o?new Date(o):new Date,isNaN(o))throw SyntaxError("invalid date");u=String(s.masks[u]||u||s.masks["default"]),"UTC:"===u.slice(0,4)&&(u=u.slice(4),a=!0);var c=a?"getUTC":"get",l=o[c+"Date"](),f=o[c+"Day"](),p=o[c+"Month"](),d=o[c+"FullYear"](),h=o[c+"Hours"](),m=o[c+"Minutes"](),y=o[c+"Seconds"](),g=o[c+"Milliseconds"](),v=a?0:o.getTimezoneOffset(),b={d:l,dd:i(l),ddd:s.i18n.dayNames[f],dddd:s.i18n.dayNames[f+7],m:p+1,mm:i(p+1),mmm:s.i18n.monthNames[p],mmmm:s.i18n.monthNames[p+12],yy:String(d).slice(2),yyyy:d,h:h%12||12,hh:i(h%12||12),H:h,HH:i(h),M:m,MM:i(m),s:y,ss:i(y),l:i(g,3),L:i(g>99?Math.round(g/10):g),t:12>h?"a":"p",tt:12>h?"am":"pm",T:12>h?"A":"P",TT:12>h?"AM":"PM",Z:a?"UTC":(String(o).match(n)||[""]).pop().replace(t,""),o:(v>0?"-":"+")+i(100*Math.floor(Math.abs(v)/60)+Math.abs(v)%60,4),S:["th","st","nd","rd"][l%10>3?0:(l%100-l%10!==10)*l%10]};return u.replace(e,function(e){return e in b?b[e]:e.slice(1,e.length-1)})}}();return r.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"},r.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},n.utils={formatStr:function(e,n){for(var t in n)e=e.replace(new RegExp("{{"+t+"}}","g"),n[t]);return e=e.replace(/\{\{\w+\}\}/g,"")},querySep:function(e){return e.indexOf("?")>-1?"&":"?"},appendTag:function(e,n,t,r,i){r=r?document.getElementsByTagName(r)[0]:document,function(e,r){var o=document.createElement(r);o.type=n,t&&(o.id=t),i(o),e.appendChild(o)}(r,e)},urlParams:function(e){var n={};if(e){var t=e.split("?"),r=t[0].split("//"),i=r[r.length>1?1:0],o=i.indexOf("/"),u=t.length>1?t[1]:"";n["%url%"]=t[0],n["%path%"]=o>-1?i.substr(o):"/",n["%query%"]=t.length>1?t[1]:"";var a=u.split("#"),s=a.length>1?a[1]:"";n["%fragment%"]=s,""!==s&&(n["#"]=s);for(var c=a[0].split(/[&|=]/g),l=0;l<c.length;l+=2)""!=c[l]&&(n[c[l]]=decodeURIComponent(c[l+1]))}return n},parseUrl:function(e){function t(e,n){for(var t=e.replace(/[?#]/g,"").split(/[&|=]/g),r=0;r<t.length;r+=2)""!=t[r]&&(i[t[r]]=n[t[r]]=decodeURIComponent(t[r+1]))}if(e){var r=document.createElement("a");r.href=e;var i={"?":{},"#":{}};t(r.search,i["?"]),t(r.hash,i["#"]);var o={href:r.href,protocol:r.protocol,port:r.port,host:r.host,hostname:r.hostname,path:r.pathname||"/",search:r.search,hash:r.hash,params:i,path_authority:r.href.split(/[?#]/g)[0],rebuild:function(){var e="";return o.params["?"].length>0&&(e+=n.utils.querystring(o.params["?"])),o.params["#"].length>0&&(e+=n.utils.querystring(o.params["#"],!0)),o.path_authority+e}};return o}},querystring:function(n,t){var r="?";return t&&(r="#"),e.reduce(n,function(e,n,t){return t&&"undefined"!=typeof n?e+(e.length>0?"&":r)+t+"="+encodeURIComponent(n):e},"")},round:function(e,n){return n>=1?Math.round(e*Math.pow(10,n))/Math.pow(10,n):Math.round(e/Math.pow(10,-n))*Math.pow(10,-n)},jQuery_version:function(e){var n=e.fn.jquery.split(".");if(n.length<3)return!1;for(var t in n)n[t]=parseInt(n[t]);return n}(window.jQuery),zeros:function(e,n){for(var t=e+"";t.length<n;)t="0"+t;return t},diff:function(e,t){var r;if(e){for(var i in e)if("function"!=typeof e[i])if("object"==typeof e[i]){var o=n.utils.diff(e[i],t?t[i]:null);o&&(r=r||{},r[i]=o)}else t&&e[i]===t[i]||(r=r||{},r[i]=e[i]);return r}},deadline:function(n,t){function r(){e.isArray(t)?e.each(t,function(e){e()}):e.isFunction(t)&&t()}var i=Math.max(new Date(n)-new Date,0),o=setTimeout(r,i);return{timer:o}},dateFormat:r,toProperCase:function(e){return e?e.toLowerCase().replace(/^(.)|\s(.)/g,function(e){return e.toUpperCase()}):""},toTitleCase:function(e){return e?e.replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}):""},toPosessive:function(e,n){return n||(n="�"),e?e+n+(e.lastIndexOf("s")==e.length-1?"":"s"):""},toPlural:function(e){return e?e+(e.lastIndexOf("s")==e.length-1?"":"s"):""}},n.utils.timeFormat=function(){var e=0,n=0,t=0,i=0;return arguments.length>=1&&(e=arguments[0],i++),arguments.length>=2&&(n=arguments[1],i++),arguments.length>=3&&(t=arguments[2],i++),fmt=arguments[i],r(1e3*(e+60*n+3600*t),fmt)},n.utils._timespan=function(e){this.inMilliseconds=e,this.inDays=e/864e5,this.inHours=e/36e5,this.inMinutes=e/6e4;var n=Math.round(e/864e5);this.days=n,this.years=Math.round(n/365);var t=e%864e5;this.hours=Math.round(t/36e5),t%=36e5,this.minutes=Math.round(t/6e4),t%=6e4,this.seconds=Math.round(t/1e3),this.milliseconds=t%1e3},n.utils._msTime=function(e){var n=0;return n+=e.seconds||0,n+=60*(e.minutes||0),n+=3600*(e.hours||0),n+=86400*(e.days||0),n+=86400*(e.years||0)*365,1e3*n+(e.milliseconds||0)},n.utils._timespan.prototype.format=function(n,t,r){var i=!!r,o={};r=r||"";for(var u in n)o[u]=this[u]+n[u]+(t?"s":""),i||(r+="{{"+u+"}} ");return e.template(r,o)},n.utils.timespan=function(e,t){var r=0;return"string"==typeof e?e=new Date(e):"object"==typeof e&&(e=n.utils._msTime(e)),t="undefined"==typeof t?0:"string"==typeof t?new Date(t).getTime():"object"==typeof t?n.utils._msTime(t):(new Date).getTime(),r=e-t,new n.utils._timespan(r)},n.utils.janrainLoggedIn=function(){return window.access_token&&janrain.capture.ui.getProfileCookieData("uuid")},n.utils.alias=function(e){return function(){return this[e].apply(this,arguments)}},t.prototype.bin=function(e){var n=e/this.size|0;return n>=this.bins.length?n=this.bins.length-1:0>n&&(n=0),this.bins[n]},t.prototype.update=function(e){var n=this.compare(e),t=this.bins[this._bin];this._bin=this.bin(e).index;var r=this.bins[this._bin],i={changed:n,bin:r,from:t};return i},t.prototype.compare=function(e){var n=this.bin(e);return this._bin===n.index?0:n.index>this._bin?1:-1},n.utils.bucket=t,n.utils}),define("IGA.utils.handlebars",["jquery","handlebars","IGA.utils","underscore"],function(e,n,t,r){return n.registerHelper("encode",encodeURIComponent),n.registerHelper("decode",decodeURIComponent),n.registerHelper("toLower",function(e){return String.prototype.toLowerCase.apply(e)}),n.registerHelper("toUpper",function(e){return String.prototype.toUpperCase.apply(e)}),r.extend(t,{optionsTemplate:function(t,r,i){return r&&r[t]&&(i=e(r[t])),"function"==typeof i.html&&(i=i.html()),n.compile(i)}}),t}),define("JanrainReady",[],function(){function e(i,o,u,a){"undefined"!=typeof janrain&&"undefined"!=typeof janrain.events?e._onLoad(i,o):n>t?(t++,setTimeout(function(){e(i,o,u,a)},r)):u&&i.error(new Error("Janrain failed to load within the allowed time."))}var n=20,t=0,r=100;return e.load=function(n,t,r,i){e(r,n,t,i)},e._onLoad=function(e,n,t){n&&""!=n?t([n],function(n){e(n)}):e(janrain)},e}),define("janrain",["JanrainReady!"],function(e){return e}),define("BackplaneReady",["JanrainReady!"],function(e){var n=!1;return e.events.onCaptureBackplaneReady.addHandler(function(){n=!0}),BPReady=function(t,r,i,o){if("undefined"!=typeof Backplane&&Backplane.getChannelID()&&(n=!0),n)BPReady._onLoad(t,r);else{var u=setTimeout(function(){i&&t.error(new Error("Backplane failed to load within the allowed time."))},15e3);e.events.onCaptureBackplaneReady.addHandler(function(){BPReady._onLoad(t,r,i,o),clearTimeout(u)})}},BPReady.load=function(e,n,t,r){BPReady(t,e,n,r)},BPReady._onLoad=function(e,n,t){n&&""!=n?t([n],function(n){e(n)}):e(window.Backplane)},BPReady}),define("backplane",["BackplaneReady!"],function(e){return e}),define("FyreReady",["BackplaneReady!"],function(){function e(i,o,u,a){"undefined"!=typeof fyre?e._onLoad(i,o):n>t?(t++,setTimeout(function(){e(i,o,u,a)},r)):u&&i.error(new Error("Livefyre failed to load within the allowed time."))}var n=20,t=0,r=50;return e.load=function(n,t,r,i){e(r,n,t,i)},e._onLoad=function(e,n,t){n&&""!=n?t([n],function(n){e(n)}):e(fyre)},e}),define("livefyre",["FyreReady!"],function(e){return e}),function(){function e(e){function n(n,t,r,i,o,u){for(;o>=0&&u>o;o+=e){var a=i?i[o]:o;r=t(r,n[a],a,n)}return r}return function(t,r,i,o){r=b(r,o,4);var u=!A(t)&&v.keys(t),a=(u||t).length,s=e>0?0:a-1;return arguments.length<3&&(i=t[u?u[s]:s],s+=e),n(t,r,i,u,s,a)}}function n(e){return function(n,t,r){t=j(t,r);for(var i=E(n),o=e>0?0:i-1;o>=0&&i>o;o+=e)if(t(n[o],o,n))return o;return-1}}function t(e,n,t){return function(r,i,o){var u=0,a=E(r);if("number"==typeof o)e>0?u=o>=0?o:Math.max(o+a,u):a=o>=0?Math.min(o+1,a):o+a+1;else if(t&&o&&a)return o=t(r,i),r[o]===i?o:-1;if(i!==i)return o=n(l.call(r,u,a),v.isNaN),o>=0?o+u:-1;for(o=e>0?u:a-1;o>=0&&a>o;o+=e)if(r[o]===i)return o;return-1}}function r(e,n){var t=T.length,r=e.constructor,i=v.isFunction(r)&&r.prototype||a,o="constructor";for(v.has(e,o)&&!v.contains(n,o)&&n.push(o);t--;)o=T[t],o in e&&e[o]!==i[o]&&!v.contains(n,o)&&n.push(o)}var i=this,o=i._,u=Array.prototype,a=Object.prototype,s=Function.prototype,c=u.push,l=u.slice,f=a.toString,p=a.hasOwnProperty,d=Array.isArray,h=Object.keys,m=s.bind,y=Object.create,g=function(){},v=function(e){return e instanceof v?e:this instanceof v?void(this._wrapped=e):new v(e)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=v),exports._=v):i._=v,v.VERSION="1.8.3";var b=function(e,n,t){if(void 0===n)return e;switch(null==t?3:t){case 1:return function(t){return e.call(n,t)};case 2:return function(t,r){return e.call(n,t,r)};case 3:return function(t,r,i){return e.call(n,t,r,i)};case 4:return function(t,r,i,o){return e.call(n,t,r,i,o)}}return function(){return e.apply(n,arguments)}},j=function(e,n,t){return null==e?v.identity:v.isFunction(e)?b(e,n,t):v.isObject(e)?v.matcher(e):v.property(e)};v.iteratee=function(e,n){return j(e,n,1/0)};var w=function(e,n){return function(t){var r=arguments.length;if(2>r||null==t)return t;for(var i=1;r>i;i++)for(var o=arguments[i],u=e(o),a=u.length,s=0;a>s;s++){var c=u[s];n&&void 0!==t[c]||(t[c]=o[c])}return t}},x=function(e){if(!v.isObject(e))return{};if(y)return y(e);g.prototype=e;var n=new g;return g.prototype=null,n},q=function(e){return function(n){return null==n?void 0:n[e]}},_=Math.pow(2,53)-1,E=q("length"),A=function(e){var n=E(e);return"number"==typeof n&&n>=0&&_>=n};v.each=v.forEach=function(e,n,t){n=b(n,t);var r,i;if(A(e))for(r=0,i=e.length;i>r;r++)n(e[r],r,e);else{var o=v.keys(e);for(r=0,i=o.length;i>r;r++)n(e[o[r]],o[r],e)}return e},v.map=v.collect=function(e,n,t){n=j(n,t);for(var r=!A(e)&&v.keys(e),i=(r||e).length,o=Array(i),u=0;i>u;u++){var a=r?r[u]:u;o[u]=n(e[a],a,e)}return o},v.reduce=v.foldl=v.inject=e(1),v.reduceRight=v.foldr=e(-1),v.find=v.detect=function(e,n,t){var r;return r=A(e)?v.findIndex(e,n,t):v.findKey(e,n,t),void 0!==r&&-1!==r?e[r]:void 0},v.filter=v.select=function(e,n,t){var r=[];return n=j(n,t),v.each(e,function(e,t,i){n(e,t,i)&&r.push(e)}),r},v.reject=function(e,n,t){return v.filter(e,v.negate(j(n)),t)},v.every=v.all=function(e,n,t){n=j(n,t);for(var r=!A(e)&&v.keys(e),i=(r||e).length,o=0;i>o;o++){var u=r?r[o]:o;if(!n(e[u],u,e))return!1}return!0},v.some=v.any=function(e,n,t){n=j(n,t);for(var r=!A(e)&&v.keys(e),i=(r||e).length,o=0;i>o;o++){var u=r?r[o]:o;if(n(e[u],u,e))return!0}return!1},v.contains=v.includes=v.include=function(e,n,t,r){return A(e)||(e=v.values(e)),("number"!=typeof t||r)&&(t=0),v.indexOf(e,n,t)>=0},v.invoke=function(e,n){var t=l.call(arguments,2),r=v.isFunction(n);return v.map(e,function(e){var i=r?n:e[n];return null==i?i:i.apply(e,t)})},v.pluck=function(e,n){return v.map(e,v.property(n))},v.where=function(e,n){return v.filter(e,v.matcher(n))},v.findWhere=function(e,n){return v.find(e,v.matcher(n))},v.max=function(e,n,t){var r,i,o=-1/0,u=-1/0;if(null==n&&null!=e){e=A(e)?e:v.values(e);for(var a=0,s=e.length;s>a;a++)r=e[a],r>o&&(o=r)}else n=j(n,t),v.each(e,function(e,t,r){i=n(e,t,r),(i>u||i===-1/0&&o===-1/0)&&(o=e,u=i)});return o},v.min=function(e,n,t){var r,i,o=1/0,u=1/0;if(null==n&&null!=e){e=A(e)?e:v.values(e);for(var a=0,s=e.length;s>a;a++)r=e[a],o>r&&(o=r)}else n=j(n,t),v.each(e,function(e,t,r){i=n(e,t,r),(u>i||1/0===i&&1/0===o)&&(o=e,u=i)});return o},v.shuffle=function(e){for(var n,t=A(e)?e:v.values(e),r=t.length,i=Array(r),o=0;r>o;o++)n=v.random(0,o),n!==o&&(i[o]=i[n]),i[n]=t[o];return i},v.sample=function(e,n,t){return null==n||t?(A(e)||(e=v.values(e)),e[v.random(e.length-1)]):v.shuffle(e).slice(0,Math.max(0,n))},v.sortBy=function(e,n,t){return n=j(n,t),v.pluck(v.map(e,function(e,t,r){return{value:e,index:t,criteria:n(e,t,r)}}).sort(function(e,n){var t=e.criteria,r=n.criteria;if(t!==r){if(t>r||void 0===t)return 1;if(r>t||void 0===r)return-1}return e.index-n.index}),"value")};var k=function(e){return function(n,t,r){var i={};return t=j(t,r),v.each(n,function(r,o){var u=t(r,o,n);e(i,r,u)}),i}};v.groupBy=k(function(e,n,t){v.has(e,t)?e[t].push(n):e[t]=[n]}),v.indexBy=k(function(e,n,t){e[t]=n}),v.countBy=k(function(e,n,t){v.has(e,t)?e[t]++:e[t]=1}),v.toArray=function(e){return e?v.isArray(e)?l.call(e):A(e)?v.map(e,v.identity):v.values(e):[]},v.size=function(e){return null==e?0:A(e)?e.length:v.keys(e).length},v.partition=function(e,n,t){n=j(n,t);var r=[],i=[];return v.each(e,function(e,t,o){(n(e,t,o)?r:i).push(e)}),[r,i]},v.first=v.head=v.take=function(e,n,t){return null==e?void 0:null==n||t?e[0]:v.initial(e,e.length-n)},v.initial=function(e,n,t){return l.call(e,0,Math.max(0,e.length-(null==n||t?1:n)))},v.last=function(e,n,t){return null==e?void 0:null==n||t?e[e.length-1]:v.rest(e,Math.max(0,e.length-n))},v.rest=v.tail=v.drop=function(e,n,t){return l.call(e,null==n||t?1:n)},v.compact=function(e){return v.filter(e,v.identity)};var I=function(e,n,t,r){for(var i=[],o=0,u=r||0,a=E(e);a>u;u++){var s=e[u];if(A(s)&&(v.isArray(s)||v.isArguments(s))){n||(s=I(s,n,t));var c=0,l=s.length;for(i.length+=l;l>c;)i[o++]=s[c++]}else t||(i[o++]=s)}return i};v.flatten=function(e,n){return I(e,n,!1)},v.without=function(e){return v.difference(e,l.call(arguments,1))},v.uniq=v.unique=function(e,n,t,r){v.isBoolean(n)||(r=t,t=n,n=!1),null!=t&&(t=j(t,r));for(var i=[],o=[],u=0,a=E(e);a>u;u++){var s=e[u],c=t?t(s,u,e):s;n?(u&&o===c||i.push(s),o=c):t?v.contains(o,c)||(o.push(c),i.push(s)):v.contains(i,s)||i.push(s)}return i},v.union=function(){return v.uniq(I(arguments,!0,!0))},v.intersection=function(e){for(var n=[],t=arguments.length,r=0,i=E(e);i>r;r++){var o=e[r];if(!v.contains(n,o)){for(var u=1;t>u&&v.contains(arguments[u],o);u++);u===t&&n.push(o)}}return n},v.difference=function(e){var n=I(arguments,!0,!0,1);return v.filter(e,function(e){return!v.contains(n,e)})},v.zip=function(){return v.unzip(arguments)},v.unzip=function(e){for(var n=e&&v.max(e,E).length||0,t=Array(n),r=0;n>r;r++)t[r]=v.pluck(e,r);return t},v.object=function(e,n){for(var t={},r=0,i=E(e);i>r;r++)n?t[e[r]]=n[r]:t[e[r][0]]=e[r][1];return t},v.findIndex=n(1),v.findLastIndex=n(-1),v.sortedIndex=function(e,n,t,r){t=j(t,r,1);for(var i=t(n),o=0,u=E(e);u>o;){var a=Math.floor((o+u)/2);t(e[a])<i?o=a+1:u=a}return o},v.indexOf=t(1,v.findIndex,v.sortedIndex),v.lastIndexOf=t(-1,v.findLastIndex),v.range=function(e,n,t){null==n&&(n=e||0,e=0),t=t||1;for(var r=Math.max(Math.ceil((n-e)/t),0),i=Array(r),o=0;r>o;o++,e+=t)i[o]=e;return i};var M=function(e,n,t,r,i){if(!(r instanceof n))return e.apply(t,i);var o=x(e.prototype),u=e.apply(o,i);return v.isObject(u)?u:o};v.bind=function(e,n){if(m&&e.bind===m)return m.apply(e,l.call(arguments,1));if(!v.isFunction(e))throw new TypeError("Bind must be called on a function");var t=l.call(arguments,2),r=function(){return M(e,r,n,this,t.concat(l.call(arguments)))};return r},v.partial=function(e){var n=l.call(arguments,1),t=function(){for(var r=0,i=n.length,o=Array(i),u=0;i>u;u++)o[u]=n[u]===v?arguments[r++]:n[u];for(;r<arguments.length;)o.push(arguments[r++]);return M(e,t,this,this,o)};return t},v.bindAll=function(e){var n,t,r=arguments.length;if(1>=r)throw new Error("bindAll must be passed function names");for(n=1;r>n;n++)t=arguments[n],e[t]=v.bind(e[t],e);return e},v.memoize=function(e,n){var t=function(r){var i=t.cache,o=""+(n?n.apply(this,arguments):r);return v.has(i,o)||(i[o]=e.apply(this,arguments)),i[o]};return t.cache={},t},v.delay=function(e,n){var t=l.call(arguments,2);return setTimeout(function(){return e.apply(null,t)},n)},v.defer=v.partial(v.delay,v,1),v.throttle=function(e,n,t){var r,i,o,u=null,a=0;t||(t={});var s=function(){a=t.leading===!1?0:v.now(),u=null,o=e.apply(r,i),u||(r=i=null)};return function(){var c=v.now();a||t.leading!==!1||(a=c);var l=n-(c-a);return r=this,i=arguments,0>=l||l>n?(u&&(clearTimeout(u),u=null),a=c,o=e.apply(r,i),u||(r=i=null)):u||t.trailing===!1||(u=setTimeout(s,l)),o}},v.debounce=function(e,n,t){var r,i,o,u,a,s=function(){var c=v.now()-u;n>c&&c>=0?r=setTimeout(s,n-c):(r=null,t||(a=e.apply(o,i),r||(o=i=null)))};return function(){o=this,i=arguments,u=v.now();var c=t&&!r;return r||(r=setTimeout(s,n)),c&&(a=e.apply(o,i),o=i=null),a}},v.wrap=function(e,n){return v.partial(n,e)},v.negate=function(e){return function(){return!e.apply(this,arguments)}},v.compose=function(){var e=arguments,n=e.length-1;return function(){for(var t=n,r=e[n].apply(this,arguments);t--;)r=e[t].call(this,r);return r}},v.after=function(e,n){return function(){return--e<1?n.apply(this,arguments):void 0}},v.before=function(e,n){var t;return function(){return--e>0&&(t=n.apply(this,arguments)),1>=e&&(n=null),t}},v.once=v.partial(v.before,2);var O=!{toString:null}.propertyIsEnumerable("toString"),T=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];v.keys=function(e){if(!v.isObject(e))return[];if(h)return h(e);var n=[];for(var t in e)v.has(e,t)&&n.push(t);return O&&r(e,n),n},v.allKeys=function(e){if(!v.isObject(e))return[];var n=[];for(var t in e)n.push(t);return O&&r(e,n),n},v.values=function(e){for(var n=v.keys(e),t=n.length,r=Array(t),i=0;t>i;i++)r[i]=e[n[i]];return r},v.mapObject=function(e,n,t){n=j(n,t);for(var r,i=v.keys(e),o=i.length,u={},a=0;o>a;a++)r=i[a],u[r]=n(e[r],r,e);return u},v.pairs=function(e){for(var n=v.keys(e),t=n.length,r=Array(t),i=0;t>i;i++)r[i]=[n[i],e[n[i]]];return r},v.invert=function(e){for(var n={},t=v.keys(e),r=0,i=t.length;i>r;r++)n[e[t[r]]]=t[r];return n},v.functions=v.methods=function(e){var n=[];for(var t in e)v.isFunction(e[t])&&n.push(t);return n.sort()},v.extend=w(v.allKeys),v.extendOwn=v.assign=w(v.keys),v.findKey=function(e,n,t){n=j(n,t);for(var r,i=v.keys(e),o=0,u=i.length;u>o;o++)if(r=i[o],n(e[r],r,e))return r},v.pick=function(e,n,t){var r,i,o={},u=e;if(null==u)return o;v.isFunction(n)?(i=v.allKeys(u),r=b(n,t)):(i=I(arguments,!1,!1,1),r=function(e,n,t){return n in t},u=Object(u));for(var a=0,s=i.length;s>a;a++){var c=i[a],l=u[c];r(l,c,u)&&(o[c]=l)}return o},v.omit=function(e,n,t){if(v.isFunction(n))n=v.negate(n);else{var r=v.map(I(arguments,!1,!1,1),String);n=function(e,n){return!v.contains(r,n)}}return v.pick(e,n,t)},v.defaults=w(v.allKeys,!0),v.create=function(e,n){var t=x(e);return n&&v.extendOwn(t,n),t},v.clone=function(e){return v.isObject(e)?v.isArray(e)?e.slice():v.extend({},e):e},v.tap=function(e,n){return n(e),e},v.isMatch=function(e,n){var t=v.keys(n),r=t.length;if(null==e)return!r;for(var i=Object(e),o=0;r>o;o++){var u=t[o];if(n[u]!==i[u]||!(u in i))return!1}return!0};var L=function(e,n,t,r){if(e===n)return 0!==e||1/e===1/n;if(null==e||null==n)return e===n;e instanceof v&&(e=e._wrapped),n instanceof v&&(n=n._wrapped);var i=f.call(e);if(i!==f.call(n))return!1;switch(i){case"[object RegExp]":case"[object String]":return""+e==""+n;case"[object Number]":return+e!==+e?+n!==+n:0===+e?1/+e===1/n:+e===+n;case"[object Date]":case"[object Boolean]":return+e===+n}var o="[object Array]"===i;if(!o){if("object"!=typeof e||"object"!=typeof n)return!1;var u=e.constructor,a=n.constructor;if(u!==a&&!(v.isFunction(u)&&u instanceof u&&v.isFunction(a)&&a instanceof a)&&"constructor"in e&&"constructor"in n)return!1}t=t||[],r=r||[];for(var s=t.length;s--;)if(t[s]===e)return r[s]===n;if(t.push(e),r.push(n),o){if(s=e.length,s!==n.length)return!1;for(;s--;)if(!L(e[s],n[s],t,r))return!1}else{var c,l=v.keys(e);if(s=l.length,v.keys(n).length!==s)return!1;for(;s--;)if(c=l[s],!v.has(n,c)||!L(e[c],n[c],t,r))return!1}return t.pop(),r.pop(),!0};v.isEqual=function(e,n){return L(e,n)},v.isEmpty=function(e){return null==e?!0:A(e)&&(v.isArray(e)||v.isString(e)||v.isArguments(e))?0===e.length:0===v.keys(e).length},v.isElement=function(e){return!(!e||1!==e.nodeType)},v.isArray=d||function(e){return"[object Array]"===f.call(e)},v.isObject=function(e){var n=typeof e;return"function"===n||"object"===n&&!!e},v.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(e){v["is"+e]=function(n){return f.call(n)==="[object "+e+"]"}}),v.isArguments(arguments)||(v.isArguments=function(e){return v.has(e,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(v.isFunction=function(e){return"function"==typeof e||!1}),v.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},v.isNaN=function(e){return v.isNumber(e)&&e!==+e},v.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"===f.call(e)},v.isNull=function(e){return null===e},v.isUndefined=function(e){return void 0===e},v.has=function(e,n){return null!=e&&p.call(e,n)},v.noConflict=function(){return i._=o,this},v.identity=function(e){return e},v.constant=function(e){return function(){return e}},v.noop=function(){},v.property=q,v.propertyOf=function(e){return null==e?function(){}:function(n){return e[n]}},v.matcher=v.matches=function(e){return e=v.extendOwn({},e),function(n){return v.isMatch(n,e)}},v.times=function(e,n,t){var r=Array(Math.max(0,e));n=b(n,t,1);for(var i=0;e>i;i++)r[i]=n(i);return r},v.random=function(e,n){return null==n&&(n=e,e=0),e+Math.floor(Math.random()*(n-e+1))
},v.now=Date.now||function(){return(new Date).getTime()};var S={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},R=v.invert(S),G=function(e){var n=function(n){return e[n]},t="(?:"+v.keys(e).join("|")+")",r=RegExp(t),i=RegExp(t,"g");return function(e){return e=null==e?"":""+e,r.test(e)?e.replace(i,n):e}};v.escape=G(S),v.unescape=G(R),v.result=function(e,n,t){var r=null==e?void 0:e[n];return void 0===r&&(r=t),v.isFunction(r)?r.call(e):r};var C=0;v.uniqueId=function(e){var n=++C+"";return e?e+n:n},v.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var B=/(.)^/,P={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},F=/\\|'|\r|\n|\u2028|\u2029/g,N=function(e){return"\\"+P[e]};v.template=function(e,n,t){!n&&t&&(n=t),n=v.defaults({},n,v.templateSettings);var r=RegExp([(n.escape||B).source,(n.interpolate||B).source,(n.evaluate||B).source].join("|")+"|$","g"),i=0,o="__p+='";e.replace(r,function(n,t,r,u,a){return o+=e.slice(i,a).replace(F,N),i=a+n.length,t?o+="'+\n((__t=("+t+"))==null?'':_.escape(__t))+\n'":r?o+="'+\n((__t=("+r+"))==null?'':__t)+\n'":u&&(o+="';\n"+u+"\n__p+='"),n}),o+="';\n",n.variable||(o="with(obj||{}){\n"+o+"}\n"),o="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+o+"return __p;\n";try{var u=new Function(n.variable||"obj","_",o)}catch(a){throw a.source=o,a}var s=function(e){return u.call(this,e,v)},c=n.variable||"obj";return s.source="function("+c+"){\n"+o+"}",s},v.chain=function(e){var n=v(e);return n._chain=!0,n};var D=function(e,n){return e._chain?v(n).chain():n};v.mixin=function(e){v.each(v.functions(e),function(n){var t=v[n]=e[n];v.prototype[n]=function(){var e=[this._wrapped];return c.apply(e,arguments),D(this,t.apply(v,e))}})},v.mixin(v),v.each(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var n=u[e];v.prototype[e]=function(){var t=this._wrapped;return n.apply(t,arguments),"shift"!==e&&"splice"!==e||0!==t.length||delete t[0],D(this,t)}}),v.each(["concat","join","slice"],function(e){var n=u[e];v.prototype[e]=function(){return D(this,n.apply(this._wrapped,arguments))}}),v.prototype.value=function(){return this._wrapped},v.prototype.valueOf=v.prototype.toJSON=v.prototype.value,v.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return v})}.call(this),function(){"use strict";function e(){}function n(e,n){for(var t=e.length;t--;)if(e[t].listener===n)return t;return-1}function t(e){return function(){return this[e].apply(this,arguments)}}var r=e.prototype;r.getListeners=function(e){var n,t,r=this._getEvents();if("object"==typeof e){n={};for(t in r)r.hasOwnProperty(t)&&e.test(t)&&(n[t]=r[t])}else n=r[e]||(r[e]=[]);return n},r.flattenListeners=function(e){var n,t=[];for(n=0;n<e.length;n+=1)t.push(e[n].listener);return t},r.getListenersAsObject=function(e){var n,t=this.getListeners(e);return t instanceof Array&&(n={},n[e]=t),n||t},r.addListener=function(e,t){var r,i=this.getListenersAsObject(e),o="object"==typeof t;for(r in i)i.hasOwnProperty(r)&&-1===n(i[r],t)&&i[r].push(o?t:{listener:t,once:!1});return this},r.on=t("addListener"),r.addOnceListener=function(e,n){return this.addListener(e,{listener:n,once:!0})},r.once=t("addOnceListener"),r.defineEvent=function(e){return this.getListeners(e),this},r.defineEvents=function(e){for(var n=0;n<e.length;n+=1)this.defineEvent(e[n]);return this},r.removeListener=function(e,t){var r,i,o=this.getListenersAsObject(e);for(i in o)o.hasOwnProperty(i)&&(r=n(o[i],t),-1!==r&&o[i].splice(r,1));return this},r.off=t("removeListener"),r.addListeners=function(e,n){return this.manipulateListeners(!1,e,n)},r.removeListeners=function(e,n){return this.manipulateListeners(!0,e,n)},r.manipulateListeners=function(e,n,t){var r,i,o=e?this.removeListener:this.addListener,u=e?this.removeListeners:this.addListeners;if("object"!=typeof n||n instanceof RegExp)for(r=t.length;r--;)o.call(this,n,t[r]);else for(r in n)n.hasOwnProperty(r)&&(i=n[r])&&("function"==typeof i?o.call(this,r,i):u.call(this,r,i));return this},r.removeEvent=function(e){var n,t=typeof e,r=this._getEvents();if("string"===t)delete r[e];else if("object"===t)for(n in r)r.hasOwnProperty(n)&&e.test(n)&&delete r[n];else delete this._events;return this},r.emitEvent=function(e,n){var t,r,i,o,u=this.getListenersAsObject(e);for(i in u)if(u.hasOwnProperty(i))for(r=u[i].length;r--;)t=u[i][r],t.once===!0&&this.removeListener(e,t.listener),o=t.listener.apply(this,n||[]),o===this._getOnceReturnValue()&&this.removeListener(e,t.listener);return this},r.trigger=t("emitEvent"),r.emit=function(e){var n=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,n)},r.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},r._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},r._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define("EventEmitter",function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}.call(this),define("EventEmitter.history",["EventEmitter","inherits"],function(e,n){"use strict";function t(){e.apply(this,arguments),this.history={},this.maxHistory=50}return n(t,e),t.prototype.emitEvent=function(n,t){return e.prototype.emitEvent.apply(this,arguments),this.history&&(this.history[n]=this.history[n]||[],this.history[n].length>=this.maxHistory&&this.history[n].shift(),this.history[n].push(t||[])),this},t.prototype.clearHistory=function(e){return e&&this.history?this.history[e]=[]:this.history={},this},t.prototype.replayEvent=function(e,n){if(n&&this.history&&this.history[e])for(var t=0;t<this.history[e].length;t++)n.apply(this,this.history[e][t]);return this},t.prototype.replay=function(){return this.replayEvent.apply(this,arguments)},t}),define("EventEmitter.namespace",["EventEmitter","inherits"],function(e,n){"use strict";function t(){}return n(t,e),t.prototype.getListeners=function(e){var n,t,r=this._getEvents();if(e instanceof RegExp){n={};for(t in r)r.hasOwnProperty(t)&&e.test(t)&&(n[t]=r[t])}else{n=r[e]||(r[e]=[]);for(var i=e.split(":"),o=i[0],u=0;u<i.length-1;u++,o+=":"+i[u])r.hasOwnProperty(o)&&(n=n.concat(r[o]))}return n},t}),define("EventEmitter.conditional",["EventEmitter","inherits"],function(e,n){"use strict";function t(){e.apply(this,arguments)}return n(t,e),t.prototype.onceCondition=function(e,n,t){var r=this,i=function(){n()&&(t.apply(this,arguments),r.off(e,i))};this.on(e,i)},t}),function(e){"use strict";var n=document.documentElement,t=function(){};n.addEventListener?t=function(e,n,t){e.addEventListener(n,t,!1)}:n.attachEvent&&(t=function(n,t,r){n[t+r]=r.handleEvent?function(){var n=e.event;n.target=n.target||n.srcElement,r.handleEvent.call(r,n)}:function(){var t=e.event;t.target=t.target||t.srcElement,r.call(n,t)},n.attachEvent("on"+t,n[t+r])});var r=function(){};n.removeEventListener?r=function(e,n,t){e.removeEventListener(n,t,!1)}:n.detachEvent&&(r=function(e,n,t){e.detachEvent("on"+n,e[n+t]);try{delete e[n+t]}catch(r){e[n+t]=void 0}});var i={bind:t,unbind:r};"function"==typeof define&&define.amd?define("eventie",i):e.eventie=i}(this);;

/**
 * jQuery Once Plugin v1.2
 * http://plugins.jquery.com/project/once
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
  var cache = {}, uuid = 0;

  /**
   * Filters elements by whether they have not yet been processed.
   *
   * @param id
   *   (Optional) If this is a string, then it will be used as the CSS class
   *   name that is applied to the elements for determining whether it has
   *   already been processed. The elements will get a class in the form of
   *   "id-processed".
   *
   *   If the id parameter is a function, it will be passed off to the fn
   *   parameter and the id will become a unique identifier, represented as a
   *   number.
   *
   *   When the id is neither a string or a function, it becomes a unique
   *   identifier, depicted as a number. The element's class will then be
   *   represented in the form of "jquery-once-#-processed".
   *
   *   Take note that the id must be valid for usage as an element's class name.
   * @param fn
   *   (Optional) If given, this function will be called for each element that
   *   has not yet been processed. The function's return value follows the same
   *   logic as $.each(). Returning true will continue to the next matched
   *   element in the set, while returning false will entirely break the
   *   iteration.
   */
  $.fn.once = function (id, fn) {
    if (typeof id != 'string') {
      // Generate a numeric ID if the id passed can't be used as a CSS class.
      if (!(id in cache)) {
        cache[id] = ++uuid;
      }
      // When the fn parameter is not passed, we interpret it from the id.
      if (!fn) {
        fn = id;
      }
      id = 'jquery-once-' + cache[id];
    }
    // Remove elements from the set that have already been processed.
    var name = id + '-processed';
    var elements = this.not('.' + name).addClass(name);

    return $.isFunction(fn) ? elements.each(fn) : elements;
  };

  /**
   * Filters elements that have been processed once already.
   *
   * @param id
   *   A required string representing the name of the class which should be used
   *   when filtering the elements. This only filters elements that have already
   *   been processed by the once function. The id should be the same id that
   *   was originally passed to the once() function.
   * @param fn
   *   (Optional) If given, this function will be called for each element that
   *   has not yet been processed. The function's return value follows the same
   *   logic as $.each(). Returning true will continue to the next matched
   *   element in the set, while returning false will entirely break the
   *   iteration.
   */
  $.fn.removeOnce = function (id, fn) {
    var name = id + '-processed';
    var elements = this.filter('.' + name).removeClass(name);

    return $.isFunction(fn) ? elements.each(fn) : elements;
  };
})(jQuery);
;

var Drupal = Drupal || { 'settings': {}, 'behaviors': {}, 'locale': {} };

// Allow other JavaScript libraries to use $.
jQuery.noConflict();

(function ($) {

/**
 * Override jQuery.fn.init to guard against XSS attacks.
 *
 * See http://bugs.jquery.com/ticket/9521
 */
var jquery_init = $.fn.init;
$.fn.init = function (selector, context, rootjQuery) {
  // If the string contains a "#" before a "<", treat it as invalid HTML.
  if (selector && typeof selector === 'string') {
    var hash_position = selector.indexOf('#');
    if (hash_position >= 0) {
      var bracket_position = selector.indexOf('<');
      if (bracket_position > hash_position) {
        throw 'Syntax error, unrecognized expression: ' + selector;
      }
    }
  }
  return jquery_init.call(this, selector, context, rootjQuery);
};
$.fn.init.prototype = jquery_init.prototype;

/**
 * Attach all registered behaviors to a page element.
 *
 * Behaviors are event-triggered actions that attach to page elements, enhancing
 * default non-JavaScript UIs. Behaviors are registered in the Drupal.behaviors
 * object using the method 'attach' and optionally also 'detach' as follows:
 * @code
 *    Drupal.behaviors.behaviorName = {
 *      attach: function (context, settings) {
 *        ...
 *      },
 *      detach: function (context, settings, trigger) {
 *        ...
 *      }
 *    };
 * @endcode
 *
 * Drupal.attachBehaviors is added below to the jQuery ready event and so
 * runs on initial page load. Developers implementing AHAH/Ajax in their
 * solutions should also call this function after new page content has been
 * loaded, feeding in an element to be processed, in order to attach all
 * behaviors to the new content.
 *
 * Behaviors should use
 * @code
 *   $(selector).once('behavior-name', function () {
 *     ...
 *   });
 * @endcode
 * to ensure the behavior is attached only once to a given element. (Doing so
 * enables the reprocessing of given elements, which may be needed on occasion
 * despite the ability to limit behavior attachment to a particular element.)
 *
 * @param context
 *   An element to attach behaviors to. If none is given, the document element
 *   is used.
 * @param settings
 *   An object containing settings for the current context. If none given, the
 *   global Drupal.settings object is used.
 */
Drupal.attachBehaviors = function (context, settings) {
  context = context || document;
  settings = settings || Drupal.settings;
  // Execute all of them.
  $.each(Drupal.behaviors, function () {
    if ($.isFunction(this.attach)) {
      this.attach(context, settings);
    }
  });
};

/**
 * Detach registered behaviors from a page element.
 *
 * Developers implementing AHAH/Ajax in their solutions should call this
 * function before page content is about to be removed, feeding in an element
 * to be processed, in order to allow special behaviors to detach from the
 * content.
 *
 * Such implementations should look for the class name that was added in their
 * corresponding Drupal.behaviors.behaviorName.attach implementation, i.e.
 * behaviorName-processed, to ensure the behavior is detached only from
 * previously processed elements.
 *
 * @param context
 *   An element to detach behaviors from. If none is given, the document element
 *   is used.
 * @param settings
 *   An object containing settings for the current context. If none given, the
 *   global Drupal.settings object is used.
 * @param trigger
 *   A string containing what's causing the behaviors to be detached. The
 *   possible triggers are:
 *   - unload: (default) The context element is being removed from the DOM.
 *   - move: The element is about to be moved within the DOM (for example,
 *     during a tabledrag row swap). After the move is completed,
 *     Drupal.attachBehaviors() is called, so that the behavior can undo
 *     whatever it did in response to the move. Many behaviors won't need to
 *     do anything simply in response to the element being moved, but because
 *     IFRAME elements reload their "src" when being moved within the DOM,
 *     behaviors bound to IFRAME elements (like WYSIWYG editors) may need to
 *     take some action.
 *   - serialize: When an Ajax form is submitted, this is called with the
 *     form as the context. This provides every behavior within the form an
 *     opportunity to ensure that the field elements have correct content
 *     in them before the form is serialized. The canonical use-case is so
 *     that WYSIWYG editors can update the hidden textarea to which they are
 *     bound.
 *
 * @see Drupal.attachBehaviors
 */
Drupal.detachBehaviors = function (context, settings, trigger) {
  context = context || document;
  settings = settings || Drupal.settings;
  trigger = trigger || 'unload';
  // Execute all of them.
  $.each(Drupal.behaviors, function () {
    if ($.isFunction(this.detach)) {
      this.detach(context, settings, trigger);
    }
  });
};

/**
 * Encode special characters in a plain-text string for display as HTML.
 *
 * @ingroup sanitization
 */
Drupal.checkPlain = function (str) {
  var character, regex,
      replace = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
  str = String(str);
  for (character in replace) {
    if (replace.hasOwnProperty(character)) {
      regex = new RegExp(character, 'g');
      str = str.replace(regex, replace[character]);
    }
  }
  return str;
};

/**
 * Replace placeholders with sanitized values in a string.
 *
 * @param str
 *   A string with placeholders.
 * @param args
 *   An object of replacements pairs to make. Incidences of any key in this
 *   array are replaced with the corresponding value. Based on the first
 *   character of the key, the value is escaped and/or themed:
 *    - !variable: inserted as is
 *    - @variable: escape plain text to HTML (Drupal.checkPlain)
 *    - %variable: escape text and theme as a placeholder for user-submitted
 *      content (checkPlain + Drupal.theme('placeholder'))
 *
 * @see Drupal.t()
 * @ingroup sanitization
 */
Drupal.formatString = function(str, args) {
  // Transform arguments before inserting them.
  for (var key in args) {
    switch (key.charAt(0)) {
      // Escaped only.
      case '@':
        args[key] = Drupal.checkPlain(args[key]);
      break;
      // Pass-through.
      case '!':
        break;
      // Escaped and placeholder.
      case '%':
      default:
        args[key] = Drupal.theme('placeholder', args[key]);
        break;
    }
    str = str.replace(key, args[key]);
  }
  return str;
};

/**
 * Translate strings to the page language or a given language.
 *
 * See the documentation of the server-side t() function for further details.
 *
 * @param str
 *   A string containing the English string to translate.
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   See Drupal.formatString().
 *
 * @param options
 *   - 'context' (defaults to the empty context): The context the source string
 *     belongs to.
 *
 * @return
 *   The translated string.
 */
Drupal.t = function (str, args, options) {
  options = options || {};
  options.context = options.context || '';

  // Fetch the localized version of the string.
  if (Drupal.locale.strings && Drupal.locale.strings[options.context] && Drupal.locale.strings[options.context][str]) {
    str = Drupal.locale.strings[options.context][str];
  }

  if (args) {
    str = Drupal.formatString(str, args);
  }
  return str;
};

/**
 * Format a string containing a count of items.
 *
 * This function ensures that the string is pluralized correctly. Since Drupal.t() is
 * called by this function, make sure not to pass already-localized strings to it.
 *
 * See the documentation of the server-side format_plural() function for further details.
 *
 * @param count
 *   The item count to display.
 * @param singular
 *   The string for the singular case. Please make sure it is clear this is
 *   singular, to ease translation (e.g. use "1 new comment" instead of "1 new").
 *   Do not use @count in the singular string.
 * @param plural
 *   The string for the plural case. Please make sure it is clear this is plural,
 *   to ease translation. Use @count in place of the item count, as in "@count
 *   new comments".
 * @param args
 *   An object of replacements pairs to make after translation. Incidences
 *   of any key in this array are replaced with the corresponding value.
 *   See Drupal.formatString().
 *   Note that you do not need to include @count in this array.
 *   This replacement is done automatically for the plural case.
 * @param options
 *   The options to pass to the Drupal.t() function.
 * @return
 *   A translated string.
 */
Drupal.formatPlural = function (count, singular, plural, args, options) {
  var args = args || {};
  args['@count'] = count;
  // Determine the index of the plural form.
  var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : ((args['@count'] == 1) ? 0 : 1);

  if (index == 0) {
    return Drupal.t(singular, args, options);
  }
  else if (index == 1) {
    return Drupal.t(plural, args, options);
  }
  else {
    args['@count[' + index + ']'] = args['@count'];
    delete args['@count'];
    return Drupal.t(plural.replace('@count', '@count[' + index + ']'), args, options);
  }
};

/**
 * Generate the themed representation of a Drupal object.
 *
 * All requests for themed output must go through this function. It examines
 * the request and routes it to the appropriate theme function. If the current
 * theme does not provide an override function, the generic theme function is
 * called.
 *
 * For example, to retrieve the HTML for text that should be emphasized and
 * displayed as a placeholder inside a sentence, call
 * Drupal.theme('placeholder', text).
 *
 * @param func
 *   The name of the theme function to call.
 * @param ...
 *   Additional arguments to pass along to the theme function.
 * @return
 *   Any data the theme function returns. This could be a plain HTML string,
 *   but also a complex object.
 */
Drupal.theme = function (func) {
  var args = Array.prototype.slice.apply(arguments, [1]);

  return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args);
};

/**
 * Freeze the current body height (as minimum height). Used to prevent
 * unnecessary upwards scrolling when doing DOM manipulations.
 */
Drupal.freezeHeight = function () {
  Drupal.unfreezeHeight();
  $('<div id="freeze-height"></div>').css({
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '1px',
    height: $('body').css('height')
  }).appendTo('body');
};

/**
 * Unfreeze the body height.
 */
Drupal.unfreezeHeight = function () {
  $('#freeze-height').remove();
};

/**
 * Encodes a Drupal path for use in a URL.
 *
 * For aesthetic reasons slashes are not escaped.
 */
Drupal.encodePath = function (item, uri) {
  uri = uri || location.href;
  return encodeURIComponent(item).replace(/%2F/g, '/');
};

/**
 * Get the text selection in a textarea.
 */
Drupal.getSelection = function (element) {
  if (typeof element.selectionStart != 'number' && document.selection) {
    // The current selection.
    var range1 = document.selection.createRange();
    var range2 = range1.duplicate();
    // Select all text.
    range2.moveToElementText(element);
    // Now move 'dummy' end point to end point of original range.
    range2.setEndPoint('EndToEnd', range1);
    // Now we can calculate start and end points.
    var start = range2.text.length - range1.text.length;
    var end = start + range1.text.length;
    return { 'start': start, 'end': end };
  }
  return { 'start': element.selectionStart, 'end': element.selectionEnd };
};

/**
 * Build an error message from an Ajax response.
 */
Drupal.ajaxError = function (xmlhttp, uri) {
  var statusCode, statusText, pathText, responseText, readyStateText, message;
  if (xmlhttp.status) {
    statusCode = "\n" + Drupal.t("An AJAX HTTP error occurred.") +  "\n" + Drupal.t("HTTP Result Code: !status", {'!status': xmlhttp.status});
  }
  else {
    statusCode = "\n" + Drupal.t("An AJAX HTTP request terminated abnormally.");
  }
  statusCode += "\n" + Drupal.t("Debugging information follows.");
  pathText = "\n" + Drupal.t("Path: !uri", {'!uri': uri} );
  statusText = '';
  // In some cases, when statusCode == 0, xmlhttp.statusText may not be defined.
  // Unfortunately, testing for it with typeof, etc, doesn't seem to catch that
  // and the test causes an exception. So we need to catch the exception here.
  try {
    statusText = "\n" + Drupal.t("StatusText: !statusText", {'!statusText': $.trim(xmlhttp.statusText)});
  }
  catch (e) {}

  responseText = '';
  // Again, we don't have a way to know for sure whether accessing
  // xmlhttp.responseText is going to throw an exception. So we'll catch it.
  try {
    responseText = "\n" + Drupal.t("ResponseText: !responseText", {'!responseText': $.trim(xmlhttp.responseText) } );
  } catch (e) {}

  // Make the responseText more readable by stripping HTML tags and newlines.
  responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi,"");
  responseText = responseText.replace(/[\n]+\s+/g,"\n");

  // We don't need readyState except for status == 0.
  readyStateText = xmlhttp.status == 0 ? ("\n" + Drupal.t("ReadyState: !readyState", {'!readyState': xmlhttp.readyState})) : "";

  message = statusCode + pathText + statusText + responseText + readyStateText;
  return message;
};

// Class indicating that JS is enabled; used for styling purpose.
$('html').addClass('js');

// 'js enabled' cookie.
document.cookie = 'has_js=1; path=/';

/**
 * Additions to jQuery.support.
 */
$(function () {
  /**
   * Boolean indicating whether or not position:fixed is supported.
   */
  if (jQuery.support.positionFixed === undefined) {
    var el = $('<div style="position:fixed; top:10px" />').appendTo(document.body);
    jQuery.support.positionFixed = el[0].offsetTop === 10;
    el.remove();
  }
});

//Attach all behaviors.
$(function () {
  Drupal.attachBehaviors(document, Drupal.settings);
});

/**
 * The default themes.
 */
Drupal.theme.prototype = {

  /**
   * Formats text for emphasized display in a placeholder inside a sentence.
   *
   * @param str
   *   The text to format (plain-text).
   * @return
   *   The formatted text (html).
   */
  placeholder: function (str) {
    return '<em class="placeholder">' + Drupal.checkPlain(str) + '</em>';
  }
};

})(jQuery);
;
(function ($) {
  $('html').removeClass('no-js');
})(jQuery);
;
