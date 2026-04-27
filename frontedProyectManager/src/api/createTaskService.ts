import { APIURL } from "../const";

export const createTaskService = async (data: {
    title: string;
    desciption: string;
    status: number;
    priority: number;
    pro_id: number;
}) => {
    try {

        const token = sessionStorage.getItem("token");

        if (!token) throw new Error("session expirada");

        const response = await fetch(`${APIURL}task/`, {
            method: 'POST',
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
    }
    catch (error) {
        console.error('Error en createTaskService:', error);
        throw error;
    }
}