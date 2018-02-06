/**
 * PetRide Progress Bar Bootstrap
 *
 * @example
 * petProgress.setValue(30);
 */
function petProgress() {  
}

/**
 * PetAlert Widget Name
 * 
 * @type {String}
 */
petProgress.widget = "#pet-progress";

/**
 * Progress Bar Value
 * 
 * @type {Number}
 */
petProgress.value = 0;

/**
 * Set Value
 * 
 * @param {Number} value Progress Bar Value
 */
petProgress.setValue = function(value) {
	if (value > 100)
		value = 100;

	var styleVal = value.toString() + '%';

	petProgress.value = value;

	$(petProgress.widget).css("width", styleVal);
}