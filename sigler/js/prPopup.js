/**
 * PetRide Popup Implementation
 *
 * @example
 * <div data-role="popup" id="ex_pop" data-transition="pop" class="ui-content"></div>
 * @example
 * var popup = new prPopup('ex_pop');
 * popup.show("Popup Message");
 * 
 * @param  {String} widget   Widget Id
 */
function prPopup(widget){
	// Validate id Selector
	if (!widget.match("^#")) {
	   widget = "#" + widget;
	}
	
 	/**
 	 * Validate Popup Widget
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
	 * Show Popup
	 * 
	 * @param  {String} msg     Popup Message
	 */
	this.show = function(msg) {
		$(widget).html('<p>' + msg + '</p>');
		$(widget).popup("open");
	}

	/**
	 * Show Popup with timeout
	 * 
	 * @param  {String} msg     Popup Message
	 * @param  {Number} timeOut TimeOut milliseconds
	 */
	this.showTime = function(msg, timeOut) {
		$(widget).html('<p>' + msg + '</p>');
		$(widget).popup("open");

		if (timeOut > 0){
			setTimeout(function() {$(widget).popup("close");}, timeOut);
		}
	}
}