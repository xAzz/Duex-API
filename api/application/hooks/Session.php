<?php if (!defined( 'BASEPATH')) exit('No direct script access allowed'); 
class Session
{
    protected $ci;
    public function __construct()
    {
        $this->ci =& get_instance();
        $this->ci->load->library('session');
        //$this->ci->load->database();
        $this->ci->load->model('system');
    }
    public function check_login()
    {
        if($this->ci->uri->segment(1) == 'pcu')
        {
            $params = array(
              'where' => 'nickname',
              'Nickname' => $this->ci->session->userdata('Username'),
              'tabla' => 'players',
              'result' => ''
            );
            if ( ! ( is_null( $this->ci->system->get($params) ) ) )
            {
                $Userdata = $this->ci->system->get($params);
                if($this->ci->uri->segment(2) == 'ingresar')    
                {
                    if ($this->ci->session->userdata('Username') != null)
                    {
                        redirect('pcu/inicio');
                    }
                }
                else
                {
                    if ($Userdata->IPWEB == $_SERVER['REMOTE_ADDR'])
                    {
                        if ($Userdata->Nickname != $this->ci->session->userdata('Username'))
                        {
                            $this->ci->session->sess_destroy();
                            redirect('pcu/ingresar');
                        }/*
                        else
                        {  
                            if ( $this->ci->uri->segment(2) == 'admin')
                            {
                               if($Userdata->Admin != md5('Admin'.$Userdata->ID.$Userdata->Username))
                                { 
                                    if($this->ci->uri->segment(3) == 'support')
                                    {
                                        if($Userdata->Admin != md5('Moderator'.$Userdata->ID.$Userdata->Username))
                                        {
                                           redirect('clientarea/account');  
                                        }
                                    } else {
                                        redirect('clientarea/account');  
                                    }
                                }
                            }
                        }*/
                    }
                    else
                    {
                       $this->ci->session->sess_destroy();
                       redirect('pcu/ingresar');
                    }
                }
            }
            else
            {
                $this->ci->session->sess_destroy();
                redirect('pcu/ingresar');
            }
        }
    }
}
?>