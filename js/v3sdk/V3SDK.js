/**
 * V3ctor WareHouse JavaScript SDK
 * 
 * @author Jorge Alberto Ponce T. <the.yorch@gmail.com>
 * @license Apache-2.0
 * @version 1.0.0
 * @constructor
 * 
 * @param {string} url V3ctor Warehouse URL
 * @param {string} key V3ctor Warehouse Authentication Key
 */
function V3SDK(url, key){

	/**
	 * Finds Object by Id
	 * 
	 * @param  {string}   entity   Entity Name
	 * @param  {string}   _id      Mongo id
	 * @param  {Function} callback CallBack Function
	 */
	this.findObject = function(entity, _id, callback){
		var v3Url = url + '/jsonp/get/' + entity + "/" + _id + "?auth=" + key;

		$.ajax({
			url: v3Url,
			jsonp: "callback",
			type: 'GET',
			dataType: "jsonp",
			crossDomain: true,
            
            success: callback
        }).error(function(jqXHR, textStatus, errorThrown){
              console.log('Application not responding');
          });
	}

	/**
	 * Execute Query with jsonQuery Pattern
	 * 
	 * @param  {string}   entity    Entity Name
	 * @param  {JSON}     jsonQuery JSON Query Object
	 * @param  {Function} callback  CallBack Function
	 */
	this.query = function(entity, jsonQuery, callback){
		var v3Url = url + '/jsonp/query/' + entity + "?auth=" + key;
		
		$.ajax({
			url: v3Url,
			jsonp: "callback",
			type: 'GET',
			dataType: "jsonp",
			crossDomain: true,
			data: "data=" + JSON.stringify(jsonQuery),
            
            success: callback
        }).error(function(jqXHR, textStatus, errorThrown){
              console.log('Application not responding');
          });
	}

	/**
	 * Insert New JSON Object
	 * 
	 * @param  {string}   entity   Entity Name
	 * @param  {JSON}     v3Object JSON Object
	 * @param  {Function} callback CallBack Function
	 */
	this.newObject = function(entity, v3Object, callback){
		var v3Url = url + '/jsonp/new/' + entity + "?auth=" + key;

		$.ajax({
			url: v3Url,
			jsonp: "callback",
			type: 'GET',
			dataType: "jsonp",
			crossDomain: true,
			data: "data=" + JSON.stringify(v3Object),
            
            success: callback
        }).error(function(jqXHR, textStatus, errorThrown){
              console.log('Application not responding');
          });
	}

	/**
	 * Updates an Object by Id
	 * 
	 * @param  {string}   entity   Entity Name
	 * @param  {string}   _id      Mongo id
	 * @param  {JSON}     v3Object JSON Object
	 * @param  {Function} callback CallBack Function
	 */
	this.updateObject = function(entity, _id, v3Object, callback){
		var v3Url = url + '/jsonp/upd/' + entity + "/" + _id + "?auth=" + key;

		$.ajax({
			url: v3Url,
			jsonp: "callback",
			type: 'GET',
			dataType: "jsonp",
			crossDomain: true,
			data: "data=" + JSON.stringify(v3Object),
            
            success: callback
        }).error(function(jqXHR, textStatus, errorThrown){
              console.log('Application not responding');
          });
	}

	/**
	 * Delete an Object by Id
	 * 
	 * @param  {string}   entity   Entity Name
	 * @param  {string}   _id      Mongo id
	 * @param  {Function} callback CallBack Function
	 */
	this.deleteObject = function(entity, _id, callback){
		var v3Url = url + '/jsonp/del/' + entity + "/" + _id + "?auth=" + key;
		
		$.ajax({
			url: v3Url,
			jsonp: "callback",
			type: 'GET',
			dataType: "jsonp",
			crossDomain: true,
            
            success: callback
        }).error(function(jqXHR, textStatus, errorThrown){
              console.log('Application not responding');
          });
	}

}

/**
 * Gets the Id of Object
 * 
 * @param  {JSON} v3Object JSON Object
 * @return {string}
 */
V3SDK.getId = function(v3Object){
	objId = v3Object['_id'];

	return objId['$id'];
}