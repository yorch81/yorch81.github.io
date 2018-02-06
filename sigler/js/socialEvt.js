/**
 * Google OnSignIn Event
 * 
 * @param  {googleUser} googleUser Google User
 */
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var gpUrl = 'https://plus.google.com/u/0/' + profile.getId();

  var id_token = googleUser.getAuthResponse().id_token;

  prSocial.setSession('GP', profile.getId(), id_token, profile.getName(), gpUrl, profile.getImageUrl());
}

/**
 * Facebook Status Change Callback
 * 
 * @param  {response} response Facebook API Response
 */
function statusChangeCallback(response) {
  if (response.status === 'connected') {
    signInCb(response.authResponse.accessToken);
  } else if (response.status === 'not_authorized') {
    prSocial.validate();
  } else {
    prSocial.validate();

    console.log('Please log into Facebook.');
  }
}

/**
 * Check login state
 */
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

/**
 * Initialize Facebook API
 */
window.fbAsyncInit = function() {
  FB.init({
    appId      : prSocial.fbid,
    cookie     : true,  
    xfbml      : true,  
    version    : 'v2.8'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

/**
 * Autoload Facebook Js SDK
 * 
 * @param  {DOM} d  DOM
 * @param  {String} s  Script Tag
 * @param  {String} id Facebook SDK ID
 */
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_LA/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/**
 * Facebook SignIn CallBack
 * 
 * @param  {String} token Facebook Access Token
 */
function signInCb(token) {
  FB.api('/me?fields=id,name,link', function(response) {
    var fbid = response["id"];
    var fbname = response["name"];
    var fblink = response["link"];
    var fbimg = 'https://graph.facebook.com/' + response["id"] + '/picture?type=large';

    prSocial.setSession('FB', fbid, token, fbname, fblink, fbimg);
  });
}
