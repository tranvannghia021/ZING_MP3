<?php

class insert
{
    function __construct($db)
    {
        $this->conn = $db;
    }
    function addMusic($name, $singer, $path, $img)
    {

        $sql = "INSERT INTO source(name,singer,path,img) VALUES('" . $name . "','" . $singer . "','" . $path . "','" . $img . "')";
        $result = $this->conn->prepare($sql);
        $result->execute([$name, $singer, $path, $img]);
        if (!$result) {
            echo 'lỗi upload';
        } else {
            echo 'upload thành công';
        }
    }
}
