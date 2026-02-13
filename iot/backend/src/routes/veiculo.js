import express from "express"
const router = express.Router()
import db from '../config/db'

router.get("/", async(req, res) => {
    const [results] = await db.querry("SELECT * FROM veiculo where marca = ford")
    res.send(results)
})

/* ------------------------------------------------------------------------------------------------------------------------------------------------------- */

app.get('/veiculo', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM veiculo');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar Item' });
    }
});


app.get('/veiculo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM veiculo WHERE id_veiculo = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar item' });
    }
});


app.post('/veiculo', async (req, res) => {
    const { placa, marca, modelo, bateria_status, quilometragem, retirada, bateria_retirada, retorno, bateria_retorno, usuario_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO veiculo (placa, marca, modelo, bateria_status, quilometragem, retirada, bateria_retirada, retorno, bateria_retorno, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [placa, marca, modelo, bateria_status, quilometragem, retirada, bateria_retirada, retorno, bateria_retorno, usuario_id]
        );
        const [novoItem] = await pool.query('SELECT * FROM veiculo WHERE id_veiculo = ?', [result.insertId]);
        res.status(201).json(novoItem[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar item' });
    }
});


app.delete('/veiculo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM veiculo WHERE id_veiculo = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.json({ message: 'Item deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar item' });
    }
});


app.put('/veiculo/:id', async (req, res) => {
    const { id } = req.params;
    const { placa, marca, modelo, bateria_status, quilometragem, retirada, bateria_retirada, retorno, bateria_retorno, usuario_id} = req.body;

    try {
        const [result] = await pool.query(
            'UPDATE veiculo SET placa = ?, marca = ?, modelo = ?, bateria_status = ?, quilometragem = ?, retirada = ?, bateria_retirada = ?, retorno = ?, bateria_retorno = ?, usuario_id = ?',
            [placa, marca, modelo, bateria_status, quilometragem, retirada, bateria_retirada, retorno, bateria_retorno, usuario_id, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        const [itemAtualizado] = await pool.query('SELECT * FROM veiculo WHERE id_veiculo = ?', [id]);
        res.json(itemAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar item' });
    }
});



export { router }