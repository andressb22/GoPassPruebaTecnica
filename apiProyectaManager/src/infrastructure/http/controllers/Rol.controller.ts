import { Request, Response } from "express";

export class RolController {
  constructor(
    private getRolCase,
    private getStatesCase,
    private getPrioritiesCase
  ) { }

  get = async (req: Request, res: Response) => {
    try {
      const rol = await this.getRolCase.execute();

      res.status(200).json(rol);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };

  getStates = async (req: Request, res: Response) => {
    try {
      const states = await this.getStatesCase.execute();
      res.status(200).json(states);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };

  getPriorities = async (req: Request, res: Response) => {
    try {
      const priorities = await this.getPrioritiesCase.execute();
      res.status(200).json(priorities);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };
}
