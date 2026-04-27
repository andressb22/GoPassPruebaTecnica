import type { Response, Request } from "express";
import { RequestWithDTO } from "../../../types/http";
import { CreateTaskDTO } from "../../../application/DTOS/task/CreateTaskDTO";
import { UpdateStatusTaskDTO } from "../../../application/DTOS/task/UpdateStatusTaskDTO";
import { TaskProIdDTO } from "../../../application/DTOS/task/TaskProIdDTO";

export class TaskController {
  constructor(
    private createTaskCase,
    private updateStatusTaskCase,
    private updateTaskCase,
    private deleteTaskCase,
    private getTaskCase,
  ) { }

  get = async (req: RequestWithDTO<TaskProIdDTO>, res: Response) => {
    try {
      const usu_id = req.user.userId;
      const pro_id = req.params.pro_id;

      const tasks = await this.getTaskCase.execute(usu_id, Number(pro_id));

      res.status(200).json(tasks);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };

  getById = async (req: RequestWithDTO<TaskProIdDTO>, res: Response) => {
    try {
      const usu_id = req.user.userId;
      const pro_id = req.dto.pro_id;
      const tas_id = req.params.tas_id;

      const tasks = await this.getTaskCase.execute(usu_id, pro_id);

      res.status(200).json(tasks);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };

  create = async (req: RequestWithDTO<CreateTaskDTO>, res: Response) => {
    try {
      const usu_id = req.user.userId;
      const data = await this.createTaskCase.execute(req.dto, usu_id);

      res.status(200).json({ msg: "creada correctamente", data });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };

  update = async (req: RequestWithDTO<CreateTaskDTO>, res: Response) => {
    try {
      const tas_id = req.params.tas_id;
      const usu_id = req.user.userId;
      const data = await this.updateTaskCase.execute(Number(tas_id), req.dto, usu_id);

      res
        .status(200)
        .json({ msg: "actualizada correctamente", data });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };

  changeState = async (
    req: RequestWithDTO<UpdateStatusTaskDTO>,
    res: Response,
  ) => {
    try {
      const tas_id = req.params.tas_id;
      const status = req.dto.status;
      const pro_id = req.dto.pro_id;
      const usu_id = req.user.userId;

      if (isNaN(Number(tas_id)))
        return res.status(400).json({ msg: "id debe ser numerico" });

      await this.updateStatusTaskCase.execute(
        Number(tas_id),
        status,
        usu_id,
        pro_id,
      );

      res.status(200).json({ msg: "tarea actualizada correctamente " });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };

  delete = async (req: RequestWithDTO<TaskProIdDTO>, res: Response) => {
    try {
      const usu_id = req.user.userId;
      const pro_id = req.dto.pro_id;
      const tas_id = req.params.tas_id;

      await this.deleteTaskCase.execute(Number(tas_id), usu_id, pro_id);

      res.status(200).json({ msg: "tarea eliminada correctamente ", tas_id });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };
}
