$(document).ready(function() {
	$(".btn").click(function(e) {
		var id = $(this).attr("id");
		
		switch (id) {
			case "btnCoins":
				darCoins();
				break;
				
			case "btnBorrarCosas":
				borrarCosas();
				break;
		}
	});
});

document.title = '\u0041\u0064\u006d\u0069\u006e\u0069\u0073\u0074\u0072\u0061\u0063\u0069\u00f3\u006e de Wair.io - Shair';

function darCoins() {
	var idFacebook = $("#txtIDFacebook-coins").val();
	var password = $("#txtPassword-coins").val();
	var coins = parseInt($("#txtCoins-coins").val());
	
	$.post(
		"http://banapiwair.tk/priv/wair/coins/updateCoins.php", {
		id: idFacebook, 
		coin: coins,
		password: password
	})
	.done(function(response) { swal(response); })
	.fail(function(response) { swal(response); })
	.always(function(response) { swal(response); });
}

function borrarCosas() {
	var idFacebook = $("#txtIDFacebook-borrar").val();
	var password = $("#txtPassword-borrar").val();

	$.post(
		"http://banapiwair.tk/priv/wair/otros/borrarCosas.php", {
		id: idFacebook,
		password: password
	})
	.done(function(response) { swal(response); })
	.fail(function(response) { swal(response); })
	.always(function(response) { swal(response); });
}