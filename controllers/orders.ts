import { createId } from "@helpers/createId";
import { errorGenerator } from "@helpers/errorGenerator";
import Orders from "@models/orders";
import Things from "@models/things";
import { Request, Response } from "express";
import mongoose from "mongoose";

export class OrderController {
  // SAVE =================================================================
  async add(req: Request, res: Response) {
    let session = await mongoose.startSession();
    try {
      session.startTransaction();
      const { userId, thingId } = req.body;

      const thing = await Things.findOne({ _id: thingId });
      if (!thing) return res.status(404).json({ message: "not found" });

      if (thing.total === 0) {
        return res.status(404).json({ message: "thing is empty" });
      }

      const _id = createId();
      const order = new Orders({
        userId,
        thingId,
        _id,
      });

      await order.save({ session });

      // errorGenerator.typeError(0); // Генерируем ошибку

      // @ts-ignore
      // thing.total = "null";
      thing.total = thing.total - 1;
      await thing.save({ session });

      await session.commitTransaction();
      return res.sendStatus(201);
    } catch (e: any) {
      session.abortTransaction();
      res.status(500).json({ message: e?.message });
    } finally {
      session.endSession();
    }
  }
}

// insertMany ===========================================================================
// метод create напрямую не поддерживает транзакции
// в Mongoose метод insertOne не является рекомендуемым способом для создания одного документа. ЛУчший вариант - save

// ДРУГИЕ МЕТОДЫ =============================================

// await Orders.deleteOne(
//   { /* критерий для удаления одного документа */ },
//   { session }
// );

// await Orders.deleteMany(
//   { /* критерий для удаления нескольких документов */ },
//   { session }
// );

// await Orders.insertMany(
//   [
//     {
//       _id: createId(),
//       userId,
//       thingId,
//     },
//     {
//       _id: createId(),
//       userId,
//       thingId,
//     },
//   ],
//   { session }
// );

// Обновление одного документа с использованием updateOne в транзакции
//   await Orders.updateOne(
//     { /* критерий для поиска документа */ },
//     { $set: { /* данные для обновления */ } },
//     { session }
// );

// Обновление одного документа с использованием findOneAndUpdate в транзакции
// await Orders.findOneAndUpdate(
//   {
//     /* критерий для поиска документа */
//   },
//   {
//     $set: {
//       /* данные для обновления */
//     },
//   },
//   { session, new: true } // `new: true` возвращает обновленный документ
// );

// Обновление нескольких документов с использованием updateMany в транзакции
// await Orders.updateMany(
//   {
//     /* критерий для поиска документов */
//   },
//   {
//     $set: {
//       /* данные для обновления */
//     },
//   },
//   { session }
// );
