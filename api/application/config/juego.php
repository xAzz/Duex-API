<?php  if (!defined('BASEPATH')) exit('No direct script access allowed'); 
  
// ------------------------------------------------------------------------ 
// Facebook Datos para API
// ------------------------------------------------------------------------ 


$config['tokenauth'] = 'NosexDDioFijq';
$config['precios'] = array(
	'massx2' => 200,
	'massx3' => 600,
	'colorLB' => 25000,
	'rainbowcolorLB' => 80000,
    'paypal' => array(
        10031 => array(7500, 7.99),
        10032 => array(20000, 14.99),
        10033 => array(32000, 25.99),
        10034 => array(50000, 39.99),
        10035 => array(135000, 89.99)
    ),
    'hats' => array(
        array('hat_vip1', 25000),
        array('hat_vip2', 25000),
        array('hat_one_piece', 20000),
        array('hat_monster', 25000),
        array('hat_roses', 15000),
        array('hat_pirate', 25000),
        array('hat_magick', 15000),
        array('hat_amz_demon', 25000),
        array('hat_g_demon', 25000),
        array('hat_elf', 12000),
        array('hat_it', 20000),
        array('hat_gang', 13000),
        array('hat_girl_hat', 20000),
        array('hat_zelda', 7000),
        array('hat_france', 22000),
        array('hat_magick2', 27000),
        array('hat_kirby', 7000),
        array('hat_roses2', 10000),
        array('hat_it2', 10000),
        array('hat_zozo', 13000),
        array('hat_universe', 15000),
        array('hat_girl_3', 9000),
        array('hat_gold_sailor', 7000),
        array('hat_cowboy', 15000),
        array('hat_magick_crown', 20000),
        array('hat_sharkoncio', 15000),
        array('hat_school', 7000),
        array('hat_magick_girl', 15000),
        array('hat_kbzon', 7000),
        array('hat_independence', 15000),
        array('hat_pepe', 20000),
        array('hat_sailor', 8000),
        array('hat_chef', 7000),
        array('hat_viking_gold', 18000),
        array('hat_luigi', 13000),
        array('hat_girl_hat_2', 11000),
        array('hat_stupid_magick', 10000),
        array('hat_cowboy_2', 13000),
        array('hat_merry_christmas', 10000),
        array('hat_police', 15000),
        array('hat_indio', 20000),
        array('hat_magick_rabbit', 25000),
        array('hat_evil_demon', 35000),
        array('hat_devil', 8000),
        array('hat_crown_classic', 15000),
	)
);
$config['servidores'] = array(
    'Instant-16' => array(
        array("Instant-16 1", "duex.sly.io:2001", "1", "16"),
        array("Instant-16 2", "duex.sly.io:2002", "1", "16"),
        array("Instant-16 3", "duex.sly.io:2003", "1", "16"),
        array("Instant-16 4", "duex.sly.io:2004", "1", "16"),
    ),
    'Instant-64' => array(
        array("Instant-64 1", "duex.sly.io:2005", "1", "64"),
        array("Instant-64 2", "duex.sly.io:2006", "1", "64"),
        array("Instant-64 3", "duex.sly.io:2007", "1", "64"),
        array("Instant-64 4", "duex.sly.io:2008", "1", "64"),
    ),
    'CrazySelfFeed' => array(
        array("CrazySelfFeed 1", "duex.sly.io:2009", "1", "32"),
        array("CrazySelfFeed 2", "duex.sly.io:2010", "1", "32"),
        array("CrazySelfFeed 3", "duex.sly.io:2011", "1", "32"),
        array("CrazySelfFeed 4", "duex.sly.io:2012", "1", "32"),
        array("CrazySelfFeed 5", "duex.sly.io:2013", "1", "32"),
        array("CrazySelfFeed 6", "duex.sly.io:2014", "1", "32"),
    ),
    'Crazy-Bots' => array(
        array("Crazy-Bots 1", "duex.sly.io:2015", "1", "250"),
        array("Crazy-Bots 2", "duex.sly.io:2016", "1", "250"),
        array("Crazy-Bots 3", "duex.sly.io:2017", "1", "250"),
        array("Crazy-Bots 4", "duex.sly.io:2018", "1", "250"),
    ),
    'UltraSplit' => array(
        array("UltraSplit 1", "duex.sly.io:2019", "1", "132"),
        array("UltraSplit 2", "duex.sly.io:2020", "1", "132"),
        array("UltraSplit 3", "duex.sly.io:2021", "1", "132"),
        array("UltraSplit 4", "duex.sly.io:2022", "1", "132"),
    ),
    'VirusMode' => array(
        array("VirusMode 1", "duex.sly.io:2028", "1", "64"),
        array("VirusMode 2", "duex.sly.io:2029", "1", "64"),
        array("VirusMode 3", "duex.sly.io:2030", "1", "64"),
        array("VirusMode 4", "duex.sly.io:2031", "1", "64"),
    )
);
$config['reg_coins'] = 1500;
?>