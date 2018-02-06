/**
 * PetRide Verify User
 */
function prVerify(){  
}

/**
 * Action
 * 
 * @type {Number}
 */
prVerify.action = 0;

/**
 * Es Cliente
 * 
 * @type {Boolean}
 */
prVerify.esCliente = false;

/**
 * Es Paseador
 * 
 * @type {Boolean}
 */
prVerify.esPasea = false;

/**
 * Load Default Data
 */
prVerify.loadData = function () {
	$("#imgUsr").attr("src", prCnf.getItem("social_img"));

	$("#txtNombre").val(prCnf.getItem("social_name"));
	$("#txtApellido").val(prCnf.getItem("social_last"));
	$("#txt_emailn").val(prCnf.getItem("social_mail"));

	if (prCnf.getItem("social_type") == 'MA'){
		$("#txtCel").val(prCnf.getItem("per_telefono"));
	}
}

/**
 * Add New Social Client
 */
prVerify.chkNew = function () {
	var url = prApp.url + "/newsoc";

	var nCliente = 0;
	var nPaseador = 0;

	nPaseador = 1;

	if (nCliente + nPaseador == 0)
		Notify("Debe Seleccionar un Tipo de Cuenta", null, null);
	else {
		var jsonParams = {'pId': prCnf.getItem("prid"),'pNombre':$('#txtNombre').val(), 'pPaterno':'', 
					  'pTel':'52' + $('#txtCel').val(), 'pMail':$('#txt_emailn').val(), 'pPwd':'',
					  'pFbId':'', 'pGpId':'', 'pCli':nCliente, 'pPas':nPaseador};

		if (prCnf.getItem("social_type") == 'FB')
			jsonParams['pFbId'] =  prCnf.getItem("social_id");
		else
			jsonParams['pGpId'] = prCnf.getItem("social_id");

		prCnf.saveItem("per_email", $('#txt_emailn').val());
		prCnf.saveItem("per_nombre", $('#txtNombre').val());

	    $.post(url, JSON.stringify(jsonParams), 
	    function(response, status){
	        var jResp = JSON.parse(response);

	        if (jResp['ERRNO'] == -1) {
				Notify("La Cuenta de Facebook ya se encuentra registrada", null, null);
			} else if (jResp['ERRNO'] == -2) {
			    Notify("La Cuenta de Google ya se encuentra registrada", null, null);
			} else if (jResp['ERRNO'] == -3) {
			    Notify("La Cuenta de Correo ya se encuentra registrada", null, null);
			} else if (jResp['ERRNO'] == -4) {
			    Notify("El Teléfono ya se encuentra registrado", null, null);
			} else {
				prCnf.saveItem("prid", jResp['PR_ID']);
    			prCnf.saveItem("per_telefono", $('#txtCel').val());
    			prVerify.action = 2;
			
				Notify("Ahora debes seleccionar las zonas de tu preferencia", null, null);

				prVerify.loadZonas();

				setTimeout(function(){
					$('#btn_failsms').show();
				}, 120000);

			}
	    }).error(function(){
	    	console.log('Application not responding');
	    });
	}

	return false;
}

/**
 * Load Zonas
 */
prVerify.loadZonas = function () {
	$("#datos_per").hide();

	var url = prApp.url + "/zonas";
	var jsonParams = {};

	$.post(url, JSON.stringify(jsonParams), 
	    function(response, status){
	        var jResp = JSON.parse(response);
	        
	        var html = new EJS({ url: 'js/rec_zonas.ejs' }).render(jResp);
	        $('#grd_zonas').html(html);

	        $("#val_zonas").delay("fast").fadeIn();
	    }).error(function(){
	    	console.log('Application not responding');
	    });
}

/**
 * Save Zonas
 */
prVerify.saveZonas = function () {
	var url = prApp.url + "/savezonas";
	var jsonParams = {};

	var iduser = prCnf.getItem("prid");

	var selZonas = 0;

	$(".zona").each(function( index ) {
	    var chk = $(this).prop("checked");
	    var idZona = $(this).val();

	    if (chk) {
	    	selZonas++;

	    	var zUrl = url + "/" + iduser.toString() + "/" + idZona.toString();

	    	$.post(zUrl, JSON.stringify(jsonParams), 
		    function(response, status){
		        console.log(response);
		    }).error(function(){
		    	console.log('Application not responding');
		    });
	    }
	});

	if (selZonas > 0) {
		petAlert.show("Tu cuenta ha sido validada, en breve recibirás un SMS con un Código para verificar tu Móvil", 
		function(){
			prVerify.showSMS();
		});

		prVerify.sendSMS();

		setTimeout(function(){
			$('#btn_failsms').show();
		}, 120000);
	}
	else{
		$("#zone-alert").modal({
	      backdrop: 'static',
	      keyboard: false
	    });
	}
}

/**
 * Send SMS
 */
prVerify.sendSMS = function () {
	var url = prApp.url + "/sms";

	var jsonParams = {'pId': prCnf.getItem("prid"), 'pNombre':prCnf.getItem("per_nombre"), 'pTel':'52' + prCnf.getItem("per_telefono")};

	$.post(url, JSON.stringify(jsonParams), 
    function(response, status){
        var jResp = JSON.parse(response);
        console.log(response);

        prCnf.saveItem("sms_time", new Date().getTime());
    }).error(function(){
    	console.log('Application not responding');
    });
}

/**
 * Validate SMS
 */
prVerify.valSMS = function () {
	var jsonParams = {'pId': prCnf.getItem("prid"), 'pSms':$('#txtCode').val()};

	prApp.db.execute("sp_validasms", jsonParams, 
              function(response, status){
                if (status == "success"){
                	if (response[0]["MSG"] == 0){
                		// Send Mail
                		prVerify.sendMail(1, prCnf.getItem("per_email"), prCnf.getItem("per_nombre"));

                		$("#sms-alert").modal({
					      backdrop: 'static',
					      keyboard: false
					    });

                		$("#btn_sms").prop("disabled", true);
                		$("#btn_failsms").prop("disabled", true);
                		
                		if (prApp.isMobile)
                			setTimeout(function(){ window.location = "menu.html"; }, 5000);
                		else	
                			setTimeout(function(){ prApp.gotoIndex(); }, 5000);
                	}
                	else{
                		Notify("El Código de Activación es incorrecto", null, null);
                	}
                }
                else{
                  console.log(response);
                }
              });
}

/**
 * Send Mail
 */
prVerify.sendMail = function (type, to, name) {
	var url = prApp.url + "/email";

	var jsonParams = {'pType': type, 'pTo': to, 'pName': name};

	$.post(url, JSON.stringify(jsonParams), 
    function(response, status){
        console.log(response);
    }).error(function(){
    	console.log('Application not responding');
    });
}

/**
 * Show SMS div
 */
prVerify.showSMS = function() {
	$("#datos_per").hide();
	$("#val_zonas").hide();

	if (prCnf.getItem("per_telefono") == null){
		var jsonParams = {'pId': prCnf.getItem("prid"), 'pSocType': prCnf.getItem("social_type"), 'pSocId': prCnf.getItem("social_id")};

		prApp.db.execute("sp_getid", jsonParams, 
	              function(response, status){
	                if (status == "success"){
	                	prCnf.saveItem("per_email", response[0]["email"]);
						prCnf.saveItem("per_nombre", response[0]["nombre"]);
						prCnf.saveItem("per_telefono", response[0]["telefono"]);

						var msg = "Ingresa el código de verificación enviado via SMS al móvil 044" + prCnf.getItem("per_telefono");

						$("#lblSMS").html(msg);

						$("#val_sms").delay("fast").fadeIn();
	                }
	                else{
	                  console.log(response);
	                }
              });
	}
	else{
		var msg = "Ingresa el código de verificación enviado via SMS al móvil 044" + prCnf.getItem("per_telefono");

		$("#lblSMS").html(msg);

		$("#val_sms").delay("fast").fadeIn();
	}
}

/**
 * Update Mobile
 */
prVerify.updMobile = function () {
	var url = prApp.url + "/updmob";

	var newTel = $('#txtCelFail').val();

	if (newTel.length < 10){
        Notify("Captura un teléfono válido", null, null);
        return false;
    }
    else{
    	newTel = '52' + $('#txtCelFail').val();

    	var jsonParams = {'pId': prCnf.getItem("prid"), 'pNombre':prCnf.getItem("per_nombre"), 'pTel':newTel};

		$.post(url, JSON.stringify(jsonParams), 
	    function(response, status){
	        var jResp = JSON.parse(response);
	        console.log(response);

			prCnf.saveItem("per_telefono", newTel);

			var msg = "Ingresa el código de verificación enviado via SMS al móvil 044" + prCnf.getItem("per_telefono");

			$("#lblSMS").html(msg);
			$('#txtCelFail').val("");

	        prCnf.saveItem("sms_time", new Date().getTime());

	        Notify("Tu móvil se ha corregido y un nuevo SMS ha sido enviado", null, null);
	    }).error(function(){
	    	console.log('Application not responding');
	    });
    }
}