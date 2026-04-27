
import Input from "../components/Input";
import { useProject } from "../hooks/useProject";
import { Plus } from "lucide-react";
import styles from "./styles/home.module.css";
import CardProject from "../components/CardProject";
import CreateProyect from "../components/CreateProyect";

const Home = () => {
  const { projects, changeStateModal, isOpenModal, updateProjects,deleteProject } = useProject();
  return (
    <>
      {isOpenModal && <CreateProyect closeModal={changeStateModal} updateProjects={updateProjects} />}
      <div className={styles.container}>

        <div className={styles.searchContainer}>
          <div className={styles.searcher}>
            <Input
              error=""
              label="Buscar"
              placeholder="Buscar por nombre del proyecto"
            />

          </div>
          <div>
            <button className={styles.btnAdd} onClick={changeStateModal}>
              <Plus />
            </button>
          </div>
        </div>
        <div className={styles.contProjects}>
          {projects.map((project) => (
            <CardProject item={project} deleteProject={deleteProject} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
