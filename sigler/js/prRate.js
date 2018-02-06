/**
 * PetRide Rate Implementation
 *
 * @example
 * <div data-role="popup" id="pr_rate" data-transition="pop" data-dismissible="false"></div>
 * @example
 * var dRate = new prRate('pr_rate', function(){console.log(prRate.rating);});
 * dRate.show("Header", "Rate Message", 1.5);
 * 1.5 is initialize rating
 * prRate.rating is rating result
 * 
 * @param  {String} widget   Widget Id
 * @param  {Function} callback Callback Function
 */
function prRate(widget, callback){
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
	 * Show Rate Widget
	 * 
	 * @param  {String} head Header Message
	 * @param  {String} msg  Alert Message
	 * @param  {Number} rating  Default Rating
	 */
	this.show = function(head, msg, rating) {		
		var html = '<div data-role="header"><h1>' + head + '</h1></div>';
		html = html + '<div role="main" class="ui-content"><center>';
		html = html + '<h4 class="ui-title">' + msg + '</h4>';
		html = html + '<div id="rateyo"></div><br/>';
		html = html + '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-rel="back" onclick="prRate.rate();">Calificar</a>';
		html = html + '</center></div>';

		$(widget).html(html);

		$(widget).trigger("create");
		$(widget).popup("open");

		$("#rateyo").rateYo({
			rating: rating,
			halfStar: true
		});

		prRate.rating = rating;
	}
}

/**
 * Rating
 * 
 * @type {Number}
 */
prRate.rating = 0.0;

/**
 * Rate Event
 */
prRate.rate = function(){
	prRate.rating = $("#rateyo").rateYo("rating");
}