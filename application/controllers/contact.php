<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once (APPPATH.'/libraries/REST_Controller.php');

class Contact extends REST_Controller
{
    function __construct() {
        parent::__construct();
    }

    function index_post() {
        /*TODO: This function needs to be modified
        later allowing sending email from any address*/

        date_default_timezone_set('America/Vancouver');

        $address_to = 'lemoncapstudio@gmail.com';
        $address_from = $username = $this->post('email');;
        $name = $username = $this->post('name');
        $phone = $username = $this->post('phone');
        $message = $username = $this->post('message');

        $subject = '来自您网站的留言';
        $body = 'Name: '.$name."\r\n"
                .'Email: '.$address_from."\r\n"
                .'Phone: '.$phone."\r\n"
                .'Message: '.$message."\r\n";

        $config = Array(
            'protocol' => 'smtp',
            'smtp_host' => 'ssl://smtp.googlemail.com',
            'smtp_port' => 465,
            'smtp_user' => 'lemoncapstudio@gmail.com',
            'smtp_pass' => 'bcit2008'
        );

        $this->load->library('email', $config);
        $this->email->set_newline("\r\n");// Need to set this line.

        $this->email->from($address_from, $name);
        $this->email->to($address_to);
        $this->email->reply_to($address_from);
        $this->email->subject($subject);
        $this->email->message($body);

        if($this->email->send())
        {
            echo json_encode(array('message' => '您的邮件已发送成功。'));
        }
        else
        {
            echo $this->response('邮件发送失败，请与管理员联系。', 404);
        }
    }
}