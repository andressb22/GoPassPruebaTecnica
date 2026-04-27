import { useNavigate } from "react-router-dom";
import { logUserService } from "../api/logUserService";
import { multyValidation } from "../utilities/validateInputs";
import { useInputHandler } from "./general/useInputHandler";
import { useAlert } from "./components/useAlert";

export const useLogin = () => {
  const Email = useInputHandler({ type: "email", required: true });
  const Password = useInputHandler({ type: "password", required: true });
  const navigate = useNavigate();
  const { showAlert } = useAlert()
  
  const handleSubmit = async () => {
    const inputs = [Email, Password];
    const isValidated = multyValidation(inputs);


    if (!isValidated) return;

    const data = await logUserService(Email.text, Password.text);

    if (!data) return showAlert("Usuario o contaseña incorrectas");

    sessionStorage.setItem("token", data.token);
    navigate("/home");
  };

  return {
    Email,
    Password,
    handleSubmit,
  };
};
