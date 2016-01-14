
/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;
(function ($) {

/**
 * Retrieves the summary for the first element.
 */
$.fn.drupalGetSummary = function () {
  var callback = this.data('summaryCallback');
  return (this[0] && callback) ? $.trim(callback(this[0])) : '';
};

/**
 * Sets the summary for all matched elements.
 *
 * @param callback
 *   Either a function that will be called each time the summary is
 *   retrieved or a string (which is returned each time).
 */
$.fn.drupalSetSummary = function (callback) {
  var self = this;

  // To facilitate things, the callback should always be a function. If it's
  // not, we wrap it into an anonymous function which just returns the value.
  if (typeof callback != 'function') {
    var val = callback;
    callback = function () { return val; };
  }

  return this
    .data('summaryCallback', callback)
    // To prevent duplicate events, the handlers are first removed and then
    // (re-)added.
    .unbind('formUpdated.summary')
    .bind('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    })
    // The actual summaryUpdated handler doesn't fire when the callback is
    // changed, so we have to do this manually.
    .trigger('summaryUpdated');
};

/**
 * Sends a 'formUpdated' event each time a form element is modified.
 */
Drupal.behaviors.formUpdated = {
  attach: function (context) {
    // These events are namespaced so that we can remove them later.
    var events = 'change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';
    $(context)
      // Since context could be an input element itself, it's added back to
      // the jQuery object and filtered again.
      .find(':input').andSelf().filter(':input')
      // To prevent duplicate events, the handlers are first removed and then
      // (re-)added.
      .unbind(events).bind(events, function () {
        $(this).trigger('formUpdated');
      });
  }
};

/**
 * Prepopulate form fields with information from the visitor cookie.
 */
Drupal.behaviors.fillUserInfoFromCookie = {
  attach: function (context, settings) {
    $('form.user-info-from-cookie').once('user-info-from-cookie', function () {
      var formContext = this;
      $.each(['name', 'mail', 'homepage'], function () {
        var $element = $('[name=' + this + ']', formContext);
        var cookie = $.cookie('Drupal.visitor.' + this);
        if ($element.length && cookie) {
          $element.val(cookie);
        }
      });
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * Provides Ajax page updating via jQuery $.ajax (Asynchronous JavaScript and XML).
 *
 * Ajax is a method of making a request via JavaScript while viewing an HTML
 * page. The request returns an array of commands encoded in JSON, which is
 * then executed to make any changes that are necessary to the page.
 *
 * Drupal uses this file to enhance form elements with #ajax['path'] and
 * #ajax['wrapper'] properties. If set, this file will automatically be included
 * to provide Ajax capabilities.
 */

Drupal.ajax = Drupal.ajax || {};

/**
 * Attaches the Ajax behavior to each Ajax form element.
 */
Drupal.behaviors.AJAX = {
  attach: function (context, settings) {
    // Load all Ajax behaviors specified in the settings.
    for (var base in settings.ajax) {
      if (!$('#' + base + '.ajax-processed').length) {
        var element_settings = settings.ajax[base];

        if (typeof element_settings.selector == 'undefined') {
          element_settings.selector = '#' + base;
        }
        $(element_settings.selector).each(function () {
          element_settings.element = this;
          Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        });

        $('#' + base).addClass('ajax-processed');
      }
    }

    // Bind Ajax behaviors to all items showing the class.
    $('.use-ajax:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};
      // Clicked links look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      // For anchor tags, these will go to the target of the anchor rather
      // than the usual location.
      if ($(this).attr('href')) {
        element_settings.url = $(this).attr('href');
        element_settings.event = 'click';
      }
      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });

    // This class means to submit the form to the action using Ajax.
    $('.use-ajax-submit:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};

      // Ajax submits specified in this manner automatically submit to the
      // normal form action.
      element_settings.url = $(this.form).attr('action');
      // Form submit button clicks need to tell the form what was clicked so
      // it gets passed in the POST request.
      element_settings.setClick = true;
      // Form buttons use the 'click' event rather than mousedown.
      element_settings.event = 'click';
      // Clicked form buttons look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });
  }
};

/**
 * Ajax object.
 *
 * All Ajax objects on a page are accessible through the global Drupal.ajax
 * object and are keyed by the submit button's ID. You can access them from
 * your module's JavaScript file to override properties or functions.
 *
 * For example, if your Ajax enabled button has the ID 'edit-submit', you can
 * redefine the function that is called to insert the new content like this
 * (inside a Drupal.behaviors attach block):
 * @code
 *    Drupal.behaviors.myCustomAJAXStuff = {
 *      attach: function (context, settings) {
 *        Drupal.ajax['edit-submit'].commands.insert = function (ajax, response, status) {
 *          new_content = $(response.data);
 *          $('#my-wrapper').append(new_content);
 *          alert('New content was appended to #my-wrapper');
 *        }
 *      }
 *    };
 * @endcode
 */
Drupal.ajax = function (base, element, element_settings) {
  var defaults = {
    url: 'system/ajax',
    event: 'mousedown',
    keypress: true,
    selector: '#' + base,
    effect: 'none',
    speed: 'none',
    method: 'replaceWith',
    progress: {
      type: 'throbber',
      message: Drupal.t('Please wait...')
    },
    submit: {
      'js': true
    }
  };

  $.extend(this, defaults, element_settings);

  this.element = element;
  this.element_settings = element_settings;

  // Replacing 'nojs' with 'ajax' in the URL allows for an easy method to let
  // the server detect when it needs to degrade gracefully.
  // There are five scenarios to check for:
  // 1. /nojs/
  // 2. /nojs$ - The end of a URL string.
  // 3. /nojs? - Followed by a query (with clean URLs enabled).
  //      E.g.: path/nojs?destination=foobar
  // 4. /nojs& - Followed by a query (without clean URLs enabled).
  //      E.g.: ?q=path/nojs&destination=foobar
  // 5. /nojs# - Followed by a fragment.
  //      E.g.: path/nojs#myfragment
  this.url = element_settings.url.replace(/\/nojs(\/|$|\?|&|#)/g, '/ajax$1');
  this.wrapper = '#' + element_settings.wrapper;

  // If there isn't a form, jQuery.ajax() will be used instead, allowing us to
  // bind Ajax to links as well.
  if (this.element.form) {
    this.form = $(this.element.form);
  }

  // Set the options for the ajaxSubmit function.
  // The 'this' variable will not persist inside of the options object.
  var ajax = this;
  ajax.options = {
    url: ajax.url,
    data: ajax.submit,
    beforeSerialize: function (element_settings, options) {
      return ajax.beforeSerialize(element_settings, options);
    },
    beforeSubmit: function (form_values, element_settings, options) {
      ajax.ajaxing = true;
      return ajax.beforeSubmit(form_values, element_settings, options);
    },
    beforeSend: function (xmlhttprequest, options) {
      ajax.ajaxing = true;
      return ajax.beforeSend(xmlhttprequest, options);
    },
    success: function (response, status) {
      // Sanity check for browser support (object expected).
      // When using iFrame uploads, responses must be returned as a string.
      if (typeof response == 'string') {
        response = $.parseJSON(response);
      }
      return ajax.success(response, status);
    },
    complete: function (response, status) {
      ajax.ajaxing = false;
      if (status == 'error' || status == 'parsererror') {
        return ajax.error(response, ajax.url);
      }
    },
    dataType: 'json',
    type: 'POST'
  };

  // Bind the ajaxSubmit function to the element event.
  $(ajax.element).bind(element_settings.event, function (event) {
    return ajax.eventResponse(this, event);
  });

  // If necessary, enable keyboard submission so that Ajax behaviors
  // can be triggered through keyboard input as well as e.g. a mousedown
  // action.
  if (element_settings.keypress) {
    $(ajax.element).keypress(function (event) {
      return ajax.keypressResponse(this, event);
    });
  }

  // If necessary, prevent the browser default action of an additional event.
  // For example, prevent the browser default action of a click, even if the
  // AJAX behavior binds to mousedown.
  if (element_settings.prevent) {
    $(ajax.element).bind(element_settings.prevent, false);
  }
};

/**
 * Handle a key press.
 *
 * The Ajax object will, if instructed, bind to a key press response. This
 * will test to see if the key press is valid to trigger this event and
 * if it is, trigger it for us and prevent other keypresses from triggering.
 * In this case we're handling RETURN and SPACEBAR keypresses (event codes 13
 * and 32. RETURN is often used to submit a form when in a textfield, and 
 * SPACE is often used to activate an element without submitting. 
 */
Drupal.ajax.prototype.keypressResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Detect enter key and space bar and allow the standard response for them,
  // except for form elements of type 'text' and 'textarea', where the 
  // spacebar activation causes inappropriate activation if #ajax['keypress'] is 
  // TRUE. On a text-type widget a space should always be a space.
  if (event.which == 13 || (event.which == 32 && element.type != 'text' && element.type != 'textarea')) {
    $(ajax.element_settings.element).trigger(ajax.element_settings.event);
    return false;
  }
};

/**
 * Handle an event that triggers an Ajax response.
 *
 * When an event that triggers an Ajax response happens, this method will
 * perform the actual Ajax call. It is bound to the event using
 * bind() in the constructor, and it uses the options specified on the
 * ajax object.
 */
Drupal.ajax.prototype.eventResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Do not perform another ajax command if one is already in progress.
  if (ajax.ajaxing) {
    return false;
  }

  try {
    if (ajax.form) {
      // If setClick is set, we must set this to ensure that the button's
      // value is passed.
      if (ajax.setClick) {
        // Mark the clicked button. 'form.clk' is a special variable for
        // ajaxSubmit that tells the system which element got clicked to
        // trigger the submit. Without it there would be no 'op' or
        // equivalent.
        element.form.clk = element;
      }

      ajax.form.ajaxSubmit(ajax.options);
    }
    else {
      ajax.beforeSerialize(ajax.element, ajax.options);
      $.ajax(ajax.options);
    }
  }
  catch (e) {
    // Unset the ajax.ajaxing flag here because it won't be unset during
    // the complete response.
    ajax.ajaxing = false;
    alert("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
  }

  // For radio/checkbox, allow the default event. On IE, this means letting
  // it actually check the box.
  if (typeof element.type != 'undefined' && (element.type == 'checkbox' || element.type == 'radio')) {
    return true;
  }
  else {
    return false;
  }

};

/**
 * Handler for the form serialization.
 *
 * Runs before the beforeSend() handler (see below), and unlike that one, runs
 * before field data is collected.
 */
Drupal.ajax.prototype.beforeSerialize = function (element, options) {
  // Allow detaching behaviors to update field values before collecting them.
  // This is only needed when field values are added to the POST data, so only
  // when there is a form such that this.form.ajaxSubmit() is used instead of
  // $.ajax(). When there is no form and $.ajax() is used, beforeSerialize()
  // isn't called, but don't rely on that: explicitly check this.form.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.detachBehaviors(this.form, settings, 'serialize');
  }

  // Prevent duplicate HTML ids in the returned markup.
  // @see drupal_html_id()
  options.data['ajax_html_ids[]'] = [];
  $('[id]').each(function () {
    options.data['ajax_html_ids[]'].push(this.id);
  });

  // Allow Drupal to return new JavaScript and CSS files to load without
  // returning the ones already loaded.
  // @see ajax_base_page_theme()
  // @see drupal_get_css()
  // @see drupal_get_js()
  options.data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
  options.data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;
  for (var key in Drupal.settings.ajaxPageState.css) {
    options.data['ajax_page_state[css][' + key + ']'] = 1;
  }
  for (var key in Drupal.settings.ajaxPageState.js) {
    options.data['ajax_page_state[js][' + key + ']'] = 1;
  }
};

/**
 * Modify form values prior to form submission.
 */
Drupal.ajax.prototype.beforeSubmit = function (form_values, element, options) {
  // This function is left empty to make it simple to override for modules
  // that wish to add functionality here.
};

/**
 * Prepare the Ajax request before it is sent.
 */
Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
  // For forms without file inputs, the jQuery Form plugin serializes the form
  // values, and then calls jQuery's $.ajax() function, which invokes this
  // handler. In this circumstance, options.extraData is never used. For forms
  // with file inputs, the jQuery Form plugin uses the browser's normal form
  // submission mechanism, but captures the response in a hidden IFRAME. In this
  // circumstance, it calls this handler first, and then appends hidden fields
  // to the form to submit the values in options.extraData. There is no simple
  // way to know which submission mechanism will be used, so we add to extraData
  // regardless, and allow it to be ignored in the former case.
  if (this.form) {
    options.extraData = options.extraData || {};

    // Let the server know when the IFRAME submission mechanism is used. The
    // server can use this information to wrap the JSON response in a TEXTAREA,
    // as per http://jquery.malsup.com/form/#file-upload.
    options.extraData.ajax_iframe_upload = '1';

    // The triggering element is about to be disabled (see below), but if it
    // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
    // value is included in the submission. As per above, submissions that use
    // $.ajax() are already serialized prior to the element being disabled, so
    // this is only needed for IFRAME submissions.
    var v = $.fieldValue(this.element);
    if (v !== null) {
      options.extraData[this.element.name] = Drupal.checkPlain(v);
    }
  }

  // Disable the element that received the change to prevent user interface
  // interaction while the Ajax request is in progress. ajax.ajaxing prevents
  // the element from triggering a new request, but does not prevent the user
  // from changing its value.
  $(this.element).addClass('progress-disabled').attr('disabled', true);

  // Insert progressbar or throbber.
  if (this.progress.type == 'bar') {
    var progressBar = new Drupal.progressBar('ajax-progress-' + this.element.id, eval(this.progress.update_callback), this.progress.method, eval(this.progress.error_callback));
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  }
  else if (this.progress.type == 'throbber') {
    this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
    if (this.progress.message) {
      $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
    }
    $(this.element).after(this.progress.element);
  }
};

/**
 * Handler for the form redirection completion.
 */
Drupal.ajax.prototype.success = function (response, status) {
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');

  Drupal.freezeHeight();

  for (var i in response) {
    if (response.hasOwnProperty(i) && response[i]['command'] && this.commands[response[i]['command']]) {
      this.commands[response[i]['command']](this, response[i], status);
    }
  }

  // Reattach behaviors, if they were detached in beforeSerialize(). The
  // attachBehaviors() called on the new content from processing the response
  // commands is not sufficient, because behaviors from the entire form need
  // to be reattached.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }

  Drupal.unfreezeHeight();

  // Remove any response-specific settings so they don't get used on the next
  // call by mistake.
  this.settings = null;
};

/**
 * Build an effect object which tells us how to apply the effect when adding new HTML.
 */
Drupal.ajax.prototype.getEffect = function (response) {
  var type = response.effect || this.effect;
  var speed = response.speed || this.speed;

  var effect = {};
  if (type == 'none') {
    effect.showEffect = 'show';
    effect.hideEffect = 'hide';
    effect.showSpeed = '';
  }
  else if (type == 'fade') {
    effect.showEffect = 'fadeIn';
    effect.hideEffect = 'fadeOut';
    effect.showSpeed = speed;
  }
  else {
    effect.showEffect = type + 'Toggle';
    effect.hideEffect = type + 'Toggle';
    effect.showSpeed = speed;
  }

  return effect;
};

/**
 * Handler for the form redirection error.
 */
Drupal.ajax.prototype.error = function (response, uri) {
  alert(Drupal.ajaxError(response, uri));
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  // Undo hide.
  $(this.wrapper).show();
  // Re-enable the element.
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');
  // Reattach behaviors, if they were detached in beforeSerialize().
  if (this.form) {
    var settings = response.settings || this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }
};

/**
 * Provide a series of commands that the server can request the client perform.
 */
Drupal.ajax.prototype.commands = {
  /**
   * Command to insert new content into the DOM.
   */
  insert: function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var effect = ajax.getEffect(response);

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
    switch (method) {
      case 'html':
      case 'replaceWith':
      case 'replaceAll':
      case 'empty':
      case 'remove':
        var settings = response.settings || ajax.settings || Drupal.settings;
        Drupal.detachBehaviors(wrapper, settings);
    }

    // Add the new content to the page.
    wrapper[method](new_content);

    // Immediately hide the new content if we're using any effects.
    if (effect.showEffect != 'show') {
      new_content.hide();
    }

    // Determine which effect to use and what content will receive the
    // effect, then show the new content.
    if ($('.ajax-new-content', new_content).length > 0) {
      $('.ajax-new-content', new_content).hide();
      new_content.show();
      $('.ajax-new-content', new_content)[effect.showEffect](effect.showSpeed);
    }
    else if (effect.showEffect != 'show') {
      new_content[effect.showEffect](effect.showSpeed);
    }

    // Attach all JavaScript behaviors to the new content, if it was successfully
    // added to the page, this if statement allows #ajax['wrapper'] to be
    // optional.
    if (new_content.parents('html').length > 0) {
      // Apply any settings from the returned JSON if available.
      var settings = response.settings || ajax.settings || Drupal.settings;
      Drupal.attachBehaviors(new_content, settings);
    }
  },

  /**
   * Command to remove a chunk from the page.
   */
  remove: function (ajax, response, status) {
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors($(response.selector), settings);
    $(response.selector).remove();
  },

  /**
   * Command to mark a chunk changed.
   */
  changed: function (ajax, response, status) {
    if (!$(response.selector).hasClass('ajax-changed')) {
      $(response.selector).addClass('ajax-changed');
      if (response.asterisk) {
        $(response.selector).find(response.asterisk).append(' <span class="ajax-changed">*</span> ');
      }
    }
  },

  /**
   * Command to provide an alert.
   */
  alert: function (ajax, response, status) {
    alert(response.text, response.title);
  },

  /**
   * Command to provide the jQuery css() function.
   */
  css: function (ajax, response, status) {
    $(response.selector).css(response.argument);
  },

  /**
   * Command to set the settings that will be used for other commands in this response.
   */
  settings: function (ajax, response, status) {
    if (response.merge) {
      $.extend(true, Drupal.settings, response.settings);
    }
    else {
      ajax.settings = response.settings;
    }
  },

  /**
   * Command to attach data using jQuery's data API.
   */
  data: function (ajax, response, status) {
    $(response.selector).data(response.name, response.value);
  },

  /**
   * Command to apply a jQuery method.
   */
  invoke: function (ajax, response, status) {
    var $element = $(response.selector);
    $element[response.method].apply($element, response.arguments);
  },

  /**
   * Command to restripe a table.
   */
  restripe: function (ajax, response, status) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr:visible, > tr:visible', $(response.selector))
      .removeClass('odd even')
      .filter(':even').addClass('odd').end()
      .filter(':odd').addClass('even');
  },

  /**
   * Command to add css.
   *
   * Uses the proprietary addImport method if available as browsers which
   * support that method ignore @import statements in dynamically added
   * stylesheets.
   */
  add_css: function (ajax, response, status) {
    // Add the styles in the normal way.
    $('head').prepend(response.data);
    // Add imports in the styles using the addImport method if available.
    var match, importMatch = /^@import url\("(.*)"\);$/igm;
    if (document.styleSheets[0].addImport && importMatch.test(response.data)) {
      importMatch.lastIndex = 0;
      while (match = importMatch.exec(response.data)) {
        document.styleSheets[0].addImport(match[1]);
      }
    }
  },

  /**
   * Command to update a form's build ID.
   */
  updateBuildId: function(ajax, response, status) {
    $('input[name="form_build_id"][value="' + response['old'] + '"]').val(response['new']);
  }
};

})(jQuery);
;
/**
 * @file Require AMD definitions used by Bolero
 */
//# Require.js AMD Module Definitions
//##Foundation
IGA.module_define("foundation", ["foundation/foundation.min"], function(){ return typeof Foundation !== "undefined"; });
IGA.module_define("foundation.accordion", ["foundation/foundation.accordion.min"], ["foundation"], function(){ return typeof Foundation !== "undefined" && Foundation.libs.accordion; });
IGA.module_define("foundation.clearing", ["foundation/foundation.clearing.min", "css!foundation/foundation.clearing.css"], ["foundation"],
    function(){ return typeof Foundation !== "undefined" && Foundation.libs.clearing; });
IGA.module_define("foundation.reveal", ["foundation/foundation.reveal.min"], ["foundation"], function(){ return typeof Foundation !== "undefined" && Foundation.libs.reveal; });
;
/**
 * @file Require AMD definitions used by Bolero Emcee
 */
//## Medium Editor
require.config({
	paths: {
		"load-image": "jquery/blueimp/load-image/load-image",
		"load-image-exif": "jquery/blueimp/load-image/load-image-exif",
		"load-image-meta": "jquery/blueimp/load-image/load-image-meta",
		"load-image-ios": "jquery/blueimp/load-image/load-image-ios",
		"canvas-to-blob": "jquery/blueimp/canvas-to-blob/canvas-to-blob",
		"handlebars": "handlebars/handlebars.min",
		"jquery.ui.widget": "jquery/ui/jquery-ui.widget"
	}
});

//TODO move from medium/ to /
define("medium-editor", ["medium/medium-editor/js/medium-editor.min",
	"css!medium/medium-editor/css/medium-editor.min.css",
	"css!medium/medium-editor/css/themes/bootstrap.min.css"],
	function(MediumEditor){ return MediumEditor; });

define("medium-editor-insert-plugin", ["jquery.ui.widget",
	"medium/medium-editor-insert-plugin/js/medium-editor-insert-plugin.min",
	"css!medium/medium-editor-insert-plugin/css/medium-editor-insert-plugin.min.css"],
	function(){ return MediumInsert; });;
/**
 * @file iga_common.js
 * @author Malcolm Poindexter <malcolm.poindexter@umusic.com>
 */
var IGA = IGA || {};
(function($, IGA){
	"use strict";
	//## IGA Login
	IGA.drupal = {
		login: function(){
			var path = window.location.pathname;
			if(path.charAt(0) === "/" && path.length > 1){
				path = path.substr(1);
			}
			window.location = "/user/login?destination="+path;
		}
	};

	IGA.login = function(){
		if(Drupal.settings.janrainCapture){
			require(["IGA.janrain"], function(){
				IGA.janrain.login.apply(this, arguments);
			});
		}else{
			IGA.drupal.login();
		}
	};
	IGA.logout = function(){
		require(["IGA.events"], function(events){
			events.trigger("logout");
			var dest = "";
			if(window.location.pathname.length > 1){
				dest = "?destination=" + encodeURIComponent(window.location.pathname.substr(1));
			}
			window.location.href= "/user/logout" + dest;
		});
	};

	//#Update body loggedIn css classes
	IGA.login.updateCss = function(state){
		if(state === "login"){
			$("body").removeClass("not-logged-in").addClass("logged-in");
		}else if(state === "logout"){
			$("body").removeClass("logged-in").addClass("not-logged-in");
		}
	};

	//#Check roles for authenticated Drupal user & refresh the page.
	IGA.login.updateUser = function(data){
		if(data.user){
			IGA.user = jQuery.extend(true, IGA.user, data.user);
			// and check if there are roles.
			if(data.user.roles){
				var roles = data.user.roles;
				for(var r in roles){
					if(["administrator", "site maintainer", "content editor", "content contributor"].indexOf(roles[r]) >= 0){
						//If the user has a role that needs Drupal administrative features then refresh the page to load the Drupal UI.
						IGA.location.reload();
						break;
					}
				}
			}
			if(data.access_token){
				IGA.user.access_token = window.access_token = data.access_token;
			}
			if(typeof aeJS !== "undefined" && aeJS.user){
				IGA.user.ae = aeJS.user;
			}
		}
	};

	IGA.location = {
		preventReload: {reload: false},
		reload: function(){
			require(["IGA.events"], function(events){
				function reload(prevent){
					if(!prevent.reload){ prevent.reload = false; location.reload(); return true;}
				}

				events.off("location.reload", reload);
				// EventEmitter uses a FILO queue, and we want to add the final listener.
				var listeners = events.getListeners("location.reload");
				listeners.splice(0,0, { listener: reload, once:false });
				events.trigger("location.reload", [IGA.location.preventReload]);
			});
		}
	};

	IGA.timingStart = IGA.timingStart || Date.now();

	Drupal.behaviors.iga_common = {
		attach: function(context, settings){
			$('a[href="/user/logout"]', context).on("click", function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				IGA.logout();
			});
		}
	};

	// jQuery deprecated polyfill
	try{
		var $version = parseFloat($.fn.jquery);
		if( $version === 1.7 ){
			$.parseHTML = function(html){
				return $("<span>"+html+"</span>").html();
			};
		}
	}catch(e){}

})(jQuery, IGA);

//## Google Analytics UA shim module
define("googleanalytics", [], function(){
	if(typeof ga !== "undefined"){ return ga; }else{ window.ga = function(){}; return window.ga; }
});
//## GTM shim
define("gtm", [], function(){
	if(typeof dataLayer !== "undefined"){ return dataLayer; }else{ return { push: function(){}}; }
});

//## IGA Common Analytics
define("IGA.analytics.common",[ "IGA.events", "googleanalytics", "gtm"], function(events, ga, dataLayer){
	"use strict";
	//Centrally track the last known conversion point
	IGA.conversionPt = IGA.conversionPt || "unknown";

	//### Login Analytics Tracking
	IGA.events.on("login", function(user, data){
		data = data || {};
		var ni = false;
		if(IGA.conversionPt === "SSO"){ ni = true; }
		ga("send", "event", "Conversion", "login", IGA.conversionPt, 1, ni);
		if(data.ae_user && data.ae_user.data){
			// Set the userId as the AE userID
			ga("set", "userId", data.ae_user.data.ID);
			// dimension1 = Drupal user, 2 = AE user
			ga("set", { "dimension1": user.uid,  "dimension2": data.ae_user.data.ID });
			dataLayer.push({ userID: user.uid, socialID: data.ae_user.data.ID });
		}
	});

	events.on("ae_ready", function(aeJS){
		ga('send', 'timing', 'Appreciation Engine', 'aeJSReady', Date.now() - IGA.timingStart, 'AE');
		aeJS.events.onLogin.addHandler(function(ae_user, type){
			if(type === "init" && !IGA.user.uid){
				// During an SSO login add ae_userdimension
				ga("set", { "dimension2": ae_user.data.ID });
			}
		});
	});

	//### Log JS errors in GA
	window.onerror = function iga_error(message, url, line) {
		if(typeof message !== "string" || typeof url !== "string" ){ return; }
		ga("send", "exception", {
			appName: "Uncaught JavaScript Error",
			exDescription: message + " :: " + url + " :: line " + line,
			exFatal: true
		});
		return false;
	};

	return true;
});

//## IGA.Events
define("IGA.events", ["inherits", "EventEmitter.namespace", "EventEmitter.history", "eventie"],
	function(inherits, EventEmitter, HistoryEmitter){
	"use strict";
	function IGAEvents(){
		EventEmitter.apply(this, arguments);
		HistoryEmitter.apply(this, arguments);
	}
	inherits(IGAEvents, EventEmitter);
	inherits(IGAEvents, HistoryEmitter);

	IGA.events = new IGAEvents();
	return IGA.events;
});

//## IGA Common Main Require
require(["IGA.events", "IGA.analytics.common"], function(events){
	"use strict";
	if(!Drupal.settings.janrainCapture){
		events.on("login", function(user, data){
			data = data || {};
			IGA.login.updateCss("login");
			IGA.login.updateUser(user);
		});

		events.on("logout", function(){
			if(Drupal.behaviors.ae_social_login && !Drupal.behaviors.ae_social_login.override_logout){
				if(typeof aeJS !== "undefined"){
					aeJS.trigger.logout();
				}else{
					events.on("ae_ready", function(aeJS){ aeJS.trigger.logout(); });
				}
			}
		});
	}

	// If janrain is being used, load IGA.janrain
	if(Drupal.settings.janrainCapture){
		require(["IGA.janrain"]);
	}
});

//## Drupal Core JS Module Definitions
(function(){
	var base_url = location.protocol+"//"+location.host;
	IGA.module_define("Drupal.ajax", [base_url+"/misc/ajax.js"], function(){ return Drupal.ajax; });
})();
;
!function(t,e,i,n){"use strict";function a(t){return("string"==typeof t||t instanceof String)&&(t=t.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g,"")),t}var s=function(e){for(var i=e.length,n=t("head");i--;)0===n.has("."+e[i]).length&&n.append('<meta class="'+e[i]+'" />')};s(["foundation-mq-small","foundation-mq-small-only","foundation-mq-medium","foundation-mq-medium-only","foundation-mq-large","foundation-mq-large-only","foundation-mq-xlarge","foundation-mq-xlarge-only","foundation-mq-xxlarge","foundation-data-attribute-namespace"]),t(function(){"undefined"!=typeof FastClick&&"undefined"!=typeof i.body&&FastClick.attach(i.body)});var r=function(e,n){if("string"==typeof e){if(n){var a;if(n.jquery){if(a=n[0],!a)return n}else a=n;return t(a.querySelectorAll(e))}return t(i.querySelectorAll(e))}return t(e,n)},o=function(t){var e=[];return t||e.push("data"),this.namespace.length>0&&e.push(this.namespace),e.push(this.name),e.join("-")},u=function(t){for(var e=t.split("-"),i=e.length,n=[];i--;)0!==i?n.push(e[i]):this.namespace.length>0?n.push(this.namespace,e[i]):n.push(e[i]);return n.reverse().join("-")},l=function(e,i){var n=this,a=function(){var a=r(this),s=!a.data(n.attr_name(!0)+"-init");a.data(n.attr_name(!0)+"-init",t.extend({},n.settings,i||e,n.data_options(a))),s&&n.events(this)};return r(this.scope).is("["+this.attr_name()+"]")?a.call(this.scope):r("["+this.attr_name()+"]",this.scope).each(a),"string"==typeof e?this[e].call(this,i):void 0},m=function(t,e){function i(){e(t[0])}function n(){if(this.one("load",i),/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var t=this.attr("src"),e=t.match(/\?/)?"&":"?";e+="random="+(new Date).getTime(),this.attr("src",t+e)}}return t.attr("src")?void(t[0].complete||4===t[0].readyState?i():n.call(t)):void i()};e.matchMedia||(e.matchMedia=function(){var t=e.styleMedia||e.media;if(!t){var n=i.createElement("style"),a=i.getElementsByTagName("script")[0],s=null;n.type="text/css",n.id="matchmediajs-test",a.parentNode.insertBefore(n,a),s="getComputedStyle"in e&&e.getComputedStyle(n,null)||n.currentStyle,t={matchMedium:function(t){var e="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return n.styleSheet?n.styleSheet.cssText=e:n.textContent=e,"1px"===s.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}()),function(t){function i(){n&&(r(i),u&&t.fx.tick())}for(var n,a=0,s=["webkit","moz"],r=e.requestAnimationFrame,o=e.cancelAnimationFrame,u="undefined"!=typeof t.fx;a<s.length&&!r;a++)r=e[s[a]+"RequestAnimationFrame"],o=o||e[s[a]+"CancelAnimationFrame"]||e[s[a]+"CancelRequestAnimationFrame"];r?(e.requestAnimationFrame=r,e.cancelAnimationFrame=o,u&&(t.fx.timer=function(e){e()&&t.timers.push(e)&&!n&&(n=!0,i())},t.fx.stop=function(){n=!1})):(e.requestAnimationFrame=function(t){var i=(new Date).getTime(),n=Math.max(0,16-(i-a)),s=e.setTimeout(function(){t(i+n)},n);return a=i+n,s},e.cancelAnimationFrame=function(t){clearTimeout(t)})}(t),e.Foundation={name:"Foundation",version:"5.5.2",media_queries:{small:r(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"small-only":r(".foundation-mq-small-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),medium:r(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"medium-only":r(".foundation-mq-medium-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),large:r(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"large-only":r(".foundation-mq-large-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xlarge:r(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),"xlarge-only":r(".foundation-mq-xlarge-only").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,""),xxlarge:r(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,"")},stylesheet:t("<style></style>").appendTo("head")[0].sheet,global:{namespace:n},init:function(t,i,n,a,s){var o=[t,n,a,s],u=[];if(this.rtl=/rtl/i.test(r("html").attr("dir")),this.scope=t||this.scope,this.set_namespace(),i&&"string"==typeof i&&!/reflow/i.test(i))this.libs.hasOwnProperty(i)&&u.push(this.init_lib(i,o));else for(var l in this.libs)u.push(this.init_lib(l,i));return r(e).load(function(){r(e).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider")}),t},init_lib:function(e,i){return this.libs.hasOwnProperty(e)?(this.patch(this.libs[e]),i&&i.hasOwnProperty(e)?("undefined"!=typeof this.libs[e].settings?t.extend(!0,this.libs[e].settings,i[e]):"undefined"!=typeof this.libs[e].defaults&&t.extend(!0,this.libs[e].defaults,i[e]),this.libs[e].init.apply(this.libs[e],[this.scope,i[e]])):(i=i instanceof Array?i:new Array(i),this.libs[e].init.apply(this.libs[e],i))):function(){}},patch:function(t){t.scope=this.scope,t.namespace=this.global.namespace,t.rtl=this.rtl,t.data_options=this.utils.data_options,t.attr_name=o,t.add_namespace=u,t.bindings=l,t.S=this.utils.S},inherit:function(t,e){for(var i=e.split(" "),n=i.length;n--;)this.utils.hasOwnProperty(i[n])&&(t[i[n]]=this.utils[i[n]])},set_namespace:function(){var e=this.global.namespace===n?t(".foundation-data-attribute-namespace").css("font-family"):this.global.namespace;this.global.namespace=e===n||/false/i.test(e)?"":e},libs:{},utils:{S:r,throttle:function(t,e){var i=null;return function(){var n=this,a=arguments;null==i&&(i=setTimeout(function(){t.apply(n,a),i=null},e))}},debounce:function(t,e,i){var n,a;return function(){var s=this,r=arguments,o=function(){n=null,i||(a=t.apply(s,r))},u=i&&!n;return clearTimeout(n),n=setTimeout(o,e),u&&(a=t.apply(s,r)),a}},data_options:function(e,i){function n(t){return!isNaN(t-0)&&null!==t&&""!==t&&t!==!1&&t!==!0}function a(e){return"string"==typeof e?t.trim(e):e}i=i||"options";var s,r,o,u={},l=function(t){var e=Foundation.global.namespace;return t.data(e.length>0?e+"-"+i:i)},m=l(e);if("object"==typeof m)return m;for(o=(m||":").split(";"),s=o.length;s--;)r=o[s].split(":"),r=[r[0],r.slice(1).join(":")],/true/i.test(r[1])&&(r[1]=!0),/false/i.test(r[1])&&(r[1]=!1),n(r[1])&&(r[1]=-1===r[1].indexOf(".")?parseInt(r[1],10):parseFloat(r[1])),2===r.length&&r[0].length>0&&(u[a(r[0])]=a(r[1]));return u},register_media:function(e,i){Foundation.media_queries[e]===n&&(t("head").append('<meta class="'+i+'"/>'),Foundation.media_queries[e]=a(t("."+i).css("font-family")))},add_custom_rule:function(t,e){if(e===n&&Foundation.stylesheet)Foundation.stylesheet.insertRule(t,Foundation.stylesheet.cssRules.length);else{var i=Foundation.media_queries[e];i!==n&&Foundation.stylesheet.insertRule("@media "+Foundation.media_queries[e]+"{ "+t+" }",Foundation.stylesheet.cssRules.length)}},image_loaded:function(t,e){function i(t){for(var e=t.length,i=e-1;i>=0;i--)if(t.attr("height")===n)return!1;return!0}var a=this,s=t.length;(0===s||i(t))&&e(t),t.each(function(){m(a.S(this),function(){s-=1,0===s&&e(t)})})},random_str:function(){return this.fidx||(this.fidx=0),this.prefix=this.prefix||[this.name||"F",(+new Date).toString(36)].join("-"),this.prefix+(this.fidx++).toString(36)},match:function(t){return e.matchMedia(t).matches},is_small_up:function(){return this.match(Foundation.media_queries.small)},is_medium_up:function(){return this.match(Foundation.media_queries.medium)},is_large_up:function(){return this.match(Foundation.media_queries.large)},is_xlarge_up:function(){return this.match(Foundation.media_queries.xlarge)},is_xxlarge_up:function(){return this.match(Foundation.media_queries.xxlarge)},is_small_only:function(){return!(this.is_medium_up()||this.is_large_up()||this.is_xlarge_up()||this.is_xxlarge_up())},is_medium_only:function(){return this.is_medium_up()&&!this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up()},is_large_only:function(){return this.is_medium_up()&&this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up()},is_xlarge_only:function(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&!this.is_xxlarge_up()},is_xxlarge_only:function(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&this.is_xxlarge_up()}}},t.fn.foundation=function(){var t=Array.prototype.slice.call(arguments,0);return this.each(function(){return Foundation.init.apply(Foundation,[this].concat(t)),this})}}(jQuery,window,window.document);;
!function(a){"use strict";Foundation.libs.offcanvas={name:"offcanvas",version:"5.5.2",settings:{open_method:"move",close_on_click:!1},init:function(a,e,t){this.bindings(e,t)},events:function(){var e=this,t=e.S,s="",n="",o="",c="",l="";"move"===this.settings.open_method?(s="move-",n="right",o="left",c="top",l="bottom"):"overlap_single"===this.settings.open_method?(s="offcanvas-overlap-",n="right",o="left",c="top",l="bottom"):"overlap"===this.settings.open_method&&(s="offcanvas-overlap"),t(this.scope).off(".offcanvas").on("click.fndtn.offcanvas",".left-off-canvas-toggle",function(o){e.click_toggle_class(o,s+n),"overlap"!==e.settings.open_method&&t(".left-submenu").removeClass(s+n),a(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".left-off-canvas-menu a",function(o){var c=e.get_settings(o),l=t(this).parent();!c.close_on_click||l.hasClass("has-submenu")||l.hasClass("back")?t(this).parent().hasClass("has-submenu")?(o.preventDefault(),t(this).siblings(".left-submenu").toggleClass(s+n)):l.hasClass("back")&&(o.preventDefault(),l.parent().removeClass(s+n)):(e.hide.call(e,s+n,e.get_wrapper(o)),l.parent().removeClass(s+n)),a(".left-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-toggle",function(n){e.click_toggle_class(n,s+o),"overlap"!==e.settings.open_method&&t(".right-submenu").removeClass(s+o),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".right-off-canvas-menu a",function(n){var c=e.get_settings(n),l=t(this).parent();!c.close_on_click||l.hasClass("has-submenu")||l.hasClass("back")?t(this).parent().hasClass("has-submenu")?(n.preventDefault(),t(this).siblings(".right-submenu").toggleClass(s+o)):l.hasClass("back")&&(n.preventDefault(),l.parent().removeClass(s+o)):(e.hide.call(e,s+o,e.get_wrapper(n)),l.parent().removeClass(s+o)),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".top-off-canvas-toggle",function(n){e.click_toggle_class(n,s+l),"overlap"!==e.settings.open_method&&t(".top-submenu").removeClass(s+l),a(".top-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".top-off-canvas-menu a",function(n){var o=e.get_settings(n),c=t(this).parent();!o.close_on_click||c.hasClass("has-submenu")||c.hasClass("back")?t(this).parent().hasClass("has-submenu")?(n.preventDefault(),t(this).siblings(".top-submenu").toggleClass(s+l)):c.hasClass("back")&&(n.preventDefault(),c.parent().removeClass(s+l)):(e.hide.call(e,s+l,e.get_wrapper(n)),c.parent().removeClass(s+l)),a(".top-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".bottom-off-canvas-toggle",function(n){e.click_toggle_class(n,s+c),"overlap"!==e.settings.open_method&&t(".bottom-submenu").removeClass(s+c),a(".bottom-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".bottom-off-canvas-menu a",function(n){var o=e.get_settings(n),l=t(this).parent();!o.close_on_click||l.hasClass("has-submenu")||l.hasClass("back")?t(this).parent().hasClass("has-submenu")?(n.preventDefault(),t(this).siblings(".bottom-submenu").toggleClass(s+c)):l.hasClass("back")&&(n.preventDefault(),l.parent().removeClass(s+c)):(e.hide.call(e,s+c,e.get_wrapper(n)),l.parent().removeClass(s+c)),a(".bottom-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(c){e.click_remove_class(c,s+o),t(".right-submenu").removeClass(s+o),n&&(e.click_remove_class(c,s+n),t(".left-submenu").removeClass(s+o)),a(".right-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(t){e.click_remove_class(t,s+o),a(".left-off-canvas-toggle").attr("aria-expanded","false"),n&&(e.click_remove_class(t,s+n),a(".right-off-canvas-toggle").attr("aria-expanded","false"))}).on("click.fndtn.offcanvas",".exit-off-canvas",function(n){e.click_remove_class(n,s+c),t(".bottom-submenu").removeClass(s+c),l&&(e.click_remove_class(n,s+l),t(".top-submenu").removeClass(s+c)),a(".bottom-off-canvas-toggle").attr("aria-expanded","true")}).on("click.fndtn.offcanvas",".exit-off-canvas",function(t){e.click_remove_class(t,s+c),a(".top-off-canvas-toggle").attr("aria-expanded","false"),l&&(e.click_remove_class(t,s+l),a(".bottom-off-canvas-toggle").attr("aria-expanded","false"))})},toggle:function(a,e){e=e||this.get_wrapper(),e.is("."+a)?this.hide(a,e):this.show(a,e)},show:function(a,e){e=e||this.get_wrapper(),e.trigger("open.fndtn.offcanvas"),e.addClass(a)},hide:function(a,e){e=e||this.get_wrapper(),e.trigger("close.fndtn.offcanvas"),e.removeClass(a)},click_toggle_class:function(a,e){a.preventDefault();var t=this.get_wrapper(a);this.toggle(e,t)},click_remove_class:function(a,e){a.preventDefault();var t=this.get_wrapper(a);this.hide(e,t)},get_settings:function(a){var e=this.S(a.target).closest("["+this.attr_name()+"]");return e.data(this.attr_name(!0)+"-init")||this.settings},get_wrapper:function(a){var e=this.S(a?a.target:this.scope).closest(".off-canvas-wrap");return 0===e.length&&(e=this.S(".off-canvas-wrap")),e},reflow:function(){}}}(jQuery,window,window.document);;
!function(e,t,n,a){"use strict";function o(e){var t=/fade/i.test(e),n=/pop/i.test(e);return{animate:t||n,pop:n,fade:t}}var s=[];Foundation.libs.reveal={name:"reveal",version:"5.5.2",locked:!1,settings:{animation:"fadeAndPop",animation_speed:250,close_on_background_click:!0,close_on_esc:!0,dismiss_modal_class:"close-reveal-modal",multiple_opened:!1,bg_class:"reveal-modal-bg",root_element:"body",open:function(){},opened:function(){},close:function(){},closed:function(){},on_ajax_error:e.noop,bg:e(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(t,n,a){e.extend(!0,this.settings,n,a),this.bindings(n,a)},events:function(){var e=this,t=e.S;return t(this.scope).off(".reveal").on("click.fndtn.reveal","["+this.add_namespace("data-reveal-id")+"]:not([disabled])",function(n){if(n.preventDefault(),!e.locked){var a=t(this),o=a.data(e.data_attr("reveal-ajax")),s=a.data(e.data_attr("reveal-replace-content"));if(e.locked=!0,"undefined"==typeof o)e.open.call(e,a);else{var i=o===!0?a.attr("href"):o;e.open.call(e,a,{url:i},{replaceContentSel:s})}}}),t(n).on("click.fndtn.reveal",this.close_targets(),function(n){if(n.preventDefault(),!e.locked){var a=t("["+e.attr_name()+"].open").data(e.attr_name(!0)+"-init")||e.settings,o=t(n.target)[0]===t("."+a.bg_class)[0];if(o){if(!a.close_on_background_click)return;n.stopPropagation()}e.locked=!0,e.close.call(e,o?t("["+e.attr_name()+"].open:not(.toback)"):t(this).closest("["+e.attr_name()+"]"))}}),t("["+e.attr_name()+"]",this.scope).length>0?t(this.scope).on("open.fndtn.reveal",this.settings.open).on("opened.fndtn.reveal",this.settings.opened).on("opened.fndtn.reveal",this.open_video).on("close.fndtn.reveal",this.settings.close).on("closed.fndtn.reveal",this.settings.closed).on("closed.fndtn.reveal",this.close_video):t(this.scope).on("open.fndtn.reveal","["+e.attr_name()+"]",this.settings.open).on("opened.fndtn.reveal","["+e.attr_name()+"]",this.settings.opened).on("opened.fndtn.reveal","["+e.attr_name()+"]",this.open_video).on("close.fndtn.reveal","["+e.attr_name()+"]",this.settings.close).on("closed.fndtn.reveal","["+e.attr_name()+"]",this.settings.closed).on("closed.fndtn.reveal","["+e.attr_name()+"]",this.close_video),!0},key_up_on:function(){var e=this;return e.S("body").off("keyup.fndtn.reveal").on("keyup.fndtn.reveal",function(t){var n=e.S("["+e.attr_name()+"].open"),a=n.data(e.attr_name(!0)+"-init")||e.settings;a&&27===t.which&&a.close_on_esc&&!e.locked&&e.close.call(e,n)}),!0},key_up_off:function(){return this.S("body").off("keyup.fndtn.reveal"),!0},open:function(n,o){var i,r=this;n?"undefined"!=typeof n.selector?i=r.S("#"+n.data(r.data_attr("reveal-id"))).first():(i=r.S(this.scope),o=n):i=r.S(this.scope);var d=i.data(r.attr_name(!0)+"-init");if(d=d||this.settings,i.hasClass("open")&&n!==a&&n.attr("data-reveal-id")==i.attr("id"))return r.close(i);if(!i.hasClass("open")){var l=r.S("["+r.attr_name()+"].open");"undefined"==typeof i.data("css-top")&&i.data("css-top",parseInt(i.css("top"),10)).data("offset",this.cache_offset(i)),i.attr("tabindex","0").attr("aria-hidden","false"),this.key_up_on(i),i.on("open.fndtn.reveal",function(e){"fndtn.reveal"!==e.namespace}),i.on("open.fndtn.reveal").trigger("open.fndtn.reveal"),l.length<1&&this.toggle_bg(i,!0),"string"==typeof o&&(o={url:o});var c=function(){l.length>0&&(d.multiple_opened?r.to_back(l):r.hide(l,d.css.close)),d.multiple_opened&&s.push(i),r.show(i,d.css.open)};if("undefined"!=typeof o&&o.url){var f="undefined"!=typeof o.success?o.success:null;e.extend(o,{success:function(t,n,a){if(e.isFunction(f)){var o=f(t,n,a);"string"==typeof o&&(t=o)}"undefined"!=typeof options&&"undefined"!=typeof options.replaceContentSel?i.find(options.replaceContentSel).html(t):i.html(t),r.S(i).foundation("section","reflow"),r.S(i).children().foundation(),c()}}),d.on_ajax_error!==e.noop&&e.extend(o,{error:d.on_ajax_error}),e.ajax(o)}else c()}r.S(t).trigger("resize")},close:function(t){var t=t&&t.length?t:this.S(this.scope),n=this.S("["+this.attr_name()+"].open"),a=t.data(this.attr_name(!0)+"-init")||this.settings,o=this;if(n.length>0)if(t.removeAttr("tabindex","0").attr("aria-hidden","true"),this.locked=!0,this.key_up_off(t),t.trigger("close.fndtn.reveal"),(a.multiple_opened&&1===n.length||!a.multiple_opened||t.length>1)&&(o.toggle_bg(t,!1),o.to_front(t)),a.multiple_opened){var i=t.is(":not(.toback)");o.hide(t,a.css.close,a),i?s.pop():s=e.grep(s,function(e){var n=e[0]===t[0];return n&&o.to_front(t),!n}),s.length>0&&o.to_front(s[s.length-1])}else o.hide(n,a.css.close,a)},close_targets:function(){var e="."+this.settings.dismiss_modal_class;return this.settings.close_on_background_click?e+", ."+this.settings.bg_class:e},toggle_bg:function(t,n){0===this.S("."+this.settings.bg_class).length&&(this.settings.bg=e("<div />",{"class":this.settings.bg_class}).appendTo("body").hide());var o=this.settings.bg.filter(":visible").length>0;n!=o&&((n==a?o:!n)?this.hide(this.settings.bg):this.show(this.settings.bg))},show:function(n,a){if(a){var s=n.data(this.attr_name(!0)+"-init")||this.settings,i=s.root_element,r=this;if(0===n.parent(i).length){var d=n.wrap('<div style="display: none;" />').parent();n.on("closed.fndtn.reveal.wrapped",function(){n.detach().appendTo(d),n.unwrap().unbind("closed.fndtn.reveal.wrapped")}),n.detach().appendTo(i)}var l=o(s.animation);if(l.animate||(this.locked=!1),l.pop){a.top=e(t).scrollTop()-n.data("offset")+"px";var c={top:e(t).scrollTop()+n.data("css-top")+"px",opacity:1};return setTimeout(function(){return n.css(a).animate(c,s.animation_speed,"linear",function(){r.locked=!1,n.trigger("opened.fndtn.reveal")}).addClass("open")},s.animation_speed/2)}if(l.fade){a.top=e(t).scrollTop()+n.data("css-top")+"px";var c={opacity:1};return setTimeout(function(){return n.css(a).animate(c,s.animation_speed,"linear",function(){r.locked=!1,n.trigger("opened.fndtn.reveal")}).addClass("open")},s.animation_speed/2)}return n.css(a).show().css({opacity:1}).addClass("open").trigger("opened.fndtn.reveal")}var s=this.settings;return o(s.animation).fade?n.fadeIn(s.animation_speed/2):(this.locked=!1,n.show())},to_back:function(e){e.addClass("toback")},to_front:function(e){e.removeClass("toback")},hide:function(n,a){if(a){var s=n.data(this.attr_name(!0)+"-init"),i=this;s=s||this.settings;var r=o(s.animation);if(r.animate||(this.locked=!1),r.pop){var d={top:-e(t).scrollTop()-n.data("offset")+"px",opacity:0};return setTimeout(function(){return n.animate(d,s.animation_speed,"linear",function(){i.locked=!1,n.css(a).trigger("closed.fndtn.reveal")}).removeClass("open")},s.animation_speed/2)}if(r.fade){var d={opacity:0};return setTimeout(function(){return n.animate(d,s.animation_speed,"linear",function(){i.locked=!1,n.css(a).trigger("closed.fndtn.reveal")}).removeClass("open")},s.animation_speed/2)}return n.hide().css(a).removeClass("open").trigger("closed.fndtn.reveal")}var s=this.settings;return o(s.animation).fade?n.fadeOut(s.animation_speed/2):n.hide()},close_video:function(t){var n=e(".flex-video",t.target),a=e("iframe",n);a.length>0&&(a.attr("data-src",a[0].src),a.attr("src",a.attr("src")),n.hide())},open_video:function(t){var n=e(".flex-video",t.target),o=n.find("iframe");if(o.length>0){var s=o.attr("data-src");if("string"==typeof s)o[0].src=o.attr("data-src");else{var i=o[0].src;o[0].src=a,o[0].src=i}n.show()}},data_attr:function(e){return this.namespace.length>0?this.namespace+"-"+e:e},cache_offset:function(e){var t=e.show().height()+parseInt(e.css("top"),10)+e.scrollY;return e.hide(),t},off:function(){e(this.scope).off(".fndtn.reveal")},reflow:function(){}}}(jQuery,window,window.document);;
/*! Picturefill - v2.3.1 - 2015-06-01
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
window.matchMedia||(window.matchMedia=function(){"use strict";var a=window.styleMedia||window.media;if(!a){var b=document.createElement("style"),c=document.getElementsByTagName("script")[0],d=null;b.type="text/css",b.id="matchmediajs-test",c.parentNode.insertBefore(b,c),d="getComputedStyle"in window&&window.getComputedStyle(b,null)||b.currentStyle,a={matchMedium:function(a){var c="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return b.styleSheet?b.styleSheet.cssText=c:b.textContent=c,"1px"===d.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}()),function(a,b,c){"use strict";function d(b){"object"==typeof module&&"object"==typeof module.exports?module.exports=b:"function"==typeof define&&define.amd&&(define("picturefill",function(){return b}),a.picturefill=b),"object"==typeof a&&(a.picturefill=b)}function e(a){var b,c,d,e,f,i=a||{};b=i.elements||g.getAllElements();for(var j=0,k=b.length;k>j;j++)if(c=b[j],d=c.parentNode,e=void 0,f=void 0,"IMG"===c.nodeName.toUpperCase()&&(c[g.ns]||(c[g.ns]={}),i.reevaluate||!c[g.ns].evaluated)){if(d&&"PICTURE"===d.nodeName.toUpperCase()){if(g.removeVideoShim(d),e=g.getMatch(c,d),e===!1)continue}else e=void 0;(d&&"PICTURE"===d.nodeName.toUpperCase()||!g.sizesSupported&&c.srcset&&h.test(c.srcset))&&g.dodgeSrcset(c),e?(f=g.processSourceSet(e),g.applyBestCandidate(f,c)):(f=g.processSourceSet(c),(void 0===c.srcset||c[g.ns].srcset)&&g.applyBestCandidate(f,c)),c[g.ns].evaluated=!0}}function f(){function c(){clearTimeout(d),d=setTimeout(h,60)}g.initTypeDetects(),e();var d,f=setInterval(function(){return e(),/^loaded|^i|^c/.test(b.readyState)?void clearInterval(f):void 0},250),h=function(){e({reevaluate:!0})};a.addEventListener?a.addEventListener("resize",c,!1):a.attachEvent&&a.attachEvent("onresize",c)}b.createElement("picture");var g=a.picturefill||{},h=/\s+\+?\d+(e\d+)?w/;g.ns="picturefill",function(){g.srcsetSupported="srcset"in c,g.sizesSupported="sizes"in c,g.curSrcSupported="currentSrc"in c}(),g.trim=function(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")},g.makeUrl=function(){var a=b.createElement("a");return function(b){return a.href=b,a.href}}(),g.restrictsMixedContent=function(){return"https:"===a.location.protocol},g.matchesMedia=function(b){return a.matchMedia&&a.matchMedia(b).matches},g.getDpr=function(){return a.devicePixelRatio||1},g.getWidthFromLength=function(a){var c;if(!a||a.indexOf("%")>-1!=!1||!(parseFloat(a)>0||a.indexOf("calc(")>-1))return!1;a=a.replace("vw","%"),g.lengthEl||(g.lengthEl=b.createElement("div"),g.lengthEl.style.cssText="border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden",g.lengthEl.className="helper-from-picturefill-js"),g.lengthEl.style.width="0px";try{g.lengthEl.style.width=a}catch(d){}return b.body.appendChild(g.lengthEl),c=g.lengthEl.offsetWidth,0>=c&&(c=!1),b.body.removeChild(g.lengthEl),c},g.detectTypeSupport=function(b,c){var d=new a.Image;return d.onerror=function(){g.types[b]=!1,e()},d.onload=function(){g.types[b]=1===d.width,e()},d.src=c,"pending"},g.types=g.types||{},g.initTypeDetects=function(){g.types["image/jpeg"]=!0,g.types["image/gif"]=!0,g.types["image/png"]=!0,g.types["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),g.types["image/webp"]=g.detectTypeSupport("image/webp","data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")},g.verifyTypeSupport=function(a){var b=a.getAttribute("type");if(null===b||""===b)return!0;var c=g.types[b];return"string"==typeof c&&"pending"!==c?(g.types[b]=g.detectTypeSupport(b,c),"pending"):"function"==typeof c?(c(),"pending"):c},g.parseSize=function(a){var b=/(\([^)]+\))?\s*(.+)/g.exec(a);return{media:b&&b[1],length:b&&b[2]}},g.findWidthFromSourceSize=function(c){for(var d,e=g.trim(c).split(/\s*,\s*/),f=0,h=e.length;h>f;f++){var i=e[f],j=g.parseSize(i),k=j.length,l=j.media;if(k&&(!l||g.matchesMedia(l))&&(d=g.getWidthFromLength(k)))break}return d||Math.max(a.innerWidth||0,b.documentElement.clientWidth)},g.parseSrcset=function(a){for(var b=[];""!==a;){a=a.replace(/^\s+/g,"");var c,d=a.search(/\s/g),e=null;if(-1!==d){c=a.slice(0,d);var f=c.slice(-1);if((","===f||""===c)&&(c=c.replace(/,+$/,""),e=""),a=a.slice(d+1),null===e){var g=a.indexOf(",");-1!==g?(e=a.slice(0,g),a=a.slice(g+1)):(e=a,a="")}}else c=a,a="";(c||e)&&b.push({url:c,descriptor:e})}return b},g.parseDescriptor=function(a,b){var c,d=b||"100vw",e=a&&a.replace(/(^\s+|\s+$)/g,""),f=g.findWidthFromSourceSize(d);if(e)for(var h=e.split(" "),i=h.length-1;i>=0;i--){var j=h[i],k=j&&j.slice(j.length-1);if("h"!==k&&"w"!==k||g.sizesSupported){if("x"===k){var l=j&&parseFloat(j,10);c=l&&!isNaN(l)?l:1}}else c=parseFloat(parseInt(j,10)/f)}return c||1},g.getCandidatesFromSourceSet=function(a,b){for(var c=g.parseSrcset(a),d=[],e=0,f=c.length;f>e;e++){var h=c[e];d.push({url:h.url,resolution:g.parseDescriptor(h.descriptor,b)})}return d},g.dodgeSrcset=function(a){a.srcset&&(a[g.ns].srcset=a.srcset,a.srcset="",a.setAttribute("data-pfsrcset",a[g.ns].srcset))},g.processSourceSet=function(a){var b=a.getAttribute("srcset"),c=a.getAttribute("sizes"),d=[];return"IMG"===a.nodeName.toUpperCase()&&a[g.ns]&&a[g.ns].srcset&&(b=a[g.ns].srcset),b&&(d=g.getCandidatesFromSourceSet(b,c)),d},g.backfaceVisibilityFix=function(a){var b=a.style||{},c="webkitBackfaceVisibility"in b,d=b.zoom;c&&(b.zoom=".999",c=a.offsetWidth,b.zoom=d)},g.setIntrinsicSize=function(){var c={},d=function(a,b,c){b&&a.setAttribute("width",parseInt(b/c,10))};return function(e,f){var h;e[g.ns]&&!a.pfStopIntrinsicSize&&(void 0===e[g.ns].dims&&(e[g.ns].dims=e.getAttribute("width")||e.getAttribute("height")),e[g.ns].dims||(f.url in c?d(e,c[f.url],f.resolution):(h=b.createElement("img"),h.onload=function(){if(c[f.url]=h.width,!c[f.url])try{b.body.appendChild(h),c[f.url]=h.width||h.offsetWidth,b.body.removeChild(h)}catch(a){}e.src===f.url&&d(e,c[f.url],f.resolution),e=null,h.onload=null,h=null},h.src=f.url)))}}(),g.applyBestCandidate=function(a,b){var c,d,e;a.sort(g.ascendingSort),d=a.length,e=a[d-1];for(var f=0;d>f;f++)if(c=a[f],c.resolution>=g.getDpr()){e=c;break}e&&(e.url=g.makeUrl(e.url),b.src!==e.url&&(g.restrictsMixedContent()&&"http:"===e.url.substr(0,"http:".length).toLowerCase()?void 0!==window.console&&console.warn("Blocked mixed content image "+e.url):(b.src=e.url,g.curSrcSupported||(b.currentSrc=b.src),g.backfaceVisibilityFix(b))),g.setIntrinsicSize(b,e))},g.ascendingSort=function(a,b){return a.resolution-b.resolution},g.removeVideoShim=function(a){var b=a.getElementsByTagName("video");if(b.length){for(var c=b[0],d=c.getElementsByTagName("source");d.length;)a.insertBefore(d[0],c);c.parentNode.removeChild(c)}},g.getAllElements=function(){for(var a=[],c=b.getElementsByTagName("img"),d=0,e=c.length;e>d;d++){var f=c[d];("PICTURE"===f.parentNode.nodeName.toUpperCase()||null!==f.getAttribute("srcset")||f[g.ns]&&null!==f[g.ns].srcset)&&a.push(f)}return a},g.getMatch=function(a,b){for(var c,d=b.childNodes,e=0,f=d.length;f>e;e++){var h=d[e];if(1===h.nodeType){if(h===a)return c;if("SOURCE"===h.nodeName.toUpperCase()){null!==h.getAttribute("src")&&void 0!==typeof console&&console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");var i=h.getAttribute("media");if(h.getAttribute("srcset")&&(!i||g.matchesMedia(i))){var j=g.verifyTypeSupport(h);if(j===!0){c=h;break}if("pending"===j)return!1}}}}return c},a.HTMLPictureElement&&f(),e._=g,d(e)}(window,window.document,new window.Image);;
if(typeof Drupal!=="undefined"&&typeof jQuery!=="undefined"){(function(e){Drupal.behaviors.picture={attach:function(t){if(!("HTMLPictureElement"in window)){var n=e(t).find("img");if(n.length){window.picturefill({elements:n.get()})}}if(t==="#cboxLoadedContent"&&e(t).find("picture").length){e.colorbox.resize();e("img",t).once("colorbox-lazy-load",function(){e(this).load(function(){this.style.maxHeight=e(window).height()+"px";this.style.maxWidth=e(window).width()+"px";e.colorbox.resize({innerHeight:this.height,innerWidth:this.width});this.style.maxHeight=null;this.style.maxWidth=null})})}}}})(jQuery)}
;

(function($){

// hide empty promo banner captions
$("body.front .l-banner .views-row .l-front").each(function(i){
	if( $(this).children().find('.field--name-body').length >= 1 ) {
		$(this).addClass('has-caption');
	} else {
		$(this).addClass('no-caption');
	}
});

// Add has-player class if there's a song stream
$(".field-collection-item-field-tracks").each(function(){
  if( $(this).find(".ui360").hasClass("song-player") ) {
    $(this).addClass("has-player");
  }
});

// Remove whitespace
$(".node div").each(function(){
    if($(this).children().length == 0){
        $(this).addClass('empty');
    }
});


$('.not-front').addClass('fixed');
//$( ".l-region--off-canvas-content " ).data( "nid ");
//$( ".song_details" ).data( "song-id");

// Move song details to top of viewport
/* $( ".song_details" ).click(function() {
    viewportOffsetTop = $(document).scrollTop();
    $('.l-region--off-canvas-content').css({ top: viewportOffsetTop });
}); */

/*var tester = $('.l-region--off-canvas-content a');
var check = function(){
  var visible = tester.isOnScreen(0.5, 0.5);
  console.log(visible);
}
//var debounced = check.debounce(50);
$(window).on('scroll', check);*/

// Temp add track count
duplicateTrackCount();

$( ".pager-load-more a" ).click(function() {
    duplicateTrackCount();
});

// Make the internal page background parallax
$('.front .l-region--footer').addClass( "parallax");
// Make the homepage email section background parallax
$('.front .l-region--footer').addClass( "invert");

// Move more links on homepage
$('.front .view-events .more-link').appendTo( ".front .view-events .view-content");
// Move Title on homepage
$(".front .l-content>.block .block__title").each(function(i){
	//$(this).closest('.block').attr( "data-parallax", "true" );
	$(this).prependTo(($(this).parent().find('.block__content .view-content')));
});

$(".bg-parallax").each(function(i){
	//$(this).closest('.block').attr( "data-parallax", "true" );
	$(this).closest('.block').addClass( "parallax");
});

$(".full-viewport").each(function(i){
	//$(this).closest('.block').attr( "data-parallax", "true" );
	$(this).closest('.block').addClass( "fullscreen");
});



$(".invert").each(function(i){
	//$(this).closest('.block').attr( "data-parallax", "true" );
	$(this).closest('.block').addClass( "invert");
});

$(".view-videos.bg-parallax").each(function(i){
	//alert( $(this).find('.field--name-field-video.field--type-media img').attr('src') );
	var ytImg = $(this).find('.field--name-field-video.field--type-media img').attr('src');
	$(this).closest('.block').css({
        'background-image': 'url(' + ytImg + ')',
    });
});

/* detect touch */
if("ontouchstart" in window){
    document.documentElement.className = document.documentElement.className + " touch";
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix(){
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function(i){
        if($(this).innerHeight() <= h){
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}

$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize(){
    var windowH = $(window).height();
    $(".parallax").each(function(i){
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        //var imgW = path.attr("data-img-width");
        //var imgH = path.attr("data-img-height");
		var imgW = 1800;
		var imgH = 1200;
        var ratio = imgW / imgH;
        // overflowing difference
        //var diff = parseFloat(path.attr("data-diff"));
        var diff = 100;
		diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}

$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(e){
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function(i){
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if(bottomWindow > top && topWindow < bottom){
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = - imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}

function duplicateTrackCount(){
    $(".track_count").each(function(i){
        //console.log( $(this).data( "track-count") );
        $(this).closest('.ds-region--column-2').find('.field-collection-container').find('.field--name-field-tracks').attr( "data-track-count", $(this).data( "track-count") );
    });
}

if(!$("html").hasClass("touch")){
    $(window).resize(parallaxPosition);
    $(window).resize(moveHeader);
    $(window).resize(shrinkNav);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    $(window).scroll(moveHeader);
    $(window).scroll(shrinkNav);
    //parallaxPosition();

     /* background fix */
    $(".parallax").css("background-attachment", "fixed");

}

function shrinkNav() {
    var scroll = getCurrentScroll();
    /* if ( scroll >= 40 ) {
        $('html').addClass('shrink');
    } else {
        $('html').removeClass('shrink');
    }*/
    if ( scroll >= ( $('.front .l-banner').height() - 40 ) ) {
        $('html').addClass('fixed');
    } else {
        $('html').removeClass('fixed');
    }
}

function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

function moveHeader() {
    scrollTotal = $(window).scrollTop();
    scrollTotal = Math.floor(scrollTotal / 4);
    $(".front .l-banner .ds-region--background").css({
        webkitTransform: "translateY(" + scrollTotal + "px)",
        mozTransform: "translateY(" + scrollTotal + "px)",
        msTransform: "translateY(" + scrollTotal + "px)",
        transform: "translateY(" + scrollTotal + "px)"
    })

    $(".fixed .l-header").css({
        backgroundPositionY: -.8 * scrollTotal
    })
}

/*$.fn.isOnScreen = function(){
    var element = this.get(0);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}*/

})(jQuery); // end of jQuery name space
;
/**
 * IGA Webform customizations
 */
define("IGA.common.webform", ["jquery", "IGA.events"], function($){
	"use strict";
	var Webform = {
		/**
		 * Convert Drupal datepicker into a simple html5 date field.
		 */
		dateInput: function(index, el, suffix){
			var $date = $(el),
				$datepicker = $date.find(".webform-container-inline, .container-inline" ),
				$day = $datepicker.find("select.day, select.date-day, input.day, select[name$=\"[day]\"]"),
				$month = $datepicker.find("select.month, select.date-month, input.month, select[name$=\"[month]\"]"),
				$year = $datepicker.find("select.year, select.date-year, input.year, select[name$=\"[year]\"]"),
				name = ($month.attr("name") || "").split("[")[0],
				$input;
			suffix = suffix || "iga";
			$input = $date.find("input[type=date]");
			if($input.length === 0){
				$input = $('<input class="iga-common-webform-date" type="date">');
			}else{
				$input.addClass("iga-common-webform-date").show();
			}
			if(name !== ""){
				// If the input is provided then we're using it to submit, update the name. It can't conflict w/ the Drupal form field.
				$input.attr("name", name +"."+suffix);
			}

			$datepicker.hide().after($input);
			$input.on("change", function(){
				//## When the date input is updated
				var date = $input.val().split("-"), //yy-mm-dd regardless of user display
					year = date[0],
					month = date[1],
					day = date[2];
				if(month){ $month.val(month.replace(/^0/,'')); }
				if(day){ $day.val(day.replace(/^0/,'')); }
				if(year){ $year.val(year); }
			});
			//## Initialize the date input with the datepicker
			var day = $day.val(),
				month = $month.val(),
				year = $year.val();
			if(day && day.length === 1){ day = "0"+day; }
			if(month && month.length === 1){ month = "0"+month; }
			if(year && year !== "" && day !== "" && month !== ""){
				require(["IGA.utils"], function(utils){
					var _date = year+"-"+month+"-"+day,
						now = new Date();
					// Turn off input initialization if the date is set to today / the default
					if(utils.dateFormat(now.getTime() + now.getTimezoneOffset() * 60000, 'yyyy-mm-dd') !== _date){
						$input.val(_date);
					}
				});
			}
            var autocomplete = $month.attr("autocomplete");
            if(autocomplete && autocomplete.indexOf("bday") === 0){
                $input.attr("autocomplete", "bday");
            }
		},
        dateAutoComplete: function(index, el){
            var $date = $(el),
                $datepicker = $date.find(".webform-container-inline"),
                $day = $datepicker.find("select.day, select.date-day"),
                $month = $datepicker.find("select.month, select.date-month"),
                $year = $datepicker.find("select.year, select.date-year, input.year"),
                autocomplete = $datepicker.find("select.month").attr("autocomplete");
            if(autocomplete && autocomplete.indexOf("bday") === 0){
                $day.attr("autocomplete", "bday-day");
                $month.attr("autocomplete", "bday-month");
                $year.attr("autocomplete", "bday-year");
            }

        },
        phoneInput: function(index, el){
            var $el = $(el);
            require(["jquery", "jquery/formance/jquery.formance.min"], function($){
                $el.formance('format_phone_number');
            });
        },
		/**
		 * Update form user fields on user login.
		 */
		updateUser: function(el, user, userData){
			var $form = $(el),
				$email = $form.find("input[type=email]" ),
				$dob = $form.find("#webform-component-dob" ),
				$iga = $form.find(".iga-common-webform-date");
			//Update the form email
			$email.val(user.mail);
			//Update the form date of birth
			if(userData && userData.birthday){
				var dob = userData.birthday.split("-"),
					year = dob[0],
					month = dob[1],
					day = dob[2];
				if($dob.is(".webform-component-date")){
					var $day = $dob.find("select.day"),
						$month = $dob.find("select.month"),
						$year = $dob.find("select.year, input.year");
					if(dob.length === 3){
						$year.val(year);
						$month.val(month.replace(/^0/,''));
						$day.val(day.replace(/^0/,''));
					}
				}else if($dob.is(".webform-component-textfield")){
					$dob.find("input" ).val(day+"/"+month+"/"+year);
				}
				//Update the iga_common_webform date as well
				if($iga.length > 0){
					$iga.val(year+"-"+month+"-"+day);
				}
			}
		}
	}
	return Webform;
});

//## Drupal Behaviors
Drupal.behaviors.iga_common_webform = {
	attach: function(context, settings){
		require(["jquery", "IGA.common.webform"], function($, Webform){ //TODO on .iga-common-webform
            var $context = $(context);
			//## Update the webform with the logged in user's info.
			IGA.events.on("login", function(user, data){
				$("form.webform-client-form.iga-common-webform", context).each(function(index, el){
                    var userData = (data && data.janrain && data.janrain.result) ? data.janrain.result.userData : {};
					if(userData){ Webform.updateUser(el, user, userData); }
				});
			});
			//Add input type="date"
			if(Modernizr && Modernizr.inputtypes.date){
				$("form.iga-common-webform .webform-component-date").once(Webform.dateInput);
                if($context.is("form.iga-common-webform")){
                    $context.find(".webform-component-date").each(Webform.dateInput);
                }
			}else{
                //TODO else update autocomplete date
                $("form.iga-common-webform .webform-component-date").once(Webform.dateAutoComplete);
            }
            $("form.iga-common-webform #webform-component-phone-number input").once(Webform.phoneInput);
            if($context.is("form.iga-common-webform")){
                $context.find("#webform-component-phone-number input").each(Webform.phoneInput);
            }
		});
    }
};
;
/**
 * @file bolero.flag.js
 * @author Malcolm Poindexter <malcolm.poindexter@umusic.com>
 */
define("bolero.flag", ["jquery", "underscore", "IGA.events", "IGA.utils", "googleanalytics"], function($, _, events, utils, ga){
	function BoleroFlag(settings){
		this.$el = $(settings.el);
		this.nid = settings.nid;
        this.view_mode = settings.view_mode || "default";
        this.node_title = this.$el.closest(".node").attr("data-title");
        this.name = settings.flag;
        this.qtip = settings.qtip || true;
        if(!BoleroFlag.registry[this.name]){ BoleroFlag.registry[this.name] = {}; }
		BoleroFlag.registry[this.name][this.nid] = this;
		this.init();
		this.$el.addClass("bolero-processed");
	}
	BoleroFlag.registry = {};

	BoleroFlag.prototype.init = function(){
        var self = this;
		this.$action = this.$el.find("a.bolero-flag-action");
		this.$action.on("click", _.bind(this.click, this));
        if(this.qtip){
            require(["qtip"], function(){
                self.$action.qtip({
                    style: { classes: "ui-tooltip-shadow ui-tooltip-button ui-tooltip-bolero" },
                    position: { my: "top center", at: "bottom center" },
                    tip: { corner:false }
                });
            });
        }
	};

	//## Toggle the flag status
	BoleroFlag.prototype.flag = function(){
		//When not logged in show the flag link, IGA.janrain.login, after login flag, finally toast w/ message + remove.
		var url = this.$action.attr("data-url"), self = this;
		$.ajax(url, {
			type: "POST",
			data: { js: true },
			dataType: 'json'
		}).success(function(data){
			if(data.newLink){
                if(self.qtip && self.$action.qtip){ self.$action.qtip("destroy"); }
				//replace the link
				self.$el.empty().html(data.newLink);
				self.init();
			}
			if(data.flagSuccess){
				var action = self.name;
				if(data.flagStatus === "unflagged"){
					action = "un-"+self.name;
				}
				ga("send", "event", "Interaction", action, self.node_title+" ("+self.nid+")");
				require(["IGA.bolero.Snackbar"], function(Snackbar){
					Snackbar.add(data.message, "UNDO", function(){
						self.flag();
					});
				});
			}
		});
	};

	BoleroFlag.prototype.click = function(e){
		var self = this;
		e.preventDefault();
		if(IGA.user.uid){
			this.flag();
		}else{
			IGA.conversionPt = utils.toProperCase(this.name);
            IGA.login();
			events.once("login", function(){
				self.flag();
			});
		}
	};

    BoleroFlag.refresh = function(){
        _.each(BoleroFlag.registry, function(flags, flag_name){
            var flag_params = _.map(flags, function(flag, nid){
                return nid+"|"+flag.view_mode;
            }).join(",");
            $.ajax("/api/bolero/"+flag_name+"/get_links",{
                data:{
                    flags: flag_params
                }
            }).done(function(data){
                _.each(data.links, function(link, nid){
                    var flag = BoleroFlag.registry[flag_name][nid];
                    flag.$el.empty().html(link.link);
                    flag.init();
                });
            });
        });
    };

	// Unneccessary without ajax login.
    //events.on("login", BoleroFlag.refresh);

	return BoleroFlag;
});

(function($){
	Drupal.behaviors.bolero_flag = {
		attach: function(context, settings){
			require(["bolero.flag"], function(BoleroFlag){
				$(".bolero-flag:not(.drupal-processed)").each(function(){
					var $this = $(this ),
                        nid = $this.attr("data-nid"),
                        view_mode = $this.attr("data-view-mode"),
                        name = $this.attr("data-flag");
					new BoleroFlag({ el:this, nid:nid, view_mode:view_mode, flag:name });
				});
			});
		}
	};
})(jQuery);
;
