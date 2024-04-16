import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, Pressable } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import axios from 'axios';
import Styles from '../../Estilos/Styles';

const GraficoCircularAPI = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        axios.get('https://pruebaesp8266temphum.000webhostapp.com/generos.php')
            .then(response => {
                setDatos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener los datos de la API: ', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const colors = ['#FF69B4', '#64b5f6', '#FFA500']; // Rosa, Azul, Naranja

    const data = datos.map((item, index) => ({
        key: item.genero,
        value: parseInt(item.cantidad_personas),
        svg: { fill: colors[index % colors.length] }, // Ciclo de colores
    }));

    return (
       <View style={Styles.body}>
        <Text style={Styles.h1}>Gráfico de Géneros</Text>
        <View style={{ width: '90%', height: 250, backgroundColor: 'lightblue', padding: 10 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <PieChart
                    style={{ height: 200, width: 200 }}
                    data={data}
                    padAngle={0.02}
                >
                    <Text />
                </PieChart>
            </View>
        </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                {datos.map((entry, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 10, height: 10, backgroundColor: colors[index], marginRight: 5 }}></View>
                        <Text style={{ color: colors[index] }}>{entry.genero}: </Text>
                        <Text style={{ color: colors[index] }}>{entry.cantidad_personas}    </Text>
                        
                    </View>
                ))}
            </View>
            
            <View style={Styles.buttonsContainer}>
                <Pressable onPress={() => navigation.navigate('Administrador')} style={Styles.Boton5}>
                    <Text style={Styles.buttonText}>Regresar</Text>
                </Pressable>
            </View>


       </View>
    );
}

export default GraficoCircularAPI;
