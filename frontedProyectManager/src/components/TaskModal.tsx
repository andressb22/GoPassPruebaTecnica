
import { X } from "lucide-react"
import styles from "./styles/taskModal.module.css"
import Input from "./Input"
import Select from "./Select"
import Button from "./Button"
import { useTaskForm } from "../hooks/components/useTaskForm"
import type { taskType } from "../hooks/useTask"

type TaskModalProps = {
    projectId: number,
    closeModal: () => void,
    taskSelected: taskType | null
    updateKanban: (task: taskType) => void
}

const TaskModal = ({ projectId, closeModal, taskSelected, updateKanban }: TaskModalProps) => {
    const {
        Name,
        Description,
        State,
        Priority,
        //UserAsigne,
        states,
        priority,
        //users,
        handleSubmit
    } = useTaskForm({ projectId, taskSelected, updateKanban })
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.closeButton}>
                    <X className={styles.closeIcon} onClick={closeModal} />
                </div>
                <div>
                    <h2> {taskSelected ? "Editar " : "Nueva "} Tarea</h2>
                </div>
                <div>
                    <Input
                        onFocus={Name.handleFocus}
                        onChange={(event) => Name.handleChange(event.target.value)}
                        onBlur={Name.handleBlur}
                        label="Nombre"
                        placeholder="Escriba nombre de la tarea"
                        error={Name.error}
                        value={Name.text}
                    />
                    <Input
                        onFocus={Description.handleFocus}
                        onChange={(event) => Description.handleChange(event.target.value)}
                        onBlur={Description.handleBlur}
                        label="Descripcion"
                        placeholder="Escriba descripcion"
                        error={Description.error}
                        value={Description.text}
                    />
                    <Select
                        label="Estado"
                        placeholder="Seleccione estado"
                        data={states}
                        handler={State}
                        error={State.error}
                    />
                    <Select
                        label="Prioridad"
                        placeholder="Seleccione prioridad"
                        data={priority}
                        handler={Priority}
                        error={Priority.error}
                    />

                    {/*<Select
                        label="Asignado a"
                        placeholder="Seleccione usuario"
                        data={users}
                        handler={UserAsigne}
                        error={UserAsigne.error}
                    />*/}
                </div>
                <div className={styles.buttonContainerPrincipal}>
                    <div className={styles.buttonContainer}>
                        <button onClick={closeModal} className={styles.cancelButton}>Cancelar</button>
                        <Button text={taskSelected ? "Editar " : "Crear "} onClick={handleSubmit} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TaskModal