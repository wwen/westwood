<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

define('UPLOAD_INVENTORY_PATH', './uploads/photos/inventories');
require_once (APPPATH.'/libraries/REST_Controller.php');

class Inventory extends REST_Controller
{
    function __construct() {
        parent::__construct();
        $this->load->helper(array('util'));
        $this->load->model('inventory/inventorymodel');
        $this->load->library('session');
    }

    function index_post() {
        $inventory_id = $this->post('inventory_id');
        $media = $this->post('media');
        $category_data = $this->post('category_data');
        $isAdmin = $this->session->userdata('logged_in');

        if ($inventory_id && $isAdmin) {
            $this->inventorymodel->save_inventory($inventory_id);

            for ($idx = 0; $idx < sizeof($category_data); $idx++) {
                $category_id = $category_data[$idx]['category_id'];
                $value = $category_data[$idx]['value'];

                $this->inventorymodel->save_inventory_category($inventory_id, $category_id, $value);
            }

            for ($i = 0; $i < sizeof($media); $i++) {
                $media_id = $media[$i]['media_id'];
                $media_name = $media[$i]['file_name'];
                $media_ext = $media[$i]['file_ext'];
                $this->inventorymodel->save_media($media_id, $media_name, $media_ext);
                $this->inventorymodel->save_inventory_media($inventory_id, $media_id);
            }
        }
    }

    function index_get($id = null) {
        if($id) {
            echo 'GET Request Single Record';
        } else {
            $data = $this->inventorymodel->fetch_all_inventoies();

            echo json_encode($data);
        }
    }

    function index_put($id = null) {
        echo "";
    }

    function update_inventory_post()
    {
        $isAdmin = $this->session->userdata('logged_in');

        if($isAdmin) {
            $inventory_id = $this->post('inventoryID');
            $categories = $this->post('categories');
            $modified = $this->post('modified');
            $success = $this->inventorymodel->update_inventory_category($inventory_id, $categories, $modified);
        if ($success = true) {
            echo '数据已保存';
        } else {
           echo '数据库错误';
        }
        }
    }

    function index_delete($id) {
        $isAdmin = $this->session->userdata('logged_in');

        if($isAdmin) {
            //remove_file(UPLOAD_INVENTORY_PATH.'/original/test.html');
            $inventory_photopath_array = array(
                UPLOAD_INVENTORY_PATH.'/original/',
                UPLOAD_INVENTORY_PATH.'/80x60/',
                UPLOAD_INVENTORY_PATH.'/160x120/',
                UPLOAD_INVENTORY_PATH.'/320x240/',
                UPLOAD_INVENTORY_PATH.'/640x480/',
                UPLOAD_INVENTORY_PATH.'/1024x768/'
            );
            $data = $this->inventorymodel->delete_inventory($id);

            if ($data) {
                // remove each file from upload inventory directory
                foreach ($data as $media_name) {
                    foreach ($inventory_photopath_array as $inventory_photopath)
                    remove_file($inventory_photopath.$media_name);
                }
                return 1;
            } else {
                return 0;
            }
        }
    }
}
