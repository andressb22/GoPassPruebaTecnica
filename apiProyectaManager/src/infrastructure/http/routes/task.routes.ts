import { Router } from "express";
import {
  validateCreateTask,
  validateTaskProId,
  validateUpdateStatusTask,
} from "../middelwares/task.middelware";
import { TaskController } from "../controllers/task.controller";
import { CreateTaskCase } from "../../../application/use-cases/task/CreateTaskCase";
import { TaskRepository } from "../../repository/TaskRepository";
import { StatusRepository } from "../../repository/StatusRepository";
import { PriorityRepository } from "../../repository/PriorityRepositort";
import { ProjectRepository } from "../../repository/ProjectRepository";
import { verifyToken } from "../middelwares/verifiToken.middelware";
import { UpdateStatusTaskCase } from "../../../application/use-cases/task/UpdateStatusTaskCase";
import { ProjectAuthorizationService } from "../../../domain/services/ProjectAuthorization.service";
import { UpdateTaskCase } from "../../../application/use-cases/task/UpdateTaskCase";
import { DeleteTaskCase } from "../../../application/use-cases/task/DeleteTaskCase";
import { GetTaskCase } from "../../../application/use-cases/task/GetTaskCase";

const routes = Router();

const taskRepository = new TaskRepository();
const statusRepository = new StatusRepository();
const priorityRepository = new PriorityRepository();
const projectRepository = new ProjectRepository();
const projectAuthorizationService = new ProjectAuthorizationService(
  projectRepository,
);

const createTaskCase = new CreateTaskCase(
  taskRepository,
  statusRepository,
  priorityRepository,
  projectRepository,
  projectAuthorizationService,
);

const updateStatusTaskCase = new UpdateStatusTaskCase(
  statusRepository,
  taskRepository,
  projectAuthorizationService,
);

const updateTaskCase = new UpdateTaskCase(
  taskRepository,
  statusRepository,
  priorityRepository,
  projectRepository,
  projectAuthorizationService,
);

const deleteTaskCase = new DeleteTaskCase(
  taskRepository,
  projectAuthorizationService,
);

const getTaskCase = new GetTaskCase(taskRepository, projectRepository);

const taskController = new TaskController(
  createTaskCase,
  updateStatusTaskCase,
  updateTaskCase,
  deleteTaskCase,
  getTaskCase,
);

routes.get("/:pro_id", verifyToken, taskController.get);
routes.get("/:tas_id", verifyToken, validateTaskProId, taskController.getById)

routes.post("/", verifyToken, validateCreateTask, taskController.create);
routes.put(
  "/state/:tas_id",
  verifyToken,
  validateUpdateStatusTask,
  taskController.changeState,
);
routes.put("/:tas_id", verifyToken, validateCreateTask, taskController.update);

routes.delete(
  "/:tas_id",
  verifyToken,
  validateTaskProId,
  taskController.delete,
);

export default routes;
