import { ThingsController } from "@controllers/things";
import { Router } from "express";

export const createThingsRoutes = () => {
  const controller = new ThingsController();
  const router = Router();
  router.post("/add", controller.addThing);

  return router;
};
