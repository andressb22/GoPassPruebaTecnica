import { useEffect, useState } from "react";
import { useInputHandler } from "../general/useInputHandler"
import { useSelectHandler } from "../general/useSelectHandler";
import { getStatesTaskService } from "../../api/getStatesTaskService";
import type { optionType } from "../../components/Select";
import { getPriorityService } from "../../api/getPriorityService";
import { getProjectUsersService } from "../../api/getProjectUsersService";
import { multyValidation } from "../../utilities/validateInputs";
import { createTaskService } from "../../api/createTaskService";
import { editTaskService } from "../../api/editTaskService";
import type { taskType } from "../useTask";

type useTaskFormProps = {
    projectId: number,
    taskSelected: taskType | null
    updateKanban: (task: taskType) => void
}


export const useTaskForm = ({ projectId, taskSelected, updateKanban }: useTaskFormProps) => {
    const Name = useInputHandler({ type: "none", required: true });
    const Description = useInputHandler({ type: "none", required: true });
    const State = useSelectHandler({ type: "select" });
    const Priority = useSelectHandler({ type: "select" });
    //const UserAsigne = useSelectHandler({ type: "select" });
    const [states, setStates] = useState<optionType[]>([]);
    const [priority, setPriority] = useState<optionType[]>([]);
    const [users, setUsers] = useState<optionType[]>([]);


    useEffect(() => {

        if (taskSelected) {
        
            Name.handleChange(taskSelected.tas_title)
            Description.handleChange(taskSelected.tas_description)
            State.changeItem({
                id: taskSelected.stt_id.toString(),
                value: taskSelected.stt.stt_name
            })
            Priority.changeItem({
                id: taskSelected.prt_id.toString(),
                value: taskSelected.prt.prt_name
            })
        }
    }, [taskSelected])

    useEffect(() => {
        const getState = async () => {
            const statesData = await getStatesTaskService()
            const statesSelect = statesData.map((state) => {
                return {
                    id: state.stt_id,
                    value: state.stt_name,
                };
            });
            setStates(statesSelect);
        }

        const getPriority = async () => {
            const priorityData = await getPriorityService() // Lógica para obtener prioridades
            const prioritySelect = priorityData.map((priority) => {
                return {
                    id: priority.prt_id,
                    value: priority.prt_name,
                };
            });
            setPriority(prioritySelect);
            // Lógica para obtener prioridades
        }

        const getUsers = async () => {
            const usersData = await getProjectUsersService(projectId);
            const usersSelect = usersData.map((user) => {
                return {
                    id: user.usu.usu_id,
                    value: user.usu.usu_name,
                };
            });

            setUsers(usersSelect);
            // Lógica para obtener usuarios
        }

        getState();
        getPriority();
        getUsers()
    }, [])


    const handleSubmit = async () => {
        const inputs = [Name, Description, State, Priority, /*UserAsigne*/];
        const isValid = multyValidation(inputs);

        if (!isValid) return
        let data
        if (taskSelected) {

            data = await editTaskService(taskSelected.tas_id, {
                title: Name.text,
                desciption: Description.text,
                status: parseInt(State.data[0].id),
                priority: parseInt(Priority.data[0].id),
                //tas_user_asigne: parseInt(UserAsigne.data.id),
                pro_id: projectId
            });
        }
        else {
            data = await createTaskService({
                title: Name.text,
                desciption: Description.text,
                status: parseInt(State.data[0].id),
                priority: parseInt(Priority.data[0].id),
                //tas_user_asigne: parseInt(UserAsigne.data.id),
                pro_id: projectId
            });
        }

        updateKanban(data.data)

    }

    return {
        Name,
        Description,
        State,
        Priority,
        //UserAsigne,
        states,
        priority,
        users,
        handleSubmit
    }
}