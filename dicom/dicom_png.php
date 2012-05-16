<?php
$frame=(int)$_GET['frame'];

if (eregi('^[a-zA-Z0-9\\/:]*\.dcm$',$_GET['file'])) {
	$file=$_GET['file'];
}

//$dir=md5($_SERVER['REMOTE_ADDR']).time();

$dir=str_replace(".dcm","",basename($file));

if (!file_exists($dir))
	mkdir($dir);

if (!file_exists("$dir\\$frame.png")){
	shell_exec("dicom2 -p 1 --to=$dir\ --frame=$frame --rename=cur_fr $file");
}

header("Content-type: image/png");
echo file_get_contents("$dir\\$frame.png");
?>