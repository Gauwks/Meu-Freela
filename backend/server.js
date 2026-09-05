import "dotenv/config";
import express from "express";
import "./config/firebase.js";
import authRouter from "./router/authRouter.js";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});