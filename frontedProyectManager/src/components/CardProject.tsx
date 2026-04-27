import { PencilLine, Trash } from "lucide-react";
import styles from "./styles/CardProject.module.css";
import { useConfirm } from "../hooks/components/useConfirm";
import { deleteProjectService } from "../api/deleteProjectService";
import { useAlert } from "../hooks/components/useAlert";
import { useNavigate } from "react-router-dom";
type projectType = {
  pro_name: string;
  pro_description: string;
  pro_id: number;
  pro_created_at: string;
  _count: {
    tasTasks: number;
  };
  tasTasks: number[];
};

type CardProjectProps = {
  item: projectType;
  deleteProject: (id: number) => void;
};

const CardProject = ({ item, deleteProject }: CardProjectProps) => {
  const navigate = useNavigate();
  const { showConfirm } = useConfirm();
  const { showAlert } = useAlert();

  const handleDelete = async () => {
    const confirmed = await showConfirm("¿Seguro que quieres eliminar esto?");

    if (!confirmed) return;

    console.log('logica de eliminar proyecto');
    try {
      await deleteProjectService(item.pro_id);
      deleteProject(item.pro_id);
      showAlert("Proyecto eliminado correctamente");
    } catch (error) {
      showAlert(error.message || "Error desconocido");
      console.error("Error al eliminar el proyecto:", error);
    }


  }

  const goToTasks = () => {
    navigate(`/Tasks/${item.pro_id}/${item.pro_name}`);
  }

  return (
    <div className={styles.container} onClick={goToTasks}>
      <div className={styles.contDate}>
        <span>{new Date(item.pro_created_at).toLocaleDateString()}</span>
        <Trash onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }} className={styles.trash} />
      </div>
      <div className={styles.contTitle}>
        <PencilLine className={styles.PencilLine} />
        <h3>{item.pro_name}</h3>
      </div>
      <div>
        <p className={styles.description}>{item.pro_description}</p>
      </div>
      <div className={styles.relevantData}>
        <div>
          <span className={styles.relevantDataSpan}>Tareas incompletas: </span>
          <span>
            <strong>{item._count.tasTasks - item.tasTasks.length}</strong>
          </span>
        </div>
        <div>
          <span className={styles.relevantDataSpan}>Tareas totales: </span>
          <span>
            <strong>{item._count.tasTasks}</strong>
          </span>
        </div>
      </div>
    </div >
  );
};

export default CardProject;
