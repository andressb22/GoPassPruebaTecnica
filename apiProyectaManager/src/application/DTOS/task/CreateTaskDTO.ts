import { TaskType } from "./task.type";

export class CreateTaskDTO {
  title: string;
  desciption: string;
  status: number;
  priority: number;
  pro_id: number;

  constructor(data: TaskType) {
    if (!data.title) {
      throw new Error("title requerido");
    }

    if (!data.desciption) {
      throw new Error("desciption requerido");
    }

    if (!data.status) {
      throw new Error("status requerido");
    }

    if (!data.priority) {
      throw new Error("priority requerido");
    }

    if (!data.pro_id) {
      throw new Error("pro_id requerido");
    }

    this.title = data.title;
    this.desciption = data.desciption;
    this.status = data.status;
    this.priority = data.priority;
    this.pro_id = data.pro_id;
  }
}
