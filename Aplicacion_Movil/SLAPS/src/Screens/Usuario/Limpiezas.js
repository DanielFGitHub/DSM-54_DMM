import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import axios from "axios";
import Styles from '../../Estilos/Styles';

const Limpiezas = ({navigation}) => {
  //const navigation = useNavigation();
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    fetchRegistros();
  }, []);

  const fetchRegistros = async () => {
    try {
      const response = await axios.get('https://pruebaesp8266temphum.000webhostapp.com/api.php');
      setRegistros(response.data);
    } catch (error) {
      console.error('Error al obtener registros: ', error);
    }
  };

  const renderRow = ({ item }) => (
    <View style={Styles.row}>
      <Text style={Styles.cell}>{item.fecha_medicion}</Text>
      <Text style={Styles.cell}>{item.voltaje}</Text>
    </View>
  );

  return (

    <View style={Styles.body}>
        <View style={Styles.container}>
        <Text style={Styles.h2}>Historial de voltaje</Text>
        <Text style={Styles.h3}>   Fecha        /       Voltaje</Text>
        <FlatList
          data={registros}
          keyExtractor={(item) => item.ID_volt}
          renderItem={renderRow}
        />
        <View>
          <Pressable style={Styles.Boton3} onPress={() => navigation.navigate('Usuario')}>
            <Text style={Styles.buttonText}>Regresar</Text>
          </Pressable>
        </View>
       
      </View>
    </View>
  );
};

export default Limpiezas;



