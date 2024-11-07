import { createOrderRoutes } from "./orders";
import { createThingsRoutes } from "./things";
import { createUserRoutes } from "./users";

export const createRoutes = () => {
  const userRouter = createUserRoutes();
  const thingRoutes = createThingsRoutes();
  const orderRoutes = createOrderRoutes();

  return { userRouter, thingRoutes, orderRoutes };
};
