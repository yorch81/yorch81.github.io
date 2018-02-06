/**
 * PetRide Login Application
 */
function prLogin(){  
}

/**
 * Login Error Number
 * 
 * @type {String}
 */
prLogin.errno = '0';

/**
 * Validate Login
 * 
 * @return {Boolean}
 */
prLogin.valLogin = function () {
    var email = $('#txt_email').val();
    var pwd = $('#txt_pwd').val();

    if (! prUtils.validateMail(email)){
        prLogin.showMsg("#pu_login", "Correo Electrónico incorrecto");
        return false;
    }

    if (pwd.length == 0){
        prLogin.showMsg("#pu_login", "Debe capturar password");
        return false;
    }

    return true;
}

/**
 * Validate User
 * 
 * @param  {Boolean} pwd validate Password
 * @return {Boolean}      [description]
 */
prLogin.valNew = function (pwd) {
    var nombre = $('#txtNombre').val();
    //var apellido = $('#txtApellido').val();
    var email = $('#txt_emailn').val();
    var tel = $('#txtCel').val();
    var pwdn = $('#txt_pwdn').val();
    var pwdc = $('#txt_pwdc').val();

    if (nombre.length == 0){
        Notify("Captura tu Nombre", null, null);
        return false;
    }

    /*
    if (apellido.length == 0){
        Notify("Debe capturar su Apellido", null, null);
        return false;
    }
    */
    if (! prUtils.validateMail(email)){
        Notify("Correo Electrónico incorrecto", null, null);
        return false;
    }

    if (tel.length < 10){
        Notify("Captura un teléfono válido", null, null);
        return false;
    }
    
    return true;
}

/*prLogin.valNew = function (pwd) {
    var nombre = $('#txtNombre').val();
    var apellido = $('#txtApellido').val();
    var email = $('#txt_emailn').val();
    var tel = $('#txtCel').val();
    var pwdn = $('#txt_pwdn').val();
    var pwdc = $('#txt_pwdc').val();

    if (nombre.length == 0){
        prLogin.showMsg("#pu_new", "Debe capturar su Nombre");
        return false;
    }

    if (apellido.length == 0){
        prLogin.showMsg("#pu_new", "Debe capturar su Apellido");
        return false;
    }

    if (! prUtils.validateMail(email)){
        prLogin.showMsg("#pu_new", "Correo Electrónico incorrecto");
        return false;
    }

    if (tel.length < 12){
        prLogin.showMsg("#pu_new", "Debe capturar un teléfono válido");
        return false;
    }

    if (pwd){
        if (pwdn.length < 6){
            prLogin.showMsg("#pu_new", "Su password debe tener al menos 6 caracteres");
            return false;
        }

        if (pwdn != pwdc){
            prLogin.showMsg("#pu_new", "Los passwords deben coincidir");
            return false;
        }

        var reNum = /[0-9]/;
        if(!reNum.test(pwdn)){
            prLogin.showMsg("#pu_new", "Su password debe tener al menos 1 Número");
            return false;
        }

        var reUpp = /[A-Z]/;
        if(!reUpp.test(pwdn)) {
            prLogin.showMsg("#pu_new", "Su password debe tener al menos 1 Mayúscula");
            return false;
        }

    }
    
    return true;
}*/

/**
 * Check Login
 * 
 * @return {Boolean}
 */
prLogin.chkLogin = function () {
    var url = prApp.url + "/login/json";

    var jsonParams = {'pMail':$('#txt_email').val(), 'pPwd':$('#txt_pwd').val()};

    $.post(url, JSON.stringify(jsonParams), 
    function(response, status){
        var jResp = JSON.parse(response);

        if (jResp['ERRNO'] == '0'){
            prCnf.saveKey(jResp['PRKEY']);
            prCnf.saveItem("prid", jResp['PR_ID']);
            prCnf.saveItem("social_img", "img/user.png");
            prCnf.saveItem("social_type", "MA");

            if (prApp.isMobile )
                prLogin.gotoVerify();
        }
        else{
            prLogin.errno = jResp['ERRNO'];
            prLogin.showError();
        }
    }).error(function(){
        console.log('Application not responding');
    });

    return false;
}

/**
 * Add New Client
 */
prLogin.chkNew = function () {
    var url = prApp.url + "/new/json";

    var jsonParams = {'pNombre':$('#txtNombre').val(), 'pPaterno':$('#txtApellido').val(), 
                      'pTel':$('#txtCel').val(), 'pMail':$('#txt_emailn').val(), 'pPwd':$('#txt_pwdn').val()};

    $.post(url, JSON.stringify(jsonParams), 
    function(response, status){
        var jResp = JSON.parse(response);
        
        if (jResp['ERRNO'] == '0'){
            prCnf.saveKey(jResp['PRKEY']);
            prCnf.saveItem("prid", jResp['PR_ID']);
            prCnf.saveItem("social_img", "img/user.png");
            prCnf.saveItem("social_type", "MA");
            prCnf.saveItem("social_name", $('#txtNombre').val());
            prCnf.saveItem("social_last", $('#txtApellido').val());
            prCnf.saveItem("social_mail", $('#txt_emailn').val());
            
            prCnf.saveItem("per_telefono", $('#txtCel').val());


            if (prApp.isMobile )
                prLogin.gotoVerify();
        }
        else{
            prLogin.errno = jResp['ERRNO'];
            prLogin.showError();
        }
    }).error(function(){
        console.log('Application not responding');
    });

    return false;
}

/**
 * Show Error Message
 */
prLogin.showError = function () {
    if (prLogin.errno > 0){
        switch(prLogin.errno) {
            case '1':
                if (prApp.isMobile)
                    prLogin.showMsg("#pu_login", "La Cuenta de Correo no se encuentra registrada");
                else
                    prLogin.showMsg("#pu_index", "La Cuenta de Correo no se encuentra registrada");
                break;
            case '2':
                if (prApp.isMobile)
                    prLogin.showMsg("#pu_login", "El password es incorrecto");
                else
                    prLogin.showMsg("#pu_index", "El password es incorrecto");
                break;
            case '3':
                if (prApp.isMobile)
                    prLogin.showMsg("#pu_new", "La Cuenta de Correo ya se encuentra registrada");
                else
                    prLogin.showMsg("#pu_index", "La Cuenta de Correo ya se encuentra registrada");
                break;
            case '4':
                if (prApp.isMobile)
                    prLogin.showMsg("#pu_new", "El Teléfono ya se encuentra registrado");
                else
                    prLogin.showMsg("#pu_index", "El Teléfono ya se encuentra registrado");
                break;
        }
    }
}

/**
 * Show Message Popup
 * 
 * @param  {String} widget  Widget Selector
 * @param  {String} message Message
 */
prLogin.showMsg = function (widget, message) {
    $(widget).html('<p>' + message + '</p>');
    $(widget).popup("open");
}

/**
 * Listen Button Events
 */
prLogin.listen = function () {
    // SigIn
    $("#btn_signin").click(function() {
        $(':mobile-pagecontainer').pagecontainer('change', '#login');
    });

    // New
    $("#btn_new").click(function() {
        $(':mobile-pagecontainer').pagecontainer('change', '#new');
    });

    // Validate Login
    $('#pr_form').submit(function() {
        return prLogin.valLogin();
    });

    // Validate New
    $('#pr_new').submit(function() {
        prCnf.saveItem("per_telefono", $('#txtCel').val());

        return prLogin.valNew(true);
    });

    // Login Mobile
    $("#btn_jslogin").click(function() {
        if (prLogin.valLogin()){
            prLogin.chkLogin();
        }
    });

    // New Mobile
    $("#btn_jsnew").click(function() {
        if (prLogin.valNew(true)){
            prLogin.chkNew();
        }
    });

    $('#btn_sublogin').button();
    $('#btn_subnew').button();
    
    // Hide Buttons
    if (prApp.isMobile){
        $("#btn_jslogin").show();
        $("#btn_jsnew").show();
        $("#btn_sublogin").closest('.ui-btn').hide();
        $("#btn_subnew").closest('.ui-btn').hide();
    }
    else{
        $("#btn_jslogin").hide();
        $("#btn_jsnew").hide();
        $("#btn_sublogin").closest('.ui-btn').show();
        $("#btn_subnew").closest('.ui-btn').show();
    }
}

/**
 * Goto Verify
 */
prLogin.gotoVerify = function() {
    window.location = "verify.html";
}
