import { APIURL } from "../const";


export const deleteProjectService = async (id: number) => {
    try {
        const token = sessionStorage.getItem("token");

        if (!token) throw new Error("session expirada");

        const response = await fetch(`${APIURL}project/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });


        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || "Error al eliminar el proyecto");
        }

        return true;
    } catch (error) {
        console.error("Error en deleteProjectService:", error);
        throw error
    }
};