import { Router } from "express";
import { verifyToken } from "../middelwares/verifiToken.middelware";
import { RolController } from "../controllers/Rol.controller";
import { GetRolCase } from "../../../application/use-cases/rol/getRoleCase";
import { RolRepository } from "../../repository/RolRepository";
import { GetStatesCase } from "../../../application/use-cases/rol/getStatesCase";
import { PriorityRepository } from "../../repository/PriorityRepositort";
import { GetPrioritiesCase } from "../../../application/use-cases/priority/getPriorityCase";

const routes = Router();
const rolRepository = new RolRepository();
const prioritiesRepository = new PriorityRepository();
const getRolCase = new GetRolCase(rolRepository);
const getStatesCase = new GetStatesCase(rolRepository);
const getPrioritiesCase = new GetPrioritiesCase(prioritiesRepository);
const rolController = new RolController(getRolCase, getStatesCase, getPrioritiesCase);

routes.get("/role", verifyToken, rolController.get);
routes.get("/states", verifyToken, rolController.getStates);
routes.get("/priorities", verifyToken, rolController.getPriorities);

export default routes;
