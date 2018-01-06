<?php
class Theme
{
    protected $params = array();
    protected $ci;
    public function __construct($params = array())
    {
        $this->params = $params;
        $this->ci =& get_instance(); 
    }
}
?>