(function($){
	"use strict";
	Drupal.behaviors.asf_commerce = {
		attach:function (context, settings) {
			$("form.commerce-bundle-add-to-cart, form.commerce-add-to-cart", context).each(function(){
				var $form = $(this);
				// Disable add to cart on checklist change
				$form.find("select").on("change", function(){
					$form.find("input[type=submit]").attr('disabled', 'disabled');
					// Defer disabling of select b/c this can interfere with the value parsed by jQuery.form
					$form.find("select").each(function(){
						setTimeout(function(){ $(this).attr("disabled", "disabled"); }, 0);
					});

				});
				// Disable add to cart after submit
				$form.on("submit", function(){
					$(this).find("input[type=submit]").attr("disabled", "disabled");
				});
			});
			$("form.views-form-commerce-cart-form-default", context).each(function() {
				var $form = $(this);
				$form.on("submit", function(){
				});
			});
			Drupal.behaviors.asf_commerce.updateCartIcon();
		},
		updateCartIcon:function() {
			$("a.icon-cart").each(function() {
				var $cartIcon = $(this),
					cartQuantity = Drupal.behaviors.asf_commerce.cartQuantity();
				if (cartQuantity === NaN) {
					cartQuantity = 0;
				}
				$cartIcon.attr('data-cart-quantity', cartQuantity);
				$cartIcon.find("span.cart-quantity").text(cartQuantity);
			});
		},
		updateCartQuantity:function() {
			require(['IGA.webshim.storage'], function() {
				$.ajax({
					url: '/api/asf_commerce/cart_quantity',
				}).done(function(data) {
					sessionStorage.setItem('cartQuantity', data);
					Drupal.behaviors.asf_commerce.updateCartIcon();
				});
			});
		},
		cartQuantity:function() {
			if (sessionStorage.getItem('cartQuantity')) {
				var currentQuantity = parseInt(sessionStorage.getItem('cartQuantity'));
				if (currentQuantity === NaN) {
					return 0;
				}
				return currentQuantity;
			} else {
				return 0;
			}
		}
	}
})(jQuery);
;
(function($) {
  Drupal.behaviors.asf_events = {
    attach: function(context, settings) {
      $(".asf-events-anonymous-login", context).once(function() {
        $(this).on("click", function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          IGA.login();
        });
      });
    }
  };
})(jQuery);
;
/**
 * @file
 * bollero.mesasges.js
 *
 * Use Google Materialize Snackbar to display messages.
 */

define("IGA.bolero.messages", function(){
  "use strict";
  function BoleroMessages(settings) {
    this.items = settings.bolero_messages ? settings.bolero_messages.items : [];
	if(this.items.length > 0){
		this.message();
	}
  }

  BoleroMessages.prototype.message = function(){
    var self = this;
    require(["IGA.bolero.Snackbar"], function(Snackbar){
      for (var i in self.items) {
//        if (self.items[i].type !== "asf-commerce-add-to-cart") {
        var message = self.items[i];
	      Snackbar.add(message.content, true, null, { type: message.type });
//        }
      }
    });
  };

  return BoleroMessages;
});

/**
 *  Displays messages with Google Materialize Snackbar.
 */
(function($){
  Drupal.behaviors.bolero_messages = {
    attach: function (context, settings) {
	  require(["IGA.bolero.messages"], function(BoleroMessages){
        new BoleroMessages(settings);
	  });
    }
  };
})(jQuery);
;
/**
 * ExactTarget Subscription Integration
 */
//## ExactTarget EventEmitter bus
define("ExactTarget.events", ["inherits", "EventEmitter.history"], function( inherits, EventEmitter ) {
	"use strict";
	var ETEvents = new EventEmitter();
	return ETEvents;
});

define("ExactTarget", ["jquery", "IGA.webshim.storage"], function($){
	"use strict";
	var ExactTarget = {
		lists: {},
		addList: function($list, type, $form){
			var listId = $list.attr("data-et-listid"), listName, businessUnit;
			if(typeof listId === "undefined"){
				listId = $list.val();
				var ets = Drupal.settings.exact_target_subscriptions || {};
				if(listId && ets.lists && ets.lists[listId]){
					listName = ets.lists[listId].listName;
					businessUnit = ets.lists[listId].businessUnit;
				}
			}else{
				listName = $list.attr("data-et-listname");
				businessUnit = $list.attr("data-et-buid");
			}
			if(ExactTarget.lists[listId]){ return; }
			ExactTarget.lists[listId] = {
				listId: listId,
				businessUnit: businessUnit,
				listName: listName,
				type: type,
				$form: $form,
				isSubscribed: function(){ return localStorage.getItem("et_list_subscribed_"+listId) === "1"; },
				isOptedOut: function(){ return localStorage.getItem("et_list_optout_"+listId) === "1"; }
			};
		},
		isSubscribed: function(listId){
			return localStorage.getItem("et_list_subscribed_"+listId) === "1";
		},
		isOptedOut: function(listId){
			return localStorage.getItem("et_list_optout_"+listId) === "1";
		},
		setSubscribed: function(listId, subscribed){
			if(subscribed){
				localStorage.setItem("et_list_subscribed_"+listId, 1);
				$.cookie("et_subscribe_default_"+listId, 0, { expires: -1 });
			}else{
				localStorage.setItem("et_list_subscribed_"+listId, 0);
			}
		},
		setOptOut: function(listId, optout){
			if(optout){
				localStorage.setItem("et_list_optout_"+listId, 1);
				$.cookie("et_subscribe_default_"+listId, 0, { expires: -1 });
			}else{
				localStorage.removeItem("et_list_optout_"+listId);
				$.cookie("et_subscribe_default_"+listId, '1');
			}
		}
	};
	return ExactTarget;
});

require(["jquery", "ExactTarget.events", "ExactTarget", "googleanalytics", "IGA.webshim.storage"], function($, ETEvents, ET){
	// Attach the ET subscruption tracker
	function trackSubscribe(list){
		ga("send", "event", "Conversion", "mailinglist subscribe", list.listName+" | "+list.businessUnit+"/"+list.ID);
		ET.setSubscribed(list.listId, true);
	}
	function trackUnsubscribe(list){
		ET.setSubscribed(list.listId, false);
		ga("send", "event", "Conversion", "mailinglist subscribe", list.listName+" | "+list.businessUnit+"/"+list.ID);
	}
	// and track past events
	ETEvents.on("subscribe", trackSubscribe).replay("subscribe", trackSubscribe);
	ETEvents.on("unsubscribe", trackSubscribe).replay("unsubscribe", trackUnsubscribe);
});

//## ExactTarget Webform
(function($){
	"use strict";
	var dbet;
	Drupal.behaviors.exact_target_webform = dbet = {
		attached: false,
		attach: function(context){
			require(["IGA.events", "ExactTarget", "ExactTarget.events", "IGA.webshim.storage"], function(events, ET, ETEvents){
	            $("form.exacttarget-webform", context).once("exact-target-webform", function(){
	                var $webform = $(this);
		            $webform.find("#edit-lists input.et-list").each(function(){
						ET.addList($(this), "webform", $webform);
		            });
	                if(IGA.user.uid){
	                    dbet.setUser($webform, IGA.user, {});
	                }
	                events.on("login", function(user, data){
	                   dbet.setUser($webform, user || {}, data ? data.ae_user : null);
	                });
	            });
				if(!dbet.attached){
					//### listen for subscriptions on the form
					$(document).on("subscribe", function(e, list){
						IGA.conversionPt = "webform-"+ list.nid;
						ETEvents.trigger("subscribe", [list]);
					}).on("unsubscribe", function(e, list){
						IGA.conversionPt = "webform-" + list.nid;
						ETEvents.trigger("unsubscribe", [list]);
					});
					dbet.attached = true;
				}
			});
		},
		setUser: function($webform, user, ae_user){
			var $email = $webform.find("input.email"),
				$dob = $webform.find("input[autocomplete='bday']");
			//todo $zip = $webform.find("input[autocomplete='postal-code']")
			if($email.length > 0){
				if(user){
					$email.val(user.mail);
				}
			}
			if($dob.length > 0){
				if(user){
					if(user.field_birthday){
						var dob = user.field_birthday.split(' ');
						if(dob.length > 0){
							$dob.val(dob[0]);
						}
					}
				}
			}
		}
	};
})(jQuery);

;
/**
 * @file Standard Bolero analytics events
 */
//# Bolero Analytics
define("bolero.analytics", ["jquery", "underscore", "googleanalytics"], function($, _, ga){
    "use strict";
	var Analytics = {
		start: Date.now(),
		initialized: false,
		$nodes: [],
		label: function($el){
			if($el.is(".node")){
				var title = $el.attr("data-nid"),
					nid = $el.attr("data-title"),
					view_mode = $el.attr("data-view-mode");
				return title + " ("+nid+")" + (view_mode ? (" ["+view_mode+"]"):"");
			}else if($el[0] && $el[0].id){
				return $el[0].id;
			}else{
				return null;
			}
		},
		trackImpressions: function(){
			require(["jquery/plugins/jquery.viewport.min"], function(){
				var viewed = [];
				_.each(Analytics.$nodes, function($node, index){
					if($.inviewport($node, { threshold: -100 })){//TODO threshold depending on node dimensions
						$node.trigger("impression");
						viewed.push($node);
					}
				});
				Analytics.$nodes = _.difference(Analytics.$nodes, viewed);
			});
		},
		attach: function(context){
			$(".node:not(.l-region--banner.bolero-banner--slick .node, .view-bolero-slick .node)", context).once("bolero-analytics", function(){
				var $node = $(this),
					url = $node.attr("data-alias");
				//Track node clickthru
				$node.find("a[href='"+url+"']").on("click", function(e){
					ga("send", "event", "Interaction", "click", Analytics.label($node));
				});
				//Node impression tracking
				if(!$node.is(".node--full")){
					//pageviews aren't impressions
					Analytics.$nodes.push($node);
					$node.one("impression", function(){
						//track when the node was viewed
						ga("send", "event", "Interaction", "impression", Analytics.label($node), Date.now() - Analytics.start, {nonInteraction: 1});
					});
				}
			});

			if(Analytics.initialized=== false){
				$(window).on("scroll", _.debounce( Analytics.trackImpressions, 250));
			}
			Analytics.trackImpressions();

			//## Commerce add to cart
			//TODO change to IGA.events.on("add to cart", ...);
			//## Node click tracking
			//note: slick carousel tracking is separate in slickAnalytics
			$("form.commerce-add-to-cart .form-submit").once(function(){
				var $this = $(this);
				$this.on("click", function(){
					var $node = $this.closest(".node--product, .node--product-bundle-display");
					IGA.conversionPt = "add to cart";
					ga("send", "event", "Commerce", "add to cart", Analytics.label($node));
				});
			});
			Analytics.intialized = true;
		}
	};

	return Analytics;
});

(function($, Drupal) {
    "use strict";
    Drupal.behaviors.boleroAnalytics = {
        attach: function(context, settings){
			require(["bolero.analytics"], function(Analytics){
				Analytics.attach(context);
			});
        }
    };
})(jQuery, Drupal);
;
/**
 * @file bolero.global.js
 * @author Malcolm Poindexter <malcolm.poindexter@umusic.com>
 */
// # Bolero Global
(function($, Drupal) {
	"use strict";
    Drupal.behaviors.bolero = {
        attach: function(context, settings){

        }
    };

	require(["underscore"], function(_){
		if(typeof Foundation !== "undefined"){
			//# Initialize Zurb Foundation
			$(document).foundation();
		}
	});

    //Hack around fixed header
    if($(document).height() - $(window).height() <= 40){
        $("#page").css("padding-bottom", "+=150");
    }

    //## Global Bolero functions
    IGA.bolero = IGA.bolero || {};

    IGA.bolero.picturefillMediaThumb = function($picture){
        //Get the picture for this lightbox item
        var pf = picturefill._,
            $pictureCopy = $picture.clone(),
            $imgCopy = $pictureCopy.children("img");
        //Remove the thumbnail source.
        $pictureCopy.children('source').each(function(index){
            if(index < 2){ $(this).remove(); }
        });
        //Find the best image url using the Picturefill API
        var firstMatch = pf.getMatch($imgCopy[0], $pictureCopy[0]);
        if(!firstMatch){ return; }
        var candidates = pf.processSourceSet( firstMatch ),
            bestCandidate = candidates[0];
        for ( var i = 0; i < candidates.length; i++ ) {
            if ( candidates[i].resolution >= pf.getDpr() ) {
                bestCandidate = candidates[i];
                break;
            }
        }

        //! Hack to get picturefill and clearing lightbox to play nice together.
        //Set an href on a picture(?) because clearing only checks the parent container.
        $picture.attr("href", bestCandidate.url);
        return bestCandidate.url;
    };

    //## Main menu sub-menu hover
    $(function(){
        var _blurs = [],
            $menu_links = $(".l-navigation .menu-name-main-menu > .links li.expanded");

        $menu_links.each(function(){
            var $menu_item = $(this),
                $submenu = $menu_item.children("ul").first(),
                _delay = null,
                _opacity = '',
                _bg_color = '';

            function _focus(){
                clearTimeout(_delay);
                _opacity = $submenu.css("opacity");
                _bg_color = $submenu.css("background-color");
                $submenu.css({ display: "block", opacity: _opacity, backgroundColor: _bg_color });
            }

            function _blur(){
                $submenu.css({ display:"", opacity:"", backgroundColor:"" });
                $submenu.css({ display:"", opacity:"", backgroundColor:"" });
            }

            $menu_links.not($menu_item).on("mouseenter touchstart", _blur);

            $menu_item.on("mouseenter touchstart", _focus);

            $menu_item.on("mouseleave", function(){
                _delay = setTimeout(_blur, 400);
            });
        });
    });

	// Detect touch
	if("ontouchstart" in window){
		document.documentElement.className = document.documentElement.className + " touch";
	}

	if(Drupal.settings.personalize){
		// ## Acquia Lift Decision Integration
		// @see http://cgit.drupalcode.org/personalize_ga/tree/js/personalize_ga.js
		$(document).on('personalizeDecision', function(event, $option_set, chosen_option, osid) {
			require(["IGA.events"], function(events){
				events.trigger("personalize.personalizeDecision", [event, $option_set, chosen_option, osid]);
			});
		});
	}
})(jQuery, Drupal);

// TODO move to bolero.snackbar
define("IGA.bolero.Snackbar", ["jquery", "underscore", "IGA.utils", "jquery/mobile/jquery.mobile.events"], function($, _){
	"use strict";
    var $snackbar = $("#snackbar"),
        snackTemplate = _.template('<div class="item"><div class="item-wrapper {{type}} {{actionClass}}"><span class="message">{{message}}</span><a href="#" class="action {{actionName}}">{{action}}</a></div></div>');
    var Snackbar = {
        delay:{ add: 10000, remove: 800 },
        add: function(message, action, actionCallback, options){
	        options = options || {};
            var solo = options.solo || false,
	            remove = typeof options.remove === "undefined" ? true : options.remove,
	            type = options.type || '',
	            actionName = action;
            if (solo) {
	            // One message at a time.
	            Snackbar.remove();
            }
	        if(action === true){
		        action = '<i class="icon icon-close fa-times"></i>';
		        actionName = "close";
	        }
	        if(action){
		        actionName = "action-" + actionName.replace(" ", "-");
	        }
	        if(type === "error"){
		        remove = false;
	        }

            var $item = $(snackTemplate({message: message, type: type, action:action, actionClass: !action ? '': 'has-action', actionName: actionName}));
            $item.find("a.action" ).on("click", function(e){
                if(actionCallback){ actionCallback(); }
	            $item.addClass("close-left");
                Snackbar.remove($item);
            });
            $snackbar.append($item);
            $item.addClass("open");
            $item.on("swipeleft", function(){ $item.addClass("close-left"); Snackbar.remove($item); });
	        $item.on("swiperight", function(){ $item.addClass("close-right"); Snackbar.remove($item); });
	        //todo draggable
	        if(remove){
		        $item.on("mouseenter", function(){ Snackbar.pause($item); });
		        Snackbar.delayRemove($item);
	        }
	        return Snackbar;
        },
        remove: function($item){
            $item = $item || $snackbar.children(".item").first();
	        if($item){
		        $item.removeClass("open").addClass("close close-left");
		        var timer = $item.data("snackbar-timer");
		        if(timer){ clearTimeout(timer); }
		        setTimeout(function(){
			        $item.remove();
		        }, Snackbar.delay.remove);
	        }
            return Snackbar;
        },
	    _remove: function($item){
		    return function(){ Snackbar.remove($item); };
	    },
	    pause: function($item){
			var timer = $item.data("snackbar-timer");
		    if(timer){ clearTimeout(timer); }
		    $item.on("mouseleave", function(){ Snackbar.delayRemove($item); });
		    return Snackbar;
	    },
	    delayRemove: function($item){
		    $item = $item || $snackbar.children(".item").first();
		    if($item){
			    var numItems = $snackbar.children().length;
			    var timer = setTimeout(Snackbar._remove($item), Snackbar.delay.add * numItems);
			    $item.data("snackbar-timer", timer);
		    }
		    return Snackbar;
	    }
    };
    return Snackbar;
});

// TODO move to bolero.modallink
//## Setup Foundation Reveal Modals
define("IGA.bolero.ModalLink", ["jquery", "underscore", "IGA", "IGA.utils"], function($, _, IGA, utils){
    "use strict";
    var ModalLink = {
	    iframeTemplate: _.template('<iframe src="{{src}}" width="{{width}}" height="{{height}}" frameborder="0" style="margin:0 auto;display:block;" ></iframe>'),
        init: function($this){
            //Get the element's properties
            var type = $this.attr('data-type'),
                targetId = $this.attr('data-target'),
                $target = $(targetId),
                _preload = $this.attr('data-preload'),
                preload = _preload === "true",
                $preload = null;

            if($target.length === 0){
                $target = $("#bolero-modal");
                if($target.length === 0){
                    $target = $('<div id="bolero-modal" class="reveal-modal" style="display:none;" data-reveal ><div></div><a class="close-reveal-modal">&#215;</a></div>');
                    $(document.body).append($target);
                }
            }
            if(preload){
                $preload = $("#bolero-preload");
                if($preload.length === 0){
                    $preload = $('<div id="bolero-preload" style="display:none" ></div>');
                    $(document.body).append($preload);
                }
            }

            var _load = function(){},
                modal = "",
                w = $this.attr("data-width") || "",
                h = $this.attr("data-height") || "";

            switch(type){
                case "iframe":
                    //Create an iframe for the modal
                    var url = $this.prop("href") || $this.attr("data-src");
                    modal = ModalLink.iframeTemplate({ width: w, height: h, src: url }) ;

                    if(preload){
                        $preload.append(modal);
                    }
                    break;
                default:

                    break;
            }

            _load = function(){
                var oldClass = $target.data("oldClass"),
                    newClass = $this.attr("data-class");
                if(oldClass){ $target.removeClass(oldClass); }
                if(newClass){ $target.addClass(newClass); $target.data("oldClass", newClass); }
                $target.children(":first-child").empty().append(modal);
                //$target.css({ "width": w, "height":h });
            };

            $this.on("click", function(e){
                if($target.length > 0){
                    e.preventDefault();
                    require(["foundation.reveal"], function(){
                        if(type === "iframe"){ _load(); }
                        $target.foundation('reveal', 'open');
                    });
                }
            });
        }
    };
    IGA.bolero.ModalLink = ModalLink;
    return ModalLink;
});

//## Add Bolero Reveal Modal to links
require(["jquery"], function($){
    "use strict";
    $(function(){
        var $window = $(window);
        //On Document Ready
        $(".bolero-modal-link").each(function(){
            //load any modal links via require
            var $link = $(this);
            require(["IGA.bolero.ModalLink"], function(ModalLink){
                ModalLink.init($link);
            });
        });

        //Setup the footer links as reveal modals
        $(".l-region--footer a.legal-toc, .l-region--footer a.legal-privacy").each(function(){
            var $link = $(this);
            $link.attr({
                "data-type": "iframe",
                "data-height": $window.height()*0.8
            });
            require(["IGA.bolero.ModalLink"], function(ModalLink){
                ModalLink.init($link);
            });
        });

	    // $("a.embedly-card", context) require(["//cdn.embedly.com/widgets/platform.js"]);
    });

});
;
/**
 * AE Social Login Drupal Behaviors
 */
(function($) {
	"use strict";
	var dbae = Drupal.behaviors.ae_social_login = {
		$block: $("#block-ae-social-login-ae-social-login"),
		isReady: false,
		remoteOnly: false,
		ready: function(aeJS){
			if(dbae.$block.length){
				if(Drupal.settings.ae_social_login.override_login !== true){
					aeJS.events.onLogin.addHandler(dbae.login);
				}
				if(Drupal.settings.ae_social_login.override_logout !== true){
					aeJS.events.onLogout.addHandler(dbae.logout);
				}
			}
			// Make sure aeJS exists in the global scope.
			window.aeJS = window.aeJS || aeJS;
			dbae.isReady = true;
			dbae.attach(document, Drupal.settings.ae_social_login);
		},
		attach: function(context, settings){
			if(!dbae.isReady){ return; }
			var $context = $(context);
			if(context !== document){
				// Attach to any forms loaded outside of the document ex. via ajax
				$context.once("ae_social_login", function(){
					// setup all AE register / login forms
					if($context.is("form[data-ae-register-form]")){
						dbae.attachForm($context, settings);
					}else{
						// We want to call aeJS.trigger.attach on a form, not a container, otherwise all forms will get re-attached.
						$context.find("form[data-ae-register-form]").each(function(){
							dbae.attachForm($(this), settings, true);
						});
					}
				});
			}else{
				$context.find("form[data-ae-register-form]").each(function(){
					dbae.attachForm($(this), settings, false);
				});
			}

			dbae.attachRemoteLinks(context);

			// Add an AE logout to all Drupal logout links
			$('a[href="/user/logout"]', context).bind('click', function(e) {
				if(aeJS){ aeJS.trigger.logout(); }
			});
		},
		attachForm: function($form, settings, attach){
			var form_id = $form.find("input[name=form_id]").val(),
				submitting = false;
			function submit(ae_user, type){
				//### After the AE login
				if(!submitting){ return; }
				if(type === "init"){ return; }
				var $ae_user = $form.find("input[name=ae_user]");
				// update the form with the ae user
				$ae_user.val(JSON.stringify(ae_user));
				$form[0].action = location.pathname + location.search;
				dbae.updateForm($form);
				// and submit.
				$form.unbind('submit');
				$form.submit();
				submitting = false;
			}

			function error(err){
				// Display AE login error messages
				if(!submitting){ return; }
				$(".messages").first().addClass("messages--error").html(err.message).show();
			}

			if($.inArray(form_id.replace(/_/g,"-"), settings.forms) > -1){// settings.forms.indexOf()
				var $formSubmit = $form.find(".form-submit");
				if(attach){
					aeJS.trigger.attach($form[0]);
				}
				$formSubmit.on("mousedown", function(e){
					// When the user submits the form copy field values to their ae fields
					dbae.map_ae_fields($form);
				});
				// or opens any form-related AE links
				$form.find("a[data-ae-register-link]").on("click", function(){
					submitting = true;
				});
				$form.on("submit", function(){ submitting = true; });

				if(aeJS.user.data){
					aeJS.events.onUser.addHandler(submit);
				}else{
					aeJS.events.onLogin.addHandler(submit);
				}
				aeJS.events.onFlow.addHandler(function(e){
					if(e.step === "error"){ error(e.error); }
				});
			}
		},
		attachRemoteLinks: function(context){
			$("a[data-ae-register-link][data-remote-only]", context).each(function(){
				// Handle remote registration only links
				var $link = $(this);
				$link.on("click", function(){
					function nextWindow(state){
						dbae.remoteOnly = false;
						aeJS.events.onWindow.removeHandler(nextWindow);
						aeJS.events.onLogin.removeHandler(nextLogin);
					}
					function nextLogin(user, type){
						setTimeout(function(){
							dbae.remoteOnly = false;
							aeJS.events.onWindow.removeHandler(nextWindow);
							aeJS.events.onLogin.removeHandler(nextLogin);
						}, 0);
					}
					dbae.remoteOnly = true;
					aeJS.events.onWindow.addHandler(nextWindow);
					aeJS.events.onLogin.addHandler(nextLogin);
				});
			});
		},
		//## AE Block login callback
		login: function(user){
			if(dbae.remoteOnly){ return; }
			if(user && user.data.AccessToken && $("body").hasClass("not-logged-in")){
				$.ajax({
					url: window.location.origin+"/api/ae_social_login/user",
					type: "POST",
					async: true,
					data: {user: user},
					beforeSend: function(){
						$(".ae_bar_loader").hide();
						$(".ae_social_login_services").prepend("<div class='ae_bar_loader'></div>");
					},
					success: function(response) {
						var user = response.match(/\"uid\"/g) ? JSON.parse(response) : null;
						if(user && user.uid){ //check that valid user object is returned
							//TODO fire an event before reload
							window.location.reload();
						} else {
							//TODO fire an error
							$(".ae_bar_loader").replaceWith('<p>There was an error signing in</p>');
						}
					}
				});
			}
		},
		logout: function(){
			window.location.href= "/user/logout";
		},
		map_ae_fields: function($form){
			dbae.remove_ae_field_mappings($form);
			// Note bind = true only works for manual user input, to cover autocomplete, call map fields just before AE submission.
			if(!Drupal.settings.ae_social_login.form_field_mapping){ return; }
			var form_id = $form.find("input[name=form_id]").val();
			$.each(Drupal.settings.ae_social_login.form_field_mapping, function(drupal_field_path, ae_field){
				var dFieldPath = drupal_field_path.split('.');
				// If this mapping is for this form
				if(dFieldPath.length < 2 || dFieldPath[0] !== form_id ){ return; }
				var field_name = dFieldPath[1];
				// If the Drupal field exists on the form,
				var $drupal_field = $form.find('input[name="'+field_name+'"], .form-item-'+field_name).last(),
					$ae_field = $form.find('input[name="'+ae_field+'"]'), ae_val;
				//Note
				if($drupal_field.length > 0 && $drupal_field.is("input") && $ae_field.length === 0){
					// and the AE field doesn't exist,
					ae_val = $drupal_field.val();
					if(!!ae_val){
						// and the field has a value.
						$ae_field = $("<input class='ae-field-mapping-field' name='"+ae_field+"' type='hidden' value='"+ae_val+"' />");
						$form.append($ae_field);
					}
				}else if(ae_field === "birthdate" && $ae_field.length === 0){
					// Handle drupal date select fields
					var $day = $drupal_field.find("select.day, input.day, select[name$=\"[day]\"]"),
						$month = $drupal_field.find("select.month, input.month, select[name$=\"[month]\"]"),
						$year = $drupal_field.find("select.year, input.year, select[name$=\"[year]\"]"),
						day = $day.val(),
						month = $month.val(),
						year = $year.val(),
						ae_birthdate = null,
						today = new Date().toISOString().split("T")[0];
					if(month){ month = ("00" + month).slice(-2); }
					if(day){ day = ("00" + day).slice(-2); }
					if(year && month && day){ ae_birthdate = year + '-' + month + '-' + day; }
					if(ae_birthdate && ae_birthdate !== today){
						// Add the birthdate if it has been set / changed.
						$ae_field = $("<input class='ae-field-mapping-field' name='"+ae_field+"' type='hidden' value='"+ae_birthdate+"' />");
						$form.append($ae_field);
					}
				}
			});
			return this;
		},
		remove_ae_field_mappings: function($form){
			$form.find("input.ae-field-mapping-field").remove();
			return this;
		},
		updateForm: function($form){
			dbae.remove_ae_field_mappings($form);
			// Update form fields with values from the AE user
			var form_id = $form.find("input[name=form_id]").val();
			if( !aeJS.user || !aeJS.user.data ){ return; }
			$.each(Drupal.settings.ae_social_login.form_field_mapping, function(drupal_field_path, ae_field){
				var dFieldPath = drupal_field_path.split('.');
				// If this mapping is for this form
				if(dFieldPath.length < 2 || dFieldPath[0] !== form_id ){ return; }
				var field_name = dFieldPath[1];
				for(var dataField in aeJS.user.data){
					if(dataField.toLowerCase() === ae_field){
						var $drupal_field = $form.find('input[name="'+field_name+'"], .form-item-'+field_name).last();
						if($drupal_field.length > 0 && $drupal_field.is("input")){
							$drupal_field.val(aeJS.user.data[dataField]);
						}else if(ae_field === "birthdate"){
							var $day = $drupal_field.find("select.day, input.day, select[name$=\"[day]\"]"),
								$month = $drupal_field.find("select.month, input.month, select[name$=\"[month]\"]"),
								$year = $drupal_field.find("select.year, input.year, select[name$=\"[year]\"]"),
								dob = aeJS.user.data.BirthDate.split('-');
							if(dob.length === 3){
								$day.val(parseInt(dob[2]));
								$month.val(parseInt(dob[1]));
								$year.val(dob[0]).trigger("change");
							}
						}
					}
				}
			});
		}
	};
})(jQuery);
;
