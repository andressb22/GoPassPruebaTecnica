import { TaskType } from "./task.type";

export class UpdateStatusTaskDTO {
  status: number;
  pro_id: number;

  constructor(data: TaskType) {
    if (!data.status) {
      throw new Error("title requerido");
    }

    if (!data.pro_id) {
      throw new Error("pro_id requerido");
    }

    this.status = data.status;
    this.pro_id = data.pro_id;
  }
}
