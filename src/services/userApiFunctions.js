
import api from './api';

export async function registerUser(user) {
    try {
        const response = await api.post('/user', user);

        if (response.status === 200) {
            console.log('Usuário registrado com sucesso:', response.data);
            return { data: response.data, token: response.headers['x-auth-token'] };
        }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        throw error;
    }
}

export async function login({ email, password }) {
    console.log("Função de login chamada");

    try {
        const response = await api.post("/login", { email, password });
        console.log("Aqui é o response", response);
        const { token } = response.data;
        return { success: true, token };
    } catch (error) {
        console.error("Ocorreu um erro na requisição:", error);
        if (error.response) {
            // A API retornou um erro
            console.error("Detalhes do erro:", error.response.data);
            return { success: false, message: error.response.data.message };
        } else {
            // Outro tipo de erro ocorreu
            return { success: false, message: "Erro ao fazer login" };
        }
    }
}
