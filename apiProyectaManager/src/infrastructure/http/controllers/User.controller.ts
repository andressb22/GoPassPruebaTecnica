import type { Response, Request } from "express";
import type { RequestWithDTO } from "../../../types/http";
import { CreateUserDTO } from "../../../application/DTOS/user/CreateUserDTO";
import { LoginUserDTO } from "../../../application/DTOS/user/LoginUserDTO";

export class UserController {
  constructor(
    private createUserCase,
    private loginUserCase,
    private getUsersCase,
   
  ) { }

  get = async (req: Request, res: Response) => {
    try {
      const data = await this.getUsersCase.execute();
      console.log("data", data)
      res.status(200).json(data);
    } catch (error: any) {
      const status = error?.status ?? 500;
      res.status(status).json({ msg: error.message });
    }
  };

  login = async (req: RequestWithDTO<LoginUserDTO>, res: Response) => {
    try {
      const data = await this.loginUserCase.execute(req.dto);

      res.status(200).json(data);
    } catch (error: any) {
      const status = error?.status ?? 500;
      res.status(status).json({ msg: error.message });
    }
  };

  create = async (req: RequestWithDTO<CreateUserDTO>, res: Response) => {
    try {
      const data = await this.createUserCase.execute(req.dto);

      res.status(200).json({ msg: "Usuario creado correctamente", ...data });
    } catch (error: any) {
      console.log(error);

      if (error.code === "P2002") {
        return res.status(500).json({ msg: "Error dato invalido o duplicado" });
      }

      res.status(500).json({ msg: error.message });
    }
  };

  update = async (req: RequestWithDTO<CreateUserDTO>, res: Response) => {
    try {
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };
}
