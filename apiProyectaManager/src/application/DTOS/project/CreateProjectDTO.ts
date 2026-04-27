import { mebersType, ProjectType } from "./project.type";

export class CreateProjectDTO {
  name: string;
  description: string;
  projectMembers: mebersType[];

  constructor(data: ProjectType) {
    if (!data.name) {
      throw new Error("nombre requerido");
    }

    if (!data.description) {
      throw new Error("descripcion requerido");
    }


    if (!data.projectMembers) {
      throw new Error(
        "Se deben espesificar los projectMembers por lo menos un usuario asignado al proyecto",
      );
    }

    if (!Array.isArray(data.projectMembers)) {
      throw new Error("projectMembers debe ser un arreglo");
    }

    if (data.projectMembers.length === 0) {
      throw new Error(
        "projectMembers debe tener al menos un usuario asignado ",
      );
    }

    const projectMembers = data.projectMembers.map((item) => {
      if (!item.usu_id || !item.rol_id)
        throw new Error(
          "usuario asignado no tiene la estructura correcta solo usu_id y rol_id",
        );

      return {
        usu_id: item.usu_id,
        rol_id: item.rol_id,
      };
    });

   
    this.name = data.name;
    this.description = data.description;
    this.projectMembers = projectMembers;
  }
}
