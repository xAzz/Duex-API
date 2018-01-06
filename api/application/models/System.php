 <?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class System extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    /* $this->system->ObtenerNivel($XP) */
    /*  return Level */
    public function ObtenerNivel($a) {
        $b = (sqrt($a))*0.13;
        return $b;
    }
    /* $this->system->ObtenerXP($level) */
    /*  return XP */
    public function ObtenerXP($a) {
        $b = (int)$a;
        $c = pow($b/0.13, 2);
        return (int)$c;
    }
    /* $this->system->CalcularMasa($nivel) */
    /*  return Size Mass */
    public function CalcularMasa($a) {
        return (240 + (2 * (sqrt($a * 100))) < 510) ? 240 + (2 * (sqrt($a * 100))) : 510;
    }
    public function get( $params = array() )
    {
        if ( $params['where'] != '' )
        {
            switch ( $params['where'] ) 
            {
                case 'email':
                    $this->db->where('Email', $params['Mail']);
                continue;
                case 'id':
                    $this->db->where('ID', $params['ID']);
                continue;
                case 'none':
                    continue;
                case 'nickname':
                    $this->db->where('Nickname', $params['Nickname']);
                continue;
            }
            $this->query = $this->db->get($params['tabla']);
            if ( $this->query->num_rows() > 0 )
            {
                switch ($params['result']) 
                {
                    case 'row_array':
                        return $this->query->row_array();
                    break;
                    case 'result':
                        return $this->query->result();
                    break;
                    case 'result_array':
                        return $this->query->result_array();
                    break;
                    default:
                        return $this->query->row();
                    break;
                }
            }
            else
            {
                return FALSE;
            }
        }
        else
        {
            return FALSE;
        }

    }
    public function update( $params = array() )
    {
        if ( $params['where'] != null )
        {
            $this->db->query($this->db->update_string($params['tabla'], $params['data'], $params['where']));
            if ( $this->db->affected_rows() > 0 )
            {
                return TRUE;
            }
            else
            {
                return FALSE;
            }
        }
        else
        {
            return FALSE;
        }
    }
    public function insert( $params = array() )
    {

        $this->db->query($this->db->insert_string($params['tabla'], $params['data']));
        if ( $this->db->affected_rows() > 0 )
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }

    }
    public function delete( $params = array() )
    {
        if ( $params != null )
        {
            switch ($params['where']) 
			{
                case 'email':
                    $this->db->where( 'Email', $params['Mail'] );
                continue;
                case 'nickname':
                    $this->db->where( 'Nickname', $params['Nickname'] );
                    break;
                default:
                    $this->db->where( 'ID', $params['ID'] );
                continue;
            }
            $this->db->delete($params['tabla']);
            if ( $this->db->affected_rows() > 0 )
            {
                return TRUE;
            }
            else
            {
                return FALSE;
            }
        }
        else
        {
            return FALSE;
        }
    }
}
?>