import api from "./api";

export async function registerProduct(product) {
    try {
        const response = await api.post('/product', product);

        if (response.status === 201) {
            console.log('Produto registrado com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao registrar produto:', error);
        throw error;
    }
}

export async function getProducts(productTypeId) {
    console.log(productTypeId, "aqui é tdsadsando");
    try {
        const response = await api.get(`/productsByType/${productTypeId}`);

        if (response.status === 200) {
            console.log('Produtos retornados com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
}

export async function getProductsById(id) {
    try {

        console.log("Product id", id)
        const response = await api.get(`/productById/${id}`);
        console.log("Product id response", response)
        if (response.status === 200) {
            console.log('Produtos retornados com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
}