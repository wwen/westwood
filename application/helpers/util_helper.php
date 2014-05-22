<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Encode password
 *
 * Encode password using double md5 and salt combination
 * return a double encode md5 string if password is not null otherwise
 * return a error message
 *
 * @access  public
 * @param   string
 * @return  array(password, salt)
 */
if ( ! function_exists('encode_pwd'))
{
    function encode_pwd($pwd)
    {
        $salt = '';
        $charset = array('0','1','2','3','4','5','6','7','8','9',
                        'a','b','c','d','e','f','g','h','i','j','k',
                        'l','m','n','o','p','q','r','s','t','u','v',
                        'w','x','y','z','A','B','C','D','E','F','G',
                        'H','I','J','K','L','M','N','O','P','Q','R',
                        'S','T','U','V','W','X','Y','Z');
        for ($i = 0; $i < 32; $i++) {
            $salt .= $charset[rand(0, 61)];
        }

        try {
            if ($pwd) {
                $password = md5(md5($pwd).$salt);
                $pwd_set = array(
                        'password'=>$password,
                        'salt'=>$salt
                    );

                return $pwd_set;
            } else {
                throw new Exception('password can not be empty');
            }
        } catch (Exception $e) {
            //log_message('error',$e->getMessage());
        }
    }
}

/**
 * Decode password
 *
 * Decode password that from use input to see if it matches the password
 * in user table using salt
 * return password
 *
 * @access  public
 * @param   string
 * @param   string
 * @return  string(password)
 */
if ( ! function_exists('decode_pwd'))
{
    function decode_pwd($pwd, $salt)
    {
        try {
            if ($pwd && $salt) {
                $password = md5(md5($pwd).$salt);

                return $password;
            } else {
                throw new Exception('password and salt can not be empty');
            }
        } catch (Exception $e) {
            //log_message('error',$e->getMessage());
        }
    }
}

/**
 * Generate unique id
 *
 * Generate unique using php function uniqid and append a table name
 *
 * @access  public
 * @param   string
 * @return  string(unique md5 encode id)
 */
if ( ! function_exists('generate_id'))
{
    function generate_id($table_name)
    {
        try{
            if ($table_name) {
                $id = md5($table_name.md5(uniqid('',true)));
                return $id;
            } else {
                throw new Exception('no table name passed in');
            }
        } catch (Exception $e) {
            //log_message('error',$e->getMessage());
        }
    }
}

/**
 * Remove the file based on the file path
 * @param  string $path /uploads/*
 * @return none
 */
if ( ! function_exists('remove_file'))
{
    function remove_file($path)
    {
        unlink($path);
    }
}
