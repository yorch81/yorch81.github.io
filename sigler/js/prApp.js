/**
 * PetRide Application
 */
function prApp(){  
}

/**
 * PetRide is Mobile
 * 
 * @type {Boolean}
 */
prApp.isMobile = false;

/**
 * PetRide DataBase
 * 
 * @type {Data}
 */
prApp.db = null;

/**
 * PetRide WebServices URL
 * 
 * @type {String}
 */
prApp.url = 'https://petride.mx/app';

/**
 * Default Header
 * 
 * @type {String}
 */
prApp.header = 'PetRide';

/**
 * Initialize Application
 */
prApp.initialize = function () {
	prApp.db = new Data(prApp.url, prCnf.getKey());
}

/**
 * Goto Index
 */
prApp.gotoIndex = function () {
	if (prApp.isMobile)
		window.location = "index.html";
	else
		window.location = prApp.url;
}

/**
 * Goto Login
 */
prApp.gotoLogin = function () {
	if (prApp.isMobile)
		window.location = "login.html";
	else
		window.location = "/login";
}

/**
 * Goto Map
 */
prApp.gotoMap = function () {
	if (confirm("Goto Map?")){
		if (prApp.isMobile)
			window.location = "map.html";
		else
			window.location = "/map";
	}
}

/**
 * Goto Perfil
 */
prApp.gotoPerfil = function () {
	if (prApp.isMobile)
		window.location = "perfil.html";
	else
		window.location = "/perfil";
}

/**
 * Goto Mascotas
 */
prApp.gotoPets = function () {
	if (prApp.isMobile)
		window.location.assign("pets.html");
	else
		window.location.assign("/pets");
}

/**
 * Goto Paseos
 */
prApp.gotoRide = function () {
	if (prApp.isMobile)
		window.location.assign("paseos.html");
	else
		window.location.assign("/paseos");
}

/**
 * Goto Ayuda
 */
prApp.gotoHelp = function () {
	prApp.gotoMap();
	//$(':mobile-pagecontainer').pagecontainer('change', '#mnu_ride');
}

/**
 * Goto Back
 */
prApp.gotoBack = function () {
	window.history.back();
}

/**
 * Goto Logout Web
 */
prApp.logout = function () {
	if (prApp.isMobile)
		navigator.app.exitApp();
	else
		window.location = "./logout";
}

/**
 * Show Processing
 */
prApp.processShow = function () {
	//$.mobile.loading("show", {text:"PetRide", textVisible:true});
    $.mobile.loading("show");
}
/**
 * Hide Processing
 */
prApp.processHide = function () {
	$.mobile.loading("hide");
}

/**
 * Get PetRide Id
 */
prApp.getId = function () {
	var jsonParams = {'pSocType':prCnf.getItem("social_type"), 'pSocId':prCnf.getItem("social_id")};

	prApp.db.execute("sp_getid", jsonParams, 
              function(response, status){
                if (status == "success"){
                	if (response.length > 0)
                		prCnf.saveItem("prid", response[0]["ID"]);
                	else
                		prApp.gotoPerfil();
                }
                else{
                  console.log(response);
                }
              });			
}