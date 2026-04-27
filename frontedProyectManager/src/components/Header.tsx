import { LogOut } from "lucide-react";
import styles from "./styles/header.module.css"
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigation = useNavigate()
  const logOut = () => {
    sessionStorage.removeItem("token")
    navigation("/")
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>Gestor de proyectos</h1>
      </div>
      <div>
        <LogOut onClick={logOut} />
      </div>
    </div>
  );
};

export default Header;
