<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('UTC');
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
class Api extends CI_Controller 
{
    public function __construct()
    {
    	ob_start ();
        parent::__construct();
        ob_end_clean();
		$this->load->config('juego');
		$this->load->helper('jwt');
    }
	public function Cronjob($clave) {
		if($clave == '6356f68a4fs2f1e8qgf6')
		{
			$query = $this->db->query("SELECT * FROM `usuarios_upgrades`");
			if($query->num_rows() > 0)
			{
				foreach ($query->result_array() as $row) {
					$upgrades = $row;
					list($year, $month, $day, $hour, $minute, $second) = explode('[/ :]', $upgrades->expires_at);
					$tiempo = mktime($hour, $minute, $second, $month, $day, $year);
					if(time() > $tiempo) {
						$this->db->query("DELETE FROM `usuarios_upgrades` WHERE `ID` = '".$upgrades->ID."' LIMIT 1");
					}
				}
			}
		}
	}/*
	public function Alavergamevaleverga() {
		$contador = 0;
		$query = $this->db->query("SELECT * FROM `usuarios`");
		if($query->num_rows() > 0)
		{
			foreach ($query->result() as $usuario)
			{
				if($usuario->Monedas < 6000)
				{
					$contador++;
					$nuevomonto = $usuario->Monedas+20000;
					$params['update_usuario'] = array(
						'tabla' => 'usuarios',
						'where' => 'ID = \''.$usuario->ID.'\' LIMIT 1',
						'data' => array(
							'Monedas' => $nuevomonto,
						 )
					);
					$this->system->update($params['update_usuario']);
				}
			}
		}
		echo $contador." tabla afectadas";
	}*/
    public function Api_Pagos($contra) {
    	if($conta == "6569c50811852f0c78382257036734e8") {
    		$usuario = $this->input->post("u");
    		$cantidad = $this->input->post("c");
    		$medio = $this->input->post("m");
			if($medio == "FREE" && is_int($cantidad) && is_int($usuario)) {
				$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$usuario." LIMIT 1");
				if($query->num_rows() > 0)
				{
					$cuenta = $query->row();
					$params['update_usuario'] = array(
						'tabla' => 'usuarios',
						'where' => 'ID = \''.$usuario.'\' LIMIT 1',
						'data' => array(
							'Monedas' => $cuenta->Monedas+$cantidad,
						 )
					);
					$this->system->update($params['update_usuario']);
				}
			} else {
				$arr = array(
					"message" => '404 Not Found',
					"status_code" => 404,
					"success" => false
				);
				echo json_encode($arr);
				exit;    			
			}
		} else {
			$arr = array(
				"message" => '404 Not Found',
				"status_code" => 404,
				"success" => false
			);
			echo json_encode($arr);
			exit;
		}
	}
    public function Gameservers($accion) {
		if($accion == 'log_server') {
			$clave = $this->input->post('clave');
			$tipo = $this->input->post('tipo');
			if($clave == 'h[u05=7K}9|FHitTl')
			{
				$usuario = $this->input->post('id');
				$monto = $this->input->post('monto');
				$ip = $this->input->post('ip');
				$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$usuario." LIMIT 1");
				if($query->num_rows() > 0)
				{
					$cuenta = $query->row();
					if($cuenta->IP == $ip) {
						if($tipo == 1)
						{
							$params['update_usuario'] = array(
								'tabla' => 'usuarios',
								'where' => 'ID = \''.$usuario.'\' LIMIT 1',
								'data' => array(
									'XP' => $cuenta->XP+$monto,
								 )
							);
						} else {
							$params['update_usuario'] = array(
								'tabla' => 'usuarios',
								'where' => 'ID = \''.$usuario.'\' LIMIT 1',
								'data' => array(
									'Monedas' => $cuenta->Monedas+$monto,
								 )
							);
						}
						$this->system->update($params['update_usuario']);
						$arr = array("success" => true);
						echo json_encode($arr);
						exit;
					}
				}
			}
		} else if($accion == 'getdatafetch') {
			$clave = $this->input->post('clave');
			if($clave == 'h[u05=7K}9|FHitTl')
			{
				$params = array();
				$usuario = $this->input->post('usuario');
				$ip = $this->input->post('ip');
				$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$usuario." LIMIT 1");
				if($query->num_rows() > 0)
				{
					$cuenta = $query->row();
					if($cuenta->IP == $ip) {
						$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$usuario."");
						if($query->num_rows() > 0)
						{
							$arr = array();
							$arr['status'] = 1;
							foreach ($query->result_array() as $row) {
								$tclaims = (object) unserialize($row['claims']);
								if(array_key_exists('hat', $tclaims)) {
									if($tclaims->hat == $cuenta->CurrentHat) {
										foreach ($tclaims as $clave => $valor) {
											$arr[$clave] = $valor;
										}
									}
								} else {
									foreach ($tclaims as $clave => $valor) {
										$arr[$clave] = $valor;
									}
								}
							}
						} else {
							$arr['status'] = 0;
						}
						$params['account'] = $cuenta;
						$params['upgrades'] = $arr;
						$params['status'] = 1;
						echo json_encode($params);
						exit;
					} else {
						$params['status'] = 2;
						echo json_encode($params);
						exit;
					}
				} else {
					$params['status'] = 3;
					echo json_encode($params);
					exit;
				}
			}
    	} else if($accion == 'log') {
    		$team = $this->input->post('team');
    		$name = $this->input->post('name');
    		$server = $this->input->post('server');
    		$skinurl = $this->input->post('skinurl');

			$token = $this->input->get('token');
			$decoded = JWT::decode($token, $this->config->item('tokenauth'));
			$ip = $this->input->ip_address();
			$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$decoded->sub." LIMIT 1");
			if($query->num_rows() > 0)
			{
				$cuenta = $query->row();
			}
			if($cuenta->IP == $ip) {
				$params['update_usuario'] = array(
					'tabla' => 'usuarios',
					'where' => 'ID = \''.$decoded->sub.'\' LIMIT 1',
					'data' => array(
						'UltimateTeam' => $team,
						'Nick' => $name,
						'ServerAct' => $server,
						'SkinUrl' => $skinurl
					 )
				);
				$this->system->update($params['update_usuario']);
				$arr = array("success" => true);
				echo json_encode($arr);
				exit;
			}
			$arr = array("success" => false);
			echo json_encode($arr);
			exit;
    	} else if($accion == 'verificar_asdfg') {
			$token = $this->input->get('token');
			$ip = $this->input->get('uip');
			$decoded = JWT::decode($token, $this->config->item('tokenauth'));

			$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$decoded->sub." LIMIT 1");
			if($query->num_rows() > 0)
			{
				$cuenta = $query->row();
			}
			if($ip != $cuenta->IP) {
				$arr = array("valido" => false);
				echo json_encode($arr);
				exit;
			}
			$arr = array("valido" => true);
			$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$cuenta->ID."");
			if($query->num_rows() > 0)
			{
				foreach ($query->result_array() as $row) {
					$tclaims = (object) unserialize($row['claims']);
					foreach ($tclaims as $clave => $valor) {
						$arr[$clave] = $valor;
//						echo "Clave: ".$clave."  Valor:".$valor;
					}
				}
			}
			echo json_encode($arr);
    	}
    }
    public function Auth($accion = null) {
    	if($accion != "facebook" && $accion != "renew" ) {
			$arr = array(
				"message" => '404 Not Found',
				"status_code" => 404,
				"success" => false
			);
			echo json_encode($arr);
			exit;
    	}
    	if($accion == "renew") {
			$token = $this->input->get('token');
			$tokena = JWT::decode($token, $this->config->item('tokenauth'));
			$ip = $this->input->ip_address();
			$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
			if($query->num_rows() > 0)
			{
				$sub = $query->row();
				$subid = $sub->ID;
				$date2 = new DateTime(); // Actual
				$date1 = new DateTime("@".$sub->IPWarnTick); // El tick
				$diff = date_diff($date1,$date2);
				$hour = $diff->h;
				if($hour < 5 && $ip != $sub->IP) {
					$sub->IPWarn++;
					if($sub->IPWarn > 2) {
						$params['update_usuario'] = array(
							'tabla' => 'usuarios',
							'where' => 'ID = \''.$subid.'\' LIMIT 1',
							'data' => array(
								'IP' => $ip,
								'IPWarn' => $sub->IPWarn,
								'IPWarnTick' => time(),
								'Baneado' => 1,
								'BaneadoRazon' => "So much ip's in the same account (".$sub->IPWarn.")"
								)
						);
						$this->system->update($params['update_usuario']);
						$baneado = 1;
					} else {
						$params['update_usuario'] = array(
							'tabla' => 'usuarios',
							'where' => 'ID = \''.$subid.'\' LIMIT 1',
							'data' => array(
								'IP' => $ip,
								'IPWarn' => $sub->IPWarn,
								'IPWarnTick' => time()
				 			)
						);
						$this->system->update($params['update_usuario']);
						$baneado = $sub->Baneado;
					}
				} else {
					$params['update_usuario'] = array(
						'tabla' => 'usuarios',
						'where' => 'ID = \''.$subid.'\' LIMIT 1',
						'data' => array(
							'IP' => $ip,
							'IPWarn' => 0,
							'IPWarnTick' => time()
			 			)
					);
					$this->system->update($params['update_usuario']);
					$baneado = $sub->Baneado;
				}
			} else {
				$arr = array(
					"message" => 'Encountered exception: unknown account token ',
					"success" => false
				);
				echo json_encode($arr);
				exit;
			}
			$startmass = 0;
			$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$subid."");
			if($query->num_rows() > 0)
			{
				foreach ($query->result_array() as $row) {
					$tclaims = (object) unserialize($row['claims']);
					if(array_key_exists('startMass', $tclaims)) {
						$startmass = $tclaims->startMass;
						break;
					}
				}
			}
			if($subid) {
				if($startmass != 0)
					$masa = $startmass;
				else
					$masa = 1;
				$tokenId    = base64_encode(mcrypt_create_iv(32));
				$time = time();
				$token = array(
				    "iss"  => "http://api.duex.io/minish/api/auth/renew",       // Issuer
				    "iat" => $time, // Tiempo que inició el token
				    "exp" => $time + (60*60), // Tiempo que expirará el token (+1 hora)
				    "nbf" => $time, // Tiempo nose
				    "jti"  => $tokenId,          // Json Token Id: an unique identifier for the token
				    "sub" => $subid,
				    "startMass" => $masa,
				    "validFrom" => $ip,
				    "isBanned" => (int)$baneado,
				);
				$tokena = JWT::encode($token, $this->config->item('tokenauth'));
				$arr = array(
					"token" => $tokena,
					"success" => true
				);
				echo json_encode($arr);
			}
    	} else if($accion == "facebook") {
			require_once APPPATH.'third_party/vendor/autoload.php';
			$this->load->config('facebook');
			$accessToken = $this->input->post('accessToken');
			$userID = $this->input->post('userID');
			if(!$accessToken || !$userID) {
				$arr = array(
					"request" => array(),
					"success" => false,
					"message" => "Encountered exception: You must provide an access token.",
				);
				echo json_encode($arr);
				exit;
			}
			$fb = new \Facebook\Facebook([
			  'app_id' => $this->config->item('fb_app'),
			  'app_secret' => $this->config->item('fb_secret'),
			  'default_graph_version' => $this->config->item('fb_version')
			]);
			$ip = $this->input->ip_address();
			try {
				$response = $fb->get('/me', $accessToken);
			} catch(\Facebook\Exceptions\FacebookResponseException $e) {
			  // When Graph returns an error
				$arr = array(
					"request" => array(
						"userID" => $userID,
						"accessToken" => $accessToken,
					),
					"success" => false,
					"message" => $e->getMessage(),
				);
				echo json_encode($arr);
			  exit;
			} catch(\Facebook\Exceptions\FacebookSDKException $e) {
			  // When validation fails or other local issues
				$arr = array(
					"request" => array(
						"userID" => $userID,
						"accessToken" => $accessToken,
					),
					"success" => false,
					"message" => $e->getMessage(),
				);
				echo json_encode($arr);
			  exit;
			}
			$query = $this->db->query("SELECT * FROM `usuarios_facebook` WHERE `userID` = ".$userID." LIMIT 1");
			if($query->num_rows() > 0)
			{
				$cuenta = $query->row();
				$query2 = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$cuenta->sub." LIMIT 1");
				if($query2->num_rows() > 0)
				{
					$sub = $query2->row();
					$subid = $sub->ID;
					$XP = $sub->XP;
					$date2 = new DateTime(); // Actual
					$date1 = new DateTime("@".$sub->IPWarnTick); // El tick
					$diff = date_diff($date1,$date2);
					$hour = $diff->h;
					if($hour < 5 && $ip != $sub->IP) {
						$sub->IPWarn++;
						if($sub->IPWarn > 2) {
							$params['update_usuario'] = array(
								'tabla' => 'usuarios',
								'where' => 'ID = \''.$subid.'\' LIMIT 1',
								'data' => array(
									'IP' => $ip,
									'IPWarn' => $sub->IPWarn,
									'IPWarnTick' => time(),
									'Baneado' => 1,
									'BaneadoRazon' => "So much ip's in the same account (".$sub->IPWarn.")"
				 				)
							);
							$this->system->update($params['update_usuario']);
							$baneado = 1;
						} else {
							$params['update_usuario'] = array(
								'tabla' => 'usuarios',
								'where' => 'ID = \''.$subid.'\' LIMIT 1',
								'data' => array(
									'IP' => $ip,
									'IPWarn' => $sub->IPWarn,
									'IPWarnTick' => time()
				 				)
							);
							$this->system->update($params['update_usuario']);
							$baneado = $sub->Baneado;
						}
					} else {
						$params['update_usuario'] = array(
							'tabla' => 'usuarios',
							'where' => 'ID = \''.$subid.'\' LIMIT 1',
							'data' => array(
								'IP' => $ip,
								'IPWarn' => 0,
								'IPWarnTick' => time()
			 				)
						);
						$this->system->update($params['update_usuario']);
						$baneado = $sub->Baneado;
					}
					$startmass = 0;
					$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$subid."");
					if($query->num_rows() > 0)
					{
						foreach ($query->result_array() as $row) {
							$tclaims = (object) unserialize($row['claims']);
							if(array_key_exists('startMass', $tclaims)) {
								$startmass = $tclaims->startMass;
								break;
							}
						}
					}
					$nivel = $this->system->ObtenerNivel($XP);
					if($startmass != 0)
						$masa = $startmass;
					else
						$masa = 1;
					}
			} else {
				$params['usuario'] = array(
					'tabla' => 'usuarios',
					'data' => array(
						'IP' => $ip,
						'Monedas' => $this->config->item('reg_coins')
					)
				);
				$this->db->insert($params['usuario']['tabla'], $params['usuario']['data']);
				$subid = $this->db->insert_id();
				$params['usuario_facebook'] = array(
					'tabla' => 'usuarios_facebook',
					'data' => array(
						'userID' => (int)$userID,
						'sub' => (int)$subid,
					)
				);
				$this->db->insert($params['usuario_facebook']['tabla'], $params['usuario_facebook']['data']);
				$masa = 1;
			}
			if($subid) {
				$tokenId    = base64_encode(mcrypt_create_iv(32));
				$time = time();
				$token = array(
				    "iss"  => "http://samp4all.com/alis/api/auth/facebook",       // Issuer
				    "iat" => $time, // Tiempo que inició el token
				    "exp" => ($time + 7200), // Tiempo que expirará el token (+1 hora)
				    "nbf" => $time, // Tiempo nose
				    "jti"  => $tokenId,          // Json Token Id: an unique identifier for the token
				    "sub" => $subid,
				    "startMass" => $masa,
				    "validFrom" => $ip,
				    "isBanned" => (int)$baneado,
				);
				$tokena = JWT::encode($token, $this->config->item('tokenauth'));
				$arr = array(
					"request" => array(
						"userID" => $userID,
						"accessToken" => $accessToken,
					),
					"token" => $tokena,
					"success" => true
				);
				echo json_encode($arr);
			}
		}
    }
    public function Users($usuario, $accion = null) {
		$token = $this->input->get('token');
		if(!is_int($usuario)) {
			$accion2 = $usuario;
			/* Cambiar el color gratis */ 
			if($accion2 == 'freecoins') {
				$tokena = JWT::decode($token, $this->config->item('tokenauth'));
				$ip = $this->input->ip_address();
				$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
				if($query->num_rows() > 0)
				{
					$cuenta = $query->row();
					if($ip != $cuenta->IP) {
						$arr = array(
							"message" => 'Encountered exception: Incorrect signature',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					if($cuenta->FreeCoins != 0 && $cuenta->FreeCoins > time()) {
						$arr = array(
							"message" => 'Encountered exception: You can get free coins one per hour.',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					} else {
						$nuevasmonedas = $cuenta->Monedas+100;
						$this->db->query("UPDATE `usuarios` SET `FreeCoins` = ".strtotime("+1 hour").", `Monedas` = ".$nuevasmonedas." WHERE `ID` = ".$tokena->sub." LIMIT 1");
						$arr = array( "success" => true );
						echo json_encode($arr);
						exit;
					}
				} else {
					$arr = array( "success" => false);
					echo json_encode($arr);
					exit;
				}
			} else if($accion2 == 'changecolor') {
				$tokena = JWT::decode($token, $this->config->item('tokenauth'));
				$ip = $this->input->ip_address();
				$color = array(
					"r" => (int) $this->input->get('r'),
					"g" => (int) $this->input->get('g'),
					"b" => (int) $this->input->get('b')
				);
				if(($color->r > 255 || $color->r < 0) || ($color->g > 255 || $color->g < 0) || ($color->b > 255 || $color->b < 0)) {
					$arr = array(
						"message" => 'Encountered exception: Invalid color',
						"success" => false
					);
					echo json_encode($arr);
					exit;					
				}
				$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
				if($query->num_rows() > 0)
				{
					$cuenta = $query->row();
					if($ip != $cuenta->IP) {
						$arr = array(
							"message" => 'Encountered exception: Incorrect signature',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					if($cuenta->ColorChange != 0 && $cuenta->ColorChange > time()) {
						$arr = array(
							"message" => 'Encountered exception: You already use your week color change',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
				} else {
					$arr = array( "success" => false);
					echo json_encode($arr);
					exit;
				}
				$hecho = false;
				$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$tokena->sub."");
				if($query->num_rows() > 0)
				{
					foreach ($query->result_array() as $row) {
						$tclaims = unserialize($row['claims']);
						if(array_key_exists('nameColor', $tclaims)) {
							$hecho = true;
							$claimid = $row['ID'];
							$claims = $tclaims;
							break;
						}
					}
				}
				if(!$hecho) {
					$arr = array(
						"message" => 'Encountered exception: you not have color, little faggot',
						"success" => false
					);
					echo json_encode($arr);
					exit;
				}
				$array = array(
					'nameColor' => $color
				);
				$today = date('Y-m-d H:i:s');
				$params['update_upgrades'] = array(
					'tabla' => 'usuarios_upgrades',
					'where' => 'ID = \''.$claimid.'\' LIMIT 1',
					'data' => array(
						"claims" => serialize($array),
						"updated_at" => $today
					 )
				);
				$this->system->update($params['update_upgrades']);
				$this->db->query("UPDATE `usuarios` SET `ColorChange` = ".strtotime('+1 week')." WHERE `ID` = ".$tokena->sub." LIMIT 1");
				$arr = array( "success" => true );
				echo json_encode($arr);
				exit;
			} else if($accion2 == 'removeRainbow') {
				$tokena = JWT::decode($token, $this->config->item('tokenauth'));
				$ip = $this->input->ip_address();
				$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
				if($query->num_rows() > 0)
				{
					$cuenta = $query->row();
					if($ip != $cuenta->IP) {
						$arr = array(
							"message" => 'Encountered exception: Incorrect signature',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					if(!$cuenta->UsarRainbow) {
						$arr = array(
							"message" => 'You dont have Rainbow Color in use',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
				} else {
					$arr = array(
						"message" => 'Encountered exception: unknown account token',
						"success" => false
					);
					echo json_encode($arr);
					exit;
				}
				$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$tokena->sub."");
				if($query->num_rows() > 0)
				{
					foreach ($query->result_array() as $row) {
						$tclaims = unserialize($row['claims']);
						if(array_key_exists('nameColorR', $tclaims)) {
							$this->db->query("UPDATE `usuarios` SET `UsarRainbow` = 0 WHERE `ID` = ".$tokena->sub." LIMIT 1");
							$arr = array(
								"message" => 'Unselected',
								"success" => true
							);
							echo json_encode($arr);
							exit;
							break;
						}
					}
				}
				$arr = array(
					"message" => "You dont rainbow color",
					"success" => false
				);
				echo json_encode($arr);
				exit;
			} else if($accion2 == 'userRainbow') {
				$tokena = JWT::decode($token, $this->config->item('tokenauth'));
				$ip = $this->input->ip_address();
				$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
				if($query->num_rows() > 0)
				{
					$cuenta = $query->row();
					if($ip != $cuenta->IP) {
						$arr = array(
							"message" => 'Encountered exception: Incorrect signature',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					if($cuenta->UsarRainbow) {
						$arr = array(
							"message" => 'You already have Rainbow Color in use',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
				} else {
					$arr = array(
						"message" => 'Encountered exception: unknown account token',
						"success" => false
					);
					echo json_encode($arr);
					exit;
				}
				$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$tokena->sub."");
				if($query->num_rows() > 0)
				{
					foreach ($query->result_array() as $row) {
						$tclaims = unserialize($row['claims']);
						if(array_key_exists('nameColorR', $tclaims)) {
							$this->db->query("UPDATE `usuarios` SET `UsarRainbow` = 1 WHERE `ID` = ".$tokena->sub." LIMIT 1");
							$arr = array(
								"message" => 'Selected',
								"success" => true
							);
							echo json_encode($arr);
							exit;
							break;
						}
					}
				}
				$arr = array(
					"message" => "You dont rainbow color",
					"success" => false
				);
				echo json_encode($arr);
				exit;
			} else if($accion2 == 'removehat') {
				$tokena = JWT::decode($token, $this->config->item('tokenauth'));
				$ip = $this->input->ip_address();
				$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
				if($query->num_rows() > 0)
				{
					$cuenta = $query->row();
					if($ip != $cuenta->IP) {
						$arr = array(
							"message" => 'Encountered exception: Incorrect signature',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					if($cuenta->CurrentHat == 'No') {
						$arr = array(
							"message" => "You dont have selected any hat",
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
				} else {
					$arr = array(
						"message" => 'Encountered exception: unknown account token',
						"success" => false
					);
					echo json_encode($arr);
					exit;
				}
				$this->db->query("UPDATE `usuarios` SET `CurrentHat` = 'No' WHERE `ID` = ".$tokena->sub." LIMIT 1");
				$arr = array(
					"message" => "Removed",
					"success" => true
				);
				echo json_encode($arr);
				exit;
			} else if($accion2 == 'changehat') {
				$hat = $this->input->post('hat');
				$tokena = JWT::decode($token, $this->config->item('tokenauth'));
				$ip = $this->input->ip_address();
				$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
				if($query->num_rows() > 0)
				{
					$cuenta = $query->row();
					if($ip != $cuenta->IP) {
						$arr = array(
							"message" => 'Encountered exception: Incorrect signature',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					if($hat == $cuenta->CurrentHat) {
						$arr = array(
							"message" => 'You already have selected this hat',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
				} else {
					$arr = array(
						"message" => 'Encountered exception: unknown account token',
						"success" => false
					);
					echo json_encode($arr);
					exit;
				}
				$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$tokena->sub."");
				if($query->num_rows() > 0)
				{
					foreach ($query->result_array() as $row) {
						$tclaims = (object) unserialize($row['claims']);
						if($tclaims->hat == $hat) {
							$this->db->query("UPDATE `usuarios` SET `CurrentHat` = '".$hat."' WHERE `ID` = ".$tokena->sub." LIMIT 1");
							$arr = array(
								"message" => 'Changed',
								"success" => true
							);
							echo json_encode($arr);
							exit;
							break;
						}
					}
				}
				$arr = array(
					"message" => "You dont have this hat",
					"success" => false
				);
				echo json_encode($arr);
				exit;
			} else if($accion2 == 'buyupgrade') {
				/* Comprar upgrades */ 
				$tipo = $this->input->post('type');
				$tokena = JWT::decode($token, $this->config->item('tokenauth'));
				$ip = $this->input->ip_address();
				if($tipo == "mass2") {
					$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
					if($query->num_rows() > 0)
					{
						$cuenta = $query->row();
						$XP = $cuenta->XP;
						if($ip != $cuenta->IP) {
							$arr = array(
								"message" => 'Encountered exception: Incorrect signature',
								"success" => false
							);
							echo json_encode($arr);
							exit;
						}
						if($cuenta->Monedas < $this->config->item('precios')['massx2']) {
							$arr = array(
								"message" => 'Encountered exception: Insufficient funds to purchase requested upgrade',
								"success" => false
							);
							echo json_encode($arr);
							exit;
						}
					} else {
						$arr = array(
							"message" => 'Encountered exception: unknown account token ',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$tokena->sub."");
					if($query->num_rows() > 0)
					{
						foreach ($query->result_array() as $row) {
							$tclaims = (object) unserialize($row['claims']);
							if(array_key_exists('startMass', $tclaims)) {
								$arr = array(
									"message" => 'Encountered exception: you already have boost ',
									"success" => false
								);
								echo json_encode($arr);
								exit;
								break;
							}
						}
					}
					$nivel = $this->system->ObtenerNivel($XP);
					$currencynew = $cuenta->Monedas-$this->config->item('precios')['massx2'];
					$array = array(
						'startMass' => 2
					);
					$today = date('Y-m-d H:i:s');
					$expire = date('Y-m-d H:i:s', strtotime('+1 day', time()));
					$params['insert'] = array(
						'tabla' => 'usuarios_upgrades',
						'data' => array(
							"user_id" => (int) $tokena->sub,
							"name" => 'boost',
							"claims" => serialize($array),
							"expires_at" => $expire,
							"created_at" => $today,
							"updated_at" => $today
						)
					);
					$this->db->insert($params['insert']['tabla'], $params['insert']['data']);
					$this->db->query("UPDATE `usuarios` SET `Monedas` = ".$currencynew." WHERE `ID` = ".$tokena->sub." LIMIT 1");
					$arr = array(
						"message" => 'Buyed',
						"success" => true
					);
					echo json_encode($arr);
					exit;
				} else if($tipo == "mass3") {
					$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
					if($query->num_rows() > 0)
					{
						$cuenta = $query->row();
						$XP = $cuenta->XP;
						if($ip != $cuenta->IP) {
							$arr = array(
								"message" => 'Encountered exception: Incorrect signature',
								"success" => false
							);
							echo json_encode($arr);
							exit;
						}
						if($cuenta->Monedas < $this->config->item('precios')['massx3']) {
							$arr = array(
								"message" => 'Encountered exception: Insufficient funds to purchase requested upgrade',
								"success" => false
							);
							echo json_encode($arr);
							exit;
						}
					} else {
						$arr = array(
							"message" => 'Encountered exception: unknown account token ',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$tokena->sub."");
					if($query->num_rows() > 0)
					{
						foreach ($query->result_array() as $row) {
							$tclaims = (object) unserialize($row['claims']);
							if(array_key_exists('startMass', $tclaims)) {
								$arr = array(
									"message" => 'Encountered exception: you already have boost ',
									"success" => false
								);
								echo json_encode($arr);
								exit;
								break;
							}
						}
					}
					$currencynew = $cuenta->Monedas-$this->config->item('precios')['massx3'];
					$array = array(
						'startMass' => 3
					);
					$today = date('Y-m-d H:i:s');
					$expire = date('Y-m-d H:i:s', strtotime('+1 day', time()));
					$params['insert'] = array(
						'tabla' => 'usuarios_upgrades',
						'data' => array(
							"user_id" => (int) $tokena->sub,
							"name" => 'boost',
							"claims" => serialize($array),
							"expires_at" => $expire,
							"created_at" => $today,
							"updated_at" => $today
						)
					);
					$this->db->insert($params['insert']['tabla'], $params['insert']['data']);
					$this->db->query("UPDATE `usuarios` SET `Monedas` = ".$currencynew." WHERE `ID` = ".$tokena->sub." LIMIT 1");
					$arr = array(
						"message" => 'Buyed',
						"success" => true
					);
					echo json_encode($arr);
					exit;
				} else if($tipo == "rainbowcolor") {
					$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
					if($query->num_rows() > 0)
					{
						$cuenta = $query->row();
						if($ip != $cuenta->IP) {
							$arr = array(
								"message" => 'Encountered exception: Incorrect signature',
								"success" => false
							);
							echo json_encode($arr);
							exit;
						}
						if($cuenta->Monedas < $this->config->item('precios')['rainbowcolorLB']) {
							$arr = array(
								"message" => 'Encountered exception: Insufficient funds to purchase requested upgrade',
								"success" => false
							);
							echo json_encode($arr);
							exit;
						}
					} else {
						$arr = array(
							"message" => 'Encountered exception: unknown account token ',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$tokena->sub."");
					if($query->num_rows() > 0)
					{
						foreach ($query->result_array() as $row) {
							$tclaims = (object) unserialize($row['claims']);
							if(array_key_exists('rainbowcolorLB', $tclaims)) {
								$arr = array(
									"message" => 'Encountered exception: you already have Rainbow Color ',
									"success" => false
								);
								echo json_encode($arr);
								exit;
								break;
							}
						}
					}
					$currencynew = $cuenta->Monedas-$this->config->item('precios')['rainbowcolorLB'];
					$array = array(
						'nameColorR' => 1
					);
					$today = date('Y-m-d H:i:s');
					$expire = date('Y-m-d H:i:s', strtotime('+82 year', time()));
					$params['insert'] = array(
						'tabla' => 'usuarios_upgrades',
						'data' => array(
							"user_id" => (int) $tokena->sub,
							"name" => 'RainbowLB',
							"claims" => serialize($array),
							"expires_at" => $expire,
							"created_at" => $today,
							"updated_at" => $today
						)
					);
					$this->db->insert($params['insert']['tabla'], $params['insert']['data']);
					$this->db->query("UPDATE `usuarios` SET `Monedas` = ".$currencynew.", `UsarRainbow` = 1 WHERE `ID` = ".$tokena->sub." LIMIT 1");
					$arr = array(
						"message" => 'Buyed',
						"success" => true
					);
					echo json_encode($arr);
					exit;
				} else if($tipo == "hat") {
					$hat = $this->input->post("hat");
					if($hat < 0 || $hat > 44)
					{
						$arr = array(
							"message" => 'Encountered exception: unknown hat dubid',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
					if($query->num_rows() > 0)
					{
						$cuenta = $query->row();
						$XP = $cuenta->XP;
						if($ip != $cuenta->IP) {
							$arr = array(
								"message" => 'Encountered exception: Incorrect signature',
								"success" => false
							);
							echo json_encode($arr);
							exit;
						}
						if($cuenta->Monedas < $this->config->item('precios')['hats'][$hat][1]) {
							$arr = array(
								"message" => 'Encountered exception: Insufficient funds to purchase requested upgrade',
								"success" => false
							);
							echo json_encode($arr);
							exit;
						}
					} else {
						$arr = array(
							"message" => 'Encountered exception: unknown account token',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					$hatlink = $this->config->item('precios')['hats'][$hat][0];
					$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$tokena->sub."");
					if($query->num_rows() > 0)
					{
						foreach ($query->result_array() as $row) {
							$tclaims = (object) unserialize($row['claims']);
							if($tclaims->hat == $hatlink) {
								$arr = array(
									"message" => 'Encountered exception: You already have this hat', // aqui está el problem! faber
									"success" => false
								);
								echo json_encode($arr);
								exit;
								break;
							}
						}
					}
					$currencynew = $cuenta->Monedas-$this->config->item('precios')['hats'][$hat][1];
					$array = array(
						'hat' => $hatlink
					);
					$today = date('Y-m-d H:i:s');
					$expire = date('Y-m-d H:i:s', strtotime('+192 months', time()));
					$params['insert'] = array(
						'tabla' => 'usuarios_upgrades',
						'data' => array(
							"user_id" => (int) $tokena->sub,
							"name" => 'hat',
							"claims" => serialize($array),
							"expires_at" => $expire,
							"created_at" => $today,
							"updated_at" => $today
						)
					);
					$this->db->insert($params['insert']['tabla'], $params['insert']['data']);
					$this->db->query("UPDATE `usuarios` SET `Monedas` = ".$currencynew.", `CurrentHat` = '".$hatlink."' WHERE `ID` = ".$tokena->sub." LIMIT 1");
					$arr = array(
						"message" => 'Buyed',
						"success" => true
					);
					echo json_encode($arr);
					exit;
				} else if($tipo == "color") {
					$color = $this->input->post('color');
					if(($color[0] > 255 || $color[0] < 0) || ($color[1] > 255 || $color[1] < 0) || ($color[2] > 255 || $color[2] < 0)) {
						$arr = array(
							"message" => 'Encountered exception: Invalid color',
							"success" => false
						);
						echo json_encode($arr);
						exit;						
					}
					$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$tokena->sub." LIMIT 1");
					if($query->num_rows() > 0)
					{
						$cuenta = $query->row();
						if($ip != $cuenta->IP) {
							$arr = array(
								"message" => 'Encountered exception: Incorrect signature',
								"success" => false
							);
							echo json_encode($arr);
							exit;
						}
						if($cuenta->Monedas < $this->config->item('precios')['colorLB']) {
							$arr = array(
								"message" => 'Encountered exception: Insufficient funds to purchase requested upgrade',
								"success" => false
							);
							echo json_encode($arr);
							exit;
						}
					} else {
						$arr = array(
							"message" => 'Encountered exception: unknown account token ',
							"success" => false
						);
						echo json_encode($arr);
						exit;
					}
					$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$tokena->sub."");
					if($query->num_rows() > 0)
					{
						foreach ($query->result_array() as $row) {
							$tclaims = (object) unserialize($row['claims']);
							if(array_key_exists('nameColor', $tclaims)) {
								$arr = array(
									"message" => 'Encountered exception: you already have name color ',
									"success" => false
								);
								echo json_encode($arr);
								exit;
								break;
							}
						}
					}
					$currencynew = $cuenta->Monedas-$this->config->item('precios')['colorLB'];
					$array = array(
						'nameColor' => array(
								"r" => (int)$color[0],
								"g" => (int)$color[1],
								"b" => (int)$color[2],
							)
					);
					$today = date('Y-m-d H:i:s');
					$expire = date('Y-m-d H:i:s', strtotime('+82 year', time()));
					$params['insert'] = array(
						'tabla' => 'usuarios_upgrades',
						'data' => array(
							"user_id" => (int) $tokena->sub,
							"name" => 'color',
							"claims" => serialize($array),
							"expires_at" => $expire,
							"created_at" => $today,
							"updated_at" => $today
						)
					);
					$this->db->insert($params['insert']['tabla'], $params['insert']['data']);
					$this->db->query("UPDATE `usuarios` SET `Monedas` = ".$currencynew." WHERE `ID` = ".$tokena->sub." LIMIT 1");
					$arr = array(
						"message" => 'Buyed',
						"success" => true
					);
					echo json_encode($arr);
					exit;
				} else if($tipo == "bots2" || $tipo == "bots3") {
					$arr = array(
						"message" => 'Encountered exception: this upgrade has been removed to add new upgrade',
						"success" => false
					);
					echo json_encode($arr);
					exit;		
				} else {
					$arr = array(
						"message" => 'Encountered exception: unknown upgrade type '.$tipo,
						"success" => false
					);
					echo json_encode($arr);
					exit;		
				}
			}
		}
    	$usuario = (int) $usuario;
    	if(!$usuario || !$accion) {
			$arr = array(
				"message" => '404 Not Found',
				"status_code" => 404,
				"success" => false
			);
			echo json_encode($arr);
			exit;
    	}
		if($accion == "score") {
			$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$usuario." LIMIT 1");
			if($query->num_rows() > 0)
			{
				$cuenta = $query->row();
				$subid = $usuario;
				$XP = $cuenta->XP;
				$XPMes = $cuenta->XPMes;
				$monedas = $cuenta->Monedas;
				$hat = $cuenta->CurrentHat;
				$colorR = $cuenta->UsarRainbow;
			} else {
				$arr = array(
					"message" => 'No results for this user in query.',
					"status_code" => 500,
					"success" => false
				);
				echo json_encode($arr);
				exit;
			}
			$nivel = $this->system->ObtenerNivel($XP);
		    $expned = $this->system->ObtenerXP(intval($nivel+1));
			$arr = array(
				"success" => true,
				"user_id" => (int)$subid,
				"score" => (int)$XP,
				"score_period" => (int)$XPMes,
				"level" => (int)$nivel,
				"nextLevel" => (int)$expned,
				"currency" => (int)$monedas,
				"hat" => $hat,
				"rcu" => $colorR
			);
			echo json_encode($arr);
		} else if($accion == "score_d6854s68r") {
			$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$usuario." LIMIT 1");
			if($query->num_rows() > 0)
			{
				$cuenta = $query->row();
				$subid = $usuario;
				$XP = $cuenta->XP;
				$XPMes = $cuenta->XPMes;
				$monedas = $cuenta->Monedas;
			} else {
				$arr = array(
					"message" => 'No results for this user in query.',
					"status_code" => 500,
					"success" => false
				);
				echo json_encode($arr);
				exit;
			}
			$nivel = $this->system->ObtenerNivel($XP);
		    $expned = $this->system->ObtenerXP(intval($nivel+1));
			$arr = array(
				"success" => true,
				"user_id" => (int)$subid,
				"score" => (int)$XP,
				"score_period" => (int)$XPMes,
				"level" => (int)$nivel,
				"nextLevel" => (int)$expned,
				"currency" => (int)$monedas,
				"validFrom" => $cuenta->IP
			);
			echo json_encode($arr);
		} else if($accion == "upgrades") {
			$upgrades = array();
			$now = new DateTime();
			$query = $this->db->query("SELECT * FROM `usuarios_upgrades` WHERE `user_id` = ".$usuario."");
			if($query->num_rows() > 0)
			{
				foreach ($query->result_array() as $row) {
					$time1 = strtotime(date("d-m-Y"));
					$dtime = DateTime::createFromFormat("Y-m-d H:i:s", $row['expires_at']);
					$time2 = $dtime->getTimestamp();
					if($time1 > $time2) {
						$this->db->query("DELETE FROM `usuarios_upgrades` WHERE `ID` = '".$row['ID']."' LIMIT 1");
					} else {
						array_push($upgrades, array(
							"id" => $row['ID'],
							"user_id" => $row['user_id'],
							"name" => $row['name'],
							"claims" => unserialize($row['claims']),
							"expires_at" => $row['expires_at'],
							"created_at" => $row['created_at'],
							"updated_at" => $row['updated_at']
						));
					}
				}
			}
			$arr = array(
				"success" => true,
				"user_id" => (int)$usuario,
				"now" => $now,
				"upgrades" => $upgrades
			);
			echo json_encode($arr);
		} else {
			$arr = array(
				"message" => '404 Not Found',
				"status_code" => 404,
				"success" => false
			);
			echo json_encode($arr);
			exit;
		}
    }
}
?>
