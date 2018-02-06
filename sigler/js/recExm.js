/**
 * PetRide Reclutamiento Examen
 */
function recExm(){  
}

/**
 * Id Examen
 * 
 * @type {Number}
 */
recExm.idExamen = 0;

/**
 * Tipo de Examen
 * 
 * @type {Number}
 */
recExm.tipo = 0;

/**
 * Array Preguntas
 * 
 * @type {Array}
 */
recExm.aPreg = [];

/**
 * Current Pregunta
 * 
 * @type {Number}
 */
recExm.curPreg = 0;

/**
 * Tiempo Examen
 * 
 * @type {Number}
 */
recExm.tiempo = 0;

/**
 * Ended Examen
 * 
 * @type {Boolean}
 */
recExm.ended = false;

/**
 * Started Examen
 * 
 * @type {Boolean}
 */
recExm.started = false;

/**
 * Load User Examenes
 */
recExm.loadExUsr = function () {
  $("#btn_failexam").hide();

	var jsonParams = {'pTable':'EXAM_USR',
                    'pWhere':recApp.idCliente};

  	recApp.db.execute("sp_loadtable", jsonParams, 
              function(response, status){
                if (status == "success"){                  
                  if (response[0]["status"] == 2 && response[1]["status"] == 2){
                    Notify("Ha finalizado todos los cuestionarios", null, null);

                    $("#win_exusr").hide();

                    recApp.gotoStep(9);
                    recApp.setStatus(9);
                  }
                  else{
                    var blocked = false;

                    $("#win_exusr").delay("fast").fadeIn();

                    $("#btnZavic").html(response[0]["descripcion"]);
                    $("#btnIpv").html(response[1]["descripcion"]);

                    $("#btnZavic").removeClass();
                    $("#btnZavic").addClass("btn btn-lg btn-pet");
                    $("#btnZavic").prop('exstatus', response[0]["status"]);

                    $("#btnIpv").removeClass();
                    $("#btnIpv").addClass("btn btn-lg btn-pet");
                    $("#btnIpv").prop('exstatus', response[1]["status"]);

                    if (response[0]["status"] == 1){
                      $("#btnZavic").removeClass();
                      $("#btnZavic").addClass("btn btn-lg btn-pet-g");

                      if (response[0]["reset"] == 1){
                        $("#btnZavic").prop("disabled", true);
                        blocked = true;
                      }
                    }

                    if (response[1]["status"] == 1){
                      $("#btnIpv").removeClass();
                      $("#btnIpv").addClass("btn btn-lg btn-pet-g");

                      if (response[1]["reset"] == 1){
                        $("#btnIpv").prop("disabled", true);
                        blocked = true;
                      }
                    } 

                    if (response[0]["status"] == 2)
                      $("#btnZavic").hide();

                    if (response[1]["status"] == 2)
                      $("#btnIpv").hide();

                    if (blocked){
                      petAlert.show("Si tienes algún problema con los cuestionarios, escríbenos a soporte@petride.mx");
                    }
                  }
                }
                else{
                  console.log(response);
                }
              });
}


/**
 * Valida Aprobado
 * 
 * @param  {Function} cb Callback
 */
recExm.validaAprobado = function (cb) {
  var jsonParams = {'pIdCliente':recApp.idCliente};

  recApp.db.execute("sp_califuser", jsonParams, 
            function(response, status){
              if (status == "success"){
                var aprob = response[0]["APROBADO"];

                if (aprob<2){
                  petAlert.show("Haz concluido los cuestionarios, en el trancurso de 48 horas recibirás un correo electrónico con los resultados", 
                  function(){
                    window.location = "./logout";
                  });
                }
                else{
                  cb();
                }
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Load Examen
 * 
 * @param  {Number} idExam Id Examen
 * @param  {Number} exStatus Status Examen
 */
recExm.loadExam = function (idExam, exStatus) {
  recExm.idExamen = idExam;

  if (exStatus == 0){
    var jsonParams = {'pTable':'EXAM_ID',
                    'pWhere':idExam};

    recApp.db.execute("sp_loadtable", jsonParams, 
              function(response, status){
                if (status == "success"){
                  $("#txtTiempo").html("Duración: " + response[0]["tiempo"] + " Minutos");
                  $("#txtInst").html(response[0]["instruc"]);

                  recExm.tipo = response[0]["tipo"];
                  recExm.tiempo = response[0]["tiempo"];

                  recExm.loadArPreg();

                  $("#win_exusr").hide();

                  $("#win_exam").delay("fast").fadeIn();
                }
                else{
                  console.log(response);
                }
              });
  }
  else if (exStatus == 1){
    petConfirm.show("El Exámen no se finalizó en la sesión anterior, solo tendrás una oportunidad para contestarlo nuevamente, ¿deseas reiniciarlo en este momento?", function(){
     recExm.resetExam();
    });
  }
  else{
    Notify("El Cuestionario ya se encuentra finalizado", null, null);
  }
}

/**
 * Reset Exam
 */
recExm.resetExam = function() {
  var jsonParams = {'pId':recApp.idCliente,
                    'pIdExam':recExm.idExamen};

  recApp.db.execute("sp_resetexam", jsonParams, 
            function(response, status){
              if (status == "success"){
                console.log(response);
                recExm.loadExUsr();
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Load Array Preguntas
 */
recExm.loadArPreg =function () {
  var jsonParams = {'pTable':'EXAM_PREG',
                    'pWhere':recExm.idExamen};

  recApp.db.execute("sp_loadtable", jsonParams, 
            function(response, status){
              if (status == "success"){
                recExm.aPreg = [];

                for (var i = 0; i <response.length; i++) {
                  recExm.aPreg.push({idPreg:response[i]["idpreg"], txtPreg:response[i]["pregunta"]});
                }
              }
              else{
                console.log(response);
              }
            });
}

/**
 * Load Cuestionario
 */
recExm.loadCuest = function () {
  recExm.curPreg = 0;
  recExm.ended = false;
 
  $("#win_exusr").hide();
  $("#win_exam").hide();

  // Start Cron
  recExm.startCron();

  // Set Status
  recExm.setStatus(1);

  recExm.started = true;
  
  // Tipo de Examen
  switch(recExm.tipo){
    case 1:
      $("#win_preg").delay("fast").fadeIn();

      recExm.loadFrmMul();
      break;
    case 2:
      if (recApp.isMobile){

        $("#win_pregud").delay("fast").fadeIn();

        recExm.loadFrmUD();
      }
      else{
        $("#win_pregdrag").delay("fast").fadeIn();

        recExm.loadFrmDrag();
      }

      break;
    case 3:

      $("#win_pregtf").delay("fast").fadeIn();

      recExm.loadFrmTF();
      break;
    case 4:
      $("#win_preg").delay("fast").fadeIn();

      recExm.loadFrmMul();
      break;

      default:
          console.log("No action to step");
  }
}

/**
 * Start Cron
 */
recExm.startCron = function (){
  var eDate = new Date();
  var ms = recExm.tiempo * 60000;

  eDate = new Date(eDate.getTime() + ms);

  $('.jqcountdown').countdown(eDate, function(event) {
    $(this).html(event.strftime('Tiempo Restante: %M:%S'));
  }).on('finish.countdown', function (argument) {
    if (! recExm.ended){
      recExm.finish();
    }
  });
}

/**
 * Save Respuesta Opcion Multiple y Falso o Verdadero
 * 
 * @param  {Number} idResp Id Respuesta
 * @param  {Number} fv     Falso o Verdadero (0 o 1)
 */
recExm.saveRespMul = function (idResp, fv) {
  var idPreg = recExm.aPreg[recExm.curPreg-1]["idPreg"];

  var jsonParams = {'pIdCli':recApp.idCliente,
                    'pIdExam':recExm.idExamen,
                    'pIdPreg':idPreg,
                    'pIdResp':idResp,
                    'pFV':fv};

  recApp.db.execute("sp_savemul", jsonParams, 
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
 * Save Respuesta Ordenar
 * 
 * @param  {Number} idResp Id Respuesta
 * @param  {Number} ord    Orden (4,3,2,1)
 */
recExm.saveRespOrd = function (idResp, ord) {
  var idPreg = recExm.aPreg[recExm.curPreg-1]["idPreg"];

  var jsonParams = {'pIdCli':recApp.idCliente,
                    'pIdExam':recExm.idExamen,
                    'pIdPreg':idPreg,
                    'pIdResp':idResp,
                    'pOrd':ord};

  recApp.db.execute("sp_saveord", jsonParams, 
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
 * Finish Examen
 */
recExm.finish = function() {

  switch(recExm.tipo){
    case 1:
      $("#win_preg").hide();

      break;
    case 2:
      if (recApp.isMobile){
        $("#win_pregud").hide();
      }
      else{
        $("#win_pregdrag").hide();
      }

      break;
    case 3:
      $("#win_pregtf").hide();

      break;
    case 4:
      $("#win_preg").hide();

      break;

    default:
      console.log("No action to step");
  }

  recExm.ended = true;
  recExm.started = false;

  setTimeout(function(){
    recExm.loadExUsr();
  }, 3000);
  
  Notify("El Cuestionario ha finalizado", null, null);
}

/**
 * Set Status Examen
 * 
 * @param  {Number} exStatus Status Examen
 */
recExm.setStatus = function (exStatus) {
  var jsonParams = {'pIdCli':recApp.idCliente,
                    'pIdExam':recExm.idExamen,
                    'pStatus':exStatus};

  recApp.db.execute("sp_updexamen", jsonParams, 
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
 * Load Form Multiple
 */
recExm.loadFrmMul = function () {
  if ((recExm.curPreg+1) > recExm.aPreg.length){
    // Set Status
    recExm.setStatus(2);

    recExm.finish();
  }
  else{
    var idPreg = recExm.aPreg[recExm.curPreg]["idPreg"];
    var txtPreg = recExm.aPreg[recExm.curPreg]["txtPreg"];

    $('.counter').html((recExm.curPreg+1) + " de " + recExm.aPreg.length);
    $('#txtPreg').html(txtPreg);

    recExm.curPreg++;

    // Load Respuestas
    var jsonParams = {'pTable':'RESP_PREG',
                        'pWhere':idPreg};

    recApp.db.execute("sp_loadtable", jsonParams, 
                function(response, status){
                  if (status == "success"){
                    var html = new EJS({ url: 'js/rec_optmul.ejs' }).render(response);

                    $('#frmResp').html(html);
                  }
                  else{
                    console.log(response);
                  }
              });
  }
}

/**
 * Load Form Drag
 */
recExm.loadFrmDrag = function () {
  if ((recExm.curPreg+1) > recExm.aPreg.length){
    // Set Status
    recExm.setStatus(2);

    recExm.finish();
  }
  else{
    var idPreg = recExm.aPreg[recExm.curPreg]["idPreg"];
    var txtPreg = recExm.aPreg[recExm.curPreg]["txtPreg"];

    $('.counter').html((recExm.curPreg+1) + " de " + recExm.aPreg.length);
    $('#txtPregDrag').html(txtPreg);

    recExm.curPreg++;

    // Load Respuestas
    var jsonParams = {'pTable':'RESP_PREG',
                        'pWhere':idPreg};

    recApp.db.execute("sp_loadtable", jsonParams, 
                function(response, status){
                  if (status == "success"){
                    var html = new EJS({ url: 'js/rec_optdrg.ejs' }).render(response);

                    $("#ul_sort").html(html);

                    // Old Version
                    //$("ol.ol-sort").html(html);
                  }
                  else{
                    console.log(response);
                  }
                });
  }
}

/**
 * Load Form Up - Down
 */
recExm.loadFrmUD = function () {
  if ((recExm.curPreg+1) > recExm.aPreg.length){
    // Set Status
    recExm.setStatus(2);

    recExm.finish();
  }
  else{
    var idPreg = recExm.aPreg[recExm.curPreg]["idPreg"];
    var txtPreg = recExm.aPreg[recExm.curPreg]["txtPreg"];

    $('.counter').html((recExm.curPreg+1) + " de " + recExm.aPreg.length);
    $('#txtPregUD').html(txtPreg);

    recExm.curPreg++;

    // Load Respuestas
    var jsonParams = {'pTable':'RESP_PREG',
                        'pWhere':idPreg};

    recApp.db.execute("sp_loadtable", jsonParams, 
                function(response, status){
                  if (status == "success"){
                    var html = new EJS({ url: 'js/rec_optud.ejs' }).render(response);

                    $("#ul_li_SubCategories").html(html);
                  }
                  else{
                    console.log(response);
                  }
                });
  }
}

/**
 * Load Form True - False
 */
recExm.loadFrmTF = function () {
  if ((recExm.curPreg+1) > recExm.aPreg.length){
    // Set Status
    recExm.setStatus(2);

    recExm.finish();
  }
  else{
    var idPreg = recExm.aPreg[recExm.curPreg]["idPreg"];
    var txtPreg = recExm.aPreg[recExm.curPreg]["txtPreg"];

    $('.counter').html((recExm.curPreg+1) + " de " + recExm.aPreg.length);
    $('#txtPregTF').html(txtPreg);

    recExm.curPreg++;
  }
}

