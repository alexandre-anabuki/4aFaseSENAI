
import { Router } from "express";
import {
  getPranchas,
  getPranchaPorId,
  criarPrancha,
  atualizarPrancha,
  deletarPrancha,
} from "../controller/prancha/pranchaController.js";

export const pranchaRouter = Router();

usuarioRouter.get(
  "/pranchas",getPranchas
);

usuarioRouter.get(
  "/pranchas/:id",getPranchaPorId
);

usuarioRouter.post(
  "/pranchas",criarPrancha
);

usuarioRouter.put(
  "/pranchas/:id",atualizarPrancha
);

usuarioRouter.delete(
  "/pranchas/:id",deletarPrancha
);