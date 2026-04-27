import { Router } from "express";
import { validateCreateProject } from "../middelwares/project.middelware";
import { ProjectController } from "../controllers/Project.controller";
import { UserRepository } from "../../repository/UserRepository";
import { CreateProjectCase } from "../../../application/use-cases/project/CreateProyectCase";
import { ProjectRepository } from "../../repository/ProjectRepository";
import { verifyToken } from "../middelwares/verifiToken.middelware";
import { GetProjectCase } from "../../../application/use-cases/project/GetProjectsCase";
import { DeleteProtectCase } from "../../../application/use-cases/project/DeleteProtectCase";
import { GetUserProjectCase } from "../../../application/use-cases/user/GetUserProjectCase";

const routes = Router();

const userRepository = new UserRepository();
const projectRepository = new ProjectRepository();
const createProyectCase = new CreateProjectCase(
  userRepository,
  projectRepository,
);
const getProjectCase = new GetProjectCase(projectRepository);
const deleteProjectCase = new DeleteProtectCase(projectRepository);
const getUserProjectCase = new GetUserProjectCase(projectRepository);

const projectController = new ProjectController(
  createProyectCase,
  getProjectCase,
  deleteProjectCase,
  getUserProjectCase
);


routes.get("/", verifyToken, projectController.get);
routes.get("/:pro_id", verifyToken, projectController.getUserProject);
routes.post("/", validateCreateProject, verifyToken, projectController.create);
routes.delete("/:id", verifyToken, projectController.delete);

export default routes;
