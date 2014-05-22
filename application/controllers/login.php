<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once (APPPATH.'/libraries/REST_Controller.php');

class Login extends REST_Controller
{
    function __construct() {
        parent::__construct();
        $this->load->helper(array('util'));
        $this->load->model('user/usermodel');
        $this->load->library('session');
    }

    /**
     * Check if a user exsits or validate the password
     * @return either a json object or a error message
     */
    function index_post() {
        $username = $this->post('username');
        $pwd = $this->post('password');
        $data = $this->usermodel->get_user_by_username($username);

        if ($data) {
            $db_user = $data[0];
            $tmp_pwd = decode_pwd($pwd, $db_user->salt);

            if ($tmp_pwd === $db_user->password) {
                $user = array(
                    'user_id' => $db_user->userID,
                    'user_name' => $db_user->userName,
                    'created' => $db_user->created,
                    'modified' => $db_user->modified,
                    'logged_in' => TRUE
                );

                $this->session->set_userdata($user);

                echo json_encode($user);
            } else {
                $this->response('密码错误', 404);
            }
        } else {
            $this->response('用户不存在', 404);
        }
    }
}
