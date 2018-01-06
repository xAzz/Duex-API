<?php if (!defined('BASEPATH')) exit('No direct script access allowed');  
    $config['protocol'] = 'mail';
    $config['smtp_host'] = 'localhost';
    $config['smtp_port'] = '587';
    $config['smtp_user'] = 'admin@duex.io'; //change this
    $config['smtp_pass'] = 'idk'; //change this
    $config['mailtype'] = 'html';
    $config['charset'] = 'utf-8';
    $config['wordwrap'] = TRUE;
    $config['newline'] = "\r\n"; //use double quotes to comply with RFC 822 standard
	$config['smtp_timeout'] = 5;
?>
