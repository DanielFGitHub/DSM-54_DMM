<?php
header("Access-Control-Allow-Origin: *");

include 'conexion.php';

// Verificar si se recibió una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtiene los datos del cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    // Verificar si se recibió el ID del usuario a eliminar
    if (isset($data['id'])) {
        // Escapar el ID del usuario para evitar inyección SQL
        $id = mysqli_real_escape_string($con, $data['id']);

        // Consulta SQL para eliminar al usuario con el ID proporcionado
        $sql = "DELETE FROM usuarios WHERE id_usuario = '$id'";

        // Ejecutar la consulta
        if (mysqli_query($con, $sql)) {
            echo json_encode(array("message" => "Usuario eliminado correctamente"));
        } else {
            echo json_encode(array("message" => "Error al eliminar el usuario: " . mysqli_error($con)));
        }
    } else {
        echo json_encode(array("message" => "ID de usuario no proporcionado"));
    }
} else {
    echo json_encode(array("message" => "Método no permitido"));
}

// Cerrar la conexión a la base de datos
mysqli_close($con);
?>
