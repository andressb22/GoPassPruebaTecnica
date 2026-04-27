import { useNavigate } from "react-router-dom";
import { useInputHandler } from "./general/useInputHandler";
import { multyValidation } from "../utilities/validateInputs";
import { useAlert } from "./components/useAlert";
import { registerUserService } from "../api/registerUserService";

export const useRegister = () => {
    const Email = useInputHandler({ type: "email", required: true });
    const Password = useInputHandler({ type: "password", required: true });
    const Name = useInputHandler({ type: "none", required: true });
    const navigate = useNavigate();
    const { showAlert } = useAlert()
    
    const handleSubmit = async () => {
        const inputs = [Email, Password, Name];
        const isValidated = multyValidation(inputs);


        if (!isValidated) return;

        const data = await registerUserService(Email.text, Password.text, Name.text);

        if (!data) return showAlert("Usuario o contaseña incorrectas");

        sessionStorage.setItem("token", data.token);
        navigate("/home");
    };

    return {
        Email,
        Password,
        Name,
        handleSubmit,
    };
}