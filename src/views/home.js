// src/views/home.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Buttom from '../components/CommonButton.js';
import { getProductsType } from '../services/productTypesApiFunction.js';

const Home = ({ navigation }) => {

  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    async function fetchProductsTypes() {
      const response = await getProductsType();
      console.log(response);
      if (response.success) {
        setProductTypes(response.data);
      } else {
        console.error('Erro ao buscar tipos de produtos');
      }
    }

    fetchProductsTypes();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.regionTitle}>
        <Text style={styles.title}>Estética e Bem-estar</Text>
        <Text style={styles.subtitle}>Seja bem vindo ao seu App de agendamento de procedimentos estéticos</Text>
      </View>
      <View style={styles.body}>
        <Text style={[{ margin: 30 }]}>Veja nossas modalidades</Text>
        {
          productTypes.map((type, index) => (
            <Buttom
              key={index}
              title={type.description}
              backgroundColor={type.backgroundColor} 
              borderRadius={type.borderRadius}
              onClick={() =>
                navigation.navigate('Products', {...type})
              } />
          ))
        }

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dee1b6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    margin: 10
  },
  shoppingCart: {
    marginTop: 200,
    alignItems: "center"
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center"
  },
  regionTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 400,
    textAlign: "center",
    margin: 10,
    padding: 10
  },
  body: {
    flex: 0.75
  },

});

export default Home;
