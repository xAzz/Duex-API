<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/html; charset=utf-8');

define("RANKING_API_SERVER", "localhost");
define("RANKING_API_USERNAME", "ullxqcmw_api");
define("RANKING_API_PASSWORD", "QN0-@GOH7H2V");
define("RANKING_API_DATABASE", "ullxqcmw_api");

$filter = $_GET['filter'];
if ($filter == "coins") {
    $conn = new mysqli(RANKING_API_SERVER, RANKING_API_USERNAME, RANKING_API_PASSWORD, RANKING_API_DATABASE);
    mysqli_set_charset($conn, "utf8");
    if ($conn->connect_error && $conn->set_charset("utf8")) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    $sql = "SELECT `Monedas`, `XP`, `Nick`, `SkinUrl` FROM `usuarios` ORDER BY `Monedas` DESC LIMIT 51";
    $result = $conn->query($sql);

    $txt = "[";
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $txt .= json_encode($row) . ",";
        }
    }
    echo substr($txt, 0, -1) . "]";
    
    $conn->close();
} else if ($filter == "lvl") {
    $conn = new mysqli(RANKING_API_SERVER, RANKING_API_USERNAME, RANKING_API_PASSWORD, RANKING_API_DATABASE);
    mysqli_set_charset($conn, "utf8");
    if ($conn->connect_error && $conn->set_charset("utf8")) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    $sql = "SELECT `XP`, `Nick`, `SkinUrl` FROM `usuarios` ORDER BY `XP` DESC LIMIT 51";
    $result = $conn->query($sql);

    $txt = "[";

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $txt .= json_encode($row) . ",";
        }
    }
    echo substr($txt, 0, -1) . "]";

    $conn->close();
} else {
    echo "niggerfaggot;";
}
?>