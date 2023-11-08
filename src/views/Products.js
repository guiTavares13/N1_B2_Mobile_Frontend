import React, { useState, useEffect, useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { getProducts, registerProduct } from '../services/productsApiFunctions.js';
import { useNavigation } from '@react-navigation/native';
import ProductsContext from '../middlewares/ProductsContext.js';
import UserContext from '../middlewares/UserContext.js';

export default function Products() {
  const route = useRoute();
  const navigation = useNavigation();

  const { productsContext, setProductsContext } = useContext(ProductsContext)
  const { userContext } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const productType = route.params;

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDuration, setProductDuration] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      if (productType && productType.id) {
        navigation.setOptions({ title: productType.description });
        const response = await getProducts(productType.id);
        if (response.success) {
          setProducts(response.data);
        } else {
          console.error('Erro ao buscar produtos');
        }
      } else {
        console.error('Product type is not defined or product type id does not exist');
      }
    }

    fetchProducts();
  }, [productType]);

  const defaultImage = 'https://via.placeholder.com/150';

  const handleProductClick = (product) => {
    setProductsContext(product);
    navigation.navigate('ProductDetail', { product });
  };

  const handleSubmitProduct = async () => {
    try {
      const productData = {
        name: productName,
        description: productDescription,
        price: productPrice,
        image_url: '',
        duration: productDuration,
        company_id: 1,
        type_id: productType.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),

        // Adicione outros campos necessários, por exemplo, productType.id ou image.
      };
  
      const response = await registerProduct(productData);
  
      if (response.success) {
        // Limpar os inputs e atualizar a lista de produtos.
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductDuration('');
        
      }
    } catch (error) {
      console.error('Erro ao registrar produto:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      {userContext && userContext.role === 'admin' && (
        <View style={styles.productForm}>
          <TextInput
            placeholder="Nome do Produto"
            value={productName}
            onChangeText={setProductName}
            style={styles.input}
          />
          <TextInput
            placeholder="Descrição do Produto"
            value={productDescription}
            onChangeText={setProductDescription}
            style={styles.input}
          />
          <TextInput
            placeholder="Preço do Produto"
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Duração do Produto (minutos)"
            value={productDuration}
            onChangeText={setProductDuration}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSubmitProduct} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Cadastrar Produto</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {products.map((product, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity key={index} onPress={() => handleProductClick(product)} style={styles.card}>
              <Image
                source={{ uri: product.image ? product.image : defaultImage }}
                style={styles.image}
              />
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.price}>R$ {product.price}</Text>
              <Text style={styles.duration}>{product.duration} min</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '80%',
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  duration: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  productForm: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#080',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
  },
});
