<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('UTC');
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
class Servers extends CI_Controller
{
	public function __construct()
	{
		ob_start ();
		parent::__construct();
		ob_end_clean();
		$this->load->config('juego');
	}
	public function index()
	{
		$servidores = $this->config->item('servidores');
		$servidoresNA = array(
			"totalServers" => count($servidores),
			"totalPlayers" => 0
		);
		$servidoresEU = array(
			"totalServers" => count($servidores),
			"totalPlayers" => 0
		);
/*		foreach($servidores as $i => $item) {
			foreach($servidores[$i] as $s => $iteme) {
				$urlNA = 'http://na.'.$servidores[$i][$s][1].'/';
				$ase = file_get_contents($urlNA);
				echo $ase."</BR>";
			}
			$urlNA = 'na.'.$servidores[$i][0][1];
			$urlEU = 'eu.'.$servidores[$i][0][1];
			$ase = file_get_contents($urlNA);
			$as = str_getcsv($ase);
			$servidoresNA["totalPlayers"] += $as['current_players'];
			$servidoresNA[$servidores[$i][0][0]] = $as;

			$ase = file_get_contents($urlEU, true);
			$as = str_getcsv($ase);
			$servidoresEU["totalPlayers"] += $as['current_players'];
			$servidoresEU[$servidores[$i][0][0]] = $as;
		}*/
		echo file_get_contents("http://na.duex.sly.io:2001/", true);
/*		$arr = array(
			"regions" => array(
				"NA" => $servidoresNA,
				"EU" => $servidoresEU,				
			)
		);
		echo json_encode($arr);*/
	}
}
?>