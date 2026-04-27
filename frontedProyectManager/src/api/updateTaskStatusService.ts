import { APIURL } from "../const";


type updateStatusType = {
    status: number,
    pro_id: number
}

export const updateTaskStatusService = async (tas_Id: number, data: updateStatusType) => {
    try {
        const token = sessionStorage.getItem("token");

        if (!token) throw new Error("session expirada");

        const response = await fetch(`${APIURL}task/state/${tas_Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear la tarea');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error en createTaskService:', error);
        throw error;
    }
}