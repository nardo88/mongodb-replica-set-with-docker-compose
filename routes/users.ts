import { UserController } from "@controllers/users";
import { Router } from "express";

export const createUserRoutes = () => {
  const controller = new UserController();
  const router = Router();
  router.post("/add", controller.addUser);

  return router;
};
