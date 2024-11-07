import { createId } from "@helpers/createId";
import { errorGenerator } from "@helpers/errorGenerator";
import Orders from "@models/orders";
import Things from "@models/things";
import { Request, Response } from "express";
import mongoose from "mongoose";

export class OrderController {
  // async add(req: Request, res: Response) {
  //   let session = await mongoose.startSession();
  //   try {
  //     session.startTransaction();
  //     const { userId, thingId } = req.body;

  //     const _id = createId();
  //     const order = new Orders({
  //       userId,
  //       thingId,
  //       _id,
  //     });

  //     await order.save({ session });

  //     errorGenerator.typeError(0);

  //     await session.commitTransaction();

  //     return res.sendStatus(201);
  //   } catch (e: any) {
  //     console.log(2);

  //     session.abortTransaction();
  //     res.status(500).json({ message: e?.message });
  //   } finally {
  //     session.endSession();
  //   }
  // }
  async add(req: Request, res: Response) {
    let session = await mongoose.startSession();
    try {
      session.startTransaction();
      const { userId, thingId } = req.body;
      const thing = await Things.findOne({ _id: thingId });
      if (!thing) return res.status(404).json({ message: "not found" });

      if (thing.total === 0)
        return res.status(404).json({ message: "thing is empty" });

      const _id = createId();
      const order = new Orders({
        userId,
        thingId,
        _id,
      });

      await order.save({ session });

      thing.total = thing.total - 1;
      await thing.save({ session });

      // errorGenerator.typeError(0);

      await session.commitTransaction();

      return res.sendStatus(201);
    } catch (e: any) {
      console.log(2);

      session.abortTransaction();
      res.status(500).json({ message: e?.message });
    } finally {
      session.endSession();
    }
  }
}
