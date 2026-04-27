import { PencilLine } from 'lucide-react'
import styles from './styles/taskCard.module.css'
import type { taskType } from '../hooks/useTask'
import { useDraggable } from '@dnd-kit/core'

type TaskCardProps = {
    task: taskType,
    editCard: () => void
}

const TaskCard = ({ task, editCard }: TaskCardProps) => {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.tas_id.toString(), // 🔑 importante
    });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={styles.container}
            onClick={editCard}
        >
            <div className={styles.contDate}>
                <span>{new Date(task.tas_created_at).toLocaleDateString()}</span>
            </div>
            <div className={styles.contTitle}>
                <PencilLine />
                <h3>{task.tas_title}</h3>
            </div>
            <div className={styles.priority}>
                Prioridad: {task.prt.prt_name}
            </div>
        </div>
    )
}

export default TaskCard