/**
 * Cliente PetRide
 */
function prCliente(){  
}

/**
 * Validate Email
 * @param  {string} email Correo Electronico
 * 
 * @return {boolean}
 */
prCliente.validateMail = function (email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	return re.test(email);
}

/**
 * Validate Form
 * 
 * @return {boolean}
 */
prCliente.validateForm = function () {
	var retValue = true;

	if ($("#txtNombre").val() == '') {
		prToast.show("Debe capturar Nombre");
		retValue = false;
	} else if ($("#txtPaterno").val() == '') {
	    prToast.show("Debe capturar Apellido Paterno");
	    retValue = false;
	} else if ($("#txtMaterno").val() == '') {
	    prToast.show("Debe capturar Apellido Materno");
	    retValue = false;
	} else if (! prCliente.validateMail($("#txtEmail").val())) {
	    prToast.show("El Correo Electrónico es inválido");
	    retValue = false;
	} else if ($("#txtDirec").val() == '') {
	    prToast.show("Dece capturar Dirección");
	    retValue = false;
	} else if ($("#txtCodPos").val() == '') {
	    prToast.show("Debe capturar Código Postal");
	    retValue = false;
	} else if ($("#txtFecha").val() == '') {
	    prToast.show("Debe capturar Fecha de Nacimiento");
	    retValue = false;
	} else if ($("#txtCel").val() == '') {
	    prToast.show("Debe capturar Celular");
	    retValue = false;
	} else {
	    retValue = true;
	}

	return retValue;
}

/**
 * Save Form
 */
prCliente.saveForm = function () {
    var sSexo = "M";
    var nCliente = 0;
    var nPaseador = 0;

    if ($("#radFemenino").prop("checked"))
    	sSexo = 'F';

    if ($("#chkcliente").prop("checked"))
    	nCliente = 1;

    if ($("#chkpasea").prop("checked"))
    	nPaseador = 1;

    if (nCliente + nPaseador == 0)
    	prToast.show("Debe seleccionar un Tipo de Registro");
    else{
    	if (prCliente.validateForm()) {
	    	var id = 0;

	    	if (prCnf.getItem("prid") != null)
	    		id = prCnf.getItem("prid");

	    	var jsonParams = {'pId':id, 'pSType':prCnf.getItem("social_type"), 'pSID':prCnf.getItem("social_id"), 'pNombre':$("#txtNombre").val(),
						  'pPaterno':$("#txtPaterno").val(), 'pMaterno':$("#txtMaterno").val(), 'pFNac':$("#txtFecha").val(),
						  'pSexo':sSexo, 'pTel':$("#txtCel").val(), 'pMail':$("#txtEmail").val(), 'pDir':$("#txtDirec").val(),
						  'pCP':$("#txtCodPos").val(), 'pLat':0, 'pLng':0, 'pCli':nCliente, 'pPas':nPaseador};

			prApp.db.execute("sp_addcliente", jsonParams, 
		              function(response, status){
		                if (status == "success"){
		                	prCnf.saveItem("prid", response[0]["MSG"]);
		                	
		                	prToast.show("Su perfil se guardó correctamente");

		                	//prPopup.show("Su perfil se guardó correctamente", 3000);
		                }
		                else{
		                  console.log(response);
		                }
		              });	
	    }
    }
}

/**
 * Load Data
 */
prCliente.loadData = function () {
    var id = 0;

    // Load Profile Image
    $("#imgUsr").attr("src", prCnf.getItem("social_img"));

	if (prCnf.getItem("prid") != null){
		id = prCnf.getItem("prid");

		var jsonParams = {'pId':id};

		prApp.db.execute("sp_getCliente", jsonParams, 
	              function(response, status){
	                if (status == "success"){
	                	$("#txtNombre").val(response[0]["nombre"]);
	                	$("#txtPaterno").val(response[0]["apellidoPat"]);
	                	$("#txtMaterno").val(response[0]["apellidoMat"]);
	                	$("#txtEmail").val(response[0]["email"]);
	                	$("#txtDirec").val(response[0]["direccion"]);
	                	$("#txtCodPos").val(response[0]["cp"]);
	                	$("#txtFecha").val(response[0]["fechaNac"]);
	                	$("#txtCel").val(response[0]["telefono"]);

	                	if (response[0]["escliente"] == 1)
	                		$("#chkcliente").prop("checked", true);
	                	else
	                		$("#chkcliente").prop("checked", false);

	                	if (response[0]["espaseador"] == 1)
	                		$("#chkpasea").prop("checked", true);
	                	else
	                		$("#chkpasea").prop("checked", false);

	                	if (response[0]["sexo"] == "M"){
	                		$("#radMasculino").prop("checked", true);
	                		$("#radFemenino").prop("checked", false);
	                	}
	                	else{
	                		$("#radMasculino").prop("checked", false);
	                		$("#radFemenino").prop("checked", true);
	                	}

	                	$("#chkcliente").checkboxradio("refresh");
	                	$("#chkpasea").checkboxradio("refresh");

	                	$("#radMasculino").checkboxradio("refresh");
	                	$("#radFemenino").checkboxradio("refresh");
	                }
	                else{
	                  console.log(response);
	                }
	              });
	}
	else{
		$("#txtNombre").val(prCnf.getItem("social_name"));
		$("#txtEmail").val(prCnf.getItem("social_mail"));
	}
}
