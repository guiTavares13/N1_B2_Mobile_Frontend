import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import { getProducts } from '../services/productsApiFunctions.js';

export default function Products() {
    const route = useRoute();

    const [products, setProducts] = useState([]);
    const productType = route.params;

    console.log(productType, "aqui estão os parametros");

    useEffect(() => {
        async function fetchProducts() {
            if (productType && productType.id) {
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
    }, []);

    return (
        <View style={styles.container}>
            {products.map((product, index) => (
                <Text key={index} style={styles.text}>
                    {product.name}: {product.price}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});
