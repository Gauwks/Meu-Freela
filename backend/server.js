import "dotenv/config";
import express from "express";
import "./config/firebase.js";
import authRouter from "./router/authRouter.js";
import clienteRouter from "./router/clienteRouter.js";
import projetoRouter from "./router/projetoRouter.js"

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/clientes", clienteRouter);
app.use("/projetos", projetoRouter);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});