import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Styles from '../../Estilos/Styles';

function Usuarios({navigation}) {
    const [registros, setRegistros] = useState([]);
    const [genero, setGenero] = useState();
    const [formData, setFormData] = useState({
        id_usuario: null,
        nombre: '',
        appat: '',
        apmat: '',
        calle: '',
        colonia: '',
        municipio: '',
        estado: '',
        telefono: '',
        email: '',
        pass: '',
        estatus: 1,
        fecha_nacimiento: '',
        cargo: 'Usuario',
        genero: ''
    });

    useEffect(() => {
        fetchRegistros();
    }, []);

    const fetchRegistros = async () => {
        try {
            const response = await axios.get('https://pruebaesp8266temphum.000webhostapp.com/usuariosapi.php');
            setRegistros(response.data);
        } catch (error) {
            console.error('Error al obtener registros: ', error);
        }
    };

    const handleSubmit = async () => {
        if (formData.appat === '' ||
            formData.apmat === '' ||
            formData.nombre === ''
        ) {
            Alert.alert('Datos de usuario requeridos');
        } else if (formData.calle === '' || formData.colonia === '' || formData.email === '' || formData.municipio === '') {
            Alert.alert('Error: Datos de domicilio requeridos');
        } else if (formData.email === '' || formData.pass === '') {
            Alert.alert('Error: Datos de acceso requeridos');
        } else if(formData.telefono === '' || formData.genero === ''){
            Alert.alert("Todos los campos son necesarios");
        }else {
            try{
                if(formData.id_usuario){
                    try {
                        await axios.post('https://pruebaesp8266temphum.000webhostapp.com/editarU.php', {
                            id_usuario: formData.id_usuario,
                            nuevosDatos: formData
                        });
                        clearFormData();
                        console.log('Actualización exitosa');
                        // Aquí puedes agregar cualquier otra lógica después de la actualización exitosa
                    } catch (error) {
                        console.error('Error al actualizar los datos del usuario: ', error);
                        // Aquí puedes manejar el error de manera adecuada, como mostrar un mensaje al usuario
                    }
                }else{
                    axios.post('https://pruebaesp8266temphum.000webhostapp.com/registrar.php', formData)
                    .then(res => {
                        console.log(res.data);
                        clearFormData();
                        Alert.alert("Registro exitoso");
                        navigation.navigate("LoginForm");
                    })
                    .catch(err => {
                        console.error(err);
                        Alert.alert("Error", "Hubo un problema al enviar los datos");
                    });
                }
                fetchRegistros();
                clearFormData();
            }catch{

            }
        }
    };

    const handleDelete = async (id_usuario) => {
        try {
            Alert.alert(
                'Confirmar eliminación',
                '¿Estás seguro de que deseas eliminar este registro?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Eliminar',
                        onPress: async () => {
                            try {
                                await axios.post('https://pruebaesp8266temphum.000webhostapp.com/eliminarU.php', { id: id_usuario });
                                // Actualizar la lista de registros
                                fetchRegistros();
                                Alert.alert('Éxito', 'Se ha eliminado el registro');
                            } catch (error) {
                                console.error('Error al eliminar el registro: ', error);
                                Alert.alert('Error', 'No se pudo eliminar el registro');
                            }
                        },
                    },
                ],
                { cancelable: true }
            );
        } catch (error) {
            console.error('Error al mostrar el cuadro de diálogo: ', error);
        }
    };
    

    const handleEdit = (registro) => {
        setFormData(registro);
        console.log(formData)
    };

    const clearFormData = () => {
        setFormData({
            nombre: '',
        appat: '',
        apmat: '',
        calle: '',
        colonia: '',
        municipio: '',
        estado: '',
        telefono: '',
        email: '',
        pass: '',
        estatus: 1,
        fecha_nacimiento: '',
        cargo: 'Usuario',
        genero: ''       
        });
    };

    return (
        <View style={Styles.body}>
        <ScrollView contentContainerStyle={Styles.container}>
            
                <Text style={Styles.h1}>Registrar / Editar Usuarios</Text>
                <Text style={Styles.h3}>Información Personal</Text>
                <TextInput
                    style={Styles.input}
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChangeText={text => setFormData({ ...formData, nombre: text })}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Apellido Paterno"
                    value={formData.appat}
                    onChangeText={text => setFormData({ ...formData, appat: text })}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Apellido Materno"
                    value={formData.apmat}
                    onChangeText={text => setFormData({ ...formData, apmat: text })}
                />
                <Text style={Styles.text}>Información de domicilio</Text>
                <TextInput
                    style={Styles.input}
                    placeholder="Calle"
                    value={formData.calle}
                    onChangeText={text => setFormData({ ...formData, calle: text })}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Colonia"
                    value={formData.colonia}
                    onChangeText={text => setFormData({ ...formData, colonia: text })}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Municipio"
                    value={formData.municipio}
                    onChangeText={text => setFormData({ ...formData, municipio: text })}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Estado"
                    value={formData.estado}
                    onChangeText={text => setFormData({ ...formData, estado: text })}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Telefono"
                    value={formData.telefono}
                    onChangeText={text => setFormData({ ...formData, telefono: text })}
                />
                <Text style={Styles.text}>Información de acceso</Text>
                <TextInput
                    style={Styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={text => setFormData({ ...formData, email: text })}
                />
                <TextInput
                    style={[Styles.input]}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={formData.pass}
                    onChangeText={text => setFormData({ ...formData, pass: text })}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Fecha de Nacimiento"
                    value={formData.fecha_nacimiento}
                    onChangeText={text => setFormData({ ...formData, fecha_nacimiento: text })}
                />
                <Text style={Styles.text}>Genero</Text>
                <View style={Styles.input}>
                    <Picker
                        selectedValue={formData.genero}
                        onValueChange={(itemValue, itemIndex) =>
                            setFormData({...formData, genero: itemValue})
                        }>
                        <Picker.Item label="Seleccione una opción" value="" />
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Femenino" value="Femenino" />
                        <Picker.Item label="39 tipos de gay" value="Otro" />
                    </Picker>
                </View>

                <Pressable onPress={handleSubmit} style={Styles.Boton3}>
                    <Text style={Styles.buttonText}>{formData.id_usuario ? 'Editar Registro' : 'Agregar Registro'}</Text>
                </Pressable>

                <Text style={Styles.h1}>Lista de usuarios:</Text>
                {registros.map((registro) => (
                    <View key={registro.id_usuario} style={[Styles.lista, Styles.fondo]}>
                        <Text style={Styles.text2}>Nombre: {registro.nombre} {registro.appat} {registro.apmat}</Text>
                        <Text style={Styles.text2}>Domicilio: {registro.calle}, {registro.colonia}</Text>
                        <Text style={Styles.text2}>Correo: {registro.email}</Text>
                        <Text style={Styles.text2}>Genero: {registro.genero} </Text>
                        <Pressable onPress={() => handleEdit(registro)} style={Styles.BotonAceptar}>
                            <Text style={Styles.buttonText}>Editar</Text>
                        </Pressable>
                        <Pressable onPress={() => handleDelete(registro.id_usuario)} style={Styles.BotonEliminar}>
                            <Text style={Styles.buttonText}>Eliminar</Text>
                        </Pressable> 
                    </View>
                ))}
                <View style={Styles.buttonsContainer} >
                    <Pressable  onPress={()=>navigation.navigate('Administrador')} style={Styles.Boton1}>
                        <Text style={Styles.buttonText}>Regresar</Text>
                    </Pressable>
                </View>
            
        </ScrollView>
        </View>
    );
}

export default Usuarios;
