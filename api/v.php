<?php
$remoteImage = "https://www.rpg.b-zone.ro/public/img/Vehicles/404.png";
$imginfo = getimagesize($remoteImage);
header("Content-type: {$imginfo['mime']}");
readfile($remoteImage);
?>