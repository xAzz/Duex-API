
<html>
	<head>
		<link rel="stylesheet" href="bootstrap.min.css">
		<link rel="stylesheet" href="sweetalert.css?v=250">
		<link rel="stylesheet" href="style.css?version=100">
		
	</head>
	<body>
		<div id="contenedor">
			<div>
				<h2>W A I R . I O</h2>
			</div>
			<form id="defaultForm">
				<div id="navigation">
					<ul class="nav nav-tabs">
						<li class="active">
							<a data-toggle="tab" href="#menuCoins">Coins</a>
						</li>
						<li>
							<a data-toggle="tab" href="#menuBorrar">Borrar Cosas</a>
						</li>
					</ul>
				</div>
				<div class="tab-content">
					<div id="menuCoins" class="tab-pane fade in active">
						<label for="txtIDFacebook-coins">ID DE FACEBOOK: </label> <input class="form-control" id="txtIDFacebook-coins" name="idFacebook" type="text" />
						<label for="txtCoins-coins">COINS: </label> <input class="form-control" id="txtCoins-coins" name="coins" type="text" />
						<label for="txtPassword-coins">PASSWORD: </label> <input class="form-control" id="txtPassword-coins" type="password" />
						<button type="button" id="btnCoins" class="btn btn-primary">ENVIAR COINS</button>
					</div>
					<div id="menuBorrar" class="tab-pane fade">
						<label for="txtIDFacebook-borrar">ID DE FACEBOOK: </label> <input class="form-control" id="txtIDFacebook-borrar" name="idFacebook" type="text" />
						<label for="txtPassword-borrar">PASSWORD: </label> <input class="form-control" id="txtPassword-borrar" type="password" />
						<button type="button" id="btnBorrarCosas" class="btn btn-primary">BORRAR COSAS</button>
					</div>
				</div>
			</form>
			<div id="sendCoinsContainer">
				
			</div>
		</div>
		<script src="jquery.min.js"></script>
		<script type="text/javascript" src="sweetalert.min.js?v=100"></script>
		<script src="bootstrap.min.js"></script>
		<script src="js.js?version=101"></script>
	</body>
</html>