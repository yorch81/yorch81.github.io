/**
 * PetRide Rate Bootstrap
 *
 * @example
 * petRate.show("Evaluate ...", 2.5, function(){console.log("Rating: " + petRate.getRating());});
 */
function petRate() {  
}

/**
 * PetRate Widget Name
 * 
 * @type {String}
 */
petRate.widget = "#pet-rate";

/**
 * PetRate Widget Message
 * 
 * @type {String}
 */
petRate.msg = "#pet-rate-msg";

/**
 * PetRate Widget Button
 * 
 * @type {String}
 */
petRate.btn = "#pet-rate-btn";

/**
 * Started flag
 * 
 * @type {Boolean}
 */
petRate.started = false;

/**
 * Check Widget exists
 * 
 * @return {Boolean}
 */
petRate.check = function() {
	if ($(petRate.widget).length == 0)
		return false;
	else
		return true;
}

/**
 * Show Rate
 * 
 * @param  {String}   msg  Rate Message
 * @param  {Number}   rate Initial Rating
 * @param  {Function} cb   Callback Accept
 */
petRate.show = function(msg, rate, cb) {
	$(petRate.msg).html(msg);

	if (petRate.started) {
		$("#rateyo").rateYo("destroy");
		$(petRate.btn).unbind( "click" );
	}

	$(petRate.btn).click(cb);

	$(petRate.widget).modal({
      backdrop: 'static',
      keyboard: false
    });

    $("#rateyo").rateYo({
      rating: rate,
      halfStar: true
    });

    petRate.started = true;
}

/**
 * Get Rating
 * 
 * @return {Number} Rating
 */
petRate.getRating = function() {
	return $("#rateyo").rateYo("rating");
}