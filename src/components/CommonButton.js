import { Text, TouchableHighlight, StyleSheet } from "react-native";

export default (props) => {
    const { title, onClick, backgroundColor = '#73c8a9', borderRadius = 8 } = props;
    return(
        <TouchableHighlight style={[styles.buttom, { backgroundColor, borderRadius }]} onPress={onClick}>
            <Text>{title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    buttom: {
        borderWidth: 1,
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    }
});
