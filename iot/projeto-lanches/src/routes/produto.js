import { Router } from 'express';
const router = Router();

import { adicionarProduto, editarProduto, excluirProduto, getProdutos } from '../controllers/produtoController.js';

router.get('/produto', getProdutos);
router.patch('/produto/:id', editarProduto)
router.post('/produtos', adicionarProduto)
router.delete('/produto/:id', excluirProduto)


export default router;