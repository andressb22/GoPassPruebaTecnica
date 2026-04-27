import { LogOut } from "lucide-react";
import styles from "./styles/header.module.css"

const Header = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Gestor de proyectos</h1>
      </div>
      <div>
        <LogOut />
      </div>
    </div>
  );
};

export default Header;
