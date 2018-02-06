/**
 * PetRide Processing Bootstrap
 *
 * @example
 * petWait.show("fa-spinner");
 * petWait.hide();
 */
function petWait() {
}

/**
 * PetRate Widget Name
 * 
 * @type {String}
 */
petWait.widget = "#pet-wait";

/**
 * PetRate Widget Name
 * 
 * @type {String}
 */
petWait.icon = "#pet-wait-icon";

/**
 * Check Widget exists
 * 
 * @return {Boolean}
 */
petWait.check = function() {
	if ($(petWait.widget).length == 0)
		return false;
	else
		return true;
}

/**
 * Show Processing
 */
petWait.show = function(icon) {
	$(petWait.icon).removeClass();

	if (typeof icon != 'undefined')
		$(petWait.icon).addClass("fa fa-spin fa-5x fa-fw " + icon);
	else
		$(petWait.icon).addClass("fa fa-spin fa-5x fa-fw fa-cog");

	$(petWait.widget).modal({
      backdrop: 'static',
      keyboard: false
    });
}

/**
 * Hide Processing
 */
petWait.hide = function() {
	$(petWait.widget).modal('hide');
}

