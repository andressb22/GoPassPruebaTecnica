export type mebersType = {
  usu_id: number;
  rol_id: number;
};

export type ProjectType = {
  name: string;
  description: string;
  usu_id_created: number;
  projectMembers: mebersType[];
};
