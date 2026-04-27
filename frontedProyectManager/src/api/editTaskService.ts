import { APIURL } from "../const";

export const editTaskService = async (tas_id: number, task) => {
    try {
        const token = sessionStorage.getItem("token");

        if (!token) throw new Error("session expirada");

        const response = await fetch(`${APIURL}task/${tas_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
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