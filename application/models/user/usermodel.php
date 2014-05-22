<?php

class UserModel extends CI_Model {

    function __construct()
    {
        parent::__construct();
    }

    /**
     * Get a single user from user table by user name
     * @param  [string]       $name user unique name
     * @return [object]       result object
     */
    function get_user_by_username($username)
    {
        $sql = "SELECT * FROM user WHERE userName = ?";
        $query = $this->db->query($sql, array($username));
        return $query->result();
    }
}
