/**
 * PetRide Cam
 */
function prCam(){
}

/**
 * Check if camera is frozen
 * 
 * @type {Boolean}
 */
prCam.isFrozen = false;

/**
 * Load WebCam
 * 
 * @param  {Boolean} resize On resize
 */
prCam.load = function(resize = false) {
	if (resize){
		var winH = $( window ).height();
		var winW = $( window ).width();

		var footH = $("#pr_footer").height();
		var footW = $("#pr_footer").width();
		var camH = winH - footH;

		Webcam.set({
			width: winW,
			height: camH,
	      	dest_width: winW,
	      	dest_height: camH,
	      	image_format: 'png',
	      	jpeg_quality: 90,
	      	force_flash: false
	  	});

		Webcam.attach( '#pr_cam' );
	}
	else{
		Webcam.set({
			image_format: 'png',
			jpeg_quality: 90,
			force_flash: false
		});

	  	Webcam.attach( '#pr_cam' );
	}
}

/**
 * Reset WebCam
 */
prCam.reset = function() {
	Webcam.reset();
}

/**
 * Freze WebCam
 */
prCam.freeze = function() {
	Webcam.freeze();
	prCam.isFrozen = true;
}

/**
 * Unfreze WebCam
 */
prCam.unfreeze = function() {
	Webcam.unfreeze();

	prCam.isFrozen = false;
}

/**
 * Upload Picture
 */
prCam.upload = function() {
	Webcam.snap( function(data_uri) {
		var data_image = data_uri;

    	Webcam.upload( data_image, '/webcam', function(code, text) {
    		prToast.show("Su Foto se subió correctamente");
    	});
  	});
}


