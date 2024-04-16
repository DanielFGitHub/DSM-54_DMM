<?php
header("Access-Control-Allow-Origin: *");

include 'conexion.php';

// Verificar si se recibió una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtiene los datos del cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    // Verificar si se recibió el ID del usuario y los nuevos datos
    if (isset($data['id_usuario']) && isset($data['nuevosDatos'])) {
        // Escapar el ID recibido para evitar inyección SQL
        $id_usuario = mysqli_real_escape_string($con, $data['id_usuario']);

        // Crear la cadena de actualización de datos
        $updateString = '';
        foreach ($data['nuevosDatos'] as $campo => $valor) {
            $campo = mysqli_real_escape_string($con, $campo);
            $valor = mysqli_real_escape_string($con, $valor);
            $updateString .= "$campo='$valor',";
        }
        $updateString = rtrim($updateString, ',');

        // Consulta SQL para actualizar los datos del usuario en la tabla
        $sql = "UPDATE usuarios SET $updateString WHERE id_usuario=$id_usuario";

        // Ejecutar la consulta
        if (mysqli_query($con, $sql)) {
            echo json_encode(array("message" => "Actualización exitosa"));
        } else {
            echo json_encode(array("message" => "Error al actualizar los datos del usuario: " . mysqli_error($con)));
        }
    } else {
        echo json_encode(array("message" => "ID del usuario o datos actualizados no proporcionados"));
    }
} else {
    echo json_encode(array("message" => "Método no permitido"));
}

// Cerrar la conexión a la base de datos
mysqli_close($con);
?>
