import { OrderController } from "@controllers/orders";
import { Router } from "express";

export const createOrderRoutes = () => {
  const controller = new OrderController();
  const router = Router();
  router.post("/add", controller.add);

  return router;
};
