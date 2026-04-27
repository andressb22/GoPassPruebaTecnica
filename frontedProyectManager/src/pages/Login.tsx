
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "./styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { Email, Password, handleSubmit } = useLogin();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
          <h1>Gestor de proyectos</h1>
        </div>
        <div>
          <h2>Iniciar session</h2>
          <Input
            label="Correo"
            type="text"
            placeholder="Escriba su correo electronico"
            onChange={(event) => Email.handleChange(event.target.value)}
            onFocus={Email.handleFocus}
            onBlur={Email.handleBlur}
            error={Email.error}
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Escriba su contraseña"
            onChange={(event) => Password.handleChange(event.target.value)}
            onFocus={Password.handleFocus}
            onBlur={Password.handleBlur}
            error={Password.error}
          />
          <Button onClick={handleSubmit} text={"Ingresar"} />
        </div>
        <div className={styles.textRegister}>
          Eres nuevo
          <span
            onClick={() => navigate("/Registro")}
            className={styles.btnRegister}
          >
            {" "}
            Registrate
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
