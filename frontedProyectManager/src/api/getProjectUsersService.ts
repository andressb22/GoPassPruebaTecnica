import { APIURL } from "../const";


export const getProjectUsersService = async (projectId: number) => {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("session expirada");
        const response = await fetch(`${APIURL}project/${projectId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios del proyecto");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en getProjectUsersService:", error);
        throw error;
    }
};