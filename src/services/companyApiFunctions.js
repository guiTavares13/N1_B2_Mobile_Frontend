import api from "./api";

export async function registerCompanyType(company) {
    try {
        const response = await api.post('/company', company);

        if (response.status === 200) {
            console.log('Empresa registrada com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao registrar empresa:', error);
        throw error;
    }
}

export async function getAllCompany() {
    try {
        const response = await api.get('/company');

        if (response.status === 200) {
            console.log('Empresas retornados com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        throw error;
    }
}

export async function getCompanyByPk(companyId) {
    console.log(companyId)
    try {
        const response = await api.get(`/company/${companyId}`);

        if (response.status === 200) {
            console.log('Empresas retornados com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        throw error;
    }
}
