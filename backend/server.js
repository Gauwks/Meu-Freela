import "dotenv/config";
import express from "express";
import cors from "cors";
import "./config/firebase.js";
import authRouter from "./router/authRouter.js";
import clienteRouter from "./router/clienteRouter.js";
import projetoRouter from "./router/projetoRouter.js";

const app = express( );

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/clientes", clienteRouter);
app.use("/projetos", projetoRouter);

app.get("/", (req, res) => {
  res.send("API Meu Freela online");
});

app.listen(process.env.PORT || 3331, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3331}`);
});
