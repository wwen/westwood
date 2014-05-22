<?php

class CategoriesModel extends CI_Model {

    function __construct()
    {
        parent::__construct();
    }

    /**
     * Get a single user from user table by user name
     * @param  [string]       $name user unique name
     * @return [object]       result object
     */
    function get_all_categories()
    {
        $sql = "SELECT * FROM categories";
        $query = $this->db->query($sql);
        return $query->result();
    }
}
