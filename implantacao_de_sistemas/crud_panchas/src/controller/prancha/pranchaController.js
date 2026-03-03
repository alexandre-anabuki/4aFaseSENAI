
import { prismaClient } from "../../../prisma/prisma.js";

export async function getPranchas(req, res) {
  try {
    const pranchas = await prismaClient.prancha.findMany();
    return res.json(pranchas);
  } catch (e) {
    console.error("Erro em getPranchas:", e);
    return res.status(500).json({ error: "Erro ao buscar pranchas" });
  }
}


export async function getPranchaPorId(req, res) {
  try {
    const prancha = await prismaClient.prancha.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!prancha) return res.status(404).send("Prancha não existe!");
    return res.json(prancha);
  } catch (e) {
    console.error(" Erro em getPranchaPorId:", e);
    return res.status(500).json({ error: "Erro ao buscar prancha" });
  }
}



export async function criarPrancha(req, res) {
  try {

    const prancha = await prismaClient.prancha.create({
      data: {
        nome_prancha: req.body.nome_prancha,
        modelo: req.body.modelo,
        quantidade: req.body.quantidade,
      },
    });

    console.log(" Prancha criado:", prancha);
    return res.status(201).json(prancha);
  } catch (error) {
    console.error("Erro ao criar prancha:", error);

    if (error.code === "P2002") {
      return res
        .status(400)
        .send("Falha ao cadastrar prancha: Prancha já cadastrado!");
    }

    return res.status(500).send("Erro inesperado no servidor");
  }
}


export async function atualizarPrancha(req, res) {
  try {
    const { body, params } = req;

    const pranchaAtualizado = await prismaClient.prancha.update({
      where: { id: Number(params.id) },
      data: { ...body },
    });

    return res.status(200).json({
      message: "Prancha atualizado!",
      data: pranchaAtualizado,
    });
  } catch (error) {
    console.error(" Erro ao atualizar prancha:", error);

    if (error.code == "P2025") {
      return res.status(404).send("prancha não existe no banco");
    }
    if (error.code === "P2002") {
      return res
        .status(400)
        .send("Falha ao cadastrar prancha: Email já cadastrado!");
    }

    return res.status(500).send("Erro inesperado no servidor");
  }
}


export async function deletarPrancha(req, res) {
  try {
    const pranchaDeletado = await prismaClient.prancha.delete({
      where: { id: Number(req.params.id) },
    });
    return res.status(200).json({
      message: "prancha deletado!",
      data: pranchaDeletado,
    });
  } catch (error) {
    console.error(" Erro ao deletar prancha:", error);

    if (error.code == "P2025") {
      return res.status(404).send("prancha não existe no banco");
    }

    return res.status(500).send("Erro inesperado no servidor");
  }
}