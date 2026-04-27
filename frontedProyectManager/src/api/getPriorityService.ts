import { APIURL } from "../const";


export const getPriorityService = async () => {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("session expirada");

        const response = await fetch(`${APIURL}catalog/priorities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en getPriorityService:", error);

    }
};