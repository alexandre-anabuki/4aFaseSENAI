// Path: src/app.js

import express from "express";
import cors from "cors";

import { pranchaRouter } from "./routes/usuarios.js";


export const app = express();

app.use(cors());
app.use(express.json());


app.use(pranchaRouter);
