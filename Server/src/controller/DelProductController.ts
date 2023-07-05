import { prismaClient } from "../db/prismaClient";
import { Request, Response } from "express";

export class DelProduct {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const Categoria = await prismaClient.categoria.delete({
        where: { id: parseInt(id) },
      });
      return response.json(Categoria);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Erro ao deletar a atividade" });
    }
  }
}
