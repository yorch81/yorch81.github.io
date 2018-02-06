/**
 * PetRide Alert Bootstrap
 *
 * @example
 * petAlert.show("Alert Message");
 */
function petAlert() {  
}

/**
 * PetAlert Widget Name
 * 
 * @type {String}
 */
petAlert.widget = "#pet-alert";

/**
 * PetAlert Message Widget
 * 
 * @type {String}
 */
petAlert.msg = "#pet-alert-msg";

/**
 * Petalert Button Widget
 * 
 * @type {String}
 */
petAlert.btn = "#pet-alert-btn";


/**
 * PetAlert flag
 * 
 * @type {Boolean}
 */
petAlert.started = false;

/**
 * Check Widget exists
 * 
 * @return {Boolean}
 */
petAlert.check = function(){
	if ($(petAlert.widget).length == 0)
		return false;
	else
		return true;
}

/**
 * Show Alert
 * 
 * @param  {String} msg Message to Show
 */
petAlert.show = function(msg, cb){
	$(petAlert.msg).html(msg);
	
	if (petAlert.started)
		$(petAlert.btn).unbind( "click" );

	if (typeof cb != 'undefined')
		$(petAlert.btn).click(cb);

	$(petAlert.widget).modal({
      backdrop: 'static',
      keyboard: false
    });

    petAlert.started = true;
}
