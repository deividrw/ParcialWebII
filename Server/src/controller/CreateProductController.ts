import { prismaClient } from "../db/prismaClient";
import { Request, Response } from "express";

export class CreateAtividadeController {
  async handle(request: Request, response: Response) {
    const { category, product, price } = request.body;
    try {
      const Categoria = await prismaClient.categoria.create({
        data: {
          category,
          product,
          price: price.toString()
        },
      });
      return response.json(Categoria);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao Cadastrar" });
    }
  }
}
