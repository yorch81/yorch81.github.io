/**
 * PetRide Configuration
 */
function prCnf(){  
}

/**
 * Save Key on LocalStorage
 * 
 * @param  {string} key Valid Key
 */
prCnf.saveKey = function(key) {
	localStorage.prkey = key;
}

/**
 * Get Key
 * 
 * @return {string}
 */
prCnf.getKey = function() {
	return localStorage.prkey;
}


/**
 * Save Item on LocalStorage
 * 
 * @param  {string} item  Item
 * @param  {string} value Item Value
 */
prCnf.saveItem = function(item, value) {
	localStorage[item] = value;
}

/**
 * Get Item Value
 * 
 * @param  {string} item Item
 */
prCnf.getItem = function(item) {
	var retValue = 0;

	retValue =localStorage[item];

	if (typeof retValue == 'undefined')
		retValue = null;

	return retValue;
}

/**
 * Clear Configuration
 */
prCnf.clear = function() {
	localStorage.clear();
}

