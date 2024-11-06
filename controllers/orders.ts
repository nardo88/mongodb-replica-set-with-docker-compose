import { Request, Response } from "express";
import { createId } from "../helpers/createId";
import Orders from "../models/orders";

export class OrderController {
  async add(req: Request, res: Response) {
    try {
      const { userId, thingId } = req.body;
      const _id = createId();
      const order = new Orders({
        userId,
        thingId,
        _id,
      });

      await order.save();

      return res.sendStatus(201);
    } catch (e: any) {
      res.status(500).json({ message: e?.message });
    }
  }
}
