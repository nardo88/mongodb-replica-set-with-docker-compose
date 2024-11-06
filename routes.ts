import { UserController } from "./controllers/users";
import { Router } from "express";
import { ThingsController } from "./controllers/things";
import { OrderController } from "./controllers/orders";

// User
const userController = new UserController();
const userRouter = Router();
userRouter.post("/add", userController.addUser);

// Things

const thingsController = new ThingsController();
const thingRouter = Router();
thingRouter.post("/add", thingsController.addThing);

// Orders

const orderController = new OrderController();
const orderRouter = Router();
orderRouter.post("/add", orderController.add);

export { userRouter, thingRouter };
