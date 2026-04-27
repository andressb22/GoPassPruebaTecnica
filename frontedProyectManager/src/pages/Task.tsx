import { useNavigate, useParams } from 'react-router-dom';
import styles from "./styles/task.module.css";
import Input from '../components/Input';
import { useTask } from '../hooks/useTask';
import TaskModal from '../components/TaskModal';
import { DndContext } from "@dnd-kit/core";
import Column from '../components/Column';
import { ChevronLeft, MoveLeft } from 'lucide-react';

const Task = ({ }) => {

    const { id, name } = useParams();
    const { tasks, openModal, closeModal, isModalOpen, editTask, taskSelected, updateKanban, handleDragEnd } = useTask(Number(id));
    const navigate = useNavigate()

    const goBack = () => navigate(-1);



    return (
        <>
            {
                isModalOpen && <TaskModal taskSelected={taskSelected} projectId={Number(id)} closeModal={closeModal} updateKanban={updateKanban} />
            }

            <div className={styles.container}>
                <div className={styles.contTitle}>
                    <ChevronLeft width={35} height={35} onClick={goBack} />
                    <h2>{name}</h2>
                </div>
                <div className={styles.contSearch}>
                    <Input
                        error=""
                        label="Buscar"
                        placeholder="Buscar por nombre del proyecto"
                    />
                </div>
                <DndContext onDragEnd={handleDragEnd}>
                    <div className={styles.contTasks}>
                        {Object.values(tasks.columns).map((column) => (<Column
                            key={column.id}
                            column={column}
                            tasks={tasks.tasks}
                            editTask={editTask}
                            openModal={openModal}
                        />))}
                    </div>
                </DndContext>
            </div>
        </>

    )
}

export default Task