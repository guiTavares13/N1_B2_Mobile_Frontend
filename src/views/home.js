// src/views/home.js
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Buttom from '../components/CommonButton.js';
import { getProductsType } from '../services/productTypesApiFunctions.js';
import TypeProductsContext from '../middlewares/TypeProductsContext.js';

const Home = ({ navigation }) => {

  const { setTypeProductsContext } = useContext(TypeProductsContext);

  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    async function fetchProductsTypes() {
      const response = await getProductsType();
      console.log(response);
      if (response.success) {
        setProductTypes(response.data);
        setTypeProductsContext(response.data);
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
                navigation.navigate('Products', { ...type })
              } />
          ))
        }
      </View>
      <View style={styles.shoppingCart}>
        <TouchableOpacity onPress={() => navigation.navigate('ShoppingCartScreen')}>
          <View style={styles.buttonWithIcon}>
            <Icon name="shopping-cart" size={24} color="#333" />
            <Text style={styles.shoppingCartText}>Carrinho de compras</Text>
          </View>
        </TouchableOpacity>
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
  buttonWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  shoppingCart: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  
  shoppingCartText: {
    fontSize: 16,
    marginLeft: 8,
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
