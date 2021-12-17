<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
include_once('../config/connection.php');
include_once('../model/listMusic.php');
$conn = new connection;
$db = $conn->connect();
$listMusic = new listMusic($db);
$rs = $listMusic->Read();
$num = $rs->rowCount();
if ($num > 0) {
    $post_array = [];


    while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $question_item = array(
            'id_source' => $id_source,
            'name' => $name,
            'singer' => $singer,
            'path' => $path,
            'image' => $img,

        );
        array_push($post_array, $question_item);
    }
    echo json_encode($post_array);
}
