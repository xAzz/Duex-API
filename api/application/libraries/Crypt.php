<?php
/**
 * library function.php
 */
class Crypt
{
	protected $CI;
	public function __construct()
    {
        $this->CI =& get_instance();
		$this->CI->load->library('session');
		$this->CI->load->library('encrypt');
    }
	public function set_name($ename, $arg = array())
    {
		$this->CI->encrypt->set_cipher(MCRYPT_CAST_256);
		$name = preg_replace('/[^A-Za-z0-9\-]/', '', $this->CI->encrypt->encode($ename, $_SERVER['REMOTE_ADDR'].$arg.$_SERVER['REMOTE_ADDR'])); 
		$this->CI->session->set_userdata($ename, $name);
		return $name;
	}
	public function name($name)
	{
        return $this->CI->session->userdata($name);
	}
}
?>