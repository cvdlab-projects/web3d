<?php
$sources="sources/";
$cache="cache/";

$frame=(int)$_GET['frame'];
$file=$_GET['file'];

if (preg_match('/^[a-zA-Z0-9]*\.dcm$/',$file)!=1 || $frame<1) {
	header("HTTP/1.0 404 Not Found");
	exit;
}

$dir=str_replace(".dcm","",$file);

if (!file_exists($cache.$dir))
	mkdir($cache.$dir);

if (!file_exists("$cache$dir/$frame.png")){
	shell_exec("./dicom2 -p 1 --to=$cache$dir/ --frame=$frame --rename=cur_fr $sources$file");
}

$out=file_get_contents("$cache$dir/$frame.png");

if ($out==false){
	header("HTTP/1.0 404 Not Found");
}else{

	header("Content-type: image/png");
	echo $out;
}
?>
