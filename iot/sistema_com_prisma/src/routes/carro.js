import { Router } from "express";
import { carroControler } from "../controller/carro.controller";

export const carroRouter = Router()

carroRouter.post('/Marcas', carroControler.novaMarca);