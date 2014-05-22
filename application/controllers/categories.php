<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once (APPPATH.'/libraries/REST_Controller.php');

class Categories extends REST_Controller
{
    function __construct() {
        parent::__construct();
        $this->load->helper(array('util'));
        $this->load->model('categories/categoriesmodel');
    }

    /**
     * Check if a user exsits or validate the password
     * @return either a json object or a error message
     */
    function index_post() {
        $data = $this->categoriesmodel->get_all_categories();

        $inventory_id = generate_id('inventory');

        $category_data = array(
            'inventoryID'=> $inventory_id,
            'categories'=> $data
        );
        echo json_encode($category_data);
    }
}
