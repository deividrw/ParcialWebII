import { prismaClient } from "../db/prismaClient";
import { Request, Response } from "express";

export class GetProductController {
  async handle(request: Request, response: Response) {
    try {
      const Categoria = await prismaClient.categoria.findMany();
      return response.json(Categoria);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao buscar as atividades" });
    }
  }
}
