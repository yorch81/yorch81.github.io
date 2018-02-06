/**
 * PetRide Map
 */
function prMap(){  
}

/**
 * Google Map
 * 
 * @type {google.maps.Map}
 */
prMap.map = null;

/**
 * PetRide Marker
 * 
 * @type {google.maps.Marker}
 */
prMap.marker = null;

/**
 * Latitude
 * 
 * @type {Number}
 */
prMap.lat = 19.4326646;

/**
 * Longitude
 * 
 * @type {Number}
 */
prMap.lng = -99.1333995;

/**
 * Watch Position Id
 * @type {int}
 */
prMap.wId = 0;

/**
 * SocketIO Instance
 * 
 * @type {SocketIO}
 */
prMap.socket = null;

/**
 * SocketIO URL
 * 
 * @type {String}
 */
prMap.sockUrl = "https://922d3e96.ngrok.io";

/**
 * SocketIO Room 
 * 
 * @type {String}
 */
prMap.room = 'petride';

/**
 * Check if send Location
 * 
 * @type {Boolean}
 */
prMap.sendLoc = false;

/**
 * Load Google Maps
 *
 * @param  {String} targetDiv Div Target
 */
prMap.loadMap = function(targetDiv){
	var dOptions = {
		zoom: 15,
    	center: prMap.getLatLng(),
    	streetViewControl: false,
    	mapTypeId: google.maps.MapTypeId.ROADMAP
  	};

	prMap.map = new google.maps.Map(document.getElementById(targetDiv), dOptions);

	prMap.setMarker();
}

/**
 * Get Last Location
 * 
 * @return {google.maps.LatLng} Google Maps Location
 */
prMap.getLatLng = function(){
	return new google.maps.LatLng(prMap.lat, prMap.lng);
}

/**
 * Set Marker
 */
prMap.setMarker = function(){
	if (prMap.marker == null){
		prMap.marker = new google.maps.Marker({
										        position: prMap.getLatLng(),
										        map: prMap.map,
										        draggable: true,
										        icon: 'css/img/pets_green.png',
										        title: "Mi Mascota"
										      });

		prMap.listenDrag();
	}
	else{
		prMap.marker.setPosition(prMap.getLatLng());
		prMap.map.setCenter(prMap.getLatLng());
	}
}

/**
 * Get Current Location
 */
prMap.getLocation = function(){
  // Get Current Location
  if (navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(prMap.success, prMap.fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
  }
  else{
    console.log("Geolocation is not supported");
  }
}

/**
 * Success get location
 * 
 * @param  {Object} pos Current Location
 */
prMap.success = function(pos){
	if (typeof(pos) != "undefined"){
		prMap.lat = pos.coords.latitude;
		prMap.lng = pos.coords.longitude;
	}

	prMap.setMarker();
}

/**
 * Fail get Location
 * 
 * @param  {Object} error [description]
 */
prMap.fail = function(error){
	console.log("Geolocation is not supported " + error.message);
	prMap.setMarker();
}

/**
 * Find Address Coordinate
 * 
 * @param  {String} address Addredd
 */
prMap.findAddress = function(address){
  // Google GeoCoder
  var geocoder = new google.maps.Geocoder();
  
  // Find Address
  geocoder.geocode({'address': address}, prMap.geocodeResult);
}

/**
 * Geocode Result Callback
 * 
 * @param  {Object} results Geometry results
 * @param  {string} status  Status 
 */
prMap.geocodeResult = function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();

        prMap.lat = lat;
        prMap.lng = lng;
        prMap.setMarker();
    }
    else {
        console.log("Address not Found");
    }
}

/**
 * Get Address of Coordinate
 */
prMap.addressLatLng = function(){
  // Google GeoCoder
  var geocoder = new google.maps.Geocoder();
  
  // Find Address
  geocoder.geocode({'location': prMap.getLatLng()}, prMap.geocodeRevResult);
}

/**
 * Revert Geocode Result Callback
 * 
 * @param  {Object} results Geometry results
 * @param  {string} status  Status 
 */
prMap.geocodeRevResult = function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
        	console.log(results[0].formatted_address);
        }
    }
    else {
        console.log("Address not Found");
    }
}

/**
 * Draw Ride Route in Map
 * 
 * @param  {int} id Id Ride
 */
prMap.drawRide = function (id) {
	var jsonData = {'pTable':'GET_RIDE', 'pwhere':id};

    prApp.db.execute("sp_loadtable", jsonData, 
      function(response, status){
        if (status == "success"){
        	var data = response;
        	var ridePoints = [];

        	for(var i=0; i<data.length; i++){
        		ridePoints.push({lat: parseFloat(data[i]['lat']), lng: parseFloat(data[i]['lng'])});
        	}

        	var gmRide = new google.maps.Polyline({
  			    path: ridePoints,
  			    geodesic: true,
  			    strokeColor: '#FF0000',
  			    strokeOpacity: 1.0,
  			    strokeWeight: 2
  			  });

        	// Draw Route
        	gmRide.setMap(prMap.map);
        }
        else{
          console.log(response);
        }
      });
}

/**
 * Get Distance to Coordinate
 * 
 * @param  {float} lat Latitude
 * @param  {float} lng Longitude
 */
prMap.getDistance = function (lat, lng) {
	var start = new google.maps.LatLng(prMap.lat, prMap.lng);
    var end = new google.maps.LatLng(lat, lng);

    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
    };

    // Google Direction Service
    var directionsService = new google.maps.DirectionsService();

    directionsService.route(request, function (response, status) {
    	var gLegs = response['routes'][0]['legs'];
    	var mDistance = gLegs[0]['distance'].value;
    	var lSteps = gLegs[0]['steps'].length;

    	var distKm = "Distancia aprox. " + (mDistance / 1000).toString() + " Kms";

    	alert(distKm);

    	var routePoints = [];

    	// Add Legs Points
        for (i = 0; i < lSteps; i++) {
            path = gLegs[0]['steps'][i]['path'];
            lPath = path.length;
            for (j = 0; j < lPath; j++) {
                var curLat = path[j].lat();
                var curLng = path[j].lng();

                routePoints.push({lat: curLat, lng: curLng});
            }
        }

        var gmRide = new google.maps.Polyline({
			    path: routePoints,
			    geodesic: true,
			    strokeColor: '#00FF00',
			    strokeOpacity: 1.0,
			    strokeWeight: 2
			  });

    	// Draw Route
    	gmRide.setMap(prMap.map);
    });
}

/**
 * Listen DragEnd Event of Marker
 */
prMap.listenDrag = function(){
	if (prMap.marker != null){
		google.maps.event.addListener(prMap.marker,'dragend',function(event) {
			prMap.lat = this.position.lat();
			prMap.lng = this.position.lng();
	    });
	}
}

/**
 * Move Marker to New Location
 * 
 * @param  {Geoposition} position Location
 */
prMap.showLocation = function(position){
  // Location Changes
  if (prMap.locChange(position)){
    // Send Location
    if (prMap.sendLoc) {
      var sPos = position.coords.latitude + ',' + position.coords.longitude;

      // Send Location
      prMap.socket.emit('new_location', sPos, prMap.room);

      // Add Point
      prMap.addPoint(1, prMap.lat, prMap.lng);  
    }
    else{
      prMap.lat = position.coords.latitude;
      prMap.lng = position.coords.longitude;

      prMap.setMarker();
    }
  }
}

/**
 * Check if location Changes
 * 
 * @param  {Geoposition} position Location
 * @return {Boolean}
 */
prMap.locChange = function(position){
  var retValue = false;

  if (prMap.lat != position.coords.latitude | prMap.lng != position.coords.longitude)
    retValue = true;

  return retValue;
}

/**
 * Error Location Handler
 * 
 * @param  {int} error Error Number
 */
prMap.errorHandler = function(error){
  var errors = { 1: 'Permission Denied', 2: 'Unavaliable Location', 3: 'Timeout expired'}; 
  console.log("Error: " + errors[error.code]); 
}

/**
 * Start Watch Position
 */
prMap.startWatch = function(){
  var options = { enableHighAccuracy : true, maximumAge : 30000, timeout : 27000 };

  prMap.wId = navigator.geolocation.watchPosition(prMap.showLocation, prMap.errorHandler, options);
}

/**
 * Stop Watch Position
 */
prMap.stopWatch = function(){
  navigator.geolocation.clearWatch(prMap.wId);

  prMap.wId = 0;
}

/**
 * Connect SocketIO
 */
prMap.connect = function(){
  prMap.socket = io.connect(prMap.sockUrl, { 'forceNew': true });

  prMap.socket.on('connect', function() {
        prMap.socket.emit('room', prMap.room);
      });
}

/**
 * Start Listen Spy
 */
prMap.startSpy = function(){
  prMap.socket.on('new_location', function(msg){
      console.log(msg);
      var aCoord = msg.split(",");
      var spyLat = aCoord[0];
      var spyLng = aCoord[1];

      prMap.lat = spyLat;
      prMap.lng = spyLng;
      prMap.setMarker();
    });
}

/**
 * Add Route Point
 * 
 * @param {int} idPaseo Id Paseo
 * @param {float} lat     Latitude
 * @param {float} lng     longitude
 */
prMap.addPoint = function (idPaseo, lat, lng) {
  var jsonData = {'pIdPaseo':idPaseo, 'pLat':lat, 'pLng':lng};

  prApp.db.execute("sp_addpoint", jsonData, 
    function(response, status){
      if (status == "success"){
        console.log(response);
      }
      else{
        console.log(response);
      }
    });
}



