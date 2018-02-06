/**
 * PetRide Menu
 */
function prMenu(){
}
/**
 * Listen Events
 */
prMenu.listen = function () {
	// Menu Perfil
	$("#mnuPerfil").click(function() {
      prApp.gotoPerfil();
    });

	// Menu Mascotas
	$("#mnuPet").click(function() {
		prApp.gotoPets();
    });

    // Menu Paseos
	$("#mnuRide").click(function() {
		prApp.gotoRide();
	});

    // Menu Help
	$("#mnuHelp").click(function() {
      prApp.gotoHelp();
    });

}