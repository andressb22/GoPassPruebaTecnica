import { APIURL } from "../const";

export const logUserService = async (email: string, password: string) => {
  try {
    const response = await fetch(`${APIURL}user/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

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
