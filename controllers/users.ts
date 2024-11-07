import { createId } from "@helpers/createId";
import users from "@models/users";
import { Request, Response } from "express";

export class UserController {
  async addUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const _id = createId();
      const user = new users({
        name,
        email,
        _id,
      });

      await user.save();

      return res.sendStatus(201);
    } catch (e: any) {
      res.status(500).json({ message: e?.message });
    }
  }
}
