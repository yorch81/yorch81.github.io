/**
 * Data Library for PetRide
 *
 * @author Jorge Alberto Ponce T. <the.yorch@gmail.com>
 * @license Apache-2.0
 * @version 1.0.0
 * @constructor
 * 
 * @param {string} wsUrl   PetRide WebServices URL
 * @param {string} authKey Authentication Key
 */
function Data(wsUrl, authKey){   
  
  /**
   * Execute Stored Procedure PetRide
   * 
   * @param  {string}   procedure  Procedure Name
   * @param  {JSON}     parameters JSON Parameters of Stored Procedure
   * @param  {Function} callback   CallBack Function
   */
  this.execute = function(procedure, parameters, callback){
    var url = wsUrl + "/data/" + procedure + "?auth=" + authKey;

    
    $.post(url, JSON.stringify(parameters), callback).error(
                        function(){
                            console.log('Application not responding');
                        });
  }
}

/**
 * Get Data Access Key
 * 
 * @param  {string}   stype    FB Facebook GP Google
 * @param  {string}   sid      Social Id
 * @param  {string}   stoken   Social Token
 * @param  {Function} callback CallBack Function
 */
Data.getKey = function(stype, sid, stoken, callback){
  var url = prApp.url + "/getkey/" + stype + "/" + sid + "/" + stoken;

  $.get(url, callback).error(
                    function(){
                        console.log('Application not responding');
                    });
}