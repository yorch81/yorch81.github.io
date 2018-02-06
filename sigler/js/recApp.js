/**
 * PetRide Application Reclutamiento
 */
function recApp(){  
}

/**
 * PetRide DataBase
 * 
 * @type {Data}
 */
recApp.db = null;

/**
 * PetRide WebServices URL
 * 
 * @type {String}
 */
recApp.url = '';

/**
 * PetRide Key
 * 
 * @type {String}
 */
recApp.key = '';

/**
 * Flag Mobile
 * 
 * @type {Boolean}
 */
recApp.isMobile = false;

/**
 * Id Cliente PetRide
 * 
 * @type {Number}
 */
recApp.idCliente = 0;

/**
 * Zip Code Flag
 * 
 * @type {Boolean}
 */
recApp.cp = false;

/**
 * Import X Hour
 * 
 * @type {Number}
 */
recApp.impHour = 80;

/**
 * Widgets True or False
 * 
 * @type {Object}
 */
recApp.widgetsTF = {};

/**
 * Id Nivel User
 * 
 * @type {Number}
 */
recApp.idNivel = 0;

/**
 * Nivel User
 * 
 * @type {String}
 */
recApp.nivel = "";

/**
 * Initialize Application
 */
recApp.initialize = function () {
	recApp.db = new Data(recApp.url, recApp.key);

  recApp.loadCmbNac();
  recApp.loadCmbDelega();
  recApp.loadCmbGrados();

  $("#txtNomCol").hide();
  $("#cmbColonia").hide();
  $("#cmbDelega").hide();

  recApp.getFechaNac();
}

/**
 * Listen Events
 */
recApp.listen = function () {
  // Check Accept Term
  $("#chkAccept").click(function() {
    $("#btnStart").prop("disabled", false);
    $("#btnStart").removeClass("btn-pet-g");
    $("#btnStart").addClass("btn-pet");
    $("#chkAccept").prop("disabled", true);
  });

  // Start PetRide Registration
  $("#btnStart").click(function() {
    recApp.gotoStep(1);
    recApp.setStatus(1);
  });

  // Button Step 1
  $("#btnNext1").click(function() {
    recApp.gotoStep(2);
  });

  // Button Step 2
  $("#btnNext2").click(function() {
    recApp.gotoStep(3);
    recApp.setStatus(3);
  });

  // Button Step 3
  $("#btnNext3").click(function() {
    if (recApp.valDatosPer()){

      recApp.saveDatosPer();
    }
  });

  // Button Step 4
  $("#btnNext4").click(function() {
    recApp.gotoStep(6);
    recApp.setStatus(6);
  });

  // Button Step 5
  $("#btnNext5").click(function() {
    if (recApp.valPrepara()){
      recApp.savePrepara();
      recApp.gotoStep(6);
      recApp.setStatus(6);
    }
  });

  // Button Step 6
  $("#btnNext6").click(function() {
    if (recApp.valSkills()){
      recApp.saveSkills();
      recApp.gotoStep(7);
      recApp.setStatus(7);
    }
  });

  // Button Step 7
  $("#btnNext7").click(function() {
    recApp.gotoStep(8);
    recApp.setStatus(8);
  });

  // Button Step 10
  $("#btnNext10").click(function() {
    recApp.saveHorario();
  });

  // Button Step 11
  $("#btnNext11").click(function() {
    recApp.saveZonas();
  });

  // Button Step 12
  $("#btnNext12").click(function() {
    recApp.saveReferencias();
  });

  // Valida ZIP Code
  $("#txtCP").focusout(function(){
    var cp = $("#txtCP").val();

    if (cp.length < 5){
      Notify("Debe capturar Código Postal válido", null, null);
    }
    else{
      recApp.loadCmbColoniasCP(cp);

      $("#cmbDelega").show();
    }
  });

  // Start PetRide Exam
  $("#btnStartEx").click(function() {
    petConfirm.show("Una vez iniciado el Cuestionario, deberás finalizarlo ¿Desea Continuar?", function(){
      recExm.loadCuest();
    });
  });

  // Close Div Exam
  $("#btnCloseEx").click(function() {
    $("#win_exam").hide();
    
    $("#win_exusr").delay("fast").fadeIn();
  });

  // Contestar Opcion Multiple
  $("#btnResMul").click(function() {

    var rm = $('input[name=optradio]:checked', '#frmResp').val();

    if (rm){
      recExm.saveRespMul(rm, 0);
      recExm.loadFrmMul();
    }
    else
      Notify("Debes seleccionar una respuesta", null, null);
  });

  // Contestar Opcion Up - Down
  $("#btnResUD").click(function() {
    listElements = $('#ul_li_SubCategories').children();

    l = listElements.length;
    lOrd = listElements.length;

    for (var i = 0; i < l; i++) {
      recExm.saveRespOrd(listElements[i].value, lOrd);
      lOrd--;
    };

    recExm.loadFrmUD();
  });

  // Contestar Opcion Drag
  $("#btnResDrag").click(function() {
    var listElements = $("#ul_sort").children();

    l = listElements.length
    lOrd = listElements.length;

    for (var i = 0; i < l; i++) {
      recExm.saveRespOrd(listElements[i].value, lOrd);
      lOrd--;
    };

    recExm.loadFrmDrag();
  });

  // Contestar Opcion True - False
  $("#btnResTF").click(function() {
    if ($('#chkTF').prop('checked')){
      recExm.saveRespMul(0, 1);
    }
    else{
      recExm.saveRespMul(0, 0);
    }

    recExm.loadFrmTF();
  });

  // Check Estudia Actualmente
  $('#chkEstudia').change(function() {
    if ($(this).prop('checked')){
      $('#txtEscAct').prop("disabled", false);
      $('#txtHorario').prop("disabled", false);
    }
    else{
      $('#txtEscAct').val("");
      $('#txtHorario').val("");
      $('#txtEscAct').prop("disabled", true);
      $('#txtHorario').prop("disabled", true);
    }
  });

  // Check Experiencia Mascotas
  $('#chkExp').change(function() {
    if ($(this).prop('checked')){
      $('#txtTipoExp').prop("disabled", false);
    }
    else{
      $('#txtTipoExp').val("");
      $('#txtTipoExp').prop("disabled", true);
    }
  });

  // Combo Ini
  $(".cmbIni").change(function() {
    var ini = parseInt($(this).val());
    var day = $(this).attr("day");
    var wgt = "#cmb" + day + "Fin";
    var fin = parseInt($(wgt).val());

    if (fin > ini) {
      wgt = "#h" + day;

      var hrs = fin - ini;

      $(wgt).html(hrs);

      var impH = hrs * recApp.impHour;

      wgt = "#g" + day;

      $(wgt).html(impH);

      recApp.sumHours();
    }
    else{
      Notify("El horario inicial debe ser mayor al final", null, null);
    }
  });

  // Combo Fin
  $(".cmbFin").change(function() {
    var fin = parseInt($(this).val());
    var day = $(this).attr("day");
    var wgt = "#cmb" + day + "Ini";
    var ini = parseInt($(wgt).val());

    if (fin > ini) {
      wgt = "#h" + day;

      var hrs = fin - ini;

      $(wgt).html(hrs);

      var impH = hrs * recApp.impHour;

      wgt = "#g" + day;

      $(wgt).html(impH);

      recApp.sumHours();
    }
    else{
      Notify("El horario inicial debe ser mayor al final", null, null);
    }
  });

  // Check Days Change
  $('.chkDay').change(function() {
    var day = $(this).attr("day");
    var wgt = "#cmb" + day + "Ini";
    var chk = $(this).prop("checked");

    $(wgt).prop("disabled", !chk);
    
    wgt = "#cmb" + day + "Fin";
    $(wgt).prop("disabled", !chk);
  });

  // Button Zavic
  $("#btnZavic").click(function() {
    var status = $("#btnZavic").prop('exstatus');
    recExm.loadExam(2, status);
  });

  // Button IPV
  $("#btnIpv").click(function() {
    var status = $("#btnIpv").prop('exstatus');
    recExm.loadExam(3, status);
  });

  // Button Fail Exam
  $("#btn_failexam").click(function() {
    Notify("Se ha notificado a PetRide, la solución será enviada a tu correo", null, null);
  });

  // Button Contact
  $("#btnContact").click(function() {
    recApp.sendEmailContact();
  });

  /* Induccion */
  // Check Accept Induccion
  $("#chkAcceptInd").click(function() {
    $("#btnStartInd").prop("disabled", false);
    $("#btnStartInd").removeClass("btn-pet-g");
    $("#btnStartInd").addClass("btn-pet");
    $("#chkAcceptInd").prop("disabled", true);
  });

  // Start PetRide Induccion
  $("#btnStartInd").click(function() {
    recApp.gotoStep(16);
    recApp.setStatus(16);
  });

  // Button Step 16
  $("#btnNext16").click(function() {
    recApp.gotoStep(17);
    recApp.setStatus(17);
  });

  // Button Step 17
  $("#btnNext17").click(function() {
    recApp.gotoStep(18);
    recApp.setStatus(18);
  });

  // Button Step 18
  $("#btnNext18").click(function() {
    recApp.gotoStep(19);
    recApp.setStatus(19);
  });

  // Button Step 19
  $("#btnNext19").click(function() {
    recApp.gotoStep(20);
    recApp.setStatus(20);
  });

  // Button Step 20
  $("#btnNext20").click(function() {
    if (recApp.getValueTF("chk1")==null || recApp.getValueTF("chk2")==null){
      petAlert.show("Debe contestar las dos preguntas");
    }
    else{
      var i = 0;

      if (recApp.getValueTF("chk1")=="T"){
        i++;
        $("#error_msg1").hide();
      }
      else{
        $("#error_msg1").delay("fast").fadeIn();
      }
        
      if (recApp.getValueTF("chk2")=="T"){
        i++;
        $("#error_msg2").hide();
      }
      else{
         $("#error_msg2").delay("fast").fadeIn();
      }

      if (i == 2){
        recApp.gotoStep(21);
        recApp.setStatus(21);;
      }
    }
  });

  // Button Step 21
  $("#btnNext21").click(function() {
    recApp.gotoStep(22);
    recApp.setStatus(22);
  });

  // Button Step 22
  $("#btnNext22").click(function() {
    recApp.gotoStep(23);
    recApp.setStatus(23);
  });

  // Button Step 23
  $("#btnNext23").click(function() {
    recApp.gotoStep(24);
    recApp.setStatus(24);
  });

  // Button Step 24
  $("#btnNext24").click(function() {
    recApp.gotoStep(25);
    recApp.setStatus(25);
  });

  // Button Step 25
  $("#btnNext25").click(function() {
    recApp.gotoStep(26);
    recApp.setStatus(26);
  });

  // Button Step 26
  $("#btnNext26").click(function() {
    recApp.gotoStep(27);
    recApp.setStatus(27);
  });

  // Button Step 27
  $("#btnNext27").click(function() {
    recApp.gotoStep(28);
    recApp.setStatus(28);
  });

  // Button Step 28
  $("#btnNext28").click(function() {
    var i = 0;
    var selNumPet = $('input[name=optradio]:checked', '#frmNumPet').val();
        
    if (typeof selNumPet == 'undefined' || (!$("#chkBasico").prop("checked") && !$("#chkSuper").prop("checked") && !$("#chkFitness").prop("checked") && !$("#chkTranslado").prop("checked"))){
      petAlert.show("Debe contestar las dos preguntas");
    }
    else{
      if (recApp.idNivel == 4){
        if  ($("#chkBasico").prop("checked") && $("#chkSuper").prop("checked") && $("#chkFitness").prop("checked") && $("#chkTranslado").prop("checked")){
          i++;

          $("#error_msg3").hide();
        }
        else{
          $("#msg_chk").html("Recuerda que Senior Plus puede hacer todos los tipos de paseo!");
          $("#error_msg3").delay("fast").fadeIn();
        }
      }
      else{
        if  ($("#chkBasico").prop("checked") && $("#chkSuper").prop("checked") && $("#chkTranslado").prop("checked") && !$("#chkFitness").prop("checked")){
          i++;
          $("#error_msg3").hide();
        }
        else{
          $("#msg_chk").html("Recuerda que puedes hacer todos tipos de paseo, excepto el Fitness");
          $("#error_msg3").delay("fast").fadeIn();
        }
      }

      switch(recApp.idNivel) {
        case 1:
          if (selNumPet == 1){
            i++;
            $("#error_msg4").hide();
          }
          else{
            $("#msg_chk4").html("Recuerda que solo puedes pasear máximo un perrito");

            $("#error_msg4").delay("fast").fadeIn();
          }

          break;
        case 2:
          if (selNumPet == 2){
            i++;
            $("#error_msg4").hide();
          }
          else{
            $("#msg_chk4").html("Recuerda que solo puedes pasear máximo dos perritos");

            $("#error_msg4").delay("fast").fadeIn();
          }

          break;

        case 3:
          if (selNumPet == 4){
            i++;
            $("#error_msg4").hide();
          }
          else{
            $("#msg_chk4").html("Recuerda que puedes pasear máximo cuatro perritos");

            $("#error_msg4").delay("fast").fadeIn();
          }

          break;

        case 4:
          if (selNumPet == 4){
            i++;
            $("#error_msg4").hide();
          }
          else{
            $("#msg_chk4").html("Recuerda que puedes pasear máximo cuatro perritos");

            $("#error_msg4").delay("fast").fadeIn();
          }

          break;

        default:
          console.log("Not selected option");
      }

      if (i == 2){
        recApp.gotoStep(29);
        recApp.setStatus(29);
      }
    }
  });
}

/**
 * Sum Hours and Imports
 */
recApp.sumHours = function() {
  var sHours = 0;
  var sImp = 0;

  $(".hours").each(function( index ) {
    var hVal = $(this).html();

    sHours = sHours + parseInt(hVal);
  });

  $(".impHours").each(function( index ) {
    var hImp = $(this).html();

    sImp = sImp +parseInt(hImp);
  });

  $("#tHours").html("Total de Horas: " + sHours.toString());
  $("#tImp").html("Total de Ingreso $: " + sImp.toString());
}

/**
 * Save Horario
 */
recApp.saveHorario = function() {
  var jsonParams = {'pId': recApp.idCliente};

  $(".chkDay").each(function( index ) {
    var chk = $(this).prop("checked");
    var day = $(this).attr("day");
    var valIni = 0;
    var valFin = 0;
    var wgt = "";
    var parDay = "";

    if (chk){
      wgt = "#cmb" + day + "Ini";
      valIni = $(wgt).val();
      parDay = "p" + day + "Ini";
      jsonParams[parDay] = valIni;

      wgt = "#cmb" + day + "Fin";
      valFin = $(wgt).val();
      parDay = "p" + day + "Fin";
      jsonParams[parDay] = valFin;      
    }
    else{
      parDay = "p" + day + "Ini";
      jsonParams[parDay] = 0;

      parDay = "p" + day + "Fin";
      jsonParams[parDay] = 0;  
    }
  });

  recApp.db.execute("sp_horario", jsonParams, 
              function(response, status){
                if (status == "success"){
                  recApp.gotoStep(12);
                  recApp.setStatus(12);
                }
                else{
                  console.log(response);
                }
              });
}

/**
 * Save Zonas
 */
recApp.saveZonas = function() {
  $(".zona").each(function( index ) {
    var chk = $(this).prop("checked");
    var idZona = $(this).val();

    if (chk) {
      var jsonParams = {'pId': recApp.idCliente, 'pIdZona': idZona};

      recApp.db.execute("sp_addclizona", jsonParams, 
              function(response, status){
                if (status == "success"){
                  console.log(response);
                }
                else{
                  console.log(response);
                }
              });
    }
  });

  recApp.gotoStep(12);
  recApp.setStatus(12);
}

/**
 * Save Referencias
 */
recApp.saveReferencias = function() {
  if (recApp.validaRef()){
    var jsonParams = {'pId': recApp.idCliente, 'pNom1': $("#txtNomRef1").val(), 'pDom1': $("#txtDomRef1").val(),
                      'pTel1': '52' + $("#txtTelRef1").val(), 'pAnnos1': $("#txtTimeRef1").val(), 'pNom2': $("#txtNomRef2").val(),
                      'pDom2': $("#txtDomRef2").val(), 'pTel2': '52' + $("#txtTelRef2").val(), 'pAnnos2': $("#txtTimeRef2").val()};

    recApp.db.execute("sp_addreferencias", jsonParams, 
            function(response, status){
              if (status == "success"){
                recApp.gotoStep(13);
                recApp.setStatus(13);
              }
              else{
                console.log(response);
              }
            });
  }
}

/**
 * Valida Referencias
 */
recApp.validaRef = function () {
  var retValue = true;

  if ($("#txtNomRef1").val() == '') {
    Notify("Captura Nombre de primer referencia", null, null);
    retValue = false;
  } else if ($("#txtDomRef1").val() == '') {
    Notify("Captura Domicilio de primer referencia", null, null);
    retValue = false;
  } else if ($("#txtTelRef1").val().length < 10) {
    Notify("Captura Teléfono válido de primer referencia", null, null);
    retValue = false;
  } else if ($("#txtTimeRef1").val() == '') {
    Notify("Captura Tiempo de conocer la primer referencia", null,  null);
    retValue = false;
  } else if ($("#txtNomRef2").val() == '') {
    Notify("Captura Nombre de segunda referencia", null, null);
    retValue = false;
  } else if ($("#txtDomRef2").val() == '') {
    Notify("Captura Domicilio de segunda referencia", null, null);
    retValue = false;
  } else if ($("#txtTelRef2").val().length < 10) {
    Notify("Captura Teléfono válido de segunda referencia", null, null);
    retValue = false;
  } else if ($("#txtTimeRef2").val() == '') {
    Notify("Captura Tiempo de conocer la segunda referencia", null, null);
    retValue = false;
  } else {
    retValue = true;
  }

  return retValue;
}

/**
 * Goto Step Number
 * 
 * @param  {Number} numStep Step Number
 */
recApp.gotoStep = function (numStep) {
  switch(numStep){
    case 1:
      $("#btnStart").prop("disabled", true);

      $("#win_step1").delay("fast").fadeIn();

      $("#con_welcome").hide();

      petProgress.setValue(10);
      break;

    case 2:
      $("#con_welcome").hide();

      if ($('#chkYN2').prop('checked')){
        recApp.setStatus(2);
        
        $("#win_step2").delay("fast").fadeIn();
      }
      else{
        recApp.setStatus(14);

        petAlert.show("Gracias por tu información, en otro momento podrás continuar con el proceso de registro", 
        function(){
          recApp.logout();
        });
      }
      
      $("#win_step1").hide();

      petProgress.setValue(10);
      break;

    case 3:
      $("#con_welcome").hide();
      $("#win_step2").hide();

      recApp.loadDatosPer();

      $("#win_step3").delay("fast").fadeIn();

      petProgress.setValue(20);
      break;

    case 4:
      $("#con_welcome").hide();
      $("#win_step3").hide();

      $("#win_step4").delay("fast").fadeIn();

      petProgress.setValue(30);
      break;

    case 5:
      $("#con_welcome").hide();
      $("#win_step4").hide();

      $("#win_step5").delay("fast").fadeIn();

      petProgress.setValue(40);
      break;

    case 6:
      $("#con_welcome").hide();
      $("#win_step4").hide();
      $("#win_step5").hide();

      $("#win_step6").delay("fast").fadeIn();

      petProgress.setValue(50);
      break;

    case 7:
      $("#con_welcome").hide();
      $("#win_step6").hide();

      recExm.loadExUsr();

      petProgress.setValue(60);
      break;

    case 8:
      $("#con_welcome").hide();
      $("#win_step7").hide();

      $("#win_step7").delay("fast").fadeIn();

      petProgress.setValue(70);
      break;

    case 9:
      recExm.validaAprobado(function(){
        $("#con_welcome").hide();
        $("#win_exusr").hide();

        $("#win_step7").delay("fast").fadeIn();

        recApp.getNivelPasea();

        petProgress.setValue(70);
      });

      break;

    case 10:
      $("#con_welcome").hide();
      $("#win_step7").hide();

      $("#win_step10").delay("fast").fadeIn();
      recApp.loadHorario();

      petProgress.setValue(80);
      break;

    case 11:
      $("#con_welcome").hide();
      $("#win_step10").hide();
      
      $("#win_step11").delay("fast").fadeIn();
      recApp.loadZonas();

      petProgress.setValue(80);
      break;

    case 12:
      $("#con_welcome").hide();
      $("#win_step10").hide();
      $("#win_step11").hide();

      $("#win_step12").delay("fast").fadeIn();

      petProgress.setValue(90);
      break;

    case 13:
      $("#con_welcome").hide();
      $("#win_step12").hide();

      $("#win_step9").delay("fast").fadeIn();

      recApp.getFechaFin();
      
      petProgress.setValue(100);
      break;

    case 14:
      $("#con_welcome").hide();

      petAlert.show("Gracias por tu información, en otro momento podrás continuar con el proceso de registro", 
      function(){
        recApp.logout();
      });

      break;

    case 15:       
      $("#con_welcome").hide();
      $("#win_step12").hide();

      $("#win_step15").delay("fast").fadeIn();

      petAlert.show("Muchas felicidades, has sido aprobado como paseador PetRide!");

      petProgress.setValue(0);

      break;

    case 16:       
      $("#con_welcome").hide();
      $("#win_step15").hide();

      $("#win_step16").delay("fast").fadeIn();

      petProgress.setValue(10);

      break;

    case 17:       
      $("#con_welcome").hide();
      $("#win_step16").hide();

      $("#win_step17").delay("fast").fadeIn();

      petProgress.setValue(20);

      break;

    case 18:       
      $("#con_welcome").hide();
      $("#win_step17").hide();

      $("#win_step18").delay("fast").fadeIn();

      petProgress.setValue(30);

      break;

    case 19:       
      $("#con_welcome").hide();
      $("#win_step18").hide();

      $("#win_step19").delay("fast").fadeIn();

      petProgress.setValue(40);

      break;

    case 20:       
      $("#con_welcome").hide();
      $("#win_step19").hide();

      $("#win_step20").delay("fast").fadeIn();

      petProgress.setValue(45);

      break;

    case 21:       
      $("#con_welcome").hide();
      $("#win_step20").hide();

      $("#win_step21").delay("fast").fadeIn();

      petProgress.setValue(50);

      break;

    case 22:       
      $("#con_welcome").hide();
      $("#win_step21").hide();

      $("#win_step22").delay("fast").fadeIn();

      petProgress.setValue(60);

      break;

    case 23:       
      $("#con_welcome").hide();
      $("#win_step22").hide();

      $("#win_step23").delay("fast").fadeIn();

      petProgress.setValue(70);

      break;

    case 24:       
      $("#con_welcome").hide();
      $("#win_step23").hide();

      $("#win_step24").delay("fast").fadeIn();

      petProgress.setValue(75);

      break;

    case 25:       
      $("#con_welcome").hide();
      $("#win_step24").hide();

      $("#win_step25").delay("fast").fadeIn();

      petProgress.setValue(80);

      break;

    case 26:       
      $("#con_welcome").hide();
      $("#win_step25").hide();

      $("#win_step26").delay("fast").fadeIn();

      petProgress.setValue(85);

      break;

    case 27:       
      $("#con_welcome").hide();
      $("#win_step26").hide();

      $("#win_step27").delay("fast").fadeIn();

      petProgress.setValue(90);

      break;

    case 28:       
      $("#con_welcome").hide();
      $("#win_step27").hide();

      $("#win_step28").delay("fast").fadeIn();

      petProgress.setValue(95);

      break;

    case 29:       
      $("#con_welcome").hide();
      $("#win_step28").hide();

      $("#pMsg29").html("Muchas gracias haz finalizado el Proceso de Inducción");

      $("#win_step29").delay("fast").fadeIn();

      petProgress.setValue(100);

      break;

    case 30:       
      $("#con_welcome").hide();
      $("#win_step28").hide();

      $("#pMsg29").html("Haz recibido tu Kit PetRide, ahora puedes descargar la Aplicación y comenzar a pasear perritos");

      $("#win_step29").delay("fast").fadeIn();

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
recApp.setStatus = function (status) {
  var url = prApp.url + "/setstatus";

  var jsonParams = {'idCliente': recApp.idCliente, 'status':status};

  $.post(url, JSON.stringify(jsonParams), 
    function(response, status){
        var jResp = JSON.parse(response);
        console.log(response);
    }).error(function(){
      console.log('Application not responding');
    });
}

/**
 * Get Nivel Paseador
 */
recApp.getNivelPasea = function(){
  var jsonParams = {'pTable':'NIVEL_PASEA',
                    'pWhere':recApp.idCliente};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (status == "success"){
                if (response.length > 0) {
                  var nivel = parseInt(response[0]["nivel"]);

                  switch (nivel) {
                      case 1:
                        $("#hCorrea").html("2. Poniendo la correa al perrito");
                        $("#hPasea").html("3. Paseando con un perrito");
                        $("#hTiempo").html("Tiempo sugerido: 20 seg - 1 min");
                        break;
                      case 2:
                        $("#hCorrea").html("2. Poniendo la correa a los perritos");
                        $("#hPasea").html("3. Paseando con dos perritos");
                        $("#hTiempo").html("Tiempo sugerido: 30 seg - 1 min");
                        break;
                      case 3:
                        $("#hCorrea").html("2. Poniendo la correa a los perritos");
                        $("#hPasea").html("3. Paseando con tres perritos, al menos uno de ellos que demuestre temperamento especial.");
                        $("#hTiempo").html("Tiempo sugerido: 1 min - 2 min");
                        break;
                      case 4:
                        $("#hCorrea").html("2. Poniendo la correa a los perritos");
                        $("#hPasea").html("3. Trotando con tres perritos, al menos uno de ellos que demuestre temperamento especial.");
                        $("#hTiempo").html("Tiempo sugerido: 2 min");
                        break;
                  }
                }
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Load Combo Horario
 */
recApp.loadHorario = function () {
  var sHtml = '';

  for (var i = 7; i <= 21; i++) {
    var h = '';

    if (i <= 12)
      h = i + ":00 AM"
    else
      h = (i-12) + ":00 PM"

    if (i == 12)
      h = "12:00 PM"

    sHtml = sHtml + "<option value=" + i +">" + h + "</option>";
  };

  $(".horario").html(sHtml);
  $(".cmbFin").val(21);
}

/**
 * Load Zonas
 */
recApp.loadZonas = function () {
  var jsonParams = {'pTable':'TAB_ZONAS',
                    'pWhere':''};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (status == "success"){
                var html = new EJS({ url: 'js/rec_zonas.ejs' }).render(response);

                $('#grd_zonas').html(html);
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Get Fecha Final
 */
recApp.getFechaFin = function () {
  $("#btnContact").hide();

  var jsonParams = {'pTable':'GET_FECHAFIN',
                    'pWhere':recApp.idCliente};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (response.length > 0){
                var fecFin = response[0]["FFECHA"];
                var diffT = response[0]["DIF_HRS"];

                var txt = "El proceso de registro ha concluido con fecha " + fecFin + ". Validaremos tu información y antes de 48 horas recibirás un correo con las indicaciones para concluir tu activación como paseador.";

                if (diffT >= 48)
                  $("#btnContact").show();

                $("#lblFin").html(txt);
              }
            });
}

/**
 * Load Combo Nacionalidades
 */
recApp.loadCmbNac = function(){
  var jsonParams = {'pTable':'TAB_NACION',
                    'pWhere':''};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (status == "success"){
                var html = new EJS({ url: 'js/combos.ejs' }).render(response);

                $('#cmbNacion').html(html);
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Load Combo Delegaciones
 */
recApp.loadCmbDelega = function(){
  var jsonParams = {'pTable':'TAB_DELEGA',
                    'pWhere':''};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (status == "success"){
                var html = new EJS({ url: 'js/combos.ejs' }).render(response);

                $('#cmbDelega').html(html);
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Load Combo Colonias
 */
recApp.loadCmbColonias = function(){
  var jsonParams = {'pTable':'TAB_COLONIAS',
                    'pWhere':''};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (status == "success"){
                var html = new EJS({ url: 'js/combos.ejs' }).render(response);

                $('#cmbColonia').html(html);
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Load Combo Grados
 */
recApp.loadCmbGrados = function(){
  var jsonParams = {'pTable':'TAB_GRADOS',
                    'pWhere':''};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (status == "success"){
                var html = new EJS({ url: 'js/combos.ejs' }).render(response);

                $('#cmbGrado').html(html);
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Load Combo Documentos
 */
recApp.loadCmbDoctos = function(){
  var jsonParams = {'pTable':'TAB_DOCTOS',
                    'pWhere':''};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (status == "success"){
                var html = new EJS({ url: 'js/combos.ejs' }).render(response);

                $('#cmbDocto').html(html);
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Load Combo Colonias by CP
 */
recApp.loadCmbColoniasCP = function(cp){
  var jsonParams = {'pCP':cp};

  recApp.db.execute("sp_coloniascp", jsonParams, 
            function(response, status){
              if (status == "success"){
                if (response.length > 0){
                  $('#cmbDelega').val(response[0]['iddelega']);

                  var sHtml = '';
                  for (var i = 0; i < response.length; i++) {
                    sHtml = sHtml + "<option value=" + i +">" + response[i]['colonia'] + "</option>";
                  };

                  $('#cmbColonia').html(sHtml);
                  $('#cmbColonia').show();
                  $('#cmbDelega').prop("disabled", true);
                  $("#txtNomCol").hide();

                  recApp.cp = true;
                }
                else{
                  Notify("El Código Postal introducido no fué encontrado", null, null);
                  $('#cmbColonia').hide();
                  $("#txtNomCol").show();
                  $('#cmbDelega').prop("disabled", false);

                  recApp.cp = false;
                }
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Load Combos Years
 */
recApp.loadCmbYear = function(){
  var year = new Date().getFullYear();
  var html = "";

  for (var i = 0; i<30; i++) {
    html = html + '<option value="' + (year - i) + '">' + (year - i) + '</option>';
  }

  $('#cmbIni').html(html);
  $('#cmbFin').html(html);
}

/**
 * Load Datos Personales
 */
recApp.loadDatosPer = function(){
  var jsonParams = {'pId':recApp.idCliente};

  recApp.db.execute("sp_getCliente", jsonParams, 
            function(response, status){
              if (status == "success"){
                $('#txtPaterno').val(response[0]["apellidoPat"]);
                $('#txtNombre').val(response[0]["nombre"]);
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Valida Datos Personales
 */
recApp.valDatosPer = function () {
  var retValue = true;

  if ($("#txtNombre").val() == '') {
    Notify("Captura Nombre", null, null);
    retValue = false;
  } else if ($("#txtPaterno").val() == '') {
    Notify("Captura Apellido Paterno", null, null);
    retValue = false;
  } else if ($("#txtMaterno").val() == '') {
    Notify("Captura Apellido Materno", null, null);
    retValue = false;
  } else if ($("#txtFechaNac").val() == '') {
    Notify("Captura Fecha de Nacimiento", null, null);
    retValue = false;
  } else if ($("#txtPeso").val() == '') {
    Notify("Captura Peso", null, null);
    retValue = false;
  } else if ($("#txtEstatura").val() == '') {
    Notify("Captura Estatura", null, null);
    retValue = false;
  } else if ($("#txtCalle").val() == '') {
    Notify("Captura Calle", null, null);
    retValue = false;
  } else if ($("#txtCP").val().length < 5) {
    Notify("Captura Código Postal válido", null, null);
    retValue = false;
  } else if ($("#txtNumExt").val() == '') {
    Notify("Captura Número Exterior", null, null);
    retValue = false;
  } else {
    if (recApp.cp){
      retValue = true;
    }
    else{
      if ($("#txtNomCol").val() == ''){
        Notify("Captura Colonia", null, null);
        retValue = false;
      }
      else
        retValue = true;
    }
  }

  return retValue;
}

/**
 * Save Datos Personales
 */
recApp.saveDatosPer = function () {
  var nomCol = "";

  if (recApp.cp){
    nomCol = $("#cmbColonia option:selected").text();
  }
  else{
    nomCol = $("#txtNomCol").val();
  }

  var jsonParams = {'pFechaNac':$("#txtFechaNac").val()};

  recApp.db.execute("sp_valedad", jsonParams, 
            function(response, status){
              if (status == "success"){
                var edad = response[0]["EDAD"];

                if (edad > 18){
                  jsonParams = {'pId':recApp.idCliente,
                              'pNom':$("#txtNombre").val(),
                              'pPat':$("#txtPaterno").val(),
                              'pMat':$("#txtMaterno").val(),
                              'pFechaNac':$("#txtFechaNac").val(),
                              'pIdNac':$("#cmbNacion").val(),
                              'pPeso':$("#txtPeso").val(),
                              'pEstatura':$("#txtEstatura").val(),
                              'pCalle':$("#txtCalle").val(),
                              'pNumExt':$("#txtNumExt").val(),
                              'pNumInt':$("#txtNumInt").val(),
                              'pIdDel':$("#cmbDelega").val(),
                              'pCP':$("#txtCP").val(),
                              'pNomCol':nomCol};

                  recApp.db.execute("sp_datospers", jsonParams, 
                            function(response, status){
                              if (status == "success"){
                                recApp.gotoStep(4);
                                recApp.setStatus(4);
                              }
                              else{
                                console.log(response);
                              }
                            });
                }
                else{
                  petAlert.show("Debes ser mayor de edad para poder ser Paseador de PetRide");
                }
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Valida Preparacion Academica
 */
recApp.valPrepara = function () {
  var retValue = true;

  if ($("#txtEscuela").val() == '') {
    Notify("Captura Institución Educativa", null, null);
    retValue = false;
  } else if ($("#cmbIni").val() >= $("#cmbFin").val()) {
    Notify("El Año Inicial debe ser mayor al Año Final", null, null);
    retValue = false;
  } else {
    retValue = true;
  }

  return retValue;
}

/**
 * Save Preparacion Academica
 */
recApp.savePrepara = function () {
  var jsonParams = {'pIdCliente':recApp.idCliente,
                    'pIdGrado':$("#cmbGrado").val(),
                    'pEscuela':$("#txtEscuela").val(),
                    'pIni':$("#cmbIni").val(),
                    'pFin':$("#cmbFin").val(),
                    'pIdDoc':$("#cmbDocto").val(),
                    'pEscAct':$("#txtEscAct").val(),
                    'pHorario':$("#txtHorario").val()};

  recApp.db.execute("sp_prepacad", jsonParams, 
            function(response, status){
              if (status == "success"){
                console.log(response);
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Valida Skills
 */
recApp.valSkills = function () {
  var retValue = true;

  if ($("#chkExp").prop("checked")) {
    if ($("#txtTipoExp").val() == ''){
      Notify("Por favor describe tu experiencia con mascotas", null, null);
      retValue = false;
    }
  }

  return retValue;
}

/**
 * Save Skills
 */
recApp.saveSkills = function () {
  var expMasc = 0;

  if ($("#chkExp").prop("checked")) {
    expMasc = 1;
  }

  var nivel = $('input[name=optradio]:checked', '#frmExpCal').val();

  var jsonParams = {'pIdCliente':recApp.idCliente,
                    'pExpMas':expMasc,
                    'pExpTipo':$("#txtTipoExp").val(),
                    'pNivel':nivel,
                    'pIdGrado':$("#cmbGrado").val()};

  recApp.db.execute("sp_skills", jsonParams, 
            function(response, status){
              if (status == "success"){
                console.log(response);
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Logout App
 */
recApp.logout = function (){
  if (prApp.isMobile)
    navigator.app.exitApp();
  else
    window.location = "./logout";
}

/**
 * Get Fecha Nacimiento MySQL
 */
recApp.getFechaNac = function () {
  var jsonParams = {'pTable':'GET_FECHANAC',
                    'pWhere':''};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (response.length > 0){
                $('#txtFechaNac').val(response[0]["FECHANAC"]);
              }
            });
}

/**
 * Valida Fecha Nacimiento
 */
recApp.valFechaNac = function () {
  var jsonParams = {'pTable':'GET_FECHANAC',
                    'pWhere':''};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (response.length > 0){
                $('#txtFechaNac').val(response[0]["FECHANAC"]);
              }
            });
}

/**
 * Send Contact Email
 */
recApp.sendEmailContact = function () {
  // Send Error Mail
  var url = recApp.url + "/errormail";

  var jsonParams = {'pIdCliente':recApp.idCliente};

  $.post(url, JSON.stringify(jsonParams), 
  function(response, status){
    Notify("Se ha notificado a PetRide, en breve un asesor te contactará mediante correo eléctrónico", null, null);
    $("#btnContact").hide();
  }).error(function(){
    console.log('Application not responding');
  });
}

/**
 * Select True or False
 * 
 * @param  {String} widget    Selected Widget
 * @param  {Boolean} trueFalse Selected Option
 */
recApp.selectTF = function (widget, trueFalse) {
  if (trueFalse){
    recApp.widgetsTF[widget] = 'T';
  }
  else
    recApp.widgetsTF[widget] = 'F';
}

/**
 * Get Value Widget
 * 
 * @param  {String} widget Selected Widget
 */
recApp.getValueTF = function (widget) {
  var valueTF = recApp.widgetsTF[widget];

  if (typeof valueTF == 'undefined'){
    valueTF = null;
  }

  return valueTF;
}

/**
 * Get Information Induccion
 */
recApp.getInfoInduc = function () {
  var jsonParams = {'pTable':'INFO_INDUC',
                    'pWhere':recApp.idCliente};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              $("#pInduc").html(response[0]["nombre"]);

              recApp.idNivel = response[0]["idnivel"];
              recApp.nivel = response[0]["NIVEL"];

              $("#pNivel1").html(recApp.nivel);
              $("#pNivel2").html(recApp.nivel);
            });
}
