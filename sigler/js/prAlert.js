/**
 * PetRide Alert Implementation
 *
 * @example
 * <div data-role="popup" id="pd_alert" data-transition="pop" data-dismissible="false"></div>
 * @example
 * var dAlert = new prAlert('pd_alert');
 * dAlert.show("Alert Header", "Alert Message");
 * 
 * @param  {String} widget   Widget Id
 */
function prAlert(widget){
	// Validate id Selector
	if (!widget.match("^#")) {
	   widget = "#" + widget;
	}

 	/**
 	 * Validate Alert Widget
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
	 * Show Alert Message
	 * 
	 * @param  {String} head Header Message
	 * @param  {String} msg  Alert Message
	 */
	this.show = function(head, msg) {
		var html = '<div data-role="header"><h1>' + head + '</h1></div>';
		html = html + '<div role="main" class="ui-content"><center><h4 class="ui-title">' + msg + '</h4>';
		html = html + '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-rel="back" data-transition="flow">Aceptar</a></center></div>';

		$(widget).html(html);

		$(widget).trigger("create");
		$(widget).popup("open");
	}
}