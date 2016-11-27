<?php
$target_dir = "UPLOADS\\";
$target_file_name = basename($_FILES["fileUpload"]["name"]);
$target_file = $target_dir . $target_file_name;
$uploadOk = 0;
$fileType = pathinfo($target_file,PATHINFO_EXTENSION);

//check if post
if(isset($_POST["submit"])) 
{
    $uploadOk = 1;
}

// Check if file already exists
if (file_exists($target_file)) 
{
    echo "Sorry, file:" . $target_file . " already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileUpload"]["size"] > 5000000) 
{
    echo "Sorry, your file is too large.\n";
    $uploadOk = 0;
}
// Allow certain file formats
if($fileType == "exe" && $fileType == "ps1" && $fileType != "bat" && $fileType == "sh" ) 
{
	echo "Sorry, I cannot allow exe, ps1, bat files on a work server.\n";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
	
//everything is ok, lets try to upload file
} 
else 
{
    if (move_uploaded_file($_FILES["fileUpload"]["tmp_name"], $target_file)) 
	{
        echo "The file ". $target_file_name . " has been uploaded.\n";
    } else 
	{
        echo "Sorry, there was an error uploading your file: ". $target_file_name ."\n";
    }
}

$fileWrite = 'settings';
// The new person to add to the file
$dataWrite= $target_file_name.";http:pot.na.serverju.com:port/UPLOADS/".$target_file_name.";".$fileType.";".$_POST["fdate"].";".$_POST["fcomment"]."\n";

//write to file
file_put_contents($fileWrite, $dataWrite, FILE_APPEND);


echo '<br><a href="index.html"> Click me to return...</a>'



?>
