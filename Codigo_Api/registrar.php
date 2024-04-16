<?php
header("Access-Control-Allow-Origin: *");

include 'conexion.php';

// Verificar si se recibió una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtiene los datos del cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    // Verificar si se recibieron los datos esperados
    $requiredFields = array('nombre', 'appat', 'apmat', 'calle', 'colonia', 'municipio', 'estado', 'telefono', 'email', 'pass','estatus', 'fecha_nacimiento', 'genero');
    $missingFields = array();
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            $missingFields[] = $field;
        }
    }

    if (count($missingFields) === 0) {
        // Escapar los datos recibidos para evitar inyección SQL
        $nombre = mysqli_real_escape_string($con, $data['nombre']);
        $appat = mysqli_real_escape_string($con, $data['appat']);
        $apmat = mysqli_real_escape_string($con, $data['apmat']);
        $calle = mysqli_real_escape_string($con, $data['calle']);
        $colonia = mysqli_real_escape_string($con, $data['colonia']);
        $municipio = mysqli_real_escape_string($con, $data['municipio']);
        $estado = mysqli_real_escape_string($con, $data['estado']);
        $telefono = mysqli_real_escape_string($con, $data['telefono']);
        $email = mysqli_real_escape_string($con, $data['email']);
        $pass = mysqli_real_escape_string($con, $data['pass']);
        $estatus = mysqli_real_escape_string($con, $data['estatus']);
        $fecha_nacimiento = mysqli_real_escape_string($con, $data['fecha_nacimiento']);
        $cargo = mysqli_real_escape_string($con, $data['cargo']);
        $genero = mysqli_real_escape_string($con, $data['genero']);

        // Consulta SQL para insertar un nuevo usuario en la tabla
        $sql = "INSERT INTO usuarios (id_usuario, nombre, appat, apmat, calle, colonia, municipio, estado, telefono, email, pass, estatus, fecha_nacimiento, cargo,  genero) 
                VALUES ( null, '$nombre', '$appat', '$apmat', '$calle', '$colonia', '$municipio', '$estado', '$telefono', '$email', '$pass', '$estatus', '$fecha_nacimiento', '$cargo', '$genero')";

        // Ejecutar la consulta
        if (mysqli_query($con, $sql)) {
            echo json_encode(array("message" => "Registro exitoso"));
        } else {
            echo json_encode(array("message" => "Error al registrar el usuario: " . mysqli_error($con)));
        }
    } else {
        echo json_encode(array("message" => "Faltan datos en la solicitud", "missingFields" => $missingFields));
    }
} else {
    echo json_encode(array("message" => "Método no permitido"));
}

// Cerrar la conexión a la base de datos
mysqli_close($con);
?>
