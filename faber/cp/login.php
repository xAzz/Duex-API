<?php
header('Access-Control-Allow-Origin: *');

$username = $_GET["username"];
$password = $_GET["password"];

$api_key = "[[[[[dddd]]]]]_v";

if ($username === "LKADNI2FLADMNFNia8an" && $password === "mamkakmakaau1h1fOOa") {
    echo "{code: '0', api_key: '" . $api_key . "'}";
} else {
    echo "{code: '1', msg: 'Invalid username/password :c'}";
}
?>