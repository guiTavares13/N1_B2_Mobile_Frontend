import { Text, StyleSheet, TouchableHighlight, View, Image } from "react-native";
import { Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import imageMapping from "../../assets/imageMapping.js";

import { useState, useEffect } from "react";

export default function ItemProduct({ data }) {

    

    const navigation = useNavigation();

    function detailProduct() {
        navigation.navigate('DetailProduct', { id, title, subtitle, img, price, time, speciality });
    }

    const [imageSource, setImageSource] = useState(null);

    useEffect(() => {
        setImageSource(imageMapping[img]);
    }, [img]);

    return (
        <TouchableHighlight style={[styles.container, customStyle]} onPress={detailProduct}>
            <View style={styles.buttom}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <View style={styles.priceAndTime}>
                        <Text>Valor: R$ {price}</Text>
                        <Text style={styles.time}>Tempo: {time}</Text>
                    </View>
                </View>
                <View style={styles.img}>
                    {imageSource && <Image style={{ width: 90, height: 80, borderRadius: 10 }} source={imageSource} />}
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.90,
        height: 100,
        marginVertical: 5,
    },
    buttom: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "space-around",
        width: "70%"
    },
    title: {
        fontSize: 20
    },
    subtitle: {
        maxWidth: 250,
    },
    priceAndTime: {
        flexDirection: "row",
    },
    time: {
        marginHorizontal: 50
    },
    img: {
        marginRight: 10,
        borderWidth: 0.2,
        borderRadius: 10
    }
});
