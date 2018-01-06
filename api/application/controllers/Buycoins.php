<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('UTC');
//header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
class Buycoins extends CI_Controller
{
	public function __construct()
	{
		ob_start ();
		parent::__construct();
		ob_end_clean();
		$this->load->library('paypal_lib');
		$this->load->config('juego');
		$this->load->config('paypal_config');
		$this->load->helper('jwt');
	}
	public function index()
	{
		$action = $_REQUEST['action'];
		switch($action)
		{
			case "process":
			{
				$this_script = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
				$paquete = $_REQUEST['paquete']-1;
				$token = $_REQUEST['token'];
				try {
					$tokena = JWT::decode($token, $this->config->item('tokenauth'));
				} catch(Exception $e) {
					$arr = array(
						"message" => 'Encountered exception: Incorrect signature',
						"success" => false
					);
					echo json_encode($arr);
					exit;
				}
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
				} else {
					$arr = array(
						"message" => 'Encountered exception: Unknown account token',
						"success" => false
					);
					echo json_encode($arr);
					exit;
				}
				if ($paquete > 4 || $paquete < 0)
				{
					$arr = array(
						"message" => 'Encountered exception: Invalid buy id',
						"success" => false
					);
					echo json_encode($arr);
					exit;
				} else {
					$numero = array_keys($this->config->item('precios')['paypal'])[$paquete];
					$montos = $this->config->item('precios')['paypal'][$numero];
					$returnURL = 'http://duex.io/?return=success';
					$cancelURL = 'http://duex.io/?return=failure';
					$notifyURL =  $this_script.'?action=ipn_666';
//					$logo = /*base_url().'assets/images/logo.png'*/'';
					$this->paypal_lib->add_field('return', $returnURL);
					$this->paypal_lib->add_field('cancel_return', $cancelURL);
					$this->paypal_lib->add_field('notify_url', $notifyURL);
					$this->paypal_lib->add_field('custom', $cuenta->ID);
					$this->paypal_lib->add_field('item_name', 'Duex '.$montos[0].' Coins  X $'.$montos[1]);
					$this->paypal_lib->add_field('item_number',  $numero);
					$this->paypal_lib->add_field('amount',  $montos[1]);
//					$this->paypal_lib->image($logo);
					
					$this->paypal_lib->paypal_auto_form();
				}
				break;
			}
			case "ipn_666":
			{
				if ($this->paypal_lib->validate_ipn()) {
					$numero = $this->paypal_lib->ipn_data['item_number'];
					$wea = $this->config->item('precios')['paypal'][$numero];
					if($this->paypal_lib->ipn_data['payment_status'] != 'Completed' || !$wea || $wea[1] != $this->paypal_lib->ipn_data['mc_gross'] || $this->paypal_lib->ipn_data['business'] != $this->config->item('business'))
					{
						echo 'No :P';
						exit;
					}
					$Usuario = $this->paypal_lib->ipn_data['custom'];
					$Pagado = $this->paypal_lib->ipn_data['mc_gross'];
					$Correo = $this->paypal_lib->ipn_data['business'];
					$Recargado = $wea[0];
					$query = $this->db->query("SELECT * FROM `usuarios` WHERE `ID` = ".$this->db->escape($Usuario)." LIMIT 1");
					if ($query->num_rows() == 1)
					{
						$cuenta = $query->row();
						$data = array(
							'Transaccion' => $this->paypal_lib->ipn_data['txn_id'],
							'Usuario' => $cuenta->ID,
							'Monto' => $Recargado,
							'Log' => $this->paypal_lib->ipn_data['payment_status'],
							'Correo' => $this->paypal_lib->ipn_data['payer_email'],
							'PID' => $this->paypal_lib->ipn_data['payer_id'],
							'PStatus' => $this->paypal_lib->ipn_data['payer_status'],
							'Fecha' => $this->paypal_lib->ipn_data['payment_date'],
						);
						$this->db->query($this->db->insert_string('paypal_pagos', $data));
						$this->db->query("UPDATE `usuarios` SET `Monedas` = ".($cuenta->Monedas+$Recargado)." WHERE `ID` = ".$cuenta->ID." LIMIT 1");
					}
				} else {
					$arr = array(
						"message" => 'Encountered exception: Esternocleidomastoideo fail, not troll',
						"success" => false
					);
					echo json_encode($arr);
					exit;
				}
			}
		}
    }
}
?>