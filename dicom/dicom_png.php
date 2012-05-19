<?php
$frame=(int)$_GET['frame'];

if (eregi('^[a-zA-Z0-9\\/:]*\.dcm$',$_GET['file'])) {
	$file=$_GET['file'];
}

$dir=str_replace(".dcm","",basename($file));

if (!file_exists($dir))
	mkdir($dir);

if (!file_exists("$dir/$frame.png")){
	shell_exec("./dicom2 -p 1 --to=$dir/ --frame=$frame --rename=cur_fr $file");
}

$out=file_get_contents("$dir/$frame.png");

if ($out==false){
	header("HTTP/1.0 404 Not Found");
}else{

	header("Content-type: image/png");
	echo $out;
}
?>
