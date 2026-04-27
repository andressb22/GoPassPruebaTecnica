import { Router } from "express";
import {
  validateCreateUser,
  validateLoginUser,
} from "../middelwares/user.middelware";
import { UserController } from "../controllers/User.controller";
import { CreateUserCase } from "../../../application/use-cases/user/CreateUserCase";
import { UserRepository } from "../../repository/UserRepository";
import { BcryptService } from "../../services/bcript.service";
import { JwtService } from "../../services/jwt.service";
import { LoginUserCase } from "../../../application/use-cases/user/LoginUserCase";
import { verifyToken } from "../middelwares/verifiToken.middelware";
import { GetUsersCase } from "../../../application/use-cases/user/GetUsersCase";

const routes = Router();

const userRepository = new UserRepository();
const bcryptService = new BcryptService();
const tokenService = new JwtService();

const createUserCase = new CreateUserCase(
  userRepository,
  bcryptService,
  tokenService,
);
const loginUserCase = new LoginUserCase(
  userRepository,
  bcryptService,
  tokenService,
);
const getUsersCase = new GetUsersCase(userRepository);

const userController = new UserController(
  createUserCase,
  loginUserCase,
  getUsersCase,
);

routes.get("/", verifyToken, userController.get);
routes.post("/", validateCreateUser, userController.create);
routes.post("/auth", validateLoginUser, userController.login);

export default routes;
