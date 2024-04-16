<?php
header("Access-Control-Allow-Origin: *");

include'conexion.php';

if (!$con) {
    die("Conexión fallida: " . mysqli_connect_error());
}

$sql = "SELECT genero, COUNT(genero) AS cantidad_personas FROM usuarios GROUP BY genero";
$result = mysqli_query($con, $sql);

$data = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "0 resultados";
}

mysqli_close($con);