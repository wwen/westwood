<?php defined('BASEPATH') OR exit('No direct script access allowed');

define('UPLOAD_INVENTORY_PATH', './uploads/photos/inventories');

class Generic extends CI_Controller {


    public function __construct() {
        parent::__construct();
        $this->load->helper(array('util'));
        $this->load->library('session');
    }

    private function uploadfile($file_path, $allowed_types, $file_name) {
        $config['upload_path'] = $file_path;
        $config['allowed_types'] = $allowed_types;
        $config['file_name'] = $file_name;
        $config['overwrite'] = true;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if (!$this->upload->do_upload('file'))
        {
            $error = array('error' => $this->upload->display_errors());

            return $error;
        }
        else
        {
            $data = array('upload_data' => $this->upload->data());

            return $data;
        }
    }

    private function resizephoto($src, $dst, $width, $height) {

        $config['image_library'] = 'gd2';
        $config['source_image'] = $src;
        $config['new_image'] = $dst;
        $config['maintain_ratio'] = TRUE;
        $config['width']     = $width;
        $config['height']   = $height;

        $this->load->library('image_lib', $config);
        $this->image_lib->initialize($config);
        return $this->image_lib->resize();
    }

    private function resizeinventoryphoto($path, $allowed_types, $file_name) {
        $data = $this->uploadfile($path, $allowed_types, $file_name);

        if (array_key_exists('upload_data', $data)) {
            $image_size = [
                array(
                    'name' => '80x60',
                    'width' => 80,
                    'height' => 60
                ),
                array(
                    'name' => '160x120',
                    'width' => 160,
                    'height' => 120
                ),
                array(
                    'name' => '320x240',
                    'width' => 320,
                    'height' => 240
                ),
                array(
                    'name' => '640x480',
                    'width' => 640,
                    'height' => 480
                ),
                array(
                    'name' => '1024x768',
                    'width' => 1024,
                    'height' => 768
                )
            ];

            $orig_name = $data['upload_data']['orig_name'];
            $src = UPLOAD_INVENTORY_PATH.'/original/'.$orig_name;

            foreach ($image_size as $size) {
                $dst = UPLOAD_INVENTORY_PATH.'/'.$size['name'].'/'.$orig_name;
                if (!$this->resizephoto($src,
                                        $dst,
                                        $size['width'],
                                        $size['height'])) {

                    $error = array('error' => '<p>Image resize fail</p>');
                    return json_encode($error);
                }
            }
        }

        return json_encode($data);
    }

    public function uploadinventoryphoto() {
        $file_path = UPLOAD_INVENTORY_PATH.'/original/';
        $allowed_types = 'gif|jpg|png';
        $file_name = generate_id('media');

        echo $this->resizeinventoryphoto($file_path, $allowed_types, $file_name);
    }

    public function deleteinventoryphoto() {
        unlink(UPLOAD_INVENTORY_PATH.'/original/test.html');
    }

    public function checkLoginSessionCookie() {
        try{
            $is_loggedin = $this->session->userdata('logged_in');

            if($is_loggedin) {
                $userdata = $this->session->all_userdata();
                echo json_encode($userdata);
            }
            else
            {
                header('HTTP/1.0 404 Not Found');
                echo false;
            }
        }
        catch(Exception $e){
            header('HTTP/1.0 404 Not Found');
            echo 'exception:'.$e->getMessage();
        }
    }

    public function logoutUser()
    {
        $this->session->sess_destroy();
        echo 'session cleared.';
    }
}
