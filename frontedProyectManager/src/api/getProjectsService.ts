import { APIURL } from "../const";

export const getProyectsService = async (filter: string | null = null) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) throw new Error("session expirada");

    const response = await fetch(
      `${APIURL}project/${filter ? `filter=${filter}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || "Error en login");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
