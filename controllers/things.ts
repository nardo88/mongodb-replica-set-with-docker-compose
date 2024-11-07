import { createId } from "@helpers/createId";
import Things from "@models/things";
import { Request, Response } from "express";

export class ThingsController {
  async addThing(req: Request, res: Response) {
    try {
      const { name, cost, total } = req.body;
      const _id = createId();
      const thing = new Things({
        name,
        _id,
        cost,
        total,
      });

      await thing.save();

      return res.sendStatus(201);
    } catch (e: any) {
      res.status(500).json({ message: e?.message });
    }
  }
}
