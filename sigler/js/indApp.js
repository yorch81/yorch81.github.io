/**
 * PetRide Application Induccion
 */
function indApp(){  
}

/**
 * PetRide DataBase
 * 
 * @type {Data}
 */
indApp.db = null;

/**
 * PetRide WebServices URL
 * 
 * @type {String}
 */
indApp.url = '';

/**
 * PetRide Key
 * 
 * @type {String}
 */
indApp.key = '';

/**
 * Flag Mobile
 * 
 * @type {Boolean}
 */
indApp.isMobile = false;

/**
 * Id Cliente PetRide
 * 
 * @type {Number}
 */
indApp.idCliente = 0;

/**
 * Widgets True or False
 * 
 * @type {Object}
 */
indApp.widgetsTF = {};

/**
 * Initialize Application
 */
indApp.initialize = function () {
	indApp.db = new Data(indApp.url, indApp.key);
}

/**
 * Listen Events
 */
indApp.listen = function () {
  // Check Accept Term
  $("#chkAccept").click(function() {
    $("#btnStart").prop("disabled", false);
    $("#btnStart").removeClass("btn-pet-g");
    $("#btnStart").addClass("btn-pet");
    $("#chkAccept").prop("disabled", true);
  });

  // Start PetRide Registration
  $("#btnStart").click(function() {
    indApp.gotoStep(1);
    indApp.setStatus(1);
  });

  // Button Step 1
  $("#btnNext1").click(function() {
    indApp.gotoStep(2);
  });

  // Button Step 2
  $("#btnNext2").click(function() {
    indApp.gotoStep(3);
    indApp.setStatus(3);
  });

  // Button Step 3
  $("#btnNext3").click(function() {
    indApp.gotoStep(4);
    indApp.setStatus(4);
  });

  // Button Step 4
  $("#btnNext4").click(function() {
    indApp.gotoStep(5);
    indApp.setStatus(5);
  });

  // Button Step 5
  $("#btnNext5").click(function() {
    if (indApp.getValueTF("chk1")==null || indApp.getValueTF("chk2")==null){
      petAlert.show("Debe contestar las dos preguntas");
    }
    else{
      var i = 0;

      if (indApp.getValueTF("chk1")=="T"){
        i++;
        $("#error_msg1").hide();
      }
      else{
        $("#error_msg1").delay("fast").fadeIn();
      }
        
      if (indApp.getValueTF("chk2")=="T"){
        i++;
        $("#error_msg2").hide();
      }
      else{
         $("#error_msg2").delay("fast").fadeIn();
      }

      if (i == 2){
        indApp.gotoStep(6);
        indApp.setStatus(6);
      }
    }
  });

  // Button Step 6
  $("#btnNext6").click(function() {
    indApp.gotoStep(7);
    indApp.setStatus(7);
  });

  // Button Step 7
  $("#btnNext7").click(function() {
    indApp.gotoStep(8);
    indApp.setStatus(8);
  });

  // Button Step 8
  $("#btnNext8").click(function() {
    indApp.gotoStep(9);
    indApp.setStatus(9);
  });

  // Button Step 9
  $("#btnNext9").click(function() {
    indApp.gotoStep(10);
    indApp.setStatus(10);
  });

  // Button Step 10
  $("#btnNext10").click(function() {
    indApp.gotoStep(11);
    indApp.setStatus(11);
  });

  // Button Step 11
  $("#btnNext11").click(function() {
    indApp.gotoStep(12);
    indApp.setStatus(12);
  });

  // Button Step 12
  $("#btnNext12").click(function() {
    indApp.gotoStep(13);
    indApp.setStatus(13);
  });

  // Button Step 13
  $("#btnNext13").click(function() {
    var selNumPet = $('input[name=optradio]:checked', '#frmNumPet').val();
    console.log(selNumPet);
    
    if (typeof selNumPet == 'undefined' && (!$("#chkBasico").prop("checked") || !$("#chkSuper").prop("checked") || !$("#chkFitness").prop("checked") || !$("#chkTranslado").prop("checked"))){
      petAlert.show("Debe contestar las dos preguntas");
    }
    else{
      var nivel = 4;
      var i = 0;

      if (nivel == 4){
        if  ($("#chkBasico").prop("checked") && $("#chkSuper").prop("checked") && $("#chkFitness").prop("checked") && $("#chkTranslado").prop("checked")){
          i++;

          $("#error_msg3").hide();
        }
        else{
          $("#msg_chk").html("Senior Error Message");
          $("#error_msg3").delay("fast").fadeIn();
        }
      }

      if (nivel != 4){
        if  ($("#chkBasico").prop("checked") && $("#chkSuper").prop("checked") && $("#chkTranslado").prop("checked")){
          i++;
          $("#error_msg3").hide();
        }
        else{
          $("#msg_chk").html("No Senior Error Message");
          $("#error_msg3").delay("fast").fadeIn();
        }
      }

      /*
      i++;

      $("#error_msg4").delay("fast").fadeIn();

      $("#error_msg4").hide();
      */

      if (i == 2){
        petAlert.show("Fin de Inducción !!!");
      }
    }
  });
}

/**
 * Goto Step Number
 * 
 * @param  {Number} numStep Step Number
 */
indApp.gotoStep = function (numStep) {
  $("#con_welcome").hide();

  switch(numStep){
    case 1:
      $("#btnStart").prop("disabled", true);

      $("#win_step1").delay("fast").fadeIn();

      petProgress.setValue(10);
      break;

    case 2:
      indApp.setStatus(2);
        
      $("#win_step2").delay("fast").fadeIn();
      
      $("#win_step1").hide();

      petProgress.setValue(20);

      break;

    case 3:
      indApp.setStatus(3);
        
      $("#win_step3").delay("fast").fadeIn();
      
      $("#win_step2").hide();

      petProgress.setValue(30);
      
      break;

    case 4:
      indApp.setStatus(4);
        
      $("#win_step4").delay("fast").fadeIn();
      
      $("#win_step3").hide();

      petProgress.setValue(40);
      
      break;

    case 5:
      indApp.setStatus(5);
        
      $("#win_step5").delay("fast").fadeIn();
      
      $("#win_step4").hide();

      petProgress.setValue(45);
      
      break;

    case 6:
      indApp.setStatus(6);
        
      $("#win_step6").delay("fast").fadeIn();
      
      $("#win_step5").hide();

      petProgress.setValue(50);
      
      break;

    case 7:
      indApp.setStatus(7);
        
      $("#win_step7").delay("fast").fadeIn();
      
      $("#win_step6").hide();

      petProgress.setValue(60);
      
      break;

    case 8:
      indApp.setStatus(8);
        
      $("#win_step8").delay("fast").fadeIn();
      
      $("#win_step7").hide();

      petProgress.setValue(70);
      
      break;

    case 9:
      indApp.setStatus(9);
        
      $("#win_step9").delay("fast").fadeIn();
      
      $("#win_step8").hide();

      petProgress.setValue(75);
      
      break;

    case 10:
      indApp.setStatus(10);
        
      $("#win_step10").delay("fast").fadeIn();
      
      $("#win_step9").hide();

      petProgress.setValue(80);
      
      break;

    case 11:
      indApp.setStatus(11);
        
      $("#win_step11").delay("fast").fadeIn();
      
      $("#win_step10").hide();

      petProgress.setValue(85);
      
      break;

    case 12:
      indApp.setStatus(12);
        
      $("#win_step12").delay("fast").fadeIn();
      
      $("#win_step11").hide();

      petProgress.setValue(90);
      
      break;

    case 13:
      indApp.setStatus(13);
        
      $("#win_step13").delay("fast").fadeIn();
      
      $("#win_step12").hide();

      petProgress.setValue(100);
      
      break;

    default:
      console.log("No action to step");
  }
}

/**
 * Set Status
 * 
 * @param {Number} status Status Step
 */
indApp.setStatus = function (status) {

  /*var url = prApp.url + "/setstatus";

  var jsonParams = {'idCliente': recApp.idCliente, 'status':status};

  $.post(url, JSON.stringify(jsonParams), 
    function(response, status){
        var jResp = JSON.parse(response);
        console.log(response);
    }).error(function(){
      console.log('Application not responding');
    });*/
}

/**
 * Select True or False
 * 
 * @param  {String} widget    Selected Widget
 * @param  {Boolean} trueFalse Selected Option
 */
indApp.selectTF = function (widget, trueFalse) {
  if (trueFalse){
    indApp.widgetsTF[widget] = 'T';
  }
  else
    indApp.widgetsTF[widget] = 'F';
}

/**
 * Get Value Widget
 * 
 * @param  {String} widget Selected Widget
 */
indApp.getValueTF = function (widget) {
  var valueTF = indApp.widgetsTF[widget];

  if (typeof valueTF == 'undefined'){
    valueTF = null;
  }

  return valueTF;
}

/**
 * Valida Fecha Nacimiento
 */
indApp.valFechaNac = function () {
  var jsonParams = {'pTable':'GET_FECHANAC',
                    'pWhere':''};

  indApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (response.length > 0){
                $('#txtFechaNac').val(response[0]["FECHANAC"]);
              }
            });
}

/**
 * Send Contact Email
 */
indApp.sendEmailContact = function () {
  // Send Error Mail
  var url = indApp.url + "/errormail";

  var jsonParams = {'pIdCliente':indApp.idCliente};

  $.post(url, JSON.stringify(jsonParams), 
  function(response, status){
    Notify("Se ha notificado a PetRide, en breve un asesor te contactará mediante correo eléctrónico", null, null);
    $("#btnContact").hide();
  }).error(function(){
    console.log('Application not responding');
  });
}


