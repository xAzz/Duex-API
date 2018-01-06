<?php  if (!defined('BASEPATH')) exit('No direct script access allowed'); 
  
// ------------------------------------------------------------------------ 
// Ppal (Paypal IPN Class) 
// ------------------------------------------------------------------------ 
  
// If (and where) to log ipn to file 
// PayPal Business Email ID
$config['business'] = 'angel-ac18@hotmail.com';
$config['paypal_lib_ipn_log_file'] = APPPATH . 'logs/paypal_ipn.log'; 
$config['paypal_lib_ipn_log'] = TRUE; 
  
// Where are the buttons located at  
$config['paypal_lib_button_path'] = 'buttons'; 
  
// What is the default currency? 
$config['paypal_lib_currency_code'] = 'EUR'; 
  
// Enable Sandbox mode? 
$config['paypal_lib_sandbox_mode'] = FALSE;

?>