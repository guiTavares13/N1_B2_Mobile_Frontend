import api from "./api";

export async function registerProductType(productTypes) {
    try {
        const response = await api.post('/productTypes', productTypes);

        if (response.status === 200) {
            console.log('Tipo de produto registrado com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao registrar produto:', error);
        throw error;
    }
}

export async function getProductsType() {
    try {
        const response = await api.get('/productTypes');

        if (response.status === 200) {
            console.log('Tipos de produtos retornados com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
}
