import Input from "../components/Input";
import Button from "../components/Button";
import styles from "./styles/login.module.css";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const { Email, Name, Password, handleSubmit } = useRegister();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          <h1>Gestor de proyectos</h1>
        </div>
        <div>
          <h2 className={styles.title}>Registrarse</h2>
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
            label="Nombre completo"
            type="text"
            placeholder="Escriba su nombre completo"
            onChange={(event) => Name.handleChange(event.target.value)}
            onFocus={Name.handleFocus}
            onBlur={Name.handleBlur}
            error={Name.error}
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
          Ya tienes una cuenta
          <span
            onClick={() => navigate("/")}
            className={styles.btnRegister}
          >
            {" "}
            Ingresa
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register