import React, { useEffect, useState, useContext } from 'react';
import { TextInput, Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllAppointments, getAllAppointmentsByUser } from '../services/appointmentApiFunctions';
import { getProductsById } from '../services/productsApiFunctions.js';
import { getWorkersById } from '../services/workerApiFunctions.js';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserContext from "../middlewares/UserContext.js";

export default function ShoppingCartScreen() {
    const [cartProducts, setCartProducts] = useState([]);
    const [filterBy, setFilterBy] = useState('product');
    const [filterValue, setFilterValue] = useState('');

    const [cachedProducts, setCachedProducts] = useState({});
    const [cachedWorkers, setCachedWorkers] = useState({});


    const { userContext } = useContext(UserContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchProductAndWorkerDetails = async (productId, workerId) => {
        let productData = cachedProducts[productId];
        let workerData = cachedWorkers[workerId];
    
        if (!productData) {
            const productResult = await getProductsById(productId);
            if (productResult.success) {
                productData = productResult.data;
                setCachedProducts((prevState) => ({ ...prevState, [productId]: productData }));
            }
        }
    
        // Adicione este IF: pula a busca do Worker se o worker_id é nulo
        if (workerId === null) {
          return { productData, workerData }; 
        }
    
        if (!workerData) {
            const workerResult = await getWorkersById(workerId);
            if (workerResult.success) {
                workerData = workerResult.data;
                setCachedWorkers((prevState) => ({ ...prevState, [workerId]: workerData }));
            }
        }
    
        return { productData, workerData };
    };
    


    const fetchData = async () => {
        const result = await getAllAppointmentsByUser(userContext.id);
        console.log("RESULT", result);
        if (result.success) {
            for (const appointment of result.data) {
                await fetchProductAndWorkerDetails(appointment.product_id, appointment.worker_id);
            }
            setCartProducts(result.data);
        }
    };

    const fetchDataWithFilter = async () => {
        console.log(filterValue)
        // Chame sua API para obter resultados filtrados e atualize a lista de cartProducts
    };

    function handleDelete(key) {
        // Implemente sua função deleteItemByKey aqui para excluir o item do banco de dados
    }

    return (
        <>
            <View style={[{ backgroundColor: '#dee1b6', flex: 1 }]}>
                <View style={styles.filterContainer}>
                    <Picker
                        selectedValue={filterBy}
                        style={styles.picker}
                        onValueChange={(itemValue) => setFilterBy(itemValue)}
                    >
                        <Picker.Item label="Listar por Produto" value="product" />
                        <Picker.Item label="Listar por Esteticista" value="worker" />
                    </Picker>
                    <TextInput
                        style={styles.filterInput}
                        value={filterValue}
                        onChangeText={(text) => setFilterValue(text)}
                        onSubmitEditing={fetchDataWithFilter}
                        placeholder={filterBy === 'product' ? 'Nome do produto' : 'Nome do esteticista'}
                        returnKeyType="search"
                    />
                </View>
                <ScrollView>
                    <View style={styles.items}>
                        {
                            cartProducts.map((item) => {
                                const productData = cachedProducts[item.product_id];
                                const workerData = cachedWorkers[item.worker_id];
                                return (
                                    <View key={item.id} style={styles.itemCart}>
                                        <View style={styles.productInfo}>
                                            {/*...*/}
                                            <Text style={styles.productName}>{productData?.name || "Carregando..."}</Text>
                                            <Text style={styles.itemId}>Agendamento ID: {item.id}</Text>
                                            <Text style={styles.productCategory}>{productData?.category || "Carregando..."}</Text>
                                            <Text style={styles.productWorker}>{workerData?.name || "Carregando..."}</Text>
                                            {/*...*/}
                                        </View>
                                        {/*...*/}
                                    </View>
                                );
                            })}
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    items: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    picker: {
        width: '40%',
        height: 40,
    },
    filterInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingLeft: 8,
        paddingRight: 8,
        width: '45%',
        height: 40,
    },
    icon: {
        backgroundColor: '#fff',
        borderWidth: 1,
        width: 60,
        height: 98,
        margin: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemCart: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '90%',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        marginTop: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemId: {
        fontSize: 14,
    },
    productCategory: {
        fontSize: 15,
        color: 'gray',
    },
    productWorker: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    productDateTime: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});
