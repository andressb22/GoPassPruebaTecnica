import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import styles from "../pages/styles/task.module.css";
import { Plus } from "lucide-react";

const Column = ({ column, tasks, editTask, openModal }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <div ref={setNodeRef} className={styles.column}>
            <h2 className={styles.columnTitle}>{column.title}</h2>

            <div className={styles.taskList}>
                {column.taskIds.map((taskId) => {
                    const task = tasks[taskId];

                    return (
                        <TaskCard
                            key={task.tas_id}
                            task={task}
                            editCard={() => editTask(task)}
                        />
                    );
                })}

                <button className={styles.addTaskButton} onClick={openModal}>
                    <Plus />
                </button>
            </div>
        </div>
    );
};

export default Column;