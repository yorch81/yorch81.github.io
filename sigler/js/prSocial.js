/**
 * PetRide Social Wrapper
 */
function prSocial(){  
}

/**
 * Social Type
 * @type {String}
 */
prSocial.type = null;

/**
 * Facebook ID App
 * @type {String}
 */
prSocial.fbid = '576710425853299';

/**
 * Google ID App
 * 
 * @type {String}
 */
prSocial.goid = '1080049923911-qljtpg2lpects4mpmtnhee0tgjfjtcva.apps.googleusercontent.com';

/**
 * Google SignOut
 */
prSocial.goSignOut = function(){
	var auth2 = gapi.auth2.getAuthInstance();

	auth2.signOut().then(function () {
    	console.log('User signed out.');

    	localStorage.removeItem("social_type");
    	prApp.gotoLogin();
  	});
}

/**
 * Facebook SignOut
 */
prSocial.fbSignOut = function(){
	FB.logout(function(response) {
		console.log(response);

		localStorage.removeItem("social_type");
		prApp.gotoLogin();
	});
}

/**
 * Set Social Session Variables
 * 
 * @param {String} type FB Facebook GP Google
 * @param {String} id   Social ID
 * @param {String} token   Social Token
 * @param {String} name Social Name
 * @param {String} link Social Link
 * @param {String} img  Profile Image Link
 */
prSocial.setSession = function(type, id, token, name, link, img){
	if (prSocial.type == null){
		prSocial.type = type;

		prCnf.saveItem("social_type", type);
      	prCnf.saveItem("social_id", id);
      	prCnf.saveItem("social_token", token);
      	prCnf.saveItem("social_name", name);
      	prCnf.saveItem("social_link", link);
      	prCnf.saveItem("social_img", img);

      	// Goto Index
      	if (prSocial.isLogin())
      		prApp.gotoIndex();
	}
}

/**
 * Logout
 */
prSocial.logout = function(){
	localStorage.removeItem("social_id");
	localStorage.removeItem("social_token");
	localStorage.removeItem("social_name");
	localStorage.removeItem("social_link");
	localStorage.removeItem("social_img");
	localStorage.removeItem("prid");
	localStorage.removeItem("prkey");

	if (prCnf.getItem("social_type") == 'FB'){
		prSocial.fbSignOut();
	}
	else{
		prSocial.goSignOut();
	}
}

/**
 * Validate Session
 */
prSocial.validate = function(){
	if (!prSocial.isLogin() & prCnf.getItem("social_id") == null)
      prApp.gotoLogin();
}

/**
 * Return true if the page is login
 * 
 * @return {Boolean} 
 */
prSocial.isLogin = function(){
	if (window.location.pathname == '/login' | window.location.pathname == '/login.html')
		return true;
	else
		return false;
}