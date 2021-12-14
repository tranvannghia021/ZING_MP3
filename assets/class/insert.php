<?php

class insert
{
    function addMusic($name, $singer, $path, $img)
    {
        $conn = new connection;
        $conn->connect();
        $sql = "INSERT INTO source(name,singer,path,img) VALUES('" . $name . "','" . $singer . "','" . $path . "','" . $img . "')";
        $result = mysqli_query($conn->__getConn(), $sql);
        if (!$result) {
            echo 'lỗi upload';
        } else {
            echo 'upload thành công';
        }
    }
}
