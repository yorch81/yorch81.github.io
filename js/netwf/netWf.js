/**
 * netWf JavaScript Client
 *
 * @author Jorge Alberto Ponce T. <the.yorch@gmail.com>
 * @license Apache-2.0
 * @version 1.0.0
 * @constructor
 * 
 * @param {string} authKey Authentication Key
 */
function netWf(authKey){

  /**
   * Gets Table Rows with limit
   * 
   * @param  {string}   name     Table Name
   * @param  {int}   limit    Limit of Rows
   * @param  {Function} callback CallBack Function
   */
  this.table = function(name, limit, callback){
    var url = "/api/table/" + name + "/" + limit + "?auth=" + authKey;

    // Get
    $.get(url, callback).error(
                        function(){
                            console.log('Application not responding');
                        });
  }

  /**
   * Gets Row By Id
   * 
   * @param  {string}   name     Table Name
   * @param  {string}   fieldkey Field Key
   * @param  {int}       key      Key Value
   * @param  {Function} callback CallBack Function
   */
  this.tableById = function(name, fieldkey, key, callback){
    var url = "/api/tablebyid/" + name + "/" + fieldkey + "/" + key + "?auth=" + authKey;

    // Get
    $.get(url, callback).error(
                        function(){
                            console.log('Application not responding');
                        });
  }

  /**
   * Get First Row of Table
   * 
   * @param  {string}   table    Table Name
   * @param  {string}   fieldkey Field Key
   * @param  {string}   where    Where condition '*' not where
   * @param  {Function} callback CallBack Function
   */
  this.first = function(table, fieldkey, where, callback){
    var url = "/api/first/" + table + "/" + fieldkey + "/0/" + where + "?auth=" + authKey;

    // Get
    $.get(url, callback).error(
                        function(){
                            console.log('Application not responding');
                        });
  }

  /**
   * Gets Previous Row of Table
   * 
   * @param  {string}   table    Table Name
   * @param  {string}   fieldkey Field Key
   * @param  {int}      key      Key Value
   * @param  {string}  where    Where condition '*' not where
   * @param  {Function} callback CallBack Function
   */
  this.previous = function(table, fieldkey, key, where, callback){
    var url = "/api/previous/" + table + "/" + fieldkey + "/" + key + "/" + where + "?auth=" + authKey;

    // Get
    $.get(url, callback).error(
                        function(){
                            console.log('Application not responding');
                        });
  }

  /**
   * Gets Next Row of Table
   * 
   * @param  {string}   table    Table Name
   * @param  {string}   fieldkey Field Key
   * @param  {int}      key      Key Value
   * @param  {string}   where    Where condition '*' not where
   * @param  {Function} callback CallBack Function
   */
  this.next = function(table, fieldkey, key, where, callback){
    var url = "/api/next/" + table + "/" + fieldkey + "/" + key + "/" + where + "?auth=" + authKey;

    // Get
    $.get(url, callback).error(
                        function(){
                            console.log('Application not responding');
                        });
  }

  /**
   * Get Last Row of Table
   * 
   * @param  {string}   table    Table Name
   * @param  {string}   fieldkey Field Key
   * @param  {string}   where    Where condition '*' not where
   * @param  {Function} callback CallBack Function
   */
  this.last = function(table, fieldkey, where, callback){
    var url = "/api/last/" + table + "/" + fieldkey + "/0/" + where + "?auth=" + authKey;

    // Get
    $.get(url, callback).error(
                        function(){
                            console.log('Application not responding');
                        });
  }

  /**
   * Execute Stored Procedure from Api
   * 
   * @param  {string}   procedure  Procedure Name
   * @param  {JSON}     parameters JSON Parameters of Stored Procedure
   * @param  {Function} callback   CallBack Function
   */
  this.procedure = function(procedure, parameters, callback){
    var url = "/api/procedure/" + procedure + "?auth=" + authKey;

    $.post(url, parameters, callback).error(
                        function(){
                            console.log('Application not responding');
                        });
  }

  /**
   * Execute Remote SQL Script from Api
   * 
   * @param  {string}   scriptName SQL Script Name
   * @param  {JSON}     parameters JSON Parameters of Script
   * @param  {Function} callback   CallBack Function
   */
  this.script = function (scriptName, parameters, callback) {
      var url = "/api/script/" + scriptName + "?auth=" + authKey;

      $.post(url, parameters, callback).error(
                          function () {
                              console.log('Application not responding');
                          });
  }
}

/**
 * Check Local Storage
 * 
 * @return {boolean}
 */
netWf.checkStorage = function(){
	if(typeof(Storage) !== "undefined") {
		return true;
	} else {
	    return false;
	}
}

/**
 * Check User and Password
 * 
 * @param  {string}   user     User Login
 * @param  {string}   password Password
 * @param  {Function} callback CallBack Function
 */
netWf.login = function(user, password, callback){
    var url = "/user"

    var jsonParams = {'user':user, 'password':password};

    $.post(url, jsonParams, callback).error(
                        function(){
                            console.log('Application not responding');
                        });
}

/**
 * Validate Key
 * 
 * @param  {Function} callback CallBack Function
 */
netWf.validateKey = function(callback) {
	var url = "/key";
	var key = localStorage.netkey;

	if(typeof(key) == "undefined") {
	    key = "";
	}
	var jsonParams = {'key':key};

	$.post(url, jsonParams, callback).error(
                        function(){
                            console.log('Application not responding');
                        });
}

/**
 * Get netWf Key
 * 
 * @return {string}
 */
netWf.getKey = function() {
	return localStorage.netkey;
}

/**
 * Save Key on LocalStorage
 * @param  {string} key Valid Key
 */
netWf.saveKey = function(key) {
	localStorage.netkey = key;
}