<?php
require_once './connection.php';
require_once './assets/class/insert.php';
$insert = new insert;

$arrImg = ['jpg', 'jpeg', 'png'];
$arrMusic = ['mpeg', 'mp4'];
if (isset($_POST['fullname'])) {
    $tenbaihat = $_POST['fullname'];
    $tencasi = $_POST['TenCaSi'];
    if (isset($_FILES['Fileimg']) && isset($_FILES['FileMuic'])) {
        $typeImg = $_FILES['Fileimg']['type'];
        $typeMusic = $_FILES['FileMuic']['type'];
        $sizeimg = $_FILES['Fileimg']['size'];
        $sizeMusic = $_FILES['FileMuic']['size'];


        if ($_FILES['Fileimg']['error'] > 0 || $_FILES['FileMuic']['error'] > 0) {
            echo "upload không thành công";
        } else {

            if ('image/' . $arrImg[0] == $typeImg || 'image/' . $arrImg[1] == $typeImg || 'image/' . $arrImg[2] == $typeImg) {
                if ($sizeimg > 5000000) {
                    echo 'file ảnh quá lớn';
                    exit;
                } else {
                    move_uploaded_file($_FILES['Fileimg']['tmp_name'], 'assets/img/' . $_FILES['Fileimg']['name']);
                }
            } else {
                echo "file ảnh phải là 'jpg', 'jpeg', 'png'";
            }


            if ('audio/' . $arrMusic[0] == $typeMusic || 'audio/' . $arrMusic[1] == $typeMusic) {
                if ($sizeMusic > 5000000) {
                    echo 'file nhạc quá lớn';
                } else {
                    move_uploaded_file($_FILES['FileMuic']['tmp_name'], 'assets/music/' . $_FILES['FileMuic']['name']);
                    $insert->addMusic($tenbaihat, $tencasi, $_FILES['Fileimg']['name'], $_FILES['FileMuic']['name']);
                }
            } else {
                echo "file nhạc phải là 'mp3','mp4'";
            }
        }
    }
}
