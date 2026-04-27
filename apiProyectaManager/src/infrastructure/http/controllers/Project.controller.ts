import { Request, Response } from "express";
import { RequestWithDTO } from "../../../types/http";
import { CreateProjectDTO } from "../../../application/DTOS/project/CreateProjectDTO";

export class ProjectController {
  constructor(
    private createProjectCase,
    private getProjectsCase,
    private deleteProjectCase,
    private getUserProjectCase,
  ) { }

  get = async (req: Request, res: Response) => {
    try {
      const usu_id = req.user.userId;
      const filter =
        (req.query.filter as "ALL" | "CREATED" | "ASSIGNED") || "ALL";

      const data = await this.getProjectsCase.execute(usu_id, filter);

      res.status(200).json(data);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };

  getUserProject = async (req: Request, res: Response) => {
    try {
      const { pro_id } = req.params;
      const data = await this.getUserProjectCase.execute(Number(pro_id));
      console.log("data", data)
      res.status(200).json(data);
    } catch (error: any) {
      console.log(error);
      const status = error?.status ?? 500;
      res.status(status).json({ msg: error.message });
    }
  };

  create = async (req: RequestWithDTO<CreateProjectDTO>, res: Response) => {
    try {
      const usu_id = req.user.userId
      const data = await this.createProjectCase.execute({ ...req.dto, usu_id_created: usu_id });

      res.status(200).json({ msg: "creado correctamente", data });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usu_id = req.user.userId;
      await this.deleteProjectCase.execute(Number(id), usu_id);
      res.status(200).json({ msg: `Proyecto con id ${id} eliminado correctamente` });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };
}
