<?php
header("Access-Control-Allow-Origin: *");

include 'conexion.php';

// Obtiene los datos del cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

if (!$con) {
    die("Conexión fallida: " . mysqli_connect_error());
}

$email = $data['email'];
$pass = $data['pass'];

$sql = "SELECT * FROM usuarios WHERE email='$email' AND pass='$pass'";
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
