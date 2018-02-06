/**
 * PetRide Confirm Bootstrap
 *
 * @example
 * petConfirm.show("Confirm Question?", function(){console.log("accept");});
 */
function petConfirm() {  
}

/**
 * PetConfirm Widget Name
 * 
 * @type {String}
 */
petConfirm.widget = "#pet-confirm";

/**
 * PetConfirm Message Widget
 * 
 * @type {String}
 */
petConfirm.msg = "#pet-confirm-msg";

/**
 * PetConfirm Button Widget
 * @type {String}
 */
petConfirm.btn = "#pet-confirm-btn";

/**
 * Started flag
 * 
 * @type {Boolean}
 */
petConfirm.started = false;

/**
 * Check Widget exists
 * 
 * @return {Boolean}
 */
petConfirm.check = function() {
	if ($(petConfirm.widget).length == 0)
		return false;
	else
		return true;
}

/**
 * Show Confirm 
 * 
 * @param  {String}   msg Message to show
 * @param  {Function} cb  Callback Accept
 */
petConfirm.show = function(msg, cb) {
	$(petConfirm.msg).html(msg);

	if (petConfirm.started)
		$(petConfirm.btn).unbind( "click" );

	$(petConfirm.btn).click(cb);

	$(petConfirm.widget).modal({
      backdrop: 'static',
      keyboard: false
    });

    petConfirm.started = true;
}