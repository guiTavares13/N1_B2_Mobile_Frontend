import api from "./api";

export async function registerWorker(worker) {
    try {
        const response = await api.post('/worker', worker);

        if (response.status === 200) {
            console.log('Funcionario registrado com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao registrar funcionario:', error);
        throw error;
    }
}

export async function getWorkers() {
    try {
        const response = await api.get('/worker');
        console.log(response);
        if (response.status === 200) {
            console.log('Funcionarios retornados com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao buscar funcionarios:', error);
        throw error;
    }
}

export async function getWorkersById(id) {
    try {
        console.log("Worker id", id);
        const response = await api.get(`/workerById/${id}`);
        console.log("Worker response", response);
        console.log(response);
        if (response.status === 200) {
            console.log('Funcionarios retornados com sucesso:', response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error('Erro ao buscar funcionarios:', error);
        throw error;
    }
}