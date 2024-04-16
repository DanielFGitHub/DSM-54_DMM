<?php
header("Access-Control-Allow-Origin: *");

include'conexion.php';

if (!$con) {
    die("Conexión fallida: " . mysqli_connect_error());
}

$sql = "SELECT fecha_registro, COUNT(*) AS numero_de_personas FROM usuarios_nuevos GROUP BY fecha_registro ORDER BY fecha_registro";
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

?>
