<?php
class listMusic

{
    private $conn;
    public $name;
    public $singer;
    public $path;
    public $img;
    public $id_source;
    function __construct($db)
    {
        $this->conn = $db;
    }
    function Read()
    {

        $sql = "SELECT *FROM source ORDER BY id_source DESC";
        $result = $this->conn->prepare($sql);
        $result->execute();
        return $result;
    }
}
