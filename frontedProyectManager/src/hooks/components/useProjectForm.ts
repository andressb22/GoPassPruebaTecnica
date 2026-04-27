import { useEffect, useState } from "react";
import { useInputHandler } from "../general/useInputHandler";
import { useSelectHandler } from "../general/useSelectHandler";
import { getUsersService } from "../../api/getUsersService";
import type { optionType } from "../../components/Select";
import { getRolService } from "../../api/getRolService";
import { multyValidation } from "../../utilities/validateInputs";
import { createProjectService } from "../../api/createProjectService";

export const useProjectForm = () => {
  const Name = useInputHandler({ type: "none", required: true });
  const Description = useInputHandler({ type: "none", required: true });
  const Users = useSelectHandler({ type: "select" });
  const Rol = useSelectHandler({ type: "select" });
  const [userData, setUserData] = useState<optionType[]>([]);
  const [rolData, setRolData] = useState<optionType[]>([]);
  const [members, setMembers] = useState([]);


  useEffect(() => {
    const getUsers = async () => {
      const userResponse = await getUsersService();

      const userSelect = userResponse.map((user) => {
        return {
          id: user.usu_id,
          value: user.usu_name,
        };
      });

      setUserData(userSelect);
    };

    const getRoleCatalog = async () => {
      const rolResponse = await getRolService();

      const rolSelect = rolResponse.map((rol) => {
        return {
          id: rol.rol_id,
          value: rol.rol_name,
        };
      });

      setRolData(rolSelect);
    };

    getRoleCatalog();
    getUsers();
  }, []);


  const addUser = () => {
    setMembers(prevState => [...prevState, {
      usu_id: parseInt(Users.data[0].id),
      usu_name: Users.data[0].value,
      rol_id: parseInt(Rol.data[0].id),
      rol_name: Rol.data[0].value
    }])


    Users.clearSelect()
    Rol.clearSelect()
  }

  const deleteMember = (usu_id) => {
    setMembers(prevState => prevState.filter(item => item.usu_id !== usu_id))
  }


  const handleSubmit = async () => {
    const inputs = [Name, Description];
    let isValid = multyValidation(inputs);


    if (members.length === 0) Users.setError("debe asignar al menos un usuario y un rol al proyecto")

    if (!isValid) {
      return;
    }

    const finalMembers = members.map(member => ({
      usu_id: member.usu_id,
      rol_id: member.rol_id
    }))

    const projectData = {
      name: Name.text,
      description: Description.text,
      projectMembers: finalMembers
    };

    console.log(projectData);

    const project = await createProjectService(projectData);
    console.log(project.data);
    return project.data
  }


  return { Name, Description, Users, Rol, userData, rolData, handleSubmit, addUser, members, deleteMember };
};
