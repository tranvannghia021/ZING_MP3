<?php
class connection
{
    public  $__conn;
    public function __getConn()
    {
        return $this->__conn;
    }
    public function __setConn($__conn)
    {
        $this->__conn = $__conn;
    }
    function connect()
    {
        // nếu chưa thực hiện kết nối thì kết nôi
        if (!$this->__conn) {
            //kết nôi
            $host = "localhost";
            $user = "root";
            $pass = "";
            $database = "zing-mp3";
            $this->__conn = mysqli_connect($host, $user, $pass, $database) or die("kết nối thất bại");
            // xử lý UTF8
            mysqli_query($this->__conn, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
        }
    }
    function dis_connect()
    {
        if ($this->__conn) {
            mysqli_close($this->__conn);
        }
    }
}
