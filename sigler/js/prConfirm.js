/**
 * PetRide Confirm Implementation
 *
 * @example
 * <div data-role="popup" id="pd_confirm" data-transition="pop" data-dismissible="false"></div>
 * @example
 * var dConfirm = new prConfirm('pd_confirm', function(){console.log(prConfirm.accept);});
 * dConfirm.show("Header", "Confirm Message");
 * prConfirm.accept is true if press Accept
 * 
 * @param  {String} widget   Widget Id
 * @param  {Function} callback Callback Function
 */
function prConfirm(widget, callback){
	// Validate id Selector
	if (!widget.match("^#")) {
	   widget = "#" + widget;
	}

	// After Close execute Callback
	$(widget).on("popupafterclose", callback);

 	/**
 	 * Validate Confirm Widget
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
	 * Show Confirm Message
	 * 
	 * @param  {String} head Header Message
	 * @param  {String} msg  Alert Message
	 */
	this.show = function(head, msg) {		
		var html = '<div data-role="header"><h1>' + head + '</h1></div>';
		html = html + '<div role="main" class="ui-content"><center><h4 class="ui-title">' + msg + '</h4>';
		html = html + '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-rel="back" onclick="prConfirm.accept=false;">Cancelar</a>';
		html = html + '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-rel="back" onclick="prConfirm.accept=true;">Aceptar</a>';
		html = html + '</center></div>';

		$(widget).html(html);

		$(widget).trigger("create");
		$(widget).popup("open");
	}
}

/**
 * Is true if Accept Confirm
 * 
 * @type {Boolean}
 */
prConfirm.accept = false;
