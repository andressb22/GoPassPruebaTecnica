import { useEffect, useState } from "react"
import { getTaskProjectService } from "../api/getTaskProjectService"
import { getStatesTaskService } from "../api/getStatesTaskService";
import { updateTaskStatusService } from "../api/updateTaskStatusService";

export type taskType = {
    tas_id: number,
    tas_title: string,
    tas_description: string,
    tas_created_at: string,
    stt_id: number,
    stt: {
        stt_name: string
    },
    prt_id: number,
    prt: {
        prt_name: string
    }
}

type kanbanType = {
    columns: {
        [key: string]: {

            id: string;
            title: string;
            taskIds: number[];
        }
    },
    tasks: {
        [key: number]: taskType
    }
}

const initialKanbanState: kanbanType = {
    columns: {},
    tasks: {}
}

export const useTask = (pro_id: number) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState(initialKanbanState);
    const [taskSelected, setTaskSelected] = useState(null)


    useEffect(() => {
        const getStatesTask = async () => {
            const statesData = await getStatesTaskService()
            const tasksData = await getTaskProjectService(pro_id)

            setTasks(() => {
                const newColumns: any = {};
                const newTasks: any = {};

                // 1. crear columnas vacías
                statesData.forEach((state) => {
                    newColumns[state.stt_id] = {
                        id: state.stt_id.toString(),
                        title: state.stt_name,
                        taskIds: [],
                    };
                });

                // 2. agregar tareas
                tasksData.forEach((task) => {
                    // guardar tarea
                    newTasks[task.tas_id] = task;

                    // meter id en su columna
                    const column = newColumns[task.stt_id];

                    if (column) {
                        column.taskIds.push(task.tas_id);
                    }
                });

                return {
                    columns: newColumns,
                    tasks: newTasks,
                };
            });
            
        }


        getStatesTask()
    }, [])

    const editTask = (task) => {
        setTaskSelected(task)
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const updateKanban = (task: taskType) => {
        
        setTasks((prev) => {
            const newTasks = {
                ...prev.tasks,
                [task.tas_id]: task,
            };

            const existingTask = prev.tasks[task.tas_id];

            // 🆕 si no existe → insertar
            if (!existingTask) {
                const column = prev.columns[task.stt_id];

                return {
                    tasks: newTasks,
                    columns: {
                        ...prev.columns,
                        [task.stt_id]: {
                            ...column,
                            taskIds: [...column.taskIds, task.tas_id],
                        },
                    },
                };
            }

            const prevStateId = existingTask.stt_id;
            const newStateId = task.stt_id;

            // ❌ mismo estado → solo actualizar task
            if (prevStateId === newStateId) {
                return {
                    ...prev,
                    tasks: newTasks,
                };
            }

            const prevColumn = prev.columns[prevStateId];
            const nextColumn = prev.columns[newStateId];

            return {
                tasks: newTasks,
                columns: {
                    ...prev.columns,

                    // quitar de anterior
                    [prevStateId]: {
                        ...prevColumn,
                        taskIds: prevColumn.taskIds.filter(
                            (id) => id !== task.tas_id
                        ),
                    },

                    // agregar a nueva
                    [newStateId]: {
                        ...nextColumn,
                        taskIds: [...nextColumn.taskIds, task.tas_id],
                    },
                },
            };
        });

        closeModal()
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = Number(active.id);
        const newColumnId = Number(over.id);

        const task = tasks.tasks[taskId];
        if (!task) return;

        // 🧠 guardar estado anterior (para rollback)
        const prevTask = { ...task };

        // 🚀 1. update optimista
        updateKanban({
            ...task,
            stt_id: newColumnId,
        });

        try {
            // 🌐 2. backend
            await updateTaskStatusService(taskId, {
                status: newColumnId,
                pro_id: pro_id
            });
        } catch (error) {
            console.error("Error actualizando tarea", error);

            // 🔙 3. rollback
            updateKanban(prevTask);
        }
    };

    const openModal = () => setIsModalOpen(true);


    return {
        tasks,
        openModal,
        closeModal,
        isModalOpen,
        editTask,
        taskSelected,
        updateKanban,
        handleDragEnd
    }
}