import React, { useEffect, useState } from 'react';
import { View, Text,Pressable, FlatList } from 'react-native';
import axios from 'axios';
import Styles from '../../Estilos/Styles'
import { LineChart, XAxis, YAxis  } from 'react-native-svg-charts';

function Voltajes({navigation}) {
    const [registros, setRegistros ] = useState([]);

    useEffect(() => {
        fetchRegistros();
    }, []);

    const fetchRegistros = async () => {
        try {
            const response = await axios.get('https://pruebaesp8266temphum.000webhostapp.com/api.php');
            setRegistros(response.data);
        } catch (error) {
            console.error('Error al obtener registros: ', error.message);
        }
    };

    // Verificar si los registros están vacíos o no
    // if (registros.length === 0) {
    //     return <View><Text>Cargando...</Text></View>;
    // }

    const data = registros.map(item => ({ fecha: item.fecha_medida, voltaje: item.voltaje }));

    return (
        <View style={Styles.body}>
            <Text style={Styles.text}>Gráfica del voltaje del panel</Text>
            <View style={{ width: '90%', height: 250, backgroundColor: 'lightblue', padding: 10 }}>
                <View style={{ flexDirection: 'row', height: 200 }}>
                    <YAxis
                        data={registros.map(item => parseFloat(item.voltaje))}
                        contentInset={{ top: 20, bottom: 20 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                        numberOfTicks={3} // Ajusta según tu preferencia
                        formatLabel={(value) => `${value}`}
                    />
                    <LineChart
                        style={{ flex: 1 }}
                        data={registros.map(item => parseFloat(item.voltaje))}
                        contentInset={{ top: 20, bottom: 20 }}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    />
                </View>
                <XAxis
                    style={{ marginTop: 10 }}
                    data={registros.map(item => item.fecha_medicion)}
                    formatLabel={(value, index) => registros[index].fecha_medicion}
                    contentInset={{ left: 20, right: 20 }}
                    svg={{ fontSize: 5, fill: 'black' }}
                    numberOfTicks={5} // Ajusta según tu preferencia
                />
            </View>
           
            <View style={Styles.buttonsContainer}>
                <Pressable onPress={() => navigation.navigate('Usuario')} style={Styles.Boton5}>
                    <Text style={Styles.buttonText}>Regresar</Text>
                </Pressable>
            </View>
            
        </View>
    );
};

export default Voltajes;
