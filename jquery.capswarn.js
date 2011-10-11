/*
 * jQuery CapsWarn Plugin
 * Copyright 2011, Nicholas Clark
 * Licensed under the MIT license.
 */

(function($){
	$.fn.capswarn = function(options) {
		var defaults = {
			hint: ".capswarn_hint",
			disableTyping: false,
		};
		var options = $.extend(defaults, options);
		
		var hint = $(options.hint);
		var visible = hint.is(":visible");
	
		this.live("keypress", function(e) {
			var keyCode = e.keyCode ? e.keyCode : e.which;
			var shift = e.shiftKey ? e.shiftKey : (keyCode == 16);

			if(((keyCode >= 65 && keyCode <= 90) && !shift) || ((keyCode >= 97 && keyCode <= 122) && shift)) {
				// Alpha key was press and caps lock is turned on
				if ( ! visible) {
					hint.fadeIn();
					visible = true;
				}
				
				if (options.disableTyping) {
					return false; // disable typing
				}
			} else if((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
				// Alpha key was press and caps lock is turned off
				if (visible) {
					hint.fadeOut("fast");
					visible = false;
				}
			}
		});
		
		return this;
	};
})(jQuery);