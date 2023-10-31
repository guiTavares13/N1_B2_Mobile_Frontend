import React, { useState } from "react";
import { Text, View, StyleSheet, Platform, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthInput from "../components/AuthInput.js";
import { registerUser, login } from '../services/userApiFunctions.js';

// Use a função registerUser conforme necessário no componente.


export default function Auth({ navigation }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("client");
    const [stageNew, setStageNew] = useState(false);

    const signinOrSignup = async () => {
        if (stageNew) {
            try {
                const userData = {
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    createdAt: new Date(),
                    updateAt: null
                };

                console.log(userData);
                const result = await registerUser(userData);
                console.log(result);
                localStorage.setItem('token', result.token);
                Alert.alert('Sucesso!', 'Conta criada!');
            } catch (error) {
                console.error('Erro ao criar conta:', error);
                Alert.alert('Erro!', 'Falha ao criar conta. Por favor, tente novamente.');
            }
        } else {
            try {
                console.log("Email e senha antes de chamar a função login:", email, password);
                const result = await login({ email, password });

                console.log("Aqui é o result", result);
                if (result.success) {
                    await saveToken(result.token);

                    Alert.alert('Sucesso!', 'Logado com sucesso!');
                    navigation.navigate('Home');
                } else {
                    Alert.alert('Erro!', result.message);
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                Alert.alert('Erro!', 'Falha ao fazer login. Por favor, tente novamente.');
            }
        }
    };

    async function saveToken(token) {
        try {
            await AsyncStorage.setItem('@jwt_token', token);
        } catch (e) {
            console.error('Erro ao salvar o token:', e);
        }
    }

    async function getToken() {
        try {
            const value = await AsyncStorage.getItem('@jwt_token');
            if (value !== null) {
                return value;
            }
        } catch (e) {
            console.error('Erro ao recuperar o token:', e);
        }
        return null;
    }

    return (

        <View style={styles.background}>
            <Text style={styles.title}>Serviços de Estética</Text>
            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>
                    {stageNew ? 'Crie sua conta' : 'Informe seus dados'}
                </Text>
                {stageNew && (
                    <AuthInput
                        icon="user"
                        placeholder="Nome"
                        value={name}
                        textInputStyle={styles.input}
                        onChangeText={(name) => setName(name)}
                    />
                )}

                <AuthInput
                    icon="at"
                    placeholder="E-mail"
                    value={email}
                    textInputStyle={styles.input}
                    onChangeText={(email) => setEmail(email)}
                />

                <AuthInput
                    icon="lock"
                    placeholder="Senha"
                    value={password}
                    textInputStyle={styles.input}
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />

                {stageNew && (
                    <AuthInput
                        icon="asterisk"
                        placeholder="Confirme a senha"
                        value={confirmPassword}
                        textInputStyle={styles.input}
                        secureTextEntry={true}
                        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                    />
                )}
                <TouchableOpacity onPress={signinOrSignup}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            {stageNew ? 'Registrar' : 'Entrar'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ padding: 10 }}
                onPress={() => setStageNew(!stageNew)}>
                <Text>
                    {stageNew ? 'Já possui conta?' : 'Ainda não pussui conta?'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        padding: Platform.OS == 'ios' ? 15 : 10,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        margin: 10,
        width: '90%',
        borderRadius: 10
    },
    title: {
        fontSize: 30
    },
    subtitle: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: "center",
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20
    }
})