import express, {Router} from "express"
import { novoMedicamento, editaMedicamento, excluiMedicamento, mostraMedicamentos } from "../controller/medicamento.controller"

const remedioRouter = Router()

remedioRouter.get("medicamento", mostraMedicamentos)
remedioRouter.post("medicamneto", novoMedicamento)
remedioRouter.put("medicamento/:id", editaMedicamento)
remedioRouter.delete("medicamento/:id", excluiMedicamento)

export remedioRouter