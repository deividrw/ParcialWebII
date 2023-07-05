import express from "express";
import { router } from "./router";
import cors from "cors";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir todas as origens. Você pode especificar uma origem específica em vez de '*' se desejar.
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,DELETE, PUT "); // Permitir os métodos HTTP desejados.
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Permitir os cabeçalhos personalizados desejados.

  next();
});

app.use(cors());
app.use(express.json());
app.use(router);
app.listen(4003, () => console.log("Servidor Web rodando, PORT 4003"));
