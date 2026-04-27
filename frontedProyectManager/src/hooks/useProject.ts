import { useEffect, useState } from "react";
import { getProyectsService } from "../api/getProjectsService";

export const useProject = () => {
  const [projects, setProjects] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      const projectsData = await getProyectsService();
      
      setProjects(projectsData);
    };

    getProjects();
  }, []);

  const changeStateModal = async () => {
    setIsOpenModal(!isOpenModal);
  };

  const updateProjects = async (project) => {

    setProjects((prevProjects) => [...prevProjects, project]);
  }

  const deleteProject = async (id: number) => {
    setProjects((prevProjects) => prevProjects.filter(project => project.pro_id !== id));
  }

  return {
    projects,
    changeStateModal,
    isOpenModal,
    updateProjects,
    deleteProject
  };
};
