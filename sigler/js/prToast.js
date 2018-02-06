/**
 * PetRide Toast Implementation
 *
 * @example
 * <div id="msg_toast" data-role="toast">Message</div>
 * @example
 * var toast = new prToast('msg_toast');
 * toast.show("Toast Message");
 * 
 * @param  {String} widget   Widget Id
 */
function prToast(widget){
	// Validate id Selector
	if (!widget.match("^#")) {
	   widget = "#" + widget;
	}

 	/**
 	 * Validate Toast Widget
 	 * 
 	 * @return {Boolean} Return true if widget exists else return false
 	 */
	this.check = function() {
		if ($(widget).length == 0)
			return false;
		else 
			return true;
	}

 	/**
 	 * Show Toast
 	 * 
 	 * @param  {String} msg Toast Message
 	 */
	this.show = function(msg) {
		$(widget).html(msg);

		$(widget).toast('show');
	}
}