import "dotenv/config";
import express from "express";
import cors from "cors";
import "./config/firebase.js";
import authRouter from "./router/authRouter.js";
import clienteRouter from "./router/clienteRouter.js";
import projetoRouter from "./router/projetoRouter.js";

const app = express( );

const origensPermitidas = [
  "https://meu-freela-drab.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback ) => {
      if (!origin || origensPermitidas.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origem não permitida pelo CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

app.use("/auth", authRouter);
app.use("/clientes", clienteRouter);
app.use("/projetos", projetoRouter);

app.listen(process.env.PORT || 3331, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3331}`);
});
