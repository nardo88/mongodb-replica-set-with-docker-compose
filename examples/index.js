import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.json("Hello Distant global");
});

app.listen(5000, () => {
  console.log("server started");
});
