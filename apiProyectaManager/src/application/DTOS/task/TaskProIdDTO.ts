import { TaskType } from "./task.type";

export class TaskProIdDTO {
  pro_id: number;

  constructor(data: TaskType) {
    if (!data.pro_id) {
      throw new Error("pro_id requerido");
    }

    this.pro_id = data.pro_id;
  }
}
