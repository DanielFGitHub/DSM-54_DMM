import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import axios from 'axios';
import Styles from '../../Estilos/Styles';
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts';

function UsuariosNuevos({ navigation }) {
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        fetchRegistros();
    }, []);

    const fetchRegistros = async () => {
        try {
            const response = await axios.get('https://pruebaesp8266temphum.000webhostapp.com/usuariosN.php');
            setRegistros(response.data);
        } catch (error) {
            console.error('Error al obtener registros: ', error.message);
        }
    };

    return (
        <View style={Styles.body}>
            <Text style={Styles.text}>Gráfica de Usuarios Nuevos</Text>
            <View style={{ width: '90%', height: 250, backgroundColor: 'lightblue', padding: 10 }}>
                <View style={{ flexDirection: 'row', height: 200 }}>
                    <YAxis
                        data={registros.map(item => parseFloat(item.numero_de_personas))}
                        contentInset={{ top: 20, bottom: 20 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                        numberOfTicks={3} // Ajusta según tu preferencia
                        formatLabel={(value) => `${value}`}
                    />
                    <LineChart
                        style={{ flex: 1 }}
                        data={registros.map(item => parseFloat(item.numero_de_personas))}
                        contentInset={{ top: 20, bottom: 20 }}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    />
                </View>
                <XAxis
                    style={{ marginTop: 10 }}
                    data={registros.map(item => item.fecha_registro)}
                    formatLabel={(value, index) => {
                        const registro = registros[index];
                        return registro ? registro.fecha_registro : ''; // Verificar si el registro existe antes de acceder a fecha_registro
                    }}
                    contentInset={{ left: 20, right: 0 }}
                    svg={{ fontSize: 8, fill: 'black' }}
                    numberOfTicks={4} // Ajusta según tu preferencia
                />

            </View>

            <View style={Styles.buttonsContainer}>
                <Pressable onPress={() => navigation.navigate('Administrador')} style={Styles.Boton5}>
                    <Text style={Styles.buttonText}>Regresar</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default UsuariosNuevos;
