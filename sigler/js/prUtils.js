/**
 * PetRide Utils
 */
function prUtils(){
}

/**
 * Get GUID
 * 
 * @return {String} GUID
 */
prUtils.guid = function() {
	return prUtils.s4() + prUtils.s4() + '-' + prUtils.s4() + '-' + prUtils.s4() + '-' +
        prUtils.s4() + '-' + prUtils.s4() + prUtils.s4() + prUtils.s4();
}

/**
 * Get Ramdom String GUID
 * 
 * @return {String} String Part GUID
 */
prUtils.s4 = function() {
	return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

/**
 * Validate Email
 * 
 * @param  {String} email Correo Electronico
 * @return {boolean}
 */
prUtils.validateMail = function (email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	return re.test(email);
}

/**
 * Validate Credit/Debit Card
 * 
 * @param  {String} value Credit/Debit Card
 * @return {boolean}
 */
prUtils.validateCard = function (value) {
  if (/[^0-9-\s]+/.test(value)) return false;

  // Luhn Algorithm
  var nCheck = 0, nDigit = 0, bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) == 0;
}

