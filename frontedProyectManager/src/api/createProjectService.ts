import { APIURL } from "../const";


export const createProjectService = async (data: any) => {
    try {
        const token = sessionStorage.getItem("token");

        if (!token) throw new Error("session expirada");

        const response = await fetch(`${APIURL}project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error("Error al crear el proyecto");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en createProjectService:", error);
        throw error;
    }
};