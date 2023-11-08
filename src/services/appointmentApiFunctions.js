import api from "./api";

export async function registerAppointment(appointment) {
    console.log("Entrou");
    console.log(appointment);
    try {
        const response = await api.post('/appointment', appointment);

        if (response.status === 201) {
            console.log('Agendamento registrado com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao registrar agendamento:', error);
        throw error;
    }
}

export async function getAllAppointmentsByUser(user_id) {
    console.log(user_id);
    try {
        const response = await api.get(`/appointment/user/${user_id}`);

        if (response.status === 200) {
            console.log('Agendamentos retornados com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao buscar agenda:', error);
        throw error;
    }
}


export async function getAllAppointments() {
    try {
        const response = await api.get('/appointment');

        if (response.status === 200) {
            console.log('Agendamentos retornados com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao buscar agenda:', error);
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
