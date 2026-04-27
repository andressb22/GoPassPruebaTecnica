import { APIURL } from "../const";


export const getStatesTaskService = async () => {
    try {

        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("session expirada");

        const response = await fetch(`${APIURL}catalog/states`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener las tareas del proyecto");
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error en getTaskProjectService:", error);
        throw error;
    }
}