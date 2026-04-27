import { APIURL } from "../const";


export const getTaskProjectService = async (pro_id: number) => {
    try {

        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("session expirada");

        const response = await fetch(`${APIURL}task/${pro_id}`, {
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