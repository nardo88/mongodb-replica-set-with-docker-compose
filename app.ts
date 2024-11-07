import express from "express";
import cors from "cors";
import "module-alias/register";
import mongoose from "mongoose";
import passport from "passport";
import { createRoutes } from "./routes";

const MONGO_URL =
  "mongodb://172.18.0.2:27017,172.18.0.3:27017,172.18.0.4:27017/rs?replicaSet=my-mongo-set";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const routes = createRoutes();

app.use("/api/v1/user", routes.userRouter);
app.use("/api/v1/thing", routes.thingRoutes);
app.use("/api/v1/order", routes.orderRoutes);

const start = async () => {
  await mongoose.connect(MONGO_URL, {
    autoIndex: true,
  });

  app.listen(5000, () => {
    console.log("server started");
  });
};

start();
