import { Trash, X } from "lucide-react";
import { useProjectForm } from "../hooks/components/useProjectForm";
import Button from "./Button";
import Input from "./Input";
import Select, { type optionType } from "./Select";
import styles from "./styles/createProyect.module.css";
type CreateProyectProps = {
  closeModal: () => void;
  updateProjects: (project) => void;
};

const CreateProyect = ({ closeModal, updateProjects }: CreateProyectProps) => {
  const {
    Name,
    Description,
    Users,
    Rol,
    userData,
    members,
    rolData,
    handleSubmit,
    addUser,
    deleteMember
  } = useProjectForm();

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.closeContainer}>
          <X onClick={closeModal} />
        </div>
        <div>
          <h3>Nuevo Proyecto</h3>
        </div>
        <div>
          <div>
            <Input
              label="Nombre"
              placeholder="Escriba el nombre del proyecto"
              onChange={(event) => Name.handleChange(event.target.value)}
              onFocus={Name.handleFocus}
              onBlur={Name.handleBlur}
              error={Name.error}
            />
          </div>
          <div>
            <Input
              label="Descripción"
              placeholder="Escriba una descripcion del proyecto"
              onChange={(event) => Description.handleChange(event.target.value)}
              onFocus={Description.handleFocus}
              onBlur={Description.handleBlur}
              error={Description.error}
            />
          </div>
          <div>
            <div className={styles.contSelects}>
              <Select
                label={"Usuarios"}
                placeholder="Seleccione sus usuarios"
                data={userData}
                handler={Users}

              />
              <Select
                label={"Rol"}
                placeholder="Seleccione rol"
                data={rolData}
                handler={Rol}
              />
            </div>


            <Button onClick={addUser} text="Añadir usuario" disabled={Users.data.length === 0 || Rol.data.length === 0} />
          </div>
          <div className={styles.contTable}>


            {members.map((user) => (
              <div className={styles.conCardUser}>
                <div className={styles.conTitle}>
                  <p>{user.usu_name}</p>
                  <Trash className={styles.icon} onClick={() => deleteMember(user.usu_id)} />
                </div>
                <div className={styles.contRol}>
                  <p className={styles.rolText}>Rol: {user.rol_name}</p>
                </div>
              </div>
            ))}

          </div>
          <div className={styles.contButtons}>
            <div>
              <Button
                text="Cancelar"
                onClick={closeModal}
                className={styles.btnCancel}
              />
              <Button
                text="Crear proyecto"
                onClick={async () => {
                  const project = await handleSubmit()
                  updateProjects(project)
                  closeModal()
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateProyect;
